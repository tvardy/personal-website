export const site = {
  title: 'page name',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://example.com',
  author: {
    name: 'tvardy',
    link: 'https://github.com/tvardy',
  },
  lang: 'en',
  excerpt_separator: '<!-- more -->',
  posts: {
    limit: 3,
  },
}

export const nav = ['about', 'resume', 'projects']

export const api = {
  _root: 'api',
  pages: '/pages',
  page: '/pages/{{pageSlug}}',
  posts: '/posts?page={{page}}',
  post: '/posts/{{postSlug}}',
  tag: '/posts/tag/{{tag}}?page={{page}}',
}

// TODO (v2): find a way to convert this into `collections` models config
export const paths = {
  data: './data',
  pages: ['/pages/**/*.md'],
  posts: ['/posts/**/*.md'],
}
