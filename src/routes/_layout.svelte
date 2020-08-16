<script context="module">
  import { getDataOrRespondWithError } from '../_utils'

  export async function preload({ path }, { site }) {
    const { api } = site
    const url = api._root + api.pages

    const params = {
      className: path.match('/post/') ? 'post-content' : 'page-content',
    }

    const pages = await getDataOrRespondWithError(this, url)

    return { site, pages, params }
  }
</script>

<script>
  // components
  import PageNav from '../components/page/Nav.svelte'
  import PageMain from '../components/page/Main.svelte'
  import PageFooter from '../components/page/Footer.svelte'

  // props
  export let segment
  export let params = {}
  export let site = {}
  export let pages = []
</script>

<style lang="scss" global>
  @import '../sass/main';
</style>

<svelte:head>
  <meta name="description" content={site.description} />
</svelte:head>

<PageNav {segment} {site} {pages} />

<PageMain {...params} {segment}>
  <slot />
</PageMain>

<PageFooter {site} />
