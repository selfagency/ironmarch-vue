<template>
  <main id="home">
    <div class="card">
      <strong>Use the form above to search:</strong>
      <ul>
        <li>Full-text of posts, messages, and user bios</li>
        <li>User names and email addresses</li>
        <li>Locations</li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="stylus" scoped>
.card
  padding 2em 4em
  text-align center

  ul
    margin 0.5em auto
    padding 0
    max-width 300px
    width 100%
    text-align left
</style>
