import './_dotenv.config'
import polka from 'polka'

import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session'
import sirv from 'sirv'
import * as sapper from '@sapper/server'

import { site, api } from './_settings'

import PagesService from './services/pages'
import PostsService from './services/posts'
import SitemapService from './services/sitemap'
;(async () => {
  await PagesService.preCache()
  await PostsService.preCache()
  await SitemapService.preCache()
})()

const { PORT, NODE_ENV, SESSION_SECRET } = process.env
const dev = NODE_ENV === 'development'
const _next = (_, __, next) => {
  next()
}

// TODO (v2): think of having a redirects file

const { server } = polka()
  .use(
    // gzip compression
    compression({ threshold: 0 }),

    // session handling
    /*
      FIXME:
        Warning: connect.session() MemoryStore is not
        designed for a production environment, as it will leak
        memory, and will not scale past a single process.
    */
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: !dev,
      },
    }),

    // handling drafts
    (req, _, next) => {
      if (SESSION_SECRET in req.query) {
        req.session.drafts = !req.session.drafts
      }
      next()
    },

    // security rules (for non-dev env only!)
    dev
      ? _next
      : helmet({
          contentSecurityPolicy: false,
        }),

    // a request logger
    morgan(dev ? 'dev' : 'common'),

    // handling static files
    sirv('public', { dev }),

    // the main reason we're using the backend - SSR
    sapper.middleware({
      session: (req) => ({
        drafts: req.session.drafts,
        site,
        api,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.error('error', err)
  })

console.info('ready at:', server.address())
