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
        <input type="text" style="text-align: right;" placeholder="Amount" v-model="transaction.amount">
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
            <span :style=" transaction.transaction === 'subtract' ? 'color:red' : 'color:green'">
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

import { Mutations } from '../store/mutations'

export default {
  name: 'Main',
  components: { Datepicker },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('transactions', ['transactions', 'transaction', 'totalYearToDate']),
    ...mapGetters({
      totalYearToDate: 'transactions/totalYearToDate'
    })
  },
  methods: {
    ...mapMutations({
      addTransaction: 'transactions/add',
      updateField: 'transactions/' + Mutations.UPDATE_FIELD
    }),
    updateDate (date) {
      this.updateField({key: 'date', value: moment(date).format('YYYY-MM-DD')})
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
