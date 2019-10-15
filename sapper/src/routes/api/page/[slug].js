import { getPage } from '../_actions'

export async function get(req, res) {
  const data = await getPage(req.params.slug)

  // TODO: handle error

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
