<script>
  import { stores } from '@sapper/app'
  const { session } = stores()

  import TagLinks from './post/TagLinks.svelte'
  import Markdown from './Markdown.svelte'

  import { getPermalink, luxonize } from '../_utils'

  // props
  export let post = {}

  // internal props
  const { site } = $session
  const luxDate = luxonize(post.date).setLocale(site.lang)
  const formattedDate = luxDate.toFormat('DDD')
</script>

<style lang="scss">
  @import '../sass/post-excerpt';
</style>

<header class="post-header">
  <h1 class="post-title">
    <a class="post-link" href={getPermalink(post)} rel="prefetch">{post.title}</a>
  </h1>

  <p class="post-meta">
    <time datetime={post.date}>{formattedDate}</time>
    <TagLinks tags={post.tags} />
  </p>
</header>

<div class="post-content">
  <Markdown content={post.excerpt} />
</div>

<p class="post-continue">
  <a href={getPermalink(post)} rel="prefetch">Read on &rarr;</a>
</p>
