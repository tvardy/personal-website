<script context="module">
  import { pages, lookup } from './_pages'
  import { paths } from '../_settings'
  import { interpolateString } from '../_utils'

  export async function preload({ params }) {
    const _self = this
    const { slug } = params

    if (lookup.has(slug)) {
      const page = pages.find(page => page.slug === slug)

      const res = await _self.fetch(interpolateString(paths.page.content, {slug}))

      if (res.status === 200) {
        page.content = await res.text()

        return { page }
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
  import Markdown from '../components/Markdown.svelte'

  export let page
</script>

<svelte:head>
  <title>{getPageTitle(page)}</title>
</svelte:head>

<h1>{page.title}</h1>

<Markdown content={page.content} />
