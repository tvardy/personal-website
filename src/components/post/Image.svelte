<script>
  export let params = {}

  const size = ['w=928', 'h=400', 'q=66']

  const format = ['&fit=', 'crop']

  if (params.crop) {
    format.push('&crop=', params.crop)
  }

  if (params.rect) {
    format.push('&rect=', params.rect)
  }

  const url = `${params.url}?auto=format${format.join('')}&${size.join('&')}`
</script>

<div class="post-image {params.class}" style="background-image: url({url})">
  {#if params.attribution}
    <span class="post-image-attribution">
      {@html params.attribution}
    </span>
  {/if}
</div>

<style lang="scss">
  @import '../../sass/post-image';
</style>
