<template>
    <nav class="nav-container">
        <ul class="nav-items">
            <li class="nav-item" @click="$emit('showPanel')">Список задач</li>
            <li class="nav-item" :class="{disabled: !isPageMain}" @click="startCode">Проверить</li>
        </ul>
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
                return this.$route.name === 'Main'
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
        padding: 10px;
    }

    .nav-items {
        display: flex;
        width: 100%;
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
