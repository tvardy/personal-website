<script context="module">
  export async function preload({ path }, { site }) {
    const { api } = site
    const res = await this.fetch(api._root + api.pages)
    const pages = await res.json()
    const params = {
      className: path.match('/post/') ? 'post-content' : 'page-content'
    }

    return { site, pages, params }
  }
</script>

<script>
  import PageNav from '../components/page/Nav.svelte'
  import PageMain from '../components/page/Main.svelte'
  import PageFooter from '../components/page/Footer.svelte'

  export let segment
  export let params
  export let site = {}
  export let pages = []
</script>

<style lang="scss" global>
  @import "../sass/main";
</style>

<svelte:head>
  <meta name="description" content="{site.description}">
</svelte:head>

<PageNav {segment} {site} {pages} />

<PageMain {...params} {segment}>
  <slot />
</PageMain>

<PageFooter {site} />
