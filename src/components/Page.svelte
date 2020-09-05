<script>
  import { stores } from '@sapper/app'
  const { session } = stores()

  // components
  import Markdown from './Markdown.svelte'

  // props
  export let page

  // internal props
  const { site } = $session
</script>

<article class="page" lang={site.lang}>
  <header class="page-header">
    <h1 class="page-title">{page.title}</h1>
  </header>

  <div class="page-content">
    <Markdown content={page.body} />
  </div>
</article>
