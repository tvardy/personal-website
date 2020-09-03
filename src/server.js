import './_dotenv.config'
import polka from 'polka'

import compression from 'compression'
import helmet from 'helmet'
import sirv from 'sirv'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const _next = (_, __, next) => {
  next()
}

import { site, api } from './_settings'

// TODO: build -> remove all comments from client JS files
// TODO: use winston as an in/out logger
// TODO: minify SSR HTML
// TODO (v2): think of having a redirects file

polka()
  .use(
    compression({ threshold: 0 }),
    dev
      ? _next
      : helmet({
          contentSecurityPolicy: false,
        }),
    sirv('public', { dev }),
    sapper.middleware({
      session: () => ({
        site,
        api,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.error('error', err)
  })
