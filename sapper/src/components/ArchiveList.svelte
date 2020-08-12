<script>
  import PostExcerpt from "./PostExcerpt.svelte";

  export let posts
</script>

<style lang="scss">
  @import "../sass/post-list.scss";
</style>

<div class="home">

  <ul class="post-list">

  {#each posts as post}
    <li>
      <PostExcerpt {post} />
    </li>
  {/each}

  </ul>

</div>
