<template>
  <section v-if="user && Object.values(user).length" id="meta" class="row">
    <div class="column column-75">
      <div v-if="user.lookup">
        <div v-if="user.lookup.contactInfo"><strong>Real Name:</strong> {{ user.lookup.contactInfo.fullName }}</div>
        <div v-if="user.name"><strong>Username:</strong> {{ user.name }}</div>
        <div v-if="user.email"><strong>Email:</strong> {{ user.email }}</div>
        <ul class="lookup-social">
          <li v-for="(social, key) in user.lookup.socialProfiles" :key="key">
            <strong>{{ social.typeName }}: </strong>
            <a :href="social.url" target="_blank">{{ social.username || social.id }}</a>
          </li>
        </ul>
      </div>
      <div v-if="user.id"><strong>ID:</strong> {{ user.id }}</div>
      <div v-if="user.ip"><strong>IP:</strong> {{ user.ip }}</div>
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
      <div v-if="user.lookup && user.lookup.photos">
        <img id="user-photo" :src="user.lookup.photos[0].url" />
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
