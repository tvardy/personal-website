import APIService from './api_service'
import { memoize } from '../_utils'

require('dotenv').config()

class UnsplashService {
  constructor() {
    this.api = new APIService('https://api.unsplash.com')
    this.api.headers = {
      'Accept-Version': 'v1',
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    }
    this.get = memoize(this.get.bind(this))
  }

  async get(id) {
    return this.api.get(`photos/${id}`)
  }
}

export default new UnsplashService()
