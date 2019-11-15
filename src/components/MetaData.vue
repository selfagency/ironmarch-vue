<template>
  <div v-if="Object.values(meta).length" id="metadata">
    <icon-header text="Uncovered Social Media Profiles" icon="user-square"></icon-header>
    <div class="flex">
      <div v-if="meta.facebook" id="facebook" class="full third-800">
        <h3>Facebook</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(fb, key) in facebook" :key="key">
            <td valign="top">
              <router-link :to="{ name: 'user', params: { id: fb.id } }">{{ fb.name }}</router-link>
            </td>
            <td class="link" valign="top">
              <a :href="fb.fb" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="facebook.length > limit - 1" @click="showMore('fb')">
            {{ more.fb ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
      <div v-if="meta.twitter" id="twitter" class="full third-800">
        <h3>Twitter</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(tw, key) in twitter" :key="key">
            <td valign="top">
              <router-link :to="{ name: 'user', params: { id: tw.id } }">{{ tw.name }}</router-link>
            </td>
            <td class="link" valign="top">
              <a :href="tw.tw" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="twitter.length > limit - 1" @click="showMore('tw')">
            {{ more.tw ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
      <div v-if="meta.linkedin" id="linkedin" class="full third-800">
        <h3>LinkedIn</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Profile</th>
          </tr>
          <tr v-for="(li, key) in linkedin" :key="key">
            <td valign="top">
              <router-link :to="{ name: 'user', params: { id: li.id } }">{{ li.name }}</router-link>
            </td>
            <td class="link" valign="top">
              <a :href="li.li" target="_blank">
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="linkedin.length > limit - 1" @click="showMore('li')">
            {{ more.li ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex">
      <div v-if="meta.discord" id="discord" class="full half-800">
        <h3>Discord</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Invite Link</th>
          </tr>
          <tr v-for="(di, key) in discord" :key="key">
            <td valign="top">
              <router-link :to="{ name: 'user', params: { id: di.user.id } }">
                {{ di.user.name }}
              </router-link>
            </td>
            <td class="link" valign="top">
              <a :href="di.url" target="_blank">
                <span>{{ di.url.replace('https://', '') | truncate(20) }} </span>
                <unicon name="external-link-alt" fill="#0074d9" width="18" height="18" />
              </a>
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="discord.length > limit - 1" @click="showMore('di')">
            {{ more.di ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </div>
      <div v-if="meta.skype" id="skype" class="full half-800">
        <h3>Skype</h3>
        <table>
          <tr>
            <th class="three-quarter">User</th>
            <th class="link quarter">Username</th>
          </tr>
          <tr v-for="(sk, key) in skype" :key="key">
            <td valign="top">
              <router-link :to="{ name: 'user', params: { id: sk.id } }">{{ sk.name }}</router-link>
            </td>
            <td class="link" valign="top">
              {{ sk.sk }}
            </td>
          </tr>
        </table>

        <div class="more">
          <button v-if="twitter.length > limit - 1" @click="showMore('sk')">
            {{ more.sk ? 'Show Less' : 'Show More' }}
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
        di: false,
        fb: false,
        li: false,
        sk: false,
        tw: false
      },
      limit: 10
    }
  },
  computed: {
    discord() {
      return this.more.di ? this.meta.discord : this.meta.discord.slice(0, this.limit)
    },
    facebook() {
      return this.more.fb ? this.meta.facebook : this.meta.facebook.slice(0, this.limit)
    },
    linkedin() {
      return this.more.li ? this.meta.linkedin : this.meta.linkedin.slice(0, this.limit)
    },
    skype() {
      return this.more.sk ? this.meta.skype : this.meta.skype.slice(0, this.limit)
    },
    twitter() {
      return this.more.tw ? this.meta.twitter : this.meta.twitter.slice(0, this.limit)
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
  table
    width 100%

    td, th
      padding 0.3em

    .link
      text-align right

      svg
        margin-bottom -0.2em

  #discord td.link, #skype td.link
    height 33px

  .more
    display flex
    justify-content center
    align-items center
    margin 1em 0
    width 100%
</style>
