import APIService from "./api_service"

require('dotenv').config()

class UnsplashService {
  constructor() {
    this.api = new APIService('https://api.unsplash.com')
    this.api.headers = {
      'Accept-Version': 'v1',
      'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }

  async get(id) {
    return await this.api.get(`photos/${id}`)
  }
}

export default new UnsplashService()
