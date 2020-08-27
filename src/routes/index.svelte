<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../_utils'

  export async function preload({ path }, { site }) {
    const { api } = site

    const url = api._root + interpolateString(api.posts, { page: 1 })

    const data = await getDataOrRespondWithError(this, url)

    return { path, site, ...data }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../_utils'

  // components
  import OGTags from '../components/OGTags.svelte'
  import ArchiveList from '../components/ArchiveList.svelte'
  import ArchivePagination from '../components/ArchivePagination.svelte'

  // props
  export let path
  export let site = {}
  export let posts = []
  export let last = true
</script>

<svelte:head>
  <title>{getPageTitle(site)}</title>
  <OGTags {path} {site} />
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination page={1} {last} />
