import fs from 'fs'
import path from 'path'

import fastglob from 'fast-glob'
import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../_settings'
import { reduceToObjByKey } from '../_utils'

const readFile = pify(fs.readFile)

class PostsService {
  async preCache() {
    const files = await fastglob(paths.data + paths.posts)
    const data = await Promise.all(
      files.map((file) => {
        return readFile(path.resolve(file), 'utf8')
      })
    )

    this._posts = files.map(_parsePost).reverse().reduce(reduceToObjByKey('file'), {})
    this._keys = Object.keys(this._posts)

    function _parsePost(file, i) {
      const basename = path.basename(file)
      const [, date, slug] = basename.match(/^(\d{4}-\d{2}-\d{2})-([\w-]+)\.\w{2,3}$/)
      const { attributes, body } = matter(data[i])
      const excerpt = body.split(site.excerpt_separator)[0]

      return {
        file: basename.replace(`${path.extname(file)}`, ''),
        ...attributes,
        date,
        slug,
        excerpt,
        body,
      }
    }
  }

  async getPosts({ page = 1, limit = site.posts.limit, short = true } = {}) {
    return Promise.resolve(this._paged(page, limit, short))
  }

  _paged(page, limit, short) {
    const start = (page - 1) * limit
    const end = start + limit
    const last = end >= this._keys.length

    return {
      last,
      posts: this._keys.slice(start, end).map((key) => this._post(key, short)),
    }
  }

  async getPost(key, short) {
    return Promise.resolve(this._post(key, short))
  }

  _post(key, short) {
    const post = { ...this._posts[key] }

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

const instance = new PostsService()

instance.preCache()

export default instance
