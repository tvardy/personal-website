import { getNavData } from '../../../services/pages_service'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const data = await getNavData()
  sendJSON(res, data)
}
