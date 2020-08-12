<script context="module">
  import { interpolateString } from '../_utils'

  export async function preload(_, { site }) {
    const _self = this
    const { api } = site

    const res = await this.fetch(api._root + interpolateString(api.posts, { page: 1 }))

    if (res.status === 200) {
      const data = await res.json()

      return { site, ...data }
    } else {
      _onError(res, { message: res.statusText || res.message })
    }

    function _onError({ status }, { message }) {
      _self.error(status, message)
    }
  }
</script>

<script>
  import {getPageTitle} from '../_utils'

  import ArchiveList from "../components/ArchiveList.svelte";
  import ArchivePagination from '../components/ArchivePagination.svelte'

  export let site
  export let posts
  export let last
</script>

<svelte:head>
  <title>{getPageTitle(site)}</title>
</svelte:head>

<ArchiveList {posts} />

<ArchivePagination page={1} {last} />
