<template>
  <section id="comments">
    <h2>
      <div class="icon">
        <unicon name="comment-alt-message" fill="#000" height="24" width="24"></unicon>
      </div>
      <span>Notes &amp; Comments</span>
    </h2>
    <div id="commento"></div>
  </section>
</template>

<script>
export default {
  name: 'Comments',
  metaInfo() {
    return {
      script: [
        {
          src: 'https://cdn.commento.io/js/commento.js'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
#comments
  margin-top 2em
  width 100%

  h2
    .icon
      float left
      margin 0.15em 0.2em 0 0
</style>
