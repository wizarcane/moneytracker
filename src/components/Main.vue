<template>
  <form class="ui form">
    <div class="fields">
      <div class="ui buttons">
        <button class="ui button" :class="{positive: transaction === 'add'}"
                @click="setTransaction('add')">+</button>
        <div class="or"></div>
        <button class="ui button" :class="{negative: transaction === 'subtract'}"
                @click="setTransaction('subtract')">-</button>
      </div>
      <input type="text" placeholder="Amount" v-model="amount">
    </div>
    <div class="field">
      <input type="text" placeholder="Description" v-model="description">
    </div>
    <div class="field">
      <input type="text" placeholder="Date" v-model="date">
    </div>
    <button class="ui positive button" type="submit">Submit</button>
  </form>
</template>

<script>
const constants = {}
constants.Transaction = {TRANSACTION_ADD: 'add', TRANSACTION_SUBSTRACT: 'subtract'}

export default {
  name: 'Main',
  data () {
    return {
      transaction: constants.Transaction.TRANSACTION_SUBSTRACT,
      amount: 0.00,
      description: 'hi',
      date: 'hello'
    }
  },
  methods: {
    setTransaction (value) {
      this.transaction = value
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
