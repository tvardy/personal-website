<script>
  export let site = {}
  export let tags = []
</script>

{#if tags.length}
  {@html site.in_text_separator}
  {#each tags as tag, index}
    <a href="tags/{tag}">{tag}</a>{#if index + 1 < tags.length},&nbsp;{/if}
  {/each}
{/if}
