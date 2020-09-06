import { sendXML } from '../_utils'

export async function get(_, res) {
  sendXML(res, '<ok/>')
}
