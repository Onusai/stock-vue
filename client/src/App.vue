<template>
  <div id="viewport">
    <Home />
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}

</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}

#viewport {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #333940;
  color: rgb(0, 0, 0);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
