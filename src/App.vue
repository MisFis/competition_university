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
                    const interval = setInterval(() => {
                        if (this.$refs.view) {
                            if (this.$refs.view !== this.view) {
                                this.view = this.$refs.view
                                clearInterval(interval)
                            }
                        }
                    }, 100)
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
