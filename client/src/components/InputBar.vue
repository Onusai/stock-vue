<template>
    <div id="input-bar">
        <input id="sym-input" type="text" @keypress.enter="inputEntered" @keydown.esc="clearInput" />
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
}

#sym-input {
    margin: 0px 10px;
    border:rgb(180, 180, 180) 1px solid;
    border-radius: 6px;
}
</style>

