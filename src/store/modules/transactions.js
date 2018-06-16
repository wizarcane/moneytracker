import { Actions } from '../actions'

function getBlankItem () {
  return {
    transaction: Actions.SUBTRACT,
    amount: 0.00,
    description: null,
    dateMillis: Date.now()
  }
}

const state = {
  transaction: Object.assign({}, getBlankItem()),
  transactions: []
}

const actions = {}

const getters = {}

const mutations = {
  [Actions.ADD] (state) {
    state.transactions.push(Object.assign({}, state.transaction))
    state.transaction = Object.assign({}, getBlankItem())
  }
}

export default {
  namespaced: true, state, actions, mutations, getters
}
