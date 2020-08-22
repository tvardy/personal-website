export const site = {
  title: 'page name',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://example.com',
  author: 'tvardy',
  lang: 'en',
  timezone: 'UTC',
  excerpt_separator: '<!-- more -->',
  google_analytics: 'UA-125050706-1',
  posts: {
    limit: 3,
  },
  nav: ['about', 'resume', 'projects'],
  api: {
    _root: 'api',
    pages: '/pages',
    page: '/pages/{{pageSlug}}',
    posts: '/posts?page={{page}}',
    post: '/posts/{{postSlug}}',
    tag: '/posts/tag/{{tag}}?page={{page}}',
  },
}

export const paths = {
  data: './data',
  pages: ['/pages/**/*.md'],
  posts: ['/posts/**/*.md'],
}

export const errors = {
  404: {
    short: 'Page not found :(',
    long: 'The requested page could not be found.',
  },
}
