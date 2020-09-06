import fastglob from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, nav } from '../_settings'
import { reduceToObjByKey } from '../_utils'

const readFile = pify(fs.readFile)

class PostsService {
  async preCache() {
    console.time('pages.preCache')
    const files = await fastglob(paths.data + paths.pages)
    const data = await Promise.all(
      files.map((file) => readFile(path.resolve(file), 'utf8'))
    )

    this._pages = data
      .map((str, i) => {
        const page = matter(str)

        if (/\/_/.test(files[i])) {
          page.attributes.draft = true
        }

        delete page.bodyBegin
        delete page.frontmatter

        return page
      })
      .reduce(reduceToObjByKey('attributes.slug'), {})

    this._navData = nav.map((slug) => this._pages[slug].attributes)
    console.timeEnd('pages.preCache')
    console.debug(`${Object.keys(this._pages).length} pages found`)
  }

  getPage(slug) {
    const page = this._pages[slug]

    if (page) {
      return {
        ...page.attributes,
        body: page.body,
      }
    } else {
      throw {
        status: 404,
        message: 'resource not found',
      }
    }
  }

  get navData() {
    return this._navData
  }
}

const instance = new PostsService()

instance.preCache()

export default instance
