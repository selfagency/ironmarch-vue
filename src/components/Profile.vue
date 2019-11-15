<template>
  <section v-if="user && Object.values(user).length" id="meta">
    <div class="flex">
      <div :class="{ 'two-third': hasPhoto(user), full: !hasPhoto(user) }">
        <div v-if="user.id"><strong>User ID:</strong> {{ user.id }}</div>
        <div v-if="user.name">
          <strong>Username(s):</strong> {{ user.name }}
          <span v-if="user.nameAlt && user.nameAlt !== user.name">, {{ user.nameAlt }}</span>
        </div>
        <div v-if="user.tagline"><strong>Tagline:</strong> <span v-html="user.tagline"></span></div>
        <div v-if="user.ideology"><strong>Ideology:</strong> {{ user.ideology }}</div>
        <div v-if="user.gender"><strong>Gender:</strong> {{ user.gender }}</div>
        <div v-if="user.email">
          <strong>Email(s):</strong> {{ user.email }}
          <span v-if="user.emailAlt && user.emailAlt !== user.email">, {{ user.emailAlt }}</span>
          <span
            v-if="
              user.emailAlt2 && user.emailAlt2 !== user.email && user.emailAlt2 !== user.emailAlt
            "
          >
            , {{ user.emailAlt2 }}
          </span>
        </div>
        <div v-if="hasSocial" class="user-socials">
          <ul>
            <li v-if="user.socialFacebook">
              <strong>Facebook: </strong>
              <a :href="user.socialFacebook" target="_blank">
                {{ user.socialFacebook }}
              </a>
            </li>
            <li v-if="user.socialTwitter">
              <strong>Twitter: </strong>
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
        <div v-if="user.location"><strong>Location:</strong> {{ user.location }}</div>
        <div v-if="user.timezone"><strong>Time Zone:</strong> {{ user.timezone }}</div>
        <div v-if="user.joined"><strong>Joined:</strong> {{ user.joined | dateConv }}</div>
        <div v-if="user.lastLogin">
          <strong>Last Login:</strong> {{ user.lastLogin | dateConv }}
        </div>
        <div v-if="user.password">
          <strong>Password:</strong> {{ user.password | truncate(32) }}
        </div>
        <div v-if="user.salt"><strong>Password Salt:</strong> {{ user.salt }}</div>
        <div v-if="(user.bioAlt || user.bio || user.signature) && user.signature"><br /></div>
        <div v-if="user.bioAlt || user.bio">
          <strong>Profile:</strong>
          <div v-if="user.bioAlt" v-html="user.bioAlt"></div>
          <div v-if="user.bio" v-html="$utils.bbcode(user.bio)"></div>
        </div>
        <div v-if="(user.bioAlt || user.bio) && user.signature"><br /></div>
        <div v-if="user.signature">
          <strong>Signature:</strong>
          <div v-html="$utils.bbcode(user.signature)"></div>
        </div>
      </div>
      <div v-if="hasPhoto(user)" class="third">
        <div v-if="lookup && lookup.details && lookup.details.photos.length">
          <img class="user-photo" :src="lookup.details.photos[0].value" :alt="lookup.fullName" />
        </div>
        <div v-if="user.photo && user.photo.startsWith('ht')">
          <img class="user-photo" :src="user.photo" :alt="user.name" />
        </div>
        <div v-if="user.photoAlt && user.photoAlt.startsWith('ht') && user.photoAlt !== user.photo">
          <img class="user-photo" :src="user.photoAlt" :alt="user.name" />
        </div>
      </div>
    </div>
    <div v-if="lookup" class="card">
      <icon-header
        v-tooltip="'Potential identity match'"
        text="Unverified Identity Match"
        icon="shield-exclamation"
        color="red"
      ></icon-header>
      <div v-if="lookup.fullName"><strong>Real Name:</strong> {{ lookup.fullName }}</div>
      <div v-if="lookup.details">
        <span v-if="lookup.details.gender">
          <strong>Gender:</strong> {{ lookup.details.gender }}
        </span>
        <span v-if="lookup.details.gender && lookup.details.age"> · </span>
        <span v-if="lookup.details.age">
          <strong>Age:</strong> {{ lookup.details.age.range || lookup.details.age }}
        </span>
      </div>
      <div
        v-if="lookup.details && Object.values(lookup.details.profiles).length"
        class="user-socials"
      >
        <ul>
          <li v-for="(social, key) in lookup.details.profiles" :key="key">
            <strong>{{ social.service | capitalize }}: </strong>
            <a :href="social.url" target="_blank">{{ social.url }}</a>
          </li>
        </ul>
      </div>
      <div class="notice">
        <p>
          This information comes from a public records lookup and therefore may not be wholly
          accurate. Unless you are able to verify and corroborate an individual's identity, do not
          assume that an identity match is concrete proof of anything.
        </p>
      </div>
    </div>
    <div v-if="user.dossier" class="card verified">
      <icon-header text="Identity Verified" icon="shield-check" color="green"></icon-header>
      <p>
        This individual's identity has been verified by independent investigators. Scroll down or
        click
        <strong>Dossier</strong> above to read their report.
      </p>
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
    },
    hasSocial() {
      return (
        this.user.socialFacebook ||
        this.user.socialTwitter ||
        this.user.socialJabber ||
        this.user.socialSkype ||
        this.user.socialAim ||
        this.user.socialMsn ||
        this.user.socialIcq ||
        this.user.socialYahoo
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$utils.zoom(document.querySelectorAll('.user-photo'))
        const spans = document.querySelectorAll('span')
        spans.forEach(span => {
          span.style.removeProperty('font-size')
        })
      }, 1000)
    })
  },
  methods: {
    hasPhoto(user) {
      return (
        (user.lookup && user.lookup.details && user.lookup.details.photos.length) ||
        (user.photo && user.photo.startsWith('ht')) ||
        (user.photoAlt && user.photoAlt.startsWith('ht') && user.photoAlt !== user.photo)
      )
    }
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

  h2
    margin-bottom 1em
    padding 0
    color red

  &.verified
    h2
      color green

  .notice
    margin 1em 0 0
    padding 1em
    background-color #FBE9E9
    color black
    font-size 0.8em
</style>
