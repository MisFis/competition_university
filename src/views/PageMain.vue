<template>
    <div class="code-container">
        <div  ref="pointer" class="pointer">|</div>
        <div class="editor-wrapper">
        <div ref="editor" id="editor">
            {{question[this.indexQuestion].code}}
        </div>
            <div class="question-description">
                {{question[this.indexQuestion].text}}
            </div>
        </div>
        <div v-show="result">Результат исплнения: {{result}}</div>
        <button @click="start">СТАРТ</button>
    </div>
</template>

<script>
    import ace from 'ace-builds/src-noconflict/ace.js'
    import 'ace-builds/src-noconflict/theme-chrome'
    import 'ace-builds/src-noconflict/mode-javascript'

    const MAX_EVAL_TIMEOUT = 1000;

    export default {
        name: "PageMain",
        data () {
            return {
                editor: null,
                result: null,
                question: [
                    {
                        text: 'Вам необходимо написать функцию которая реализует сложение двух чисел',
                        test: [15, 25, 35, 45],
                        testSuite: [[10,5], [15, 10], [25, 10], [35, 10]],
                        appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(summNumber(val[0], val[1]))
                        })
                        `,
                        code:
                            `const summNumber = (first, second) => {
                              // ...Ваш код...
                            return first + second
                    }

                    `,
                    },
                    {
                        text: `Напишите функцию ucFirst(str), которая возвращает строку str с заглавным первым символом`,
                        test: ['Вася','Ива', ],
                        testSuite: ['вася','ива', null],
                        appendCode: `
                        const result = []
                        message.data.testSuite.forEach((val) => {
                            result.push(ucFirst(val))
                        })
                        `,
                        code:
                            `const ucFirst = (str) => {
                              // ...Ваш код...
                          if (str) {
                              return str.charAt(0) + str.substring(1)
                          }
                          return ''
                    }

                    `,
                    },
                ],
                indexQuestion: 1
            }
        },
        methods: {
            start () {
                const editor = this.editor
                const worker = new Worker(this.getJSBlob(`${editor.getValue()} ${this.question[this.indexQuestion].appendCode}`));

                let cheked = {chek: false, testSuite: this.question[this.indexQuestion].testSuite}

                let interval

                return new Promise((resolve, reject) => {
                    worker.postMessage(cheked); // Start the worker.
                    worker.onmessage = (e) => {
                        cheked = e.data
                        this.result = e.data.result
                    }
                    setTimeout(() => {
                        if (!cheked.chek) {
                            return reject("Время исполнения вышло")
                        } else {
                            return resolve()
                        }
                    }, MAX_EVAL_TIMEOUT)

                    interval = setInterval(() => {
                        if (cheked.chek) {
                            console.log('inter')
                            return resolve()
                        }
                    }, 100)
                })
                    .then(() => {
                        console.log('nextOperation')
                    })
                    .catch(e => {
                    console.log(e)
                }).finally(() => {
                        clearInterval(interval)
                    });
            },
            jsWorkerCode (codeToInject) {
                return `
                    onmessage = (message) => {
                        try {
                            ${codeToInject};

                            message.data.chek = true
                            self.postMessage({chek:'true', result});
                        } catch (e) {
                            console.error(e);
                        }
                }`;
            },
            getJSBlob(jsCode) {
                const blob = new Blob([this.jsWorkerCode(jsCode)], { type: "text/javascript" });

                return URL.createObjectURL(blob);
            }
        },
        mounted() {
            this.editor = ace.edit(this.$refs.editor);
            this.editor.setTheme("ace/theme/chrome");
            this.editor.session.setMode("ace/mode/javascript");
        }

    }
</script>

<style lang="scss" scoped>
    .code-container {
        position: relative;
        height: 100%;
        cursor: text;
    }


    .editor-wrapper {
        display: flex;
        height: 45%;
        text-align: left;
    }


    #editor {
        flex-grow: 1;
        border-right: 1px solid black;
        padding: 5px;
    }

    .question-description {
        width: 40%;
        padding: 5px;
    }

    .code-area {
        background: #1a1a20;
        color: white;
    }

    .pointer {
        position: absolute;
        height: 21px;
        visibility: hidden;
    }

</style>
