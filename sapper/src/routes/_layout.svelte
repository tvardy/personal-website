<script>
  import PageNav from '../components/page/Nav.svelte'
  import PageFooter from '../components/page/Footer.svelte'

  import { site, pages } from '../_global'

  export let segment
</script>

<!-- // header -->
<PageNav {segment} {site} {pages} />

<main class="page-content" aria-label="Content">
<!--    TODO: add another slot for the page.image -->
<!--  {% if page.image %}{% include page_image.html %}{% endif %}-->
  <div class="wrapper">
    <slot />
  </div>
</main>

<PageFooter {site} />
