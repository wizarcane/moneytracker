<template>
  <div>
    <form class="ui form">
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
      <div class="field">
        <input type="text" placeholder="Description" v-model="transaction.description">
      </div>

      <datepicker :value="transaction.date" @selected="updateDate" format="MMMM dd, yyyy"/>
      <button class="ui positive button" type="submit" @click="addTransaction()">Submit</button>
    </form>
    <!-- table -->
    <table class="ui celled table">
      <thead>
        <tr>
          <th class="three wide">Date</th>
          <th>Description</th>
          <th class="three wide">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, key) in transactions" :key="key">
          <td class="three wide">{{ transaction.date }}</td>
          <td>{{ transaction.description }}</td>
          <td class="right aligned three wide">
            <span :style=" transaction.amount < 0 ? 'color:red' : 'color:green'">
              {{ transaction.amount | currencyFormat }}
            </span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th style="text-align: right;">Total</th>
          <th style="text-align: right;">{{ totalYearToDate | currencyFormat }}</th>
        </tr>
        <!--<tr>-->
          <!--<th colspan="3">-->
            <!--<div class="ui right floated pagination menu">-->

              <!--&lt;!&ndash;<a class="icon item">&ndash;&gt;-->
              <!--&lt;!&ndash;<i class="left chevron icon"></i>&ndash;&gt;-->
              <!--&lt;!&ndash;</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<a class="item">1</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<a class="item">2</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<a class="item">3</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<a class="item">4</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<a class="icon item">&ndash;&gt;-->
              <!--&lt;!&ndash;<i class="right chevron icon"></i>&ndash;&gt;-->
              <!--&lt;!&ndash;</a>&ndash;&gt;-->
            <!--</div>-->
          <!--</th>-->
        <!--</tr>-->
      </tfoot>
    </table>
    <div>
      {{ totalsPerMonth }}
    </div>
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
    ...mapState('transactions', ['transactions', 'transaction', 'totalYearToDate']),
    ...mapGetters({
      totalYearToDate: 'transactions/totalYearToDate',
      totalsPerMonth: 'transactions/totalsPerMonth'
    })
  },
  methods: {
    ...mapMutations({
      addTransaction: 'transactions/add',
      updateField: 'transactions/' + Mutations.UPDATE_FIELD
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
