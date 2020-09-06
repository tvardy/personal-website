<script context="module">
  import { getDataOrRespondWithError } from '../_utils'

  export async function preload({ path }, { api, site, drafts }) {
    const url = api._root + api.pages

    const params = {
      className: path.match('/post/') ? 'post-content' : 'page-content',
    }

    const pages = await getDataOrRespondWithError(this, url)

    return { site, pages, params, drafts }
  }
</script>

<script>
  // components
  import PageNav from '../components/_layout/Nav.svelte'
  import PageMain from '../components/_layout/Main.svelte'
  import PageFooter from '../components/_layout/Footer.svelte'

  // props
  export let segment
  export let drafts
  export let params = {}
  export let site = {}
  export let pages = []
</script>

<style lang="scss" global>
  @import '../sass/main';
</style>

<svelte:head>
  <meta name="description" content={site.description} />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css?family=Bitter:400,400i,700"
    rel="stylesheet"
  />
  <link
    rel="alternate"
    type="application/atom+xml"
    title={site.title}
    href="feed.xml"
  />
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="mask-icon" href="safari-pinned-tab.svg" color="#008000" />
  <meta name="msapplication-TileColor" content="#efefef" />
  <meta name="theme-color" content="#efefef" />
</svelte:head>

{#if drafts}
  <pre class="debug info">DRAFTS ALLOWED</pre>
{/if}

<PageNav {segment} {site} {pages} />

<PageMain {...params} {segment}>
  <slot />
</PageMain>

<PageFooter {site} />
