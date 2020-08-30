import got from 'got'

export default class APIService {
  constructor(url) {
    this.headers = null
    this.options = {
      prefixUrl: url,
      retry: 0,
    }
  }

  get(url, errMsg) {
    const _options = Object.assign(
      {},
      !!this.headers ? { headers: this.headers } : {},
      this.options
    )

    return got(url, _options).catch((err) => _onError(err, errMsg))
  }

  post() {}

  put() {}

  delete() {}
}

function _onError(err, message = '') {
  return Promise.reject(message || err.message)
}
