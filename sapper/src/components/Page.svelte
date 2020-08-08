<script>
  import Markdown from './Markdown.svelte'

  export let page
</script>

<article class="page">

  <header class="page-header">
    <h1 class="page-title">{page.title}</h1>
  </header>

  <div class="page-content">
    <Markdown content={page.content} />
  </div>

</article>
