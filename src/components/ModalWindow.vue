<template>
    <div class="modal-container">
        <div class="modal-header">
            <slot name="header"></slot>
        </div>
        <div class="modal-text">
            <slot></slot>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalWindow"
    }
</script>

<style scoped>
    .modal-container {
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        background-color: white;
        box-shadow: 2px 0 15px black;
        border: 2px solid black;
        width: 40%;
        height: 40%;
        z-index: 100;
    }

    .modal-header {
        margin: 20px auto;
    }

    .modal-text {
        margin: 0 30px;
        text-align: left;
    }
</style>
