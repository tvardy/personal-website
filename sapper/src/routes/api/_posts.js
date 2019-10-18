import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../../_settings'
import { reduceToObjByKey } from '../../_utils'

const readFile = pify(fs.readFile)

let _posts;

export async function getPosts() {
  if (!_posts) {
    const files = await fg(paths.static + paths.posts)
    const data = await Promise.all(
      files.map(file => {
        return readFile(path.resolve(file), 'utf8')
      })
    )

    _posts = files
      .map(_parsePost)
      .reduce(reduceToObjByKey('file'), {})

    return _posts

    function _parsePost(file, i) {
      const basename = path.basename(file)
      const [, date, slug] = basename.match(/^(\d{4}-\d{2}-\d{2})-([a-z\-]+)\.\w{2,3}$/)
      const {attributes, body} = matter(data[i])
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

  return Promise.resolve(_posts)
}

export async function getPost(file, short) {
  const all = await getPosts()
  const post = { ...all[file] }

  if (post) {
    if (short) {
      delete post.body
    }

    return post
  } else {
    throw {
      status: 404,
      message: 'resource not found'
    }
  }
}
