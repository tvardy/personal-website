<script>
	export let segment
  export let site
  export let pages
</script>

<header class="site-header">
  <div class="wrapper">

    <a class="site-title" href="/">{ site.title }</a>

    <nav class="site-nav">
      {#each pages as { name, href }}
        <a class="page-link" class:selected="{segment === name}" href="{ href }" rel="prefetch">{ name }</a>
      {/each}
    </nav>

  </div>
</header>
