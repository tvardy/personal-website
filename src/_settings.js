export const site = {
  title: 'ooga blo.ga',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://ooga-blo.ga',
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

const { NODE_ENV } = process.env
const apiPath = []

if (NODE_ENV === 'production') {
  apiPath.push(site.url)
}

apiPath.push('api')

export const api = {
  _root: apiPath.join('/'),
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
