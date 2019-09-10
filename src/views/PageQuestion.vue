<template>
    <div class="code-container">

        <ModalWindow v-if="question.isDone">
            <template v-slot:header>
                <h1>Задача уже выполнена</h1>
            </template>
            <span>Вы уже выполнили данную задачу, перейдите к другой задачи выбрав ее в разделе "Список задач"</span>
        </ModalWindow>

        <template>
            <div class="question-description">
                <h1>
                    Задача
                    <div class="button-group">
                        <button>{{timeExp}}</button>
                    </div>
                </h1>
                <div v-html="question.text"></div>
            </div>
            <div class="editor-wrapper">
                <h1>
                    Код
                    <div class="button-group">
                        <button @click="startNew">Сбросить</button>
                    </div>
                </h1>
                <div ref="editor" class="editor">
                </div>
            </div>
            <div class="logger-wrapper">
                <h1 class="logger-header">
                    Вывод
                    <div class="button-group">
                        <button @click="clearLog">Очистить</button>
                    </div>
                </h1>

                <div style="overflow: auto;height: 250px">
                <pre v-for="log in logger">
                    {{log}}
                </pre>
                </div>
            </div>
            <div style="position: absolute;bottom: 0;right: 0;height: 15px;width: 15px;background-color: transparent"
                 @click="clicked += 1"></div>
            <!--<div class="code-result" v-show="result">Результат исполнения: {{result}}</div>-->
        </template>
    </div>
</template>

<script>
    import ace from 'ace-builds/src-noconflict/ace.js'
    import 'ace-builds/src-noconflict/mode-javascript'
    import 'ace-builds/src-noconflict/ext-language_tools'
    import ModalWindow from "../components/ModalWindow";

    const MAX_EVAL_TIMEOUT = 1000;

    const isPrimitive = (val) => {
        const currType = typeof val
        return 'Boolean.Number.String.'.toLowerCase().indexOf(currType) > -1;

    }

    export default {
        name: "PageQuestion",
        components: {ModalWindow},
        props: {
            id: {
                type: Number
            }
        },
        data() {
            return {
                editor: null,
                result: null,
                clicked: 0,
                timeExper: 0,
                interval: null
            }
        },
        computed: {
            question() {
                return this.$store.getters['findQuestionById'](this.id)
            },
            logger() {
                return this.$store.state.logger
            },
            timeExp () {
                return  this.question.time - this.timeExper
            }
        },
        watch: {
            question() {
                this.clicked = 0
                this.editor.setValue(this.question.code)
                this.clearLog()
            },
            clicked(val) {
                if (val > 10) {
                    this.editor.setValue(this.question.rightCode)
                    this.clicked = 0
                }
            }
        },
        methods: {
            start() {
                if (!this.question.isDone) {
                const editor = this.editor
                const worker = new Worker(this.getJSBlob(`${editor.getValue()} ${this.question.appendCode}`));

                let cheked = {chek: false, testSuite: this.question.testSuite}

                let interval

                return new Promise((resolve, reject) => {
                    worker.postMessage(cheked); // Start the worker.
                    worker.onmessage = (e) => {
                        cheked = e.data
                        if (cheked.chek) {
                            this.result = e.data.result
                        }
                        e.data.logger.forEach(val => {
                            console.log(val)
                        })
                    }
                    setTimeout(() => {
                        if (!cheked.chek && cheked.result[0] !== 'error') {
                            return reject("Время исполнения вышло")
                        } else {
                            return resolve()
                        }
                    }, MAX_EVAL_TIMEOUT)

                    interval = setInterval(() => {
                        if (cheked.chek) {
                            return resolve()
                        }
                    }, MAX_EVAL_TIMEOUT / 10)
                })
                    .then(() => {
                        this.checkCode()
                    })
                    .catch(e => {
                        console.log(e)
                    }).finally(() => {
                        clearInterval(interval)
                    });
                }
            },
            jsWorkerCode(codeToInject) {
                return `
                let logger = []
                function consoleDesp() {
                    const log = console.log;
                    console.log = function () {
                    // log.call(this, ...arguments);
                    logger.push(JSON.stringify(arguments[0]))
                };
                }

                consoleDesp ()
                    onmessage = (message) => {
                        try {
                            ${codeToInject};

                            message.data.chek = true
                            self.postMessage({chek: true, result, logger});
                        } catch (e) {

                            console.log(e.message);
                            self.postMessage({chek: false,result: ['error'], logger});
                        }
                }`;
            },
            getJSBlob(jsCode) {
                const blob = new Blob([this.jsWorkerCode(jsCode)], {type: "text/javascript"});

                return URL.createObjectURL(blob);
            },
            startNew() {
                this.editor.setValue(this.question.code)
            },
            clearLog() {
                this.$store.commit('clearLogger')
            },
            checkCode() {
                this.result = this.result.filter(item => {
                    return item !== null && item !== undefined
                })
                if (this.result.length === 0) {
                    console.log('Функция должна возвращать значение')
                    return
                }
                let isTrue = true
                this.question.test.forEach((val, index) => {
                    if (isPrimitive(val)) {
                        if (this.result[index] != val) {
                            isTrue = false
                        }
                    } else if (val instanceof Array) {
                        val.forEach((val1, i) => {
                            if (this.result[index][i] != val1) {
                                isTrue = false
                            }
                        })
                    }
                })
                if (isTrue) {
                    this.$store.dispatch('completeQuestion', this.id)
                    console.log('👍Задача решена верна! Поздравляю!👍')
                } else {
                    console.log('Где то допущена ошибка!🤯')
                }

            }
        },
        mounted() {
            this.editor = ace.edit(this.$refs.editor);
            this.editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: false
            });
            // this.editor.setTheme("ace/theme/chrome");
            this.editor.session.setMode("ace/mode/javascript");
            this.editor.session.setUseWorker(false);
            this.editor.setValue(this.question.code)

           this.interval = setInterval(() => {
                this.timeExper += 1
            }, 1000)
        },

        beforeDestroy () {
            clearInterval(this.interval)
        }
    }
</script>

<style lang="scss" scoped>
    .code-container {
        display: flex;
        flex-direction: column;
        position: relative;
        flex-grow: 1;
        padding: 10px;
    }

    .question-description {
        background-color: white;
        text-align: left;
        padding: 10px;
        max-height: 20%;
        overflow: auto;
    }

    .editor-wrapper, .logger-wrapper {
        display: flex;
        flex-direction: column;
        text-align: left;
        background-color: white;
        padding: 10px;
        margin-top: 5px;
    }

    .editor-wrapper {
        flex-grow: 1;
    }

    .logger-wrapper {
        height: 30%;
    }

    .editor {
        flex-grow: 1;
        border-right: 1px solid black;
        padding: 5px;
    }

    .code-area {
        background: #1a1a20;
        color: white;
    }

    .code-result {
        padding: 10px;
        color: white;
    }

    h1 {
        font-size: 1.5em;
        margin-bottom: 10px;

        display: flex;
        .button-group {
            margin: -10px -10px 0 auto;

            button {
                cursor: pointer;
                font-size: 0.7em;

                background-color: #2c3e50;
                color: white;
                border: 1px;
                padding: 10px;

                &:hover {
                    background-color: #6589a3;
                }
            }
        }
    }
</style>
