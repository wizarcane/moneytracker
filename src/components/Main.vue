<template>
  <div>
    <!-- table -->
    <table class="ui celled compact table">
      <thead>
        <tr>
          <th colspan="4">
            <div class="ui right floated pagination menu">
              <a v-for="(yearMonth, key) in Object.keys(monthlyTotals)" :key="key" class="item"
                 v-bind:class="{active: yearMonth === selectedMonth}"
                 @click="updateMonth(yearMonth)">{{ yearMonth }}</a>
              <!--<a class="icon item">-->
              <!--<i class="right chevron icon"></i>-->
              <!--</a>-->
            </div>
          </th>
        </tr>
        <tr>
          <th class="three wide">Date</th>
          <th>Description</th>
          <th class="three wide">Amount</th>
          <th class="one wide">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, key) in transactionsForSelectedMonth" :key="key">
          <td class="three wide">{{ transaction.date }}</td>
          <td>{{ transaction.description }}</td>
          <td class="right aligned three wide">
            <span :style=" transaction.amount < 0 ? 'color:red' : 'color:green'">
              {{ transaction.amount | currencyFormat }}
            </span>
          </td>
          <th class="one wide">
            <button class="ui left attached mini button">Edit</button>
            <button class="right attached ui mini button" @click="deleteItem(key)">Delete</button>
          </th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th style="text-align: right;">Month's Total</th>
          <th style="text-align: right;">{{ totalForSelectedMonth | currencyFormat }}</th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th style="text-align: right;">Year-to-Date Total</th>
          <th style="text-align: right;">{{ totalYearToDate | currencyFormat }}</th>
          <th></th>
        </tr>
      </tfoot>
    </table>


    <form class="ui form segment">
      <div class="fields">
        <div class="ui buttons">
          <button class="ui button" :class="{positive: operation === '+'}"
                  @click="updateOperation('+')">+</button>
          <div class="or"></div>
          <button class="ui button" :class="{negative: operation === '-'}"
                  @click="updateOperation('-')">-</button>
        </div>
        <input type="text" style="text-align: right;" placeholder="Amount"
               :value="Math.abs(transaction.amount)"
               @keyup="event => updateAmount(event.target.value)">
      </div>
      <div class="fields">
        <input type="text" placeholder="Description" v-model="transaction.description">
      </div>

      <datepicker :value="transaction.date" @selected="updateDate" format="MMMM dd, yyyy"/>
      <button class="ui positive button" type="submit" @click="addTransaction()">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

// import { Actions } from '../store/actions'
import { Mutations } from '../store/mutations'
import { Operation } from '../Constants'

export default {
  name: 'Main',
  components: { Datepicker },
  data () {
    return {
      operation: Operation.SUBTRACT
    }
  },
  computed: {
    ...mapState('transactions', ['transactions', 'transaction', 'totalYearToDate', 'selectedMonth']),
    ...mapGetters({
      totalYearToDate: 'transactions/totalYearToDate',
      monthlyTotals: 'transactions/monthlyTotals',
      totalForSelectedMonth: 'transactions/totalForSelectedMonth',
      transactionsForSelectedMonth: 'transactions/transactionsForSelectedMonth'
    })
  },
  methods: {
    ...mapMutations({
      addTransaction: 'transactions/add',
      updateField: 'transactions/' + Mutations.UPDATE_FIELD,
      setMonth: 'transactions/' + Mutations.SET_MONTH,
      deleteItem: 'transactions/' + Mutations.DELETE
    }),
    updateDate (date) {
      this.updateField({key: 'date', value: moment(date).format('YYYY-MM-DD')})
    },
    updateAmount (value) {
      if (this.operation === Operation.ADD) {
        this.updateField({key: 'amount', value: Math.abs(value)})
      } else {
        this.updateField({key: 'amount', value: (-1.00 * Math.abs(value))})
      }
    },
    updateOperation (operation) {
      this.operation = operation
      this.updateAmount(this.transaction.amount)
    },
    updateMonth (value) {
      this.setMonth(value)
    }
  },
  mounted: function () {
    const months = Object.keys(this.monthlyTotals)
    if (months.length > 0) {
      this.updateMonth(months[months.length - 1])
    }
  },
  filters: {
    currencyFormat (amount) {
      if (amount == null) return '₱ 0.00'
      return '₱ ' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
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
