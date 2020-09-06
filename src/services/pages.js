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
        const { attributes, body } = matter(str)

        if (/\/_/.test(files[i])) {
          attributes.draft = true
        }

        return {
          ...attributes,
          body,
        }
      })
      .reduce(reduceToObjByKey('slug'), {})

    this._navData = nav.map((slug) => {
      const page = Object.assign({}, this._pages[slug])

      delete page.body

      return page
    })

    console.timeEnd('pages.preCache')
    console.debug(`${Object.keys(this._pages).length} pages found`)
  }

  getPage(slug) {
    const page = this._pages[slug]

    if (page) {
      return page
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

  get unlinked() {
    return Object.keys(this._pages).filter((slug) => this._pages[slug].draft)
  }
}

export default new PostsService()
