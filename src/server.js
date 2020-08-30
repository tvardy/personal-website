import polka from 'polka'

import compression from 'compression'
import helmet from 'helmet'
import sirv from 'sirv'
import * as sapper from '@sapper/server'

import { site } from './_settings'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const _next = (_, __, next) => {
  next()
}

// TODO (v2): think of having a redirects file

polka()
  .use(
    compression({ threshold: 0 }),
    dev ? _next : helmet(),
    dev ? sirv('public', { dev }) : _next,
    sapper.middleware({
      session: () => ({
        site,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.error('error', err)
  })
