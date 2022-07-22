<template>
    <div id='tablecdr'>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>
<script>
export default {
    props: {
      items: []
    },
    data() {
      return {
      }
    },
    components: {

    }
}
</script>