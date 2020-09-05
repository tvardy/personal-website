import PostsService from '../../../services/posts'
import { sendJSON } from '../../../_utils'

export async function get({ query, session }, res) {
  const data = await PostsService.findAll({ ...query })

  if (!session.drafts) {
    data.posts = data.posts.filter(({ draft }) => !draft)
  }

  sendJSON(res, data)
}
