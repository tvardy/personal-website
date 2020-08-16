import { getPage } from '../_pages'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  try {
    const { pageSlug } = req.params
    const data = await getPage(pageSlug)
    sendJSON(res, data)
  } catch ({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
