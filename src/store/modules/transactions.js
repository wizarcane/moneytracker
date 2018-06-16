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

const state = {
  transaction: Object.assign({}, getBlankItem()),
  transactions: {
    'id0': {
      amount: -1.00,
      description: 'Spend 1',
      date: '2018-04-24'
    },
    'id1': {
      amount: -2.00,
      description: 'Spend 2',
      date: '2018-04-25'
    },
    'id2': {
      amount: -3.00,
      description: 'Spend 3',
      date: '2018-05-01'
    },
    'id3': {
      amount: 4.00,
      description: 'Add 4',
      date: '2018-05-02'
    },
    'id4': {
      amount: -5.00,
      description: 'Spend 5',
      date: '2018-05-03'
    },
    'id5': {
      amount: -6.00,
      description: 'Spend 6',
      date: '2018-06-01'
    }
  }
}

const actions = {}

const getters = {
  totalYearToDate: state => {
    const result = _.transform(state.transactions, function (result, value, id) {
      console.log(result, value, id, value.amount)
      result[0] = round(Number(result) + Number(value.amount), 2)
    }, [])

    return round(result[0], 2)
  }
}

const mutations = {
  [Actions.ADD] (state) {
    Vue.set(state.transactions, 'id' + Object.keys(state.transactions).length, Object.assign({}, state.transaction))
    state.transaction = Object.assign({}, getBlankItem())
  },
  [Mutations.UPDATE_FIELD] (state, {key, value}) {
    Vue.set(state.transaction, key, value)
  }
}

export default {
  namespaced: true, state, actions, mutations, getters
}
