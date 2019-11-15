<template>
  <section id="comments">
    <icon-header text="Notes &amp; Comments" icon="comment-alt-message"></icon-header>
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
  margin-top 4em
  width 100%
</style>
