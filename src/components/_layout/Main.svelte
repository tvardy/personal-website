<script>
  export let segment
  export let className
</script>

{#if segment}
  <!-- {segment} -->
{/if}

<main class={className} aria-label="Content">
  <div class="wrapper">
    <slot />
  </div>
</main>

<style lang="scss">
  @import '../../sass/page';
  @import '../../sass/post';
</style>
