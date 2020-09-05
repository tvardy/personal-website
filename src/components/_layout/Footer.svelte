<script>
  export let site
</script>

<style lang="scss">
  @import '../../sass/site-footer';
</style>

<footer class="site-footer">
  <div class="wrapper">
    <p>
      &copy; {site.author.name || site.author} - Powered by <a
        href="https://sapper.svelte.dev"
        target="_blank"
      >Sapper</a> &amp; a modified <a
        href="https://github.com/yous/whiteglass"
        target="_blank"
      >whiteglass</a> theme <small>
        This website <strong>is not</strong> using any cookies nor trying to track its users
        in any unlawful way. <br />
        <strong>Read freely!</strong>
      </small> Subscribe via <a href="feed.xml" target="_blank">RSS</a>
      <br />
    </p>
  </div>
</footer>
