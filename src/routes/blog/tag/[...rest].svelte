<script context="module">
  import { interpolateString, getDataOrRespondWithError } from '../../../_utils'

  export async function preload({ params }, { api, site }) {
    const { rest } = params
    let [tag, page] = rest
    page = parseInt(page) || 1

    const url = api._root + interpolateString(api.tag, { tag, page })

    const data = await getDataOrRespondWithError(this, url)

    return { site, tag, ...data, page }
  }
</script>

<script>
  // utils
  import { getPageTitle } from '../../../_utils'

  // components
  import ArchiveList from '../../../components/ArchiveList.svelte'
  import ArchivePagination from '../../../components/ArchivePagination.svelte'

  // props
  export let site
  export let tag
  export let posts
  export let last
  export let page
</script>

<svelte:head>
  <title>
    {getPageTitle(site, { title: `blog archive | tag: ${tag} | page ${page}` })}
  </title>
  <link
    rel="canonical"
    href="{site.url}/blog/tag/{tag}{page === 1 ? '' : `/${page}`}"
  />
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination {page} {last} addition="tag/{tag}" />
