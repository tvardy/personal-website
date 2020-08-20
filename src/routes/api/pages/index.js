import PagesService from '../../../services/pages_service'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  sendJSON(res, PagesService.navData)
}
