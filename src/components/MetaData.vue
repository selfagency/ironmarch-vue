<template>
  <div v-if="Object.values(meta).length" id="metadata">
    <h2>
      <div class="icon"><unicon name="user-square" fill="block" width="20" height="20" /></div>
      Uncovered Social Media Profiles
    </h2>
    <div class="flex">
      <div v-if="meta.facebook" class="full third-800">
        <h3>Facebook</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(fb, key) in facebook" :key="key">
            <td>
              <router-link :to="{ name: 'user', params: { id: fb.id } }">{{ fb.name }}</router-link>
            </td>
            <td class="link">
              <a :href="fb.fb" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="facebook.length > 19" @click="showMore('fb')">
            {{ more.fb ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
      <div v-if="meta.twitter" class="full third-800">
        <h3>Twitter</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(tw, key) in twitter" :key="key">
            <td>
              <router-link :to="{ name: 'user', params: { id: tw.id } }">{{ tw.name }}</router-link>
            </td>
            <td class="link">
              <a :href="tw.tw" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="twitter.length > 19" @click="showMore('tw')">
            {{ more.tw ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
      <div v-if="meta.linkedin" class="full third-800">
        <h3>LinkedIn</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(li, key) in linkedin" :key="key">
            <td>
              <router-link :to="{ name: 'user', params: { id: li.id } }">{{ li.name }}</router-link>
            </td>
            <td class="link">
              <a :href="li.li" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="linkedin.length > 19" @click="showMore('li')">
            {{ more.li ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetaData',
  props: {
    meta: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      more: {
        fb: false,
        tw: false,
        li: false
      }
    }
  },
  computed: {
    facebook() {
      return this.more.fb ? this.meta.facebook : this.meta.facebook.slice(0, 20)
    },
    twitter() {
      return this.more.tw ? this.meta.twitter : this.meta.twitter.slice(0, 20)
    },
    linkedin() {
      return this.more.li ? this.meta.linkedin : this.meta.linkedin.slice(0, 20)
    }
  },
  methods: {
    showMore(data) {
      this.more[data] = !this.more[data]
    }
  }
}
</script>

<style lang="stylus" scoped>
#metadata
  h2
    .icon
      float left
      margin 0.1em 0.2em 0 0

  table
    width 100%

    td, th
      padding 0.3em

    .link
      text-align right

      svg
        margin-top 0.1em

  .more
    display flex
    justify-content center
    align-items center
    margin 1em 0
    width 100%
</style>
