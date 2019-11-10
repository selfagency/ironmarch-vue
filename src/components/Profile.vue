<template>
  <section v-if="user && Object.values(user).length" id="meta" class="row">
    <div class="column column-75">
      <div v-if="lookup">
        <div v-if="lookup.fullName"><strong>Real Name:</strong> {{ lookup.fullName }}</div>
        <div>
          <span v-if="lookup.details.gender"><strong>Gender:</strong> {{ lookup.details.gender }}</span>
          <span v-if="lookup.details.gender && lookup.details.age"> · </span>
          <span v-if="lookup.details.age"><strong>Age:</strong> {{ lookup.details.age }}</span>
        </div>
        <div v-if="user.name"><strong>Username:</strong> {{ user.name }}</div>
        <div v-if="user.email"><strong>Email:</strong> {{ user.email }}</div>
        <div v-if="Object.values(lookup.details.profiles).length">
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
      <div v-if="user.lookup && lookup.details.photos">
        <img id="user-photo" :src="lookup.details.photos[0].value" />
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
      Console.log(lookup)
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
