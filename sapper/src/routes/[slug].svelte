<script context="module">
  import { pages, lookup } from './_pages'
  import { paths } from '../_settings'
  import { interpolateString } from '../_utils'

  export async function preload({ params }) {
    const _self = this
    const { slug } = params

    if (lookup.has(slug)) {
      const res = await _self.fetch(
        interpolateString(paths.page.content, { slug })
      )
      const data = await res.text()

      const page = pages.find(page => page.slug === slug)

      page.content = data

      if (res.status === 200) {
        return { page }
      } else {
        _onError(res, { message: res.statusText })
      }
    } else {
      _onError({ status: 404 }, { message: 'Not found' })
    }

    function _onError(res, data) {
      _self.error(res.status, data.message);
    }
  }
</script>

<script>
  import { getPageTitle } from '../_utils'

  export let page
</script>

<svelte:head>
  <title>{getPageTitle(page)}</title>
</svelte:head>

<pre>{page.content}</pre>
