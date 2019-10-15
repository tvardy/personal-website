<script context="module">
  export async function preload(page, { site }) {
    return { site }
  }
</script>
<script>
  import { getPageTitle } from '../_utils'

  export let site
</script>

<svelte:head>
  <title>{getPageTitle(site)}</title>
</svelte:head>

<h1>It works!</h1>
