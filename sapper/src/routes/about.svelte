<script>
  import { _getPageTitle } from '../_global'

  const page = {
    title: 'About'
  }
</script>

<svelte:head>
  <title>{_getPageTitle(page)}</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
