import UnsplashService from '../../../services/unsplash_service'

import { getPost } from '../../../services/posts_service'
import { sendJSON } from '../../../_utils'

const utm = '?utm_source=personal-website&utm_medium=referral'

export async function get(req, res) {
  const { postSlug } = req.params
  const short = req.query.short !== undefined

  try {
    const data = await getPost(postSlug, short)

    if (data.image) {
      try {
        const r = await UnsplashService.get(data.image.id)
        const photo = JSON.parse(r.body)

        data.image['url'] = photo.urls.full.replace(/\?.+/, '')
        data.image['attribution'] = `Photo by
        <a href="${photo.user.links.self}${utm}">${photo.user.name}</a>
        on
        <a href="https://unsplash.com/${utm}">Unsplash</a>`
      } catch (err) {
        console.error('!!!', err)
      }
    }

    sendJSON(res, data)
  } catch ({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
