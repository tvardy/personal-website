import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

import matter from 'front-matter'
import pify from 'pify'

import { paths, site } from '../../_settings'
import { reduceToObjByKey } from '../../_utils'

const readFile = pify(fs.readFile)

let _pages;
let _navData;

export async function getPages() {
  if (!_pages) {
    const files = await fg(paths.static + paths.pages)
    const data = await Promise.all(
      files.map(file => readFile(path.resolve(file), 'utf8'))
    )

    _pages = data
      .map(str => matter(str))
      .reduce(reduceToObjByKey('attributes.slug'), {})

    return _pages
  }

  return Promise.resolve(_pages)
}

export async function getNavData() {
  if(!_navData) {
    const all =  await getPages()

    _navData = site.nav.map(slug => all[slug].attributes)

    return _navData
  }

  return Promise.resolve(_navData)
}

export async function getPage(slug) {
  const all = await getPages()
  const page = all[slug]

  if (page) {
    return {
      title: page.attributes.title,
      content: page.body
    }
  } else {
    throw {
      status: 404,
      message: 'resource not found'
    }
  }
}
