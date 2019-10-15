<script context="module">
  export async function preload(page, { site }) {
    const { api } = site
    const res = await this.fetch(api._root + api.pages)
    const pages = await res.json()

    return { site, pages }
  }
</script>

<script>
  import PageNav from '../components/page/Nav.svelte'
  import PageFooter from '../components/page/Footer.svelte'

  export let segment
  export let site = {}
  export let pages = []
</script>

<style lang="scss" global>
  @import "../sass/main.scss";
</style>

<svelte:head>
  <meta name="description" content="{site.description}">
</svelte:head>

<PageNav {segment} {site} {pages} />

<main class="page-content" aria-label="Content">
<!--    TODO: add another slot for the page.image -->
<!--  {% if page.image %}{% include page_image.html %}{% endif %}-->
  <div class="wrapper">
    <slot />
  </div>
</main>

<PageFooter {site} />
