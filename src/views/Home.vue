<template>
  <div class="home">
    <center><h2>Звонки отдела {{department_name}}</h2></center>
    <b-container>
      <div>
        <label for="example-datepicker">От</label>
        <b-form-datepicker id="example-datepicker" v-model="value_from" class="mb-2"></b-form-datepicker>
      </div>
      <div>
        <label for="example-datepicker2">До</label>
        <b-form-datepicker id="example-datepicker2" v-model="value_to" class="mb-2"></b-form-datepicker>  
      </div>
      <CDRTABLE :items="items" />
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
        ></b-pagination>
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
      value_from: '',
      value_to: '',
      department_name:'',
      items: [],
      perPage: 10,
      currentPage: 1,
      rows: null
    }
  },
  watch: {
      currentPage(newPage, oldPage){
        console.log(newPage)
        axios.post('http://localhost:4000/api/cdr/department_calls',{
          departmentId: this.$store.getters.USERDATA.departmentId,
          currentPage: newPage,
          perPage: this.perPage
        }).then( res => {
            const data = res.data.data
            this.rows = res.data.count
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
        })
    }
  },
  mounted(){
    const today = new Date().toISOString().split('T')[0]
    this.value_from = today
    this.value_to = today
  },
  created(){
      axios.get(`http://localhost:4000/api/department/${this.$store.getters.USERDATA.departmentId}`)
        .then( res => {
          const data = res.data
          this.department_name = data.name
        })
      axios.post('http://localhost:4000/api/cdr/department_calls',{
        departmentId: this.$store.getters.USERDATA.departmentId,
        currentPage: this.currentPage,
        perPage: this.perPage
      }).then( res => {
          const data = res.data.data
          this.rows = res.data.count
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
