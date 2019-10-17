import { getNavData } from './_pages'
import { sendJSON } from '../../_utils'

export async function get(req, res) {
  const data = await getNavData()

  // TODO: handle error

  sendJSON(res, data)
}
