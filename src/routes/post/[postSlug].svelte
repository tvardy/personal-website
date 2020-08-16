<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../../_utils'

  export async function preload({ params }, { site }) {
    const { postSlug } = params
    const { api } = site

    const url = api._root + interpolateString(api.post, { postSlug })

    const post = await getDataOrRespondWithError(this, url)

    return { site, post }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../../_utils'

  // components
  import Post from '../../components/Post.svelte'

  // props
  export let site = {}
  export let post = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, post)}</title>
</svelte:head>

<Post {post} />
