import { getPost } from '../_posts'
import { sendJSON } from '../../../_utils'

export async function get(req, res) {
  const { file } = req.params
  const short = req.query.short !== undefined
  console.log(req.query.short, short)
  try {
    const data = await getPost(file, short)
    sendJSON(res, data)
  } catch({ status, message }) {
    sendJSON(res, { message }, status)
  }
}
