<script>
  export let page = 0
  export let last = false

  page = parseInt(page)
</script>

<div class="pagination">
  {#if !last}
    <a class="previous" href="/blog/{page + 1}">&laquo; Older</a>
  {/if}
  {#if page > 1}
    <a class="next" href="/blog/{page - 1}">Newer &raquo;</a>
  {/if}
</div>

