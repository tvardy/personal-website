const path = require('path')
const config = path.join(__dirname, '.env.production')

require('dotenv').config({ path: config })
require('./__sapper__/build')
