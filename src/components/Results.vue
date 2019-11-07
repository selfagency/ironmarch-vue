<template>
  <section id="results">
    <div v-show="!results.length" class="status" role="status">
      No results to display.
    </div>

    <table v-if="results.length && method !== 'user'">
      <tr>
        <th>Author</th>
        <th>Date</th>
        <th>Preview</th>
      </tr>
      <tr v-for="(result, key) in results" :key="key">
        <td>{{ result.author.name | truncate(25) }}</td>
        <td>{{ result.date | dateConv }}</td>
        <td>{{ result.content | strip | truncate(125) }}</td>
      </tr>
    </table>

    <table v-if="results.length && method === 'user'">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>IP</th>
        <th>Last Login</th>
      </tr>
      <tr v-for="(result, key) in results" :key="key">
        <td>{{ result.name }}</td>
        <td>{{ result.email }}</td>
        <td>{{ result.statuses.length ? result.statuses[0].content : null | strip | truncate(125) }}</td>
        <td>{{ result.ip }}</td>
        <td>{{ result.lastLogin | dateConv }}</td>
      </tr>
    </table>

    <div v-show="results.length >= params.limit" class="more" role="none">
      <button @click="more">
        More results
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Results',
  computed: {
    ...mapState('search', ['method', 'results', 'params'])
  },
  methods: {
    ...mapActions('search', ['more'])
  }
}
</script>

<style lang="stylus" scoped>
#results
  margin-top 2em
  padding 2em

.status
  display flex
  justify-content center
  align-items center

.more
  display flex
  justify-content center
  align-items center
</style>
