import APIService from './_api_service'
import { trimInner, memoize } from '../_utils'

require('dotenv').config()

const baseUrl = 'https://api.unsplash.com'
const utm = '?utm_source=personal-website&utm_medium=referral'

class UnsplashService {
  constructor() {
    this.api = new APIService(baseUrl)
    this.api.headers = {
      'Accept-Version': 'v1',
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    }
    this.api.options = {
      ...this.api.options,
      responseType: 'json',
    }
    this.get = memoize(this.get.bind(this))
  }

  async get(id) {
    const { body: data } = await this.api.get(`photos/${id}`)

    return {
      ...data,
      urls: {
        base: data.urls.raw.replace(/\?.+/, ''),
      },
      attribution: trimInner(
        `
        Photo by
        <a href="${data.user.links.self}${utm}">${data.user.name}</a>
        on
        <a href="https://unsplash.com/${utm}">Unsplash</a>
      `.trim()
      ),
    }
  }
}

export default new UnsplashService()
