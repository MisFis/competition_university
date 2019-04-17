<template>
    <div class="code-container">
        <div class="question-description">
            <h1 >Задача</h1>
            <div v-html="question[this.indexQuestion].text"></div>
        </div>
        <div class="editor-wrapper">
            <h1>Код</h1>
            <div ref="editor" class="editor">
                {{question[this.indexQuestion].code}}
            </div>
        </div>
        <div class="logger-wrapper">
            <h1>Консоль</h1>
            <div style="overflow: auto;height: 250px">
                <pre v-for="log in logger">
                    {{log}}
                </pre>
            </div>
        </div>
        <div class="code-result" v-show="result">Результат исполнения: {{result}}</div>
    </div>
</template>

<script>
    import ace from 'ace-builds/src-noconflict/ace.js'
    import 'ace-builds/src-noconflict/theme-chrome'
    import 'ace-builds/src-noconflict/mode-javascript'

    const MAX_EVAL_TIMEOUT = 1000;

    export default {
        name: "PageMain",
        data() {
            return {
                editor: null,
                result: null,
                indexQuestion: 1
            }
        },
        computed: {
            question() {
                return this.$store.state.question
            },
            logger() {
                return this.$store.state.logger
            }
        },
        watch: {},
        methods: {
            start() {
                const editor = this.editor
                const worker = new Worker(this.getJSBlob(`${editor.getValue()} ${this.question[this.indexQuestion].appendCode}`));

                let cheked = {chek: false, testSuite: this.question[this.indexQuestion].testSuite}

                let interval

                return new Promise((resolve, reject) => {
                    worker.postMessage(cheked); // Start the worker.
                    worker.onmessage = (e) => {
                        cheked = e.data
                        this.result = e.data.result
                        e.data.logger.forEach(val => {
                            console.log(val)
                        })
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
                            return resolve()
                        }
                    }, MAX_EVAL_TIMEOUT / 10)
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
                            self.postMessage({chek:'true', result, logger});
                        } catch (e) {
                            console.log(e);
                        }
                }`;
            },
            getJSBlob(jsCode) {
                const blob = new Blob([this.jsWorkerCode(jsCode)], {type: "text/javascript"});

                return URL.createObjectURL(blob);
            },
            pushInConsole() {

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
    }

    .editor-wrapper, .logger-wrapper {
        display: flex;
        flex-direction: column;
        height: 45%;
        text-align: left;
        background-color: white;
        padding: 10px;
        margin-top: 5px;
    }

    .logger-wrapper {
        height: 20%;
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
    }
</style>
