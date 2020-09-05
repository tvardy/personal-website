<script>
  import { stores } from '@sapper/app'
  const { session } = stores()

  import { luxonize } from '../_utils'

  import PostImage from './post/Image.svelte'
  import TagLinks from './post/TagLinks.svelte'
  import Markdown from './Markdown.svelte'
  import InTextSeparator from './InTextSeparator.svelte'

  // props
  export let post = {}

  // internal props
  const { site } = $session
  const luxDate = luxonize(post.date).setLocale(site.lang)
  const formattedDate = luxDate.toFormat('DDD')
</script>

{#if post.image}
  <PostImage params={post.image} />
{/if}

<article
  class="post"
  itemscope
  itemtype="http://schema.org/BlogPosting"
  lang={post.lang || site.lang}
>
  <header class="post-header">
    <h1 class="post-title" itemprop="name headline">{post.title}</h1>

    <p class="post-meta">
      <time datetime={post.date} itemprop="datePublished">{formattedDate}</time>
      {#if post.author}
        <InTextSeparator />
        <span itemprop="author" itemscope itemtype="http://schema.org/Person">
          <span itemprop="name">{post.author}</span>
        </span>
      {/if}
      <TagLinks tags={post.tags} />
    </p>
  </header>

  <div class="post-content" itemprop="articleBody">
    <Markdown content={post.body} />
  </div>
</article>
