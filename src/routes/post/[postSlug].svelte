<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../../_utils'

  export async function preload({ path, params }, { api, site }) {
    const { postSlug } = params

    const url = api._root + interpolateString(api.post, { postSlug })

    const post = await getDataOrRespondWithError(this, url)

    return { path, site, post }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../../_utils'

  // components
  import OGTags from '../../components/OGTags.svelte'
  import Post from '../../components/Post.svelte'

  // props
  export let path
  export let site = {}
  export let post = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, post)}</title>
  <OGTags {path} {site} {post} />
</svelte:head>

<Post {post} />
