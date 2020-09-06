<script>
  import md from 'marked'

  import highlight from 'highlight.js/lib/core'

  import bash from 'highlight.js/lib/languages/bash'
  import xml from 'highlight.js/lib/languages/xml'
  import html from 'highlight.js/lib/languages/htmlbars'
  import css from 'highlight.js/lib/languages/css'
  import markdown from 'highlight.js/lib/languages/markdown'
  import javascript from 'highlight.js/lib/languages/javascript'
  import plaintext from 'highlight.js/lib/languages/plaintext'
  import scss from 'highlight.js/lib/languages/scss'
  import shell from 'highlight.js/lib/languages/shell'

  highlight.registerLanguage('bash', bash)
  highlight.registerLanguage('css', css)
  highlight.registerLanguage('xml', xml)
  highlight.registerLanguage('html', html)
  highlight.registerLanguage('markdown', markdown)
  highlight.registerLanguage('javascript', javascript)
  highlight.registerLanguage('plaintext', plaintext)
  highlight.registerLanguage('scss', scss)
  highlight.registerLanguage('shell', shell)

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
