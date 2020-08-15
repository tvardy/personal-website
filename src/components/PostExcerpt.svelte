<script>
  import TagLinks from './post/TagLinks.svelte'
  import Markdown from "./Markdown.svelte";

  import { getPermalink } from '../_utils'

  export let post
</script>

<style lang="scss">
  @import "../sass/post-excerpt";
</style>

<header class="post-header">
  <h1 class="post-title">
    <a class="post-link" href="{getPermalink(post)}">{ post.title }</a>
  </h1>

  <p class="post-meta">
    { post.date } <!-- "%b %-d, %Y" -->
    <TagLinks tags={post.tags} />
  </p>
</header>

<div class="post-content">
  <Markdown content={post.excerpt} />
</div>

<p class="post-continue">
  <a href="{getPermalink(post)}">Read on &rarr;</a>
</p>
