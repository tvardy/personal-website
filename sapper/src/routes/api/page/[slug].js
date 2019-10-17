import { getPage } from '../_pages'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  try {
    const data = await getPage(req.params.slug)
    sendJSON(res, data)
  } catch({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
