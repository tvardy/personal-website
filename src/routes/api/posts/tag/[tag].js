import PostsService from '../../../../services/posts'
import { sendJSON } from '../../../../_utils'

export async function get({ params, query }, res) {
  const { tag } = params
  const data = await PostsService.findAll({
    ...query,
    filters: [{ by: 'tag', value: tag }],
  })
  sendJSON(res, data)
}
