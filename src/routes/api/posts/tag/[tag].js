import PostsService from '../../../../services/posts'
import { sendJSON } from '../../../../_utils'

export async function get({ params, query, session }, res) {
  const { tag } = params
  const options = {
    ...query,
    filters: [{ by: 'tag', value: tag }],
  }

  if (!session.drafts) {
    options.filters.push({ by: 'draft' })
  }

  const data = await PostsService.findAll(options)

  sendJSON(res, data)
}
