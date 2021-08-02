<template>
    <div id="input-bar">
        <input id="sym-input" type="text" @keypress.enter="inputEntered" @keydown.esc="clearInput" />
        <div class="buttons">
            <button type="button" @click="update">Update All</button>
            <button type="button" @click="trash">Delete All</button>
        </div>
    </div>
</template>


<script>


export default {
    name: 'InputBar',
    data() {
        return {
            input: null,
            text: "",
            data: {}
        }
    },
    methods: {
        inputEntered() {
            this.text = this.input.value.toLowerCase();
            this.$emit('sym-entered', this.text);
            this.clearInput();
        },
        clearInput() {
            this.input.value = "";
            this.text = "";
        },
        trash() {
            this.$emit('input-signal', 'trash-all');
        },
        update() {
            this.$emit('input-signal', 'update-all')
        }
    },
    mounted() {
        this.input = document.getElementById('sym-input');
    }
}
</script>


<style scoped>
#input-bar {
    width: 100%;
    height: 45px;
    background-color:rgb(72, 92, 110);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#sym-input {
    margin: 0px 10px;
    border:rgb(180, 180, 180) 1px solid;
    border-radius: 6px;
    width: 200px;
}

button {
    background-color: rgba(0, 0, 0, 0.308);
    border: rgb(87, 87, 87) 1px solid;
    color: rgb(170, 170, 170);
    border-radius: 5px;
    margin-left: 5px;
}

button:hover {
    color: rgb(255, 255, 255);
}

.buttons {
    margin-right: 7px;
}
</style>

