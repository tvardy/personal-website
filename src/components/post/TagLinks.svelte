<script>
  import InTextSeparator from "../InTextSeparator.svelte";

  export let tags = []
</script>

{#if Array.isArray(tags) && tags.length}
  <InTextSeparator />
  {#each tags as tag, index}
    <a href="tags/{tag}">{tag}</a>{#if index + 1 < tags.length},&nbsp;{/if}
  {/each}
{/if}
