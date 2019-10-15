import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../../_settings'
import { interpolateString } from '../../_utils'

const readFile = pify(fs.readFile)

let _pages;

export async function getPages() {
  if (!_pages) {
    return await Promise.all(
      // TODO: get all pages + separate function for nav pages
      site.nav.map(slug => {
        const filePath = interpolateString(paths.page, { slug })
        const fullPath = path.resolve(paths.static + filePath)

        return readFile(fullPath, 'utf8')
      })
    ).then(data => {
      _pages = data.map(str => matter(str))

      return _pages
    })
  }

  return Promise.resolve(_pages)
}

export async function getPagesData() {
  const data =  await getPages()

  return data.map(page => page.attributes)
}

export async function getPage(slug) {
  const data = await getPages()
  const page = data.find(page => page.attributes.slug === slug)

  if (page) {
    return {
      title: page.attributes.title,
      content: page.body
    }
  } else {
    // TODO: handle error
  }
}
