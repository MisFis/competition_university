<template>
    <transition name="opacity">
        <div v-show="showPanel" class="question-container">
            <transition name="drop-right">
                <div class="question-wrapper" v-show="showPanel">
                    <ul class="question-items">
                        <li v-for="question in questions" class="question-item" @click="openThisQuestion(question.id)">
                            <span>{{question.name}}</span>
                            <i class="question-scope"
                               :class="{'question-scope-done': !question.isDone}"
                               :title="question.isDone ? 'Вы уже выполнили данное задание' : `Очки за '${question.name}'`">
                                {{!question.isDone ? question.scope : '🏆'}}
                            </i>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "TheQuestionWindowList",
        props: {
            showPanel: Boolean
        },
        computed: {
            questions() {
                return this.$store.state.questions
            }
        },
        methods: {
            openThisQuestion (id) {
                this.$router.push({name: 'PageQuestion', params: {id}})
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

    .question-container {
        color: white;
        position: absolute;
        top: 65px;
        z-index: 2000000;
        height: calc(100% - 65px);
        background: rgba(50, 50, 50, 0.64);
        width: 100%;
    }

    .question-wrapper {
        width: 30%;
        background: #1F2D38;
        height: 100%;
    }

    .question-items {
        text-align: left;

    }

    .question-item {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fffb17;
        padding: 30px;
        margin-bottom: 5px;
    }

    .question-scope {
        margin: 0  0 0 auto;
        background-color: #fffb17;
        color: black;
        height: 35px;
        width: 35px;
        border-radius: 15px;
        text-align: center;
        padding: 10px;
    }

    .question-scope-done {
        padding: 7px 0;
        font-size: 1.3em;
        background-color: #fffb17;
    }
</style>
