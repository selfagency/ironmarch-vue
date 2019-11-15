<template>
  <main id="home">
    <div class="card">
      <strong>Page Not Found</strong>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo() {
    return {
      title: '404: Page Not Found',
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
  }
}
</script>

<style lang="stylus" scoped>
.card
  padding 2em 4em
  text-align center
</style>
