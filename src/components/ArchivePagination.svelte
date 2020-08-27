<script>
  // props
  export let page = 1
  export let last = false
  export let addition = ''

  // internal values
  const baseUrl = `blog${addition ? `/${addition}` : ''}`
  const visible = !last || page > 1
</script>

<style lang="scss">
  @import '../sass/post-pagination';
</style>

{#if visible}
  <div class="pagination">
    {#if !last}
      <a class="previous" href="{baseUrl}/{page + 1}" rel="prefetch">&laquo; Older</a>
    {/if}
    {#if page > 1}
      <a class="next" href="{baseUrl}/{page - 1}" rel="prefetch">Newer &raquo;</a>
    {/if}
  </div>
{/if}
