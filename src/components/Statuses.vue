<template>
  <section v-if="statuses.length && Object.values(statuses[0]).length" id="statuses">
    <h2>Statuses</h2>
    <table>
      <tr class="flex">
        <th class="third">Date</th>
        <th class="two-third">Content</th>
      </tr>
      <tr v-for="(status, key) in statuses" :key="key" class="flex">
        <td valign="top" class="third">
          {{ status.date | dateConv }}
        </td>
        <td class="two-third" valign="top" v-html="status.content"></td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'Statuses',
  props: {
    statuses: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#statuses
  margin-top 4em

  table
    width 100%

    .flex
      margin 0
      width 100%

      td
        padding 0.75em
</style>
