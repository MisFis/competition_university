import Vue from 'vue'
import Vuex from 'vuex'
import questions from './data/questions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        scope: 0,
        logger: [],
        questions: questions,
    },
    getters: {
        findQuestionById: (state) => (id) => state.questions.find(question => question.id === id),
        findQuestionIndexById: (state) => (id) => state.questions.findIndex(question => question.id === id)
    },
    mutations: {
        pushLogger(state, data) {
            state.logger.push(data)
        },
        clearLogger(state) {
            state.logger = []
        },
        addScope (state, data) {
            state.scope += data
        },
        doneQuestion (state, index) {
            state.questions[index].isDone = true
        }
    },
    actions: {
        completeQuestion ({state,commit, getters}, id) {
            const question = getters['findQuestionById'](id)
            const questionIndex = getters['findQuestionIndexById'](id)
            commit('addScope', question.scope)
            commit('doneQuestion', questionIndex)
        }
    }
})
