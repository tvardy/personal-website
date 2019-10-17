import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths } from '../../_settings'

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
      .map((file, i) => {
        const basename = path.basename(file)
        const [ , date, slug ] = basename.match(/^(\d{4}-\d{2}-\d{2})-([a-z\-]+)\.\w{2,3}$/)
        const { attributes, body } = matter(data[i])

        return {
          file: basename.replace(`${path.extname(file)}`, ''),
          date,
          slug,
          ...attributes,
          body
        }
      })
      .reduce((obj, post) => {
        obj[post.file] = post
        return obj
      }, {})

    return _posts
  }

  return Promise.resolve(_posts)
}
