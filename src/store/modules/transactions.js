import Vue from 'vue'
import { Actions } from '../actions'
import { Mutations } from '../mutations'
import moment from 'moment'
import _ from 'lodash'

function getDateString (value) {
  return moment(value).format('YYYY-MM-DD')
}

function getBlankItem () {
  return {
    amount: 0.00,
    description: null,
    date: getDateString(Date.now())
  }
}

function round (number, precision) {
  let shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision
    }

    let numArray = ('' + number).split('e')

    return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision))
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

function getTotalsPerMonth (objectArray, property) {
  return _.transform(objectArray, function (result, obj) {
    let date = obj[property]
    let key = date.substring(0, date.lastIndexOf('-'))
    if (!result[key]) {
      result[key] = []
    }
    result[key] = round(Number(result[key]) + Number(obj.amount), 2)
  }, {})
}

const state = {
  transaction: Object.assign({}, getBlankItem()),
  transactions: {
    'id2': {'date': '2018-01-01', 'description': 'Bus', 'amount': '-36'},
    'id3': {'date': '2018-01-01', 'description': 'Grocery', 'amount': '-212.09'},
    'id138': {'date': '2018-02-07', 'description': 'Tricycle', 'amount': '-14'},
    'id139': {'date': '2018-02-07', 'description': 'Lunch', 'amount': '-60'},
    'id167': {'date': '2018-02-15', 'description': 'Salary', 'amount': '16459.83'},
    'id168': {'date': '2018-02-15', 'description': 'Cheese', 'amount': '-25.5'},
    'id236': {'date': '2018-03-06', 'description': 'Tricycle', 'amount': '-48'},
    'id237': {'date': '2018-03-06', 'description': 'Lunch', 'amount': '-60'},
    'id239': {'date': '2018-03-07', 'description': 'Breakfast', 'amount': '-270'},
    'id380': {'date': '2018-04-18', 'description': 'Brunch', 'amount': '-147'},
    'id381': {'date': '2018-04-19', 'description': 'Lunch', 'amount': '-60'},
    'id433': {'date': '2018-05-10', 'description': 'Lunch', 'amount': '-60'},
    'id434': {'date': '2018-05-11', 'description': 'Drink', 'amount': '-20.25'},
    'id506': {'date': '2018-06-13', 'description': 'Dinner', 'amount': '-110'},
    'id507': {'date': '2018-06-13', 'description': 'Tricycle', 'amount': '-25'},
    'id508': {'date': '2018-06-13', 'description': 'Drink', 'amount': '-90'}
  },
  selectedMonth: null
}

const actions = {}

const getters = {
  transactionsForSelectedMonth: (state, getters) => {
    const selectedMonth = state.selectedMonth
    if (selectedMonth == null) return []
    return _.pickBy(state.transactions, function (object) {
      const date = object.date
      return date.substring(0, date.lastIndexOf('-')) === selectedMonth
    })
  },
  totalYearToDate: state => {
    const result = _.transform(state.transactions, function (result, value, id) {
      result[0] = round(Number(result) + Number(value.amount), 2)
    }, [])

    return round(result[0], 2)
  },
  monthlyTotals: state => {
    return getTotalsPerMonth(state.transactions, 'date')
  },
  totalForSelectedMonth: (state, getters) => {
    const monthlyTotals = getters.monthlyTotals
    return Object.keys(monthlyTotals).length > 0 ? monthlyTotals[state.selectedMonth] : 0
  }
}

const mutations = {
  [Actions.ADD] (state) {
    Vue.set(state.transactions, 'id' + Object.keys(state.transactions).length+1, Object.assign({}, state.transaction))
    state.transaction = Object.assign({}, getBlankItem())
  },
  [Mutations.UPDATE_FIELD] (state, {key, value}) {
    Vue.set(state.transaction, key, value)
  },
  [Mutations.DELETE] (state, key) {
    Vue.delete(state.transactions, key)
  },
  [Mutations.SET_MONTH] (state, value) {
    Vue.set(state, 'selectedMonth', value)
  }
}

export default {
  namespaced: true, state, actions, mutations, getters
}
