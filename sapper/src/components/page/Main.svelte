<script>
  export let segment
  export let className
</script>

<style lang="scss">
  @import "../../sass/page.scss";
  @import "../../sass/post.scss";
</style>

{#if segment}<!-- {segment} -->{/if}

<main class="{className}" aria-label="Content">
  <div class="wrapper">
    <slot />
  </div>
</main>
