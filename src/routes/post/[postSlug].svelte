<script context="module">
  import { interpolateString } from '../../_utils'

  export async function preload({ params }, { site }) {
    const _self = this
    const { postSlug } = params
    const { api } = site

    const res = await this.fetch(api._root + interpolateString(api.post, { postSlug }))

    if (res.status === 200) {
      const post = await res.json()

      return { site, post }
    } else {
      _onError(res, { message: res.statusText })
    }

    function _onError({ status }, { message }) {
      _self.error(status, message)
    }
  }
</script>

<script>
  import {getPageTitle} from '../../_utils'
  import Post from "../../components/Post.svelte";

  export let site
  export let post = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, post)}</title>
</svelte:head>

<Post {post} />
