import PagesService from './pages'
import PostsService from './posts'
import SitemapService from './sitemap'
;(async () => {
  await PagesService.preCache()
  await PostsService.preCache()
  await SitemapService.preCache()
})()
