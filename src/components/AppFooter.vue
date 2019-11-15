<template>
  <footer id="footer">
    <div class="credits">
      <div class="dedication">
        Dedicated in memory of Blaze Bernstein, ז׳׳ל, so that others may not suffer the same fate.
      </div>
      <ul>
        <li>Built by <a href="https://jewishworker.org" target="_blank">The Jewish Worker</a></li>
        <li><a href="https://ko-fi.com/jewishworker" target="_blank">Buy us a coffee</a></li>
      </ul>
      <div class="twitter">
        <a href="https://twitter.com/jewishworker" target="_blank">
          <img
            src="https://img.shields.io/twitter/follow/jewishworker?style=social"
            alt="Follow Jewish Worker on Twitter"
          />
        </a>
      </div>
      <ul>
        <li><strong>Source Code</strong></li>
        <li>
          <a href="https://gitlab.com/jewishworker/ironmarch-web" target="_blank">Frontend</a>
        </li>
        <li><a href="https://gitlab.com/jewishworker/ironmarch-api" target="_blank">Backend</a></li>
        <li><a href="https://gitlab.com/jewishworker/ironmarch-data" target="_blank">Data</a></li>
      </ul>
      <div class="privacy">
        This website does not collect or track any information about its visitors.
      </div>
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
  position absolute
  bottom 0
  left 0
  display flex
  justify-content center
  align-items center
  padding 2em
  width 100%
  background #efefef
  font-size 0.9em

  .credits
    width 100%

    ul
      display flex
      justify-content center
      align-items center
      margin 0
      padding 0
      list-style-type none

      li
        padding 0 0.5em
        text-align center

    div
      padding 0.5em 0
      text-align center

      &.dedication
        font-style italic
</style>
