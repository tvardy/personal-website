<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../../_utils'

  export async function preload({ params }, { site }) {
    const { api } = site
    const page = parseInt(params.page)

    const url = api._root + interpolateString(api.posts, { page })

    const data = await getDataOrRespondWithError(this, url)

    return { site, ...data, page }
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
  <title>
    {getPageTitle(site, { title: `blog archive | tag: {tag} | page ${page}` })}
  </title>
  <link rel="canonical" href="{site.url}/{page === 1 ? '' : `blog/tag/${page}`}" />
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination {page} {last} />
