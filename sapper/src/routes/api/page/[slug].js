import { getPage } from '../_pages'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const data = await getPage(req.params.slug)

  // TODO: handle error

  sendJSON(res, data)
}
