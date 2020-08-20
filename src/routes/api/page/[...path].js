import PagesService from '../../../services/pages_service'
import { sendJSON, arrayToURL } from '../../../_utils'

export async function get(req, res) {
  try {
    const { path } = req.params
    const data = PagesService.getPage(arrayToURL(path))
    sendJSON(res, data)
  } catch ({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
