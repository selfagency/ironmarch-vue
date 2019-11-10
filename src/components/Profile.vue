<template>
  <section v-if="user && Object.values(user).length" id="meta">
    <div class="row">
      <div class="column column-75">
        <div v-if="user.name"><strong>Username:</strong> {{ user.name }}</div>
        <div v-if="user.nameAlt"><strong>Alt Username:</strong> {{ user.nameAlt }}</div>
        <div v-if="user.tagline"><strong>Tagline:</strong> {{ user.tagline }}</div>
        <div v-if="user.email">
          <strong>Email:</strong> {{ user.email }}
          <div v-if="user.emailAlt"><strong>Alt Email:</strong> {{ user.emailAlt }}</div>
        </div>
        <div v-if="user.dobD > 0">
          <strong>DOB:</strong> {{ user.dobM }}/{{ user.dobD }}{{ user.dobY > 0 ? `/${user.dobY}` : null }}
        </div>
        <div v-if="lookup">
          <div v-if="lookup.fullName"><strong>Real Name:</strong> {{ lookup.fullName }}</div>
          <div v-if="lookup.details">
            <span v-if="lookup.details.gender"><strong>Gender:</strong> {{ lookup.details.gender }}</span>
            <span v-if="lookup.details.gender && lookup.details.age"> · </span>
            <span v-if="lookup.details.age">
              <strong>Age:</strong> {{ lookup.details.age.range || lookup.details.age }}
            </span>
          </div>
          <div v-if="lookup.details && Object.values(lookup.details.profiles).length">
            <strong>Social profiles:</strong>
            <ul class="lookup-social">
              <li v-for="(social, key) in lookup.details.profiles" :key="key">
                <a :href="social.url" target="_blank">{{ social.service | capitalize }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span v-if="user.id"><strong>ID:</strong> {{ user.id }}</span>
          <span v-if="user.id && user.ip"> · </span>
          <span v-if="user.ip"><strong>IP:</strong> {{ user.ip }}</span>
        </div>
        <div v-if="user.geo">
          <strong>Geolocation:</strong> {{ user.geo.city }}, {{ user.geo.region_name }}, {{ user.geo.country_code }}
        </div>
        <div v-if="user.timezone"><strong>Profile Time Zone:</strong> {{ user.timezone }}</div>
        <div v-if="user.joined"><strong>Joined:</strong> {{ user.joined | dateConv }}</div>
        <div v-if="user.lastLogin"><strong>Last Login:</strong> {{ user.lastLogin | dateConv }}</div>
        <div v-if="user.password"><strong>Password:</strong> {{ user.password }}</div>
        <div v-if="user.salt"><strong>Password Salt:</strong> {{ user.salt }}</div>
      </div>
      <div class="column column-25">
        <div v-if="lookup && lookup.details && lookup.details.photos.length">
          <img id="user-photo" :src="lookup.details.photos[0].value" />
        </div>
        <div v-else-if="user.photo && user.photo.startsWith('ht')">
          <img id="user-photo" :src="user.photo" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <br />
        <div v-if="user.bio">
          <strong>Bio:</strong>
          <div v-html="$utils.bbcode(user.bio)"></div>
        </div>
        <div v-if="user.bio && user.signature">
          <br />
        </div>
        <div v-if="user.signature">
          <strong>Signature:</strong>
          <div v-html="$utils.bbcode(user.signature)"></div>
        </div>
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
      const lookup = JSON.parse(this.user.lookup)
      return lookup
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$utils.zoom(document.querySelector('#user-photo'))
      }, 1000)
    })
  }
}
</script>

<style lang="stylus" scoped>
.lookup-social
  padding 0
  list-style-type none

  li
    margin-bottom 0
    padding 0
</style>
