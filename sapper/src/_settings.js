export const site = {
  title: 'tvardy.blog',
  description: `A developers' website to share some thoughts, ideas, code, an official resume etc.`,
  url: 'https://tvardy.blog',
  author: 'tvardy',
  lang: 'en',
  timezone: 'UTC',
  excerpt_separator: '<!-- more -->',
  in_text_separator: '<span class="in_text_separator">•</span>',
  google_analytics: 'UA-125050706-1',
  nav: [
    'about',
    'resume',
    'projects'
  ]
}

export const paths = {
  page: {
    all: 'pages',
    content: '_pages/{{slug}}.md',
  },
  post: {
    content: 'posts/{{slug}}.md',
  },
}

export const errors = {
  404: {
    short: 'Page not found :(',
    long: 'The requested page could not be found.'
  },
}
