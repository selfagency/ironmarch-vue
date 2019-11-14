<template>
  <section v-if="user && Object.values(user).length" id="meta">
    <div class="flex">
      <div class="two-third">
        <div v-if="user.id"><strong>User ID:</strong> {{ user.id }}</div>
        <div v-if="user.name">
          <strong>Username(s):</strong> {{ user.name }}<span v-if="user.nameAlt && user.nameAlt !== user.name">, {{ user.nameAlt }}</span>
        </div>
        <div v-if="user.tagline"><strong>Tagline:</strong> <span v-html="user.tagline"></span></div>
        <div v-if="user.ideology"><strong>Ideology:</strong> {{ user.ideology }}</div>
        <div v-if="user.gender"><strong>Gender:</strong> {{ user.gender }}</div>
        <div v-if="user.email">
          <strong>Email(s):</strong> {{ user.email }}
          <span v-if="user.emailAlt && user.emailAlt !== user.email">, {{ user.emailAlt }}</span>
          <span v-if="user.emailAlt2 && user.emailAlt2 !== user.email && user.emailAlt2 !== user.emailAlt">, {{ user.emailAlt2 }}</span>
        </div>
        <div
          v-if="user.socialTwitter || user.socialJabber || user.socialSkype || user.socialAim || user.socialMsn || user.socialIcq || user.socialYahoo"
          class="user-socials"
        >
          <ul>
            <li v-if="user.socialTwitter">
              <strong>Twitter:</strong>
              <a :href="user.socialTwitter" target="_blank">
                {{ user.socialTwitter }}
              </a>
            </li>
            <li v-if="user.socialJabber"><strong>Jabber:</strong> {{ user.socialJabber }}</li>
            <li v-if="user.socialSkype"><strong>Skype:</strong> {{ user.socialSkype }}</li>
            <li v-if="user.socialYahoo"><strong>Yahoo:</strong> {{ user.socialYahoo }}</li>
            <li v-if="user.socialMsn"><strong>MSN:</strong> {{ user.socialMsn }}</li>
            <li v-if="user.socialAim"><strong>AOL:</strong> {{ user.socialAim }}</li>
            <li v-if="user.socialIcq"><strong>ICQ:</strong> {{ user.socialIcq }}</li>
          </ul>
        </div>
        <div v-if="user.ip">
          <strong>IP(s):</strong> {{ user.ip }}<span v-if="user.ipAlt && user.ipAlt !== user.ip">, {{ user.ipAlt }}</span>
        </div>
        <div v-if="user.geo">
          <strong>Geolocation(s):</strong> {{ user.geo.city }}, {{ user.geo.region_name }}, {{ user.geo.country_code
          }}<span v-if="user.geoAlt && user.geoAlt.city !== user.geo.city && user.geoAlt.city !== null">
            ; {{ user.geoAlt.city }}, {{ user.geoAlt.region_name }}, {{ user.geoAlt.country_code }}
          </span>
        </div>
        <div v-if="user.location"><strong>Location:</strong> {{ user.location }}</div>
        <div v-if="user.timezone"><strong>Time Zone:</strong> {{ user.timezone }}</div>
        <div v-if="user.joined"><strong>Joined:</strong> {{ user.joined | dateConv }}</div>
        <div v-if="user.lastLogin"><strong>Last Login:</strong> {{ user.lastLogin | dateConv }}</div>
        <div v-if="user.password"><strong>Password:</strong> {{ user.password | truncate(32) }}</div>
        <div v-if="user.salt"><strong>Password Salt:</strong> {{ user.salt }}</div>
        <div v-if="(user.ideologyAlt || user.bio || user.signature) && user.signature"><br /></div>
        <div v-if="user.ideologyAlt || user.bio">
          <strong>Profile:</strong>
          <div v-if="user.ideologyAlt" v-html="user.ideologyAlt"></div>
          <div v-if="user.bio" v-html="$utils.bbcode(user.bio)"></div>
        </div>
        <div v-if="(user.ideologyAlt || user.bio) && user.signature"><br /></div>
        <div v-if="user.signature">
          <strong>Signature:</strong>
          <div v-html="$utils.bbcode(user.signature)"></div>
        </div>
      </div>
      <div class="third">
        <div v-if="lookup && lookup.details && lookup.details.photos.length">
          <img class="user-photo" :src="lookup.details.photos[0].value" />
        </div>

        <div v-if="user.photo && user.photo.startsWith('ht')">
          <img class="user-photo" :src="user.photo" />
        </div>

        <div v-if="user.photoAlt && user.photoAlt.startsWith('ht') && user.photoAlt !== user.photo">
          <img class="user-photo" :src="user.photoAlt" />
        </div>
      </div>
    </div>
    <div v-if="lookup" class="card">
      <h3>Unverified Identity Match</h3>
      <div v-if="lookup.fullName"><strong>Real Name:</strong> {{ lookup.fullName }}</div>
      <div v-if="lookup.details">
        <span v-if="lookup.details.gender"><strong>Gender:</strong> {{ lookup.details.gender }}</span>
        <span v-if="lookup.details.gender && lookup.details.age"> · </span>
        <span v-if="lookup.details.age"> <strong>Age:</strong> {{ lookup.details.age.range || lookup.details.age }} </span>
      </div>
      <div v-if="lookup.details && Object.values(lookup.details.profiles).length">
        <strong>Social(s): </strong>
        <span v-for="(social, key) in lookup.details.profiles" :key="key">
          <a :href="social.url" target="_blank">{{ social.service | capitalize }}</a>
          &nbsp;
        </span>
      </div>
      <div class="notice">
        This information comes from a public records lookup and therefore may not be wholly accurate. Unless you are able to verify and corroborate an
        individual's identity, do not assume that an identity match is concrete proof of anything.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    lookup() {
      return this.user.lookup
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$utils.zoom(document.querySelector('.user-photo'))
      }, 1000)
    })
  }
}
</script>

<style lang="stylus" scoped>
#meta
  width 100%

.user-photo
  width 100%

.user-socials
  ul
    margin 0
    padding 0
    list-style-type none

  li
    margin 0
    padding 0

.card
  margin-top 2em
  padding 1em

  h3
    margin-bottom 1em
    padding 0
    color red

  .notice
    margin 1em 0 0
    padding 1em
    background-color #FBE9E9
    color black
    font-size 0.8em
</style>
