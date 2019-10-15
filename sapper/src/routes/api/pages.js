import { getPagesData } from './_actions'

export async function get(req, res) {
  const data = await getPagesData()

  // TODO: handle error

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
