<script context="module">
  import { interpolateString } from '../_utils'

  export async function preload(_, { site }) {
    const _error = this.error
    const { api } = site

    const res = await this.fetch(api._root + interpolateString(api.posts, { page: 1 }))

    if (res.status === 200) {
      const data = await res.json()

      return { site, ...data }
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
  import ArchiveList from '../components/ArchiveList.svelte'
  import ArchivePagination from '../components/ArchivePagination.svelte'

  // props
  export let site = {}
  export let posts = []
  export let last = true
</script>

<svelte:head>
  <title>{getPageTitle(site)}</title>
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination page={1} {last} />
