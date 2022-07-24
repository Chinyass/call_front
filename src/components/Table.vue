<template>
    <div id='tablecdr'>
        <b-table id="my-table" 
                 striped hover 
                 :items="items"
        ></b-table>
        
    </div>
</template>
<script>
export default {
    props: {
      items: []
    },
}
</script>