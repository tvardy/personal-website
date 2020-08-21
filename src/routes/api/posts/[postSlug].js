import UnsplashService from '../../../services/unsplash_service'
import PostsService from '../../../services/posts_service'

import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const { postSlug } = req.params
  const short = req.query.short !== undefined

  try {
    const data = await PostsService.getPost(postSlug, short)

    if (data.image) {
      try {
        const photo = await UnsplashService.get(data.image.id)

        data.image.url = photo.urls.base
        data.image.attribution = photo.attribution
        console.log('attribution length', photo.attribution.length)
      } catch (err) {
        throw err
      }
    }

    sendJSON(res, data)
  } catch ({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
