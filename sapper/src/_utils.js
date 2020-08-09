import fast_memoize from 'fast-memoize'

export function getPageTitle(site, page = {}) {
  return `${page.title ? `${page.title} | ` : ''}${site.title}`
}

export function interpolateString(str, data) {
  return Object.keys(data)
    .reduce(
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
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}

export const memoize = fast_memoize
