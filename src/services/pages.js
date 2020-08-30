import fastglob from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../_settings'
import { reduceToObjByKey } from '../_utils'

const readFile = pify(fs.readFile)

// TODO: allow showing drafts

class PostsService {
  async preCache() {
    const files = await fastglob(paths.data + paths.pages)
    const data = await Promise.all(
      files.map((file) => readFile(path.resolve(file), 'utf8'))
    )

    this._pages = data
      .map((str) => matter(str))
      .reduce(reduceToObjByKey('attributes.slug'), {})

    this._navData = site.nav.map((slug) => this._pages[slug].attributes)
  }

  getPage(slug) {
    const page = this._pages[slug]

    if (page) {
      return {
        title: page.attributes.title,
        content: page.body,
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
