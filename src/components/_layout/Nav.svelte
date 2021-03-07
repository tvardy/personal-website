<script>
  export let segment
  export let site
  export let pages

  function toggleColorMode() {
    document.getElementsByTagName('html')[0].classList.toggle('dark-mode')
  }
</script>

<header class="site-header">
  <div class="wrapper">
    <div class="site-title">
      <img src="/images/idea.png" alt="a... bulb icon ;)" on:click={toggleColorMode} />
      <a href="/">{site.title}</a>
    </div>

    <nav class="site-nav">
      {#each pages as { slug, href, title, link }}
        <a class="page-link" class:selected={segment === slug} {href} rel="prefetch">
          {link || title}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style lang="scss">
  @import '../../sass/site-header';
</style>
