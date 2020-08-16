import compression from 'compression'
import polka from 'polka'
import * as sapper from '@sapper/server'
import sirv from 'sirv'

import { site } from './_settings'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        site,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err)
  })
