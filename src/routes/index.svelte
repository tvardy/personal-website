<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../_utils'

  export async function preload(_, { site }) {
    const { api } = site

    const url = api._root + interpolateString(api.posts, { page: 1 })

    const data = await getDataOrRespondWithError(this, url)

    return { site, ...data }
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
