import UnsplashService from '../../../services/unsplash'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  try {
    const photo = await UnsplashService.get(req.params.id)
    sendJSON(res, photo)
  } catch (err) {
    sendJSON(res, { message: err.message }, err.status)
  }
}
