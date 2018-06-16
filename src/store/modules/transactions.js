import Vue from 'vue'
import { Actions } from '../actions'
import { Mutations } from '../mutations'
import moment from 'moment'

function getDateString (value) {
  return moment(value).format('YYYY-MM-DD')
}

function getBlankItem () {
  return {
    transaction: Actions.SUBTRACT,
    amount: 0.00,
    description: null,
    date: getDateString(Date.now())
  }
}

const state = {
  transaction: Object.assign({}, getBlankItem()),
  transactions: {
    'id0': {
      transaction: Actions.SUBTRACT,
      amount: 1.00,
      description: 'Spend 1',
      date: '2018-04-24'
    },
    'id1': {
      transaction: Actions.SUBTRACT,
      amount: 2.00,
      description: 'Spend 2',
      date: '2018-04-25'
    },
    'id2': {
      transaction: Actions.SUBTRACT,
      amount: 3.00,
      description: 'Spend 3',
      date: '2018-05-01'
    },
    'id3': {
      transaction: Actions.ADD,
      amount: 4.00,
      description: 'Add 4',
      date: '2018-05-02'
    },
    'id4': {
      transaction: Actions.SUBTRACT,
      amount: 5.00,
      description: 'Spend 5',
      date: '2018-05-03'
    },
    'id5': {
      transaction: Actions.SUBTRACT,
      amount: 6.00,
      description: 'Spend 6',
      date: '2018-06-01'
    }
  }
}

const actions = {}

const getters = {}

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
