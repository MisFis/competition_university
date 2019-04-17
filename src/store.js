import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logger: [],
        question: [
            {
                name: `Заглавные буквы`,
                scope: 5,
                text: `Напишите функцию ucFirst(str), которая возвращает строку str с заглавным первым символом`,
                test: ['Вася', 'Ива', ""],
                testSuite: ['вася', 'ива', null],
                appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(ucFirst(val))
                        })
                        `,
                code:
                    `const ucFirst = (str) => {
                              // ...Ваш код...
                              console.log(str)
                          if (str) {
                              return str.charAt(0).toUpperCase() + str.substring(1)
                          }
                          return ''
                    }`,
            },
            {
                name: `Рекурсия по JSON`,
                scope: 5,
                text: `Напишите функцию printList(list) при помощи рекурсии, которая возвращает value от верхнего до нижнего уровня последовательно. 
                       По возможности использовать ESMAScript 6
                <pre> 
                    {
                        value: 1,
                        next: {
                            value: 2,
                            next: {
                                value: 3,
                                next: {
                                    value: 4,
                                    next: null
                                }
                            }
                        }
                    }
                    </pre>
                `,
                test: [
                    [1, 2, 3, 4]
                ],
                testSuite: [
                    {
                    value: 1,
                    next: {
                        value: 2,
                        next: {
                            value: 3,
                            next: {
                                value: 4,
                                next: null
                            }
                        }
                    }
                }
                ],
                appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(printList(val))
                        })
                        `,
                code:
                    `const printList = (list) => {
                              // ...Ваш код...
                          if (list) {
                            let array = []
                            recursiveSearch (list, 'next', array)
                            return array
                          }
                    }
                    
                    const recursiveSearch = (object, keyRecursive, newArray) => {
                   
                        Object.keys(object).forEach(item => {
                        
                                if(item === 'value') {
                                    newArray.push(object[item])
                                }
                                if (item === keyRecursive && object[item] != null) recursiveSearch(object[item], 'next', newArray)
                              }) 
                              }
                    
                    `,
            },
        ],
    },
    mutations: {
        pushLogger(state, data) {
            state.logger.push(data)
        }
    },
    actions: {}
})
