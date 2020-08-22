import fs from 'fs'
import path from 'path'

import fastglob from 'fast-glob'
import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../_settings'
import { find, filter } from '../_utils'

const readFile = pify(fs.readFile)

class PostsService {
  async preCache() {
    const files = await fastglob(paths.data + paths.posts)
    const data = await Promise.all(
      files.map((file) => {
        return readFile(path.resolve(file), 'utf8')
      })
    )

    this._posts = files.map(_parsePost).reverse()

    function _parsePost(file, i) {
      const basename = path.basename(file)
      const [, date, slug] = basename.match(/^(\d{4}-\d{2}-\d{2})-([\w-]+)\.\w{2,3}$/)
      const { attributes, body } = matter(data[i])
      const excerpt = body.split(site.excerpt_separator)[0]

      const post = {
        file: basename.replace(`${path.extname(file)}`, ''),
        tags: [],
        ...attributes,
        date,
        slug,
        excerpt,
        body,
      }

      return post
    }
  }

  async findAll({
    page = 1,
    limit = site.posts.limit,
    filters = [],
    short = true,
  } = {}) {
    page = parseInt(page)

    let posts

    if (filters.length) {
      posts = filter(this._posts, (post) =>
        filters.every(({ by, value }) => _has[by](post, value))
      )
    } else {
      posts = [...this._posts]
    }

    return Promise.resolve(this._paged(posts, { page, limit, short }))
  }

  _paged(posts, { page, limit, short }) {
    const start = (page - 1) * limit
    const end = start + limit
    const last = end >= posts.length

    return {
      last,
      posts: posts.slice(start, end).map((post) => this._post(post.slug, short)),
    }
  }

  async findOne(key, short) {
    return Promise.resolve(this._post(key, short))
  }

  _post(slug, short) {
    const post = find(this._posts, { slug })

    if (post) {
      if (short) {
        delete post.body
      }

      return post
    } else {
      throw {
        status: 404,
        message: 'resource not found',
      }
    }
  }
}

const _has = {
  tag: (post, tag) => post.tags.includes(tag),
}

const instance = new PostsService()

instance.preCache()

export default instance
