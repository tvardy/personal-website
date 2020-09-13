import fs from 'fs'
import path from 'path'

import fastglob from 'fast-glob'
import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../_settings'
import { find, filter, _isDev } from '../_utils'

const readFile = pify(fs.readFile)

class PostsService {
  constructor(devMode) {
    this.devMode = devMode
  }

  async preCache() {
    console.time('posts.preCache')
    const files = await fastglob(paths.data + paths.posts)
    const data = await Promise.all(
      files.map((file) => readFile(path.resolve(file), 'utf8'))
    )

    this._posts = files.map((file, i) => _parsePost(file, data[i])).reverse()

    console.timeEnd('posts.preCache')
    console.debug(`${this._posts.length} posts found`)
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

  _all() {
    return this._paged(this._posts, { page: 1, limit: 65536, short: true })
  }

  _paged(posts, { page, limit, short }) {
    const start = (page - 1) * limit
    const end = start + limit
    const last = end >= posts.length

    return {
      last,
      posts: posts.slice(start, end).map((post) => this._post(post.file, short)),
    }
  }

  async findOne(key, short) {
    return new Promise((resolve, reject) => {
      try {
        const post = this._post(key, short)
        resolve(post)
      } catch (e) {
        reject(e)
      }
    })
  }

  _post(file, short) {
    let data = find(this._posts, { file })

    if (this.devMode) {
      const path = data.path
      data = fs.readFileSync(path)
      data = _parsePost(path, data.toString())
    }

    if (data) {
      const post = Object.assign({}, data)

      if (short) {
        delete post.body
      }

      return post
    } else {
      throw {
        status: 404,
        message: 'Resource not found',
      }
    }
  }
}

function _parsePost(file, data) {
  const basename = path.basename(file)
  const [, date, slug] = basename.match(/^_?(\d{4}-\d{2}-\d{2})-([\w-]+)\.\w{2,3}$/)
  const draft = /^_/.test(basename)
  const { attributes, body } = matter(data)
  const excerpt = body.split(site.excerpt_separator)[0]

  let fileName = basename.replace(`${path.extname(file)}`, '')
  if (draft) {
    fileName = fileName.replace(/^_/, '')
  }

  return {
    file: fileName,
    path: file,
    tags: [],
    ...attributes,
    draft,
    date,
    slug,
    excerpt,
    body,
  }
}

const _has = {
  tag: (post, tag) => post.tags.includes(tag),
  draft: (post) => !post.draft,
}

export default new PostsService(_isDev())
