import SitemapService from '../services/sitemap'

import { sendXML } from '../_utils'

export async function get(_, res) {
  sendXML(res, SitemapService.get())
}
