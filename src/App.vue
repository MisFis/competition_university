<template>
    <div id="app">
        <nav class="nav-container">
            <ul class="nav-items">
                <li class="nav-item">Задачи</li>
                <li class="nav-item">Проверить</li>
            </ul>
        </nav>
        <router-view/>
    </div>
</template>

<style lang="scss">

    @import "./assets/scss/clearfix";

    #app {
        height: 100vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

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
        color: #2c3e50;
        cursor: pointer;
        &.router-link-exact-active {
            color: #42b983;
        }
    }

</style>
