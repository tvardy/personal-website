import UnsplashService from '../../../services/unsplash'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  try {
    const r = await UnsplashService.get(req.params.id)
    const photo = JSON.parse(r.body)
    sendJSON(res, photo)
  } catch (err) {
    sendJSON(res, { message: err.message }, err.status)
  }
}
