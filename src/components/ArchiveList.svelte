<script>
  import PostExcerpt from './PostExcerpt.svelte'

  export let posts
  export let lang
</script>

<style lang="scss">
  @import '../sass/post-list';
</style>

<ul class="post-list">

  {#each posts as post}
    <li lang={post.lang || lang}>
      <PostExcerpt {post} />
    </li>
  {/each}

</ul>
