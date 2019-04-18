export default [
    {
        id: 1,
        name: `Заглавные буквы`,
        scope: 2,
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
                    }`,
        rightCode: `const ucFirst = (str) => {
                              // ...Ваш код...
                          if (str) {
                              return str.charAt(0).toUpperCase() + str.substring(1)
                          }
                          return ''
                    }`
    },
    {
        id: 2,
        name: `Рекурсия`,
        scope: 3,
        text: `Напишите функцию printList(list) при помощи рекурсии, которая возвращает value последовательно. По возможности использовать ESMAScript 6
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
                    }
                                   
                    `,
        rightCode: `const printList = (list) => {
                              // ...Ваш код...
                          if (list) {
                          let array = []
                              recursiveSearch (list, 'next', array)
                          }
                    }
                    
                    const recursiveSearch = (object, keyRecursive, newArray) => {
                   
                        Object.keys(object).forEach(item => {
                        
                                if(item === 'value') {
                                    newArray.push(object[item])
                                }
                                if (item === keyRecursive && object[item] != null) recursiveSearch(object[item], 'next')
                              }) 
                              }
                    
                    `
    },
]
