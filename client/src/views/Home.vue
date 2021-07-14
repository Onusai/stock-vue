<template>
    <div class="page">
      <input id="input" type="text" @keypress.enter="submit">
      <p>entered: {{ text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return {
            text: ""
        }
    },
    methods: {
        submit() {
            this.text = document.getElementById('input').value;
            console.log(this.text)
        }
    }
}
</script>


<style>
.page {
  width: 50%;
  height: 100%;
  
}
</style>>
