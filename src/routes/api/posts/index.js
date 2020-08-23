import PostsService from '../../../services/posts'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const data = await PostsService.findAll({ ...req.query })
  sendJSON(res, data)
}
