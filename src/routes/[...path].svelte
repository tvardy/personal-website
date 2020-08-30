<script context="module">
  import { interpolateString, getDataOrRespondWithError, arrayToURL } from '../_utils'

  export async function preload({ params }, { site }) {
    const { path } = params
    const { api } = site

    const pageSlug = arrayToURL(path)

    const url = api._root + interpolateString(api.page, { pageSlug })

    const page = await getDataOrRespondWithError(this, url)

    return { path, site, page }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../_utils'

  // components
  import OGTags from '../components/OGTags.svelte'
  import Page from '../components/Page.svelte'

  // props
  export let path
  export let site = {}
  export let page = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, page)}</title>
  <OGTags {path} {site} {page} />
</svelte:head>

<Page {page} />
