import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

import PagesService from './pages'
import PostsService from './posts'
import { site } from '../_settings'
import { getPermalink } from '../_utils'

class SitemapService {
  async preCache() {
    console.time('sitemap.preCache')

    const links = [
      ...PagesService.navData.map(({ href }) => ({ url: href })),
      ...PostsService._all().posts.map(({ date, slug }) => ({
        url: `/${getPermalink({ date, slug })}`,
      })),
    ]

    const stream = new SitemapStream({ hostname: site.url })
    const buffer = await streamToPromise(Readable.from(links).pipe(stream))

    this._sitemap = buffer.toString()

    console.timeEnd('sitemap.preCache')
  }

  get() {
    return this._sitemap
  }
}

export default new SitemapService()
