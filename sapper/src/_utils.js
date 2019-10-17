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

export function sendJSON(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
