export const site = {
  title: 'page name',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://example.com',
  author: 'tvardy',
  lang: 'en',
  timezone: 'UTC',
  excerpt_separator: '<!-- more -->',
  in_text_separator: '<span class="in_text_separator">•</span>',
  google_analytics: 'UA-125050706-1',
  posts: {
    limit: 3
  },
  nav: [
    'about',
    'resume',
    'projects'
  ],
  api: {
    _root: 'api',
    pages: '/pages',
    page: '/page/{{slug}}',
    posts: '/posts?page={{page}}',
    post: '/post/{{file}}',
  }
}

export const paths = {
  static: './static',
  pages: [ '/_pages/**/*.md' ],
  posts: [ '/_posts/**/*.md' ],
}

export const errors = {
  404: {
    short: 'Page not found :(',
    long: 'The requested page could not be found.'
  },
}
