import got from 'got'

export default class APIService {
  constructor (url) {
    this.options = {
      prefixUrl: url,
      retry: 0
    }
  }

  get (url, errMsg) {
    return got(url, Object.assign({}, this.options, { headers: this.headers })).catch(err => _onError(err, errMsg))
  }

  post () {}

  put () {}

  delete (url) {
  }
}

function _onError (err, message = '') {
  return Promise.reject(message || err.message)
}
