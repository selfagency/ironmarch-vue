<template>
  <section id="locales">
    <icon-header text="Top Locations of Forum Users" icon="map-marker-alt"></icon-header>
    <div v-if="locales" class="flex">
      <div v-if="locales.cities" class="full third-800">
        <h3>Cities</h3>
        <table>
          <tr>
            <th class="two-third">City</th>
            <th class="count third">Users</th>
          </tr>
          <tr v-for="(city, key) in locales.cities.slice(0, 10)" :key="key">
            <td>
              {{ city[0] }}
            </td>
            <td class="count">
              {{ city[1] }}
            </td>
          </tr>
        </table>
      </div>
      <div v-if="locales.regions" class="full third-800">
        <h3>Regions</h3>
        <table>
          <tr>
            <th class="two-third">Region</th>
            <th class="count third">Users</th>
          </tr>
          <tr v-for="(region, key) in locales.regions.slice(0, 10)" :key="key">
            <td>
              {{ region[0] }}
            </td>
            <td class="count">
              {{ region[1] }}
            </td>
          </tr>
        </table>
      </div>
      <div v-if="locales.countries" class="full third-800">
        <h3>Countries</h3>
        <table>
          <tr>
            <th class="two-third">Country</th>
            <th class="count third">Users</th>
          </tr>
          <tr v-for="(country, key) in locales.countries.slice(0, 10)" :key="key">
            <td>
              {{ country[0] }}
            </td>
            <td class="count">
              {{ country[1] }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Locales',
  props: {
    locales: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#locales
  margin-top 4em

  table
    width 100%

    td, th
      padding 0.3em

    .count
      text-align right
</style>
