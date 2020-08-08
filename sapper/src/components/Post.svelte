<script>
  import PostImage from './post/Image.svelte'
  import TagLinks from "./post/TagLinks.svelte"
  import Markdown from './Markdown.svelte'

  export let site
  export let post
</script>

{#if post.image}
  <PostImage params={post.image} />
{/if}

<article class="post" itemscope itemtype="http://schema.org/BlogPosting">

  <header class="post-header">
    <h1 class="post-title" itemprop="name headline">{post.title}</h1>

    <p class="post-meta">
      <time datetime="{post.date}" itemprop="datePublished">{post.date}</time>
      {#if post.author}
      {site.in_text_separator}
      <span itemprop="author" itemscope itemtype="http://schema.org/Person">
        <span itemprop="name">{post.author}</span>
      </span>
      {/if}
      <TagLinks {site} tags={post.tags} />
    </p>
  </header>

  <div class="post-content" itemprop="articleBody">
    <Markdown content={post.body} />
  </div>

</article>

