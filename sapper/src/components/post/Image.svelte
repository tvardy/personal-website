<script>
  export let params = {}

  const size = [
    'w=928',
    'h=400',
    'q=66'
  ]

  const format = [
    '&fit=', 'crop'
  ]

  if(params.crop) {
    format.push('&crop=', params.crop)
  }

  if(params.rect) {
    format.push('&rect=', params.rect)
  }

  const url = `//images.unsplash.com/photo-${params.unsplashId}?auto=format${format.join('')}&${size.join('&')}`
</script>

<style lang="scss">
  @import "../../sass/post-image.scss";
</style>

<div class="post-image {params.class}" style="background-image: url({url})" data-source="&copy; Unsplash"></div>
