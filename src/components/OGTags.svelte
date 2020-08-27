<script>
  import { getPageTitle } from '../_utils'

  // props
  export let site = {}
  export let page = {}
  export let post = {}
  export let path = ''

  // local props
  const titleObj = post.title ? post : page.title ? page : {}
  const title = getPageTitle(site, titleObj)
  const description = page.desc || site.description
  const image = post.image ? `${post.image.url}?auto=format&fit=crop&w=256&q=70` : null

  path = /^\//.test(path) ? path : `/${path}`
</script>

<meta content={site.title} property="og:site_name" />
<meta content={title} property="og:title" />

{#if page.title || post.title}
  <meta content="article" property="og:type" />
{:else}
  <meta content="website" property="og:type" />
{/if}

<meta content={description} property="og:description" />

<meta content="{site.url}{path}" property="og:url" />

{#if post.date}
  <meta content={post.date} property="article:published_time" />
  <meta content="{site.url}/about" property="article:author" />
{/if}

{#if image}
  <meta content={image} property="og:image" />
{/if}

{#if post.tags}
  {#each post.tags as tag}
    <meta content={tag} property="article:tag" />
  {/each}
{/if}
