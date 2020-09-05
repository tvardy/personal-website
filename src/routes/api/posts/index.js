import PostsService from '../../../services/posts'
import { sendJSON } from '../../../_utils'

export async function get({ query, session }, res) {
  const options = { ...query }

  if (!session.drafts) {
    options.filters = [{ by: 'draft' }]
  }

  const data = await PostsService.findAll(options)

  sendJSON(res, data)
}
