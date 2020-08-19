import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../_settings'
import { reduceToObjByKey } from '../_utils'

const readFile = pify(fs.readFile)

let _posts
let _keys

export async function getPosts({
  page = 1,
  limit = site.posts.limit,
  short = true,
} = {}) {
  if (!_posts) {
    const files = await fg(paths.static + paths.posts)
    const data = await Promise.all(
      files.map((file) => {
        return readFile(path.resolve(file), 'utf8')
      })
    )

    _posts = files.map(_parsePost).reverse().reduce(reduceToObjByKey('file'), {})
    _keys = Object.keys(_posts)

    return _paged(page, limit, short)

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

  return Promise.resolve(_paged(page, limit, short))
}

export async function getPost(key, short) {
  if (!_posts) {
    await getPosts()
  }

  const post = { ..._posts[key] }

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

function _paged(page, limit, short) {
  const start = (page - 1) * limit
  const end = start + limit
  const last = end >= _keys.length

  return {
    last,
    posts: _keys.slice(start, end).map((key) => {
      let post = { ..._posts[key] }

      if (short) {
        delete post.body
      }

      return post
    }),
  }
}
