export default [
    {
        id: 1,
        name: `Заглавные буквы`,
        scope: 1,
        isDone: false,
        time: 900,
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
        time: 900,
        isDone: false,
        text: `Напишите функцию printList(list) при помощи рекурсии, которая возвращает value последовательно. По возможности использовать ESMAScript 6.
                Пример JSON
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
        test: [[1, 2, 3, 4], [6, 9, 13, 15, 18]],
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
            },
            {
                value: 6,
                next: {
                    value: 9,
                    next: {
                        value: 13,
                        next: {
                            value: 15,
                            next: {
                                value: 18,
                                next: null
                            }
                        }
                    }
                }
            },
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
                              let array = []
                          if (list) {
                              recursiveSearch (list, 'next', array)
                          }
                          return array
                    }
                    
                    const recursiveSearch = (object, keyRecursive, newArray) => {
                   
                        Object.keys(object).forEach(item => {
                               
                                if(item === 'value') {
                                    newArray.push(object[item])
                                }
                                if (item === keyRecursive && object[item] != null) recursiveSearch(object[item], 'next', newArray)
                              }) 
                              }
                    
                    `
    },
    {
        id: 3,
        name: `Отфильтровать анаграммы`,
        scope: 4,
        time: 900,
        isDone: false,
        text: `Анаграммы – слова, состоящие из одинакового количества одинаковых букв, но в разном порядке. Например:
        <ul>
            <li>воз - зов</li>
            <li>киборг - гробик</li>
            <li>корсет - костер - сектор</li>
        </ul>
        
       <p style="margin-top: 10px;font-weight: bold">
            Задача: Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
        </p>
        `,
        test: [["ЗОВ","гробик","сектор"], ["солепромышленность","нерасторжимость","ватерполистка"]],
        testSuite: [
            ["воз", "киборг", "корсет", "ЗОВ", "гробик", "костер", "сектор"],
            ['лесопромышленность', 'солепромышленность', 'старорежимность', 'нерасторжимость', 'австралопитек',  'ватерполистка']
        ],
        appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(aclean(val))
                        })
                        `,
        code:
            `const aclean = (arr) => {
                              // ...Ваш код...
                    }`,
        rightCode: `const aclean = (arr) => {
                              // ...Ваш код...
                                // этот объект будем использовать для уникальности
                               var obj = {};

                                for (var i = 0; i < arr.length; i++) {
                                // разбить строку на буквы, отсортировать и слить обратно
                                const sorted = arr[i].toLowerCase().split('').sort().join('');
  
                                obj[sorted] = arr[i]; // сохраняет только одно значение с таким ключом
                                }

                                var result = [];

                                // теперь в obj находится для каждого ключа ровно одно значение
                                for (var key in obj) result.push(obj[key]);
                                return result
                    }`
    },
    {
        id: 4,
        name: `Факториал числа`,
        scope: 2,
        time: 900,
        isDone: false,
        text: `Реализуйте функцию factorial(), которая возвращает факториал переданного ей числа`,
        test: [1, 120, 3628800, 1307674368000, 2432902008176640000],
        testSuite: [1, 5, 10, 15, 20],
        appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(factorial(val))
                        })
                        `,
        code:
            `const factorial = (num) => {
                              // ...Ваш код...
                    }`,
        rightCode: `const factorial = (num) => {
                    let result = 1
                    if (num <= 1) {
                        return result
                    }
                    for(let i = 0; i <= num; i++) {
                        if (i > 1) {
                        result = result * i
                        }
                    }

                    return result
                    }`
    },
    {
        id: 5,
        name: `Реверс строки`,
        scope: 2,
        time: 900,
        isDone: false,
        text: `Реализуйте функцию reverse(), которая обращает порядок следования символов переданной ей строки. Не пользуйтесь встроенной функцией reverse().`,
        test: ['cba', 'ytrewq', 'lkjhgfdsa', 'siFsiM', 'MisFis'],
        testSuite: ['abc', 'qwerty', 'asdfghjkl', 'MisFis', 'siFsiM'],
        appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(reverse(val))
                        })
                        `,
        code:
            `const reverse = (str) => {
                              // ...Ваш код...
                    }`,
        rightCode: `const reverse = (str) => {
                    const lenght = str.length
                    let reversStr = ''
                    for (let i = lenght; i >= 0; i--) {
                        reversStr += str.charAt(i)
                    }
                    return reversStr
                    }`
    },
]
