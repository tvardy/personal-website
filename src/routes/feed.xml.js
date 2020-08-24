import md from 'marked'
import removeMd from 'remove-markdown'
import aguid from 'aguid'
import { Feed } from 'feed'

import { site } from '../_settings'

import PostsService from '../services/posts'

import { getPermalink, sendXML } from '../_utils'

export async function get(req, res) {
  const { posts } = await PostsService.findAll({ limit: 20 })
  const baseUrl = site.url.replace(/^https?:\/\//, '')
  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: `${site.url}/`,
    link: site.url,
    author: { ...site.author },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title || '[no title]',
      link: `${site.url}/${getPermalink(post)}`,
      id: `tag:${baseUrl},${post.date}:` + aguid(`${baseUrl}/${getPermalink(post)}`),
      date: new Date(post.date),
      description: removeMd(post.excerpt),
      content: md(post.excerpt),
      author: [{ ...site.author }],
      category: post.tags.map((tag) => ({
        name: 'tag',
        term: tag,
      })),
    })
  })

  sendXML(res, feed.atom1())
}
