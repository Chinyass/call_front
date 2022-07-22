<template>
  <div class="home">
    <center><h2>Звонки отдела ТСПД</h2></center>
    <b-container>
      <div>
        <label for="example-datepicker">От</label>
        <b-form-datepicker id="example-datepicker" v-model="value_from" class="mb-2"></b-form-datepicker>
      </div>
      <div>
        <label for="example-datepicker2">До</label>
        <b-form-datepicker id="example-datepicker2" v-model="value_to" class="mb-2"></b-form-datepicker>  
      </div>
      <CDRTABLE :items="items"/>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CDRTABLE from '../components/Table.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    CDRTABLE
  },
  data: () => {
    return {
      usernameData : JSON.parse(localStorage.getItem('user')),
      value_from: '',
      value_to: '',
      items: []
    }
  },
  mounted(){
    const today = new Date().toISOString().split('T')[0]
    this.value_from = today
    this.value_to = today
  },
  created(){
      axios.post('http://localhost:4000/api/cdr/department_calls',{
        departmentId: this.$store.getters.USERDATA.departmentId
      }).then( res => {
          const data = res.data
          console.log(data)
          this.items = data.map( el => {
              return {
                source: el.source,
                destination: el.destination,
                status: el.Status,
                startTime: el.AnswerTime,
                endTime: el.EndTime,
                reason: el.Reason
              }
          })
        }
      )
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
 h2{
   font-family: "Poppins", sans-serif;
 }
</style>
