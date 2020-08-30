<script>
  import md from 'marked'
  import highlight from 'highlight.js'

  md.setOptions({
    highlight: function (code, lang) {
      const validLanguage = highlight.getLanguage(lang) ? lang : 'plaintext'
      return highlight.highlight(validLanguage, code).value
    },
    smartypants: true,
  })

  export let content
</script>

{@html md(content)}
