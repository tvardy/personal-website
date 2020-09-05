import PostsService from '../../../../services/posts'
import { sendJSON } from '../../../../_utils'

export async function get({ params, query, session }, res) {
  const { tag } = params
  const data = await PostsService.findAll({
    ...query,
    filters: [{ by: 'tag', value: tag }],
  })

  if (!session.drafts) {
    data.posts = data.posts.filter(({ draft }) => !draft)
  }

  sendJSON(res, data)
}
