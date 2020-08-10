import { getPosts } from '../_posts'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const data = await getPosts({...req.query})
  sendJSON(res, data)
}
