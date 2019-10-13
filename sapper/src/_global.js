export const site = {
  title: 'tvardy.blog',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://tvardy.blog',
  author: 'tvardy',
  lang: 'en',
  timezone: 'UTC',
  excerpt_separator: '<!-- more -->',
  in_text_separator: '<span class="in_text_separator">•</span>',
  google_analytics: 'UA-125050706-1'
}

export const pages = [
  {
    name: 'about',
    href: '/about'
  },
  {
    name: 'resume',
    href: '/resume'
  },
  {
    name: 'projects',
    href: '/projects'
  }
]

export function _getPageTitle(page = {}) {
  return `${page.title ? `${page.title} | ` : ''}${site.title}`
}
