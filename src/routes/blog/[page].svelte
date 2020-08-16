<script context="module">
  import { interpolateString } from '../../_utils'

  export async function preload({ params }, { site }) {
    const _error = this.error
    const { api } = site
    let { page } = params

    page = parseInt(page)

    const res = await this.fetch(api._root + interpolateString(api.posts, { page }))

    if (res.status === 200) {
      const data = await res.json()

      return { site, ...data, page }
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
  import { getPageTitle } from '../../_utils'

  // components
  import ArchiveList from '../../components/ArchiveList.svelte'
  import ArchivePagination from '../../components/ArchivePagination.svelte'

  // props
  export let site
  export let posts
  export let last
  export let page
</script>

<svelte:head>
  <title>{getPageTitle(site, { title: `blog archive | page ${page}` })}</title>
  <link rel="canonical" href="{site.url}/{page === 1 ? '' : `blog/${page}`}" />
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination {page} {last} />
