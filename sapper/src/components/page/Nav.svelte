<script>
	export let segment
  export let site
  export let pages
</script>

<style lang="scss">
  @import "../../sass/site-header.scss";
</style>

<header class="site-header">
  <div class="wrapper">

    <a class="site-title" href="/">{ site.title }</a>

    <nav class="site-nav">
      {#each pages as { slug, href, title }}
        <a class="page-link" class:selected="{segment === slug}" href="{ href }">{title}</a>
      {/each}
    </nav>

  </div>
</header>
