<template>
  <div id="app">
    <Header />
    <div id="rview">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style>
  #rview{
    margin: 2%
  }
</style>
