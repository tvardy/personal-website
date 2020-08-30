import PagesService from '../../../services/pages'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  sendJSON(res, PagesService.navData)
}
