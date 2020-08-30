export const site = {
  title: 'page name',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://example.com',
  // TODO: allow handling both versions (string || object) of `author` field
  author: {
    name: 'tvardy',
    link: 'https://github.com/tvardy',
  },
  lang: 'en',
  excerpt_separator: '<!-- more -->',
  posts: {
    limit: 3,
  },
  // TODO: move to separate place
  nav: ['about', 'resume', 'projects'],
  // TODO: extract `api` from `site` and serve separately
  api: {
    _root: 'api',
    pages: '/pages',
    page: '/pages/{{pageSlug}}',
    posts: '/posts?page={{page}}',
    post: '/posts/{{postSlug}}',
    tag: '/posts/tag/{{tag}}?page={{page}}',
  },
}

// TODO (v2): find a way to convert this into `collections` models config
export const paths = {
  data: './data',
  pages: ['/pages/**/*.md'],
  posts: ['/posts/**/*.md'],
}

// TODO: extract to a separate file
export const errors = {
  404: {
    short: 'Page not found :(',
    long: 'The requested page could not be found.',
  },
}
