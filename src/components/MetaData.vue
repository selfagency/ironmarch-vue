<template>
  <div id="metadata">
    <h2>Uncovered Social Media Profiles</h2>
    <div class="flex">
      <div v-if="meta.facebook" class="full third-500">
        <h3>Facebook Profiles</h3>
        <ul>
          <li v-for="(fb, key) in facebook" :key="key">
            <strong>
              <router-link :to="{ name: 'user', params: { id: fb.id } }" target="_blank">{{ fb.name }}</router-link> →
            </strong>
            <a :href="fb.fb" target="_blank">Profile</a>
          </li>
        </ul>
        <button v-if="facebook.length > 19" @click="showMore('fb')">{{ more.fb ? 'Show Less' : 'Show More' }}</button>
      </div>
      <div v-if="meta.twitter" class="full third-500">
        <h3>Twitter Profiles</h3>
        <ul>
          <li v-for="(tw, key) in twitter" :key="key">
            <strong>
              <router-link :to="{ name: 'user', params: { id: tw.id } }" target="_blank">{{ tw.name }}</router-link> →
            </strong>
            <a :href="tw.tw" target="_blank">Profile</a>
          </li>
        </ul>
        <button v-if="twitter.length > 19" @click="showMore('tw')">{{ more.tw ? 'Show Less' : 'Show More' }}</button>
      </div>
      <div v-if="meta.linkedin" class="full third-500">
        <h3>LinkedIn Profiles</h3>
        <ul>
          <li v-for="(li, key) in linkedin" :key="key">
            <strong>
              <router-link :to="{ name: 'user', params: { id: li.id } }" target="_blank">{{ li.name }}</router-link> →
            </strong>
            <a :href="li.li" target="_blank">Profile</a>
          </li>
        </ul>
        <button v-if="linkedin.length > 19" @click="showMore('li')">{{ more.li ? 'Show Less' : 'Show More' }}</button>
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
  ul
    margin 0
    padding 0
    list-style-type none
</style>
