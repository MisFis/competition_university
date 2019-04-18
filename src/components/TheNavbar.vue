<template>
    <nav class="nav-container">
        <ul class="nav-items">
            <li class="nav-item" @click="$emit('showPanel')">Список задач</li>
            <li class="nav-item" :class="{disabled: !isPageMain}" @click="startCode()">Проверить</li>
        </ul>
        <div class="scope-wrapper"  title="Ваш текущий счет">
            <span class="scope-text" style="">🏅</span>
            <div class="current-scope">{{scope}}</div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TheNavbar",
        props: {
            referal: Object
        },
        computed: {
            isPageMain () {
                return this.$route.name === 'PageQuestion'
            },
            scope() {
                return this.$store.state.scope
            }
        },
        methods: {
            startCode () {
                if (this.isPageMain) {
                    this.referal.start()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-container {
        display: flex;
        align-items: center;
        padding: 10px;
    }

    .nav-items {
        display: flex;
        flex-grow: 1;
    }

    .current-scope {
        margin: 0  0 0 auto;
        background-color: #fffb17;
        color: black;
        height: 35px;
        width: 35px;
        border-radius: 15px;
        text-align: center;
        padding: 10px;
    }

    .scope-wrapper {
        display: flex;
        align-items: center;
        width: 90px;
        color: white
    }

    .scope-text {
        color: white;
        font-size: 1.8em
    }

    .nav-item {
        padding: 10px;
        list-style-type: none;
        font-weight: bold;
        color: white;
        cursor: pointer;
    &.router-link-exact-active {
         color: #42b983;
     }

    &.disabled {
         color: #587791;
     }
    }
</style>
