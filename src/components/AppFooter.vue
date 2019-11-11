<template>
  <footer>
    <div class="credits">
      <small>
        Built by <a href="https://jewishworker.org" target="_blank">The Jewish Worker</a> ·
        <a href="https://gitlab.com/jewishworker/ironmarch-data" target="_blank">Source data</a> ·
        <a href="https://gitlab.com/jewishworker" target="_blank">Source code</a> ·
        <a href="https://ko-fi.com/jewishworker" target="_blank">Buy us a coffee</a>
        <br />
        Dedicated in memory of Blaze Bernstein, ז׳׳ל, so that others may not suffer the same fate.
        <br />
        This website does not collect or track any information about its visitors.
        <br /><br />
        <a href="https://twitter.com/jewishworker" target="_blank">
          <img
            src="https://img.shields.io/twitter/follow/jewishworker?style=social"
            alt="Follow Jewish Worker on Twitter"
          />
        </a>
      </small>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="stylus" scoped>
footer
  display flex
  justify-content center
  align-items center
  padding 4em

  .credits
    width 100%
    text-align center
</style>
