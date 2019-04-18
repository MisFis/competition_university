<template>
    <transition name="opacity">
        <div v-show="showPanel" class="question-container">
            <transition name="drop-right">
                <div class="question-wrapper" v-show="showPanel">
                    <ul class="question-items">
                        <li v-for="question in questions" class="question-item" @click="openThisQuestion(question.id)">
                            <span>{{question.name}}</span>
                            <span class="question-scope">{{question.scope}}</span>
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

</style>
