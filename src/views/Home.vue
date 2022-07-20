<template>
  <div class="home">
    <p>asdasd {{usernameData}}</p>
    <CDRTABLE />
  </div>
</template>

<script>
// @ is an alias to /src
import CDRTABLE from '../components/Table.vue'

export default {
  name: 'Home',
  components: {
    CDRTABLE
  },
  data: () => {
    return {
      usernameData : JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>
