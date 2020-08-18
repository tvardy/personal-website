import path from 'path'
import fast_memoize from 'fast-memoize'

export function getPageTitle(site, page = {}) {
  return `${page.title ? `${page.title} | ` : ''}${site.title}`
}

export function interpolateString(str, data) {
  return Object.keys(data).reduce(
    (result, key) => result.replace(`{{${key}}}`, data[key]),
    str
  )
}

export function reduceToObjByKey(key) {
  return (result, item) => {
    const theKey = _deepGetKey(item, key)

    result[theKey] = item

    return result
  }

  function _deepGetKey(obj, key) {
    if (/\./.test(key)) {
      return key.split('.').reduce((src, subkey) => src[subkey], obj)
    }
    return obj[key]
  }
}

export function sendJSON(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  })

  res.end(JSON.stringify(data))
}

export function getPermalink({ date, slug }) {
  return `post/${date}-${slug}`
}

export function arrayToURL(all) {
  return encodeURI(path.join(...all))
}

export async function getDataOrRespondWithError(context, url) {
  const _error = context.error

  const res = await context.fetch(url)

  if (res.status === 200) {
    return res.json()
  } else {
    _onError(res, { message: res.statusText || res.message })
  }

  function _onError({ status }, { message }) {
    _error(status, message)
  }
}

export const memoize = fast_memoize
