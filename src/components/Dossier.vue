<template>
  <section id="dossier">
    <icon-header text="Dossier" icon="user-circle"></icon-header>
    <div v-html="dossier"></div>
  </section>
</template>

<script>
export default {
  name: 'Dossier',
  props: {
    dossier: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
#dossier
  margin-top 3em
  font-size 1.1em

  img
    margin 4em auto
    padding 1em
    width 100%
    height auto
    border 1px solid #ccc
</style>
