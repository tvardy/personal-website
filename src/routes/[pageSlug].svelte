<script context="module">
  import { interpolateString } from '../_utils'

  export async function preload({ params }, { site }) {
    const _error = this.error
    const { pageSlug } = params
    const { api } = site

    const res = await this.fetch(api._root + interpolateString(api.page, { pageSlug }))

    if (res.status === 200) {
      const page = await res.json()

      return { site, page }
    } else {
      _onError(res, { message: res.statusText || res.message })
    }

    function _onError({ status }, { message }) {
      _error(status, message)
    }
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
