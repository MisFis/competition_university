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
        findQuestionById: (state) => (id) => state.questions.find(question => question.id === id)
    },
    mutations: {
        pushLogger(state, data) {
            state.logger.push(data)
        },
        clearLogger(state) {
            state.logger = []
        }
    },
    actions: {}
})
