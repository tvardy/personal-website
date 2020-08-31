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

console.log('__ [LOG] env:', NODE_ENV)
console.error('__ [ERR] env:', NODE_ENV)
console.log('__ [LOG] api:', api._root)
console.error('__ [ERR] api:', api._root)

// TODO (v2): think of having a redirects file

polka()
  .use(
    compression({ threshold: 0 }),
    dev ? _next : helmet(),
    dev ? sirv('public', { dev }) : _next,
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
