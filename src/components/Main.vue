<template>
  <div>
    <form class="ui form">
      <div class="fields">
        <div class="ui buttons">
          <button class="ui button" :class="{positive: transaction.transaction === 'add'}"
                  @click="transaction.transaction = 'add'">+</button>
          <div class="or"></div>
          <button class="ui button" :class="{negative: transaction.transaction === 'subtract'}"
                  @click="transaction.transaction = 'subtract'">-</button>
        </div>
        <input type="text" placeholder="Amount" v-model="transaction.amount">
      </div>
      <div class="field">
        <input type="text" placeholder="Description" v-model="transaction.description">
      </div>

      <datepicker :value="transaction.dateMillis" @selected="date => transaction.dateMillis = date.getTime()" format="MMMM dd, yyyy"></datepicker>
      <button class="ui positive button" type="submit" @click="addTransaction()">Submit</button>
    </form>
    <div v-for="(transaction, index) in transactions" :key="index">
      {{transaction}}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Main',
  components: { Datepicker },
  data () {
    return {
      dateMillis: Date.now()
    }
  },
  computed: {
    ...mapState('transactions', ['transactions', 'transaction']),
    date: {
      get () {
        return this.dateMillis
      },
      set (strDate) {
        this.dateMillis = new Date(strDate)
      }
    }
  },
  methods: {
    ...mapMutations({
      addTransaction: 'transactions/add'
    }),
    test (output) {
      console.log('new date', output.getTime())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
