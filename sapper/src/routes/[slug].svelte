<script context="module">
  import { interpolateString } from '../_utils'

  export async function preload({ params }, { site }) {
    const _self = this
    const { slug } = params
    const { api } = site

    if (site.nav.includes(slug)) {
      const res = await this.fetch(api._root + interpolateString(api.page, { slug }))

      if (res.status === 200) {
        const page = await res.json()

        return { site, page }
      } else {
        _onError(res, { message: res.statusText })
      }
    } else {
      _onError({ status: 404 }, { message: 'Not found' })
    }

    function _onError({ status }, { message }) {
      _self.error(status, message)
    }
  }
</script>

<script>
  import { getPageTitle } from '../_utils'
  import Page from '../components/Page.svelte'

  export let site = {}
  export let page = {}
</script>

<svelte:head>
  <title>{getPageTitle(site, page)}</title>
</svelte:head>

<Page {page} />
