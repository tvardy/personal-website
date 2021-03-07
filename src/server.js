import './_dotenv.config'
import polka from 'polka'

import compression from 'compression'
import helmet from 'helmet'
import memoryStore from 'memorystore'
import morgan from 'morgan'
import session from 'express-session'
import sirv from 'sirv'
import { middleware as sapperMiddleware } from '@sapper/server'

import { site, api } from './_settings'

import './services'
import { _isDev } from './_utils' // run services pre-cache

const { PORT, NODE_ENV, SESSION_SECRET } = process.env
const dev = NODE_ENV === 'development'
const _next = (_, __, next) => {
  next()
}

const MemoryStore = memoryStore(session)

// TODO (v2): think of having a redirects file

const { server } = polka()
  .use(
    // gzip compression
    compression({ threshold: 0 }),

    // session handling
    session({
      secret: SESSION_SECRET,
      resave: false,
      store: new MemoryStore({
        checkPeriod: 43200000, // prune expired entries every 12h
        max: 255, // max entries
      }),
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
    sapperMiddleware({
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

console.info('ready at:', server.address().port, _isDev() ? '[DEV Mode active!]' : '')
