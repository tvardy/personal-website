<script context="module">
  import { paths } from '../_settings'

  export async function preload() {
    const res = await this.fetch(paths.page.all)
    const pages = await res.json()

    return { pages }
  }
</script>

<script>
  import PageNav from '../components/page/Nav.svelte'
  import PageFooter from '../components/page/Footer.svelte'

  import { site } from '../_settings'

  export let segment
  export let pages

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
