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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: 'Home',
      meta: [
        {
          property: 'title',
          content: 'Iron March Forum Leak'
        },
        {
          property: 'description',
          content: 'A searchable index of leaked data from the Iron March neo-Nazi forum'
        },
        {
          property: 'og:description',
          content: 'A searchable index of leaked data from the Iron March neo-Nazi forum'
        },
        {
          property: 'og:image',
          content: `${this.siteUrl}${this.logo}`
        },
        {
          property: 'og:url',
          content: `${this.siteUrl}${this.$route.path}`
        }
      ]
    }
  },
  computed: {
    ...mapState(['siteUrl', 'logo'])
  }
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
