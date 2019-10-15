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
