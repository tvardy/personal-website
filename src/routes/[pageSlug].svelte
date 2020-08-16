<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../_utils'

  export async function preload({ params }, { site }) {
    const { pageSlug } = params
    const { api } = site

    const url = api._root + interpolateString(api.page, { pageSlug })

    const page = await getDataOrRespondWithError(this, url)

    return { site, page }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../_utils'

  // components
  import Page from '../components/Page.svelte'

  // props
  export let site = {}
  export let page = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, page)}</title>
</svelte:head>

<Page {page} />
