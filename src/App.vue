<template>
    <div id="app">
        <TheNavbar :referal="view" @showPanel="showPanel = !showPanel"/>
        <TheQuestionWindowList v-show="showPanel" :showPanel="showPanel" @close="showPanel = !showPanel"/>
        <router-view ref="view"/>
    </div>
</template>

<script>

    import TheNavbar from "./components/TheNavbar";
    import TheQuestionWindowList from "./components/TheQuestionWindowList";

    export default {
        components: {TheQuestionWindowList, TheNavbar},
        data() {
            return {
                view: null,
                showPanel: false
            }
        },
        computed: {

        },
        watch: {
            '$route': {
                handler: function () {
                    this.view = this.$refs.view
                }
            }
        },
        mounted() {
            const interval = setInterval(() => {
                if (this.$refs.view) {
                    this.view = this.$refs.view
                    clearInterval(interval)
                }
            }, 100)

        }
    }
</script>

<style lang="scss">

    @import "./assets/scss/clearfix";

    #app {
        display: flex;
        flex-direction: column;
        height: 100vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #1F2D38;
    }

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

    .drop-right-enter-active, .drop-right-leave-active, .opacity-enter-active, .opacity-leave-active {
        transition: all .5s;
    }

    .drop-right-enter, .drop-right-leave-to {
        transform: translateX(-550px);
    }

    .opacity-enter, .opacity-leave-to {
        opacity: 0;
    }
</style>
