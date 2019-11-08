<template>
  <section v-if="statuses.length" id="statuses">
    <h2>Statuses</h2>
    <table>
      <tr>
        <th width="30%">Date</th>
        <th>Content</th>
      </tr>
      <tr v-for="(status, key) in statuses" :key="key">
        <td valign="top"><small>{{ status.date | dateConv }}</small></td>
        <td valign="top" v-html="status.content"></td>
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
