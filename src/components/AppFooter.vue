<template>
  <footer>
    <div class="credits">
      <small>
        Built by <a href="https://jewishworker.org">The Jewish Worker</a> ·
        <a href="https://archive.org/details/iron_march_201911">Source data</a> ·
        <a href="https://gitlab.com/jewishworker">Source code</a>
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
