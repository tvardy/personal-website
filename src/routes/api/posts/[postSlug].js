import UnsplashService from '../../../services/unsplash'
import PostsService from '../../../services/posts'

import { sendJSON } from '../../../_utils'

export async function get({ query, params, session }, res) {
  const { postSlug } = params
  const short = query.short !== undefined

  let data

  try {
    data = await PostsService.findOne(postSlug, short)

    if (!session.drafts && data.draft) {
      throw {
        status: 403,
        message: 'Access forbidden',
      }
    }
  } catch ({ status, message }) {
    sendJSON(res, { message }, status)
    return
  }

  if (data.image) {
    try {
      const photo = await UnsplashService.get(data.image.id)

      data.image.url = photo.urls.base
      data.image.attribution = photo.attribution
    } catch (err) {
      console.error(data.image.source, data.image.id, err)
    }
  }

  sendJSON(res, data)
}
