import PageService from '../services/pages'

import { site } from '../_settings'

const { NODE_ENV } = process.env
const nl = '\r\n'

export async function get(_, res) {
  let result = ''

  if (NODE_ENV !== 'production') {
    result += 'Disallow: /'
  } else {
    PageService.unlinked.forEach((slug) => {
      result += `Disallow: /${slug}` + nl
    })
  }

  result += nl + nl
  result += `Sitemap: ${site.url}/sitemap.xml`

  res.end(result)
}
