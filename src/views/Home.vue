<template>
  <div class="home">
    <center><h2>Звонки отдела {{department_name}}</h2></center>
      <b-row>
        <b-col cols="2">
          <b-card bg-variant="primary" text-variant="white" header="Отчет">
            <b-card-text 
              v-for="report in report_data" :key="report.name"
              
            >
              <b-list-group>
                  <b-list-group-item >
                    {{report.name}}
                    <b-list-group>
                      <b-list-group-item v-for="(report_name,index) in Object.keys(report.data)" :key="index"
                      >
                        <div v-if="report_name != 'total'">
                          <small>{{report_name}}</small>
                          <small class="count_rep">   {{report.data[report_name]}}</small>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                    Total <smal class="count_rep">{{report.data['total']}} </smal>
                  </b-list-group-item>
              </b-list-group>
            </b-card-text>
            Total {{rows}}
          </b-card>
        </b-col>
        <b-col cols="10">
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
        </b-col>
      </b-row>
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
      rows: null,
      report_data: []
    }
  },
  watch: {
      value_from(newStart,oldStart){
          axios.post('http://172.16.25.43:4000/api/cdr/department_calls',{
            departmentId: this.$store.getters.USERDATA.departmentId,
            currentPage: this.currentPage,
            perPage: this.perPage,
            startDate: newStart,
            endDate : this.value_to
          }).then( res => {
              const data = res.data.data
              this.rows = res.data.count
              this.items = data.map( el => {
                  return {
                  source: el.source,
                  destination: el.destination,
                  status: el.Status,
                  startTime: new Date(el.AnswerTime).toLocaleDateString() + ' ' + new Date(el.AnswerTime).toLocaleTimeString(),
                  endTime: new Date(el.EndTime).toLocaleDateString() + ' ' +  new Date(el.EndTime).toLocaleTimeString(),
                  reason: el.Reason,
                  filename: 'http://172.16.25.45:4000/' + el.RecordFileName
                }
              })
            })

            axios.post('http://172.16.25.43:4000/api/cdr/department_report',{
              departmentId: this.$store.getters.USERDATA.departmentId,
              startDate : this.value_from, 
              endDate : this.value_to
            }).then( res => {
              const data = res.data
              this.report_data = data
            })

      },
      value_to(newEnd,oldEnd){
          axios.post('http://172.16.25.43:4000/api/cdr/department_calls',{
              departmentId: this.$store.getters.USERDATA.departmentId,
              currentPage: this.currentPage,
              perPage: this.perPage,
              startDate : this.value_from, 
              endDate: newEnd
            }).then( res => {
                const data = res.data.data
                this.rows = res.data.count
                this.items = data.map( el => {
                    return {
                      source: el.source,
                      destination: el.destination,
                      status: el.Status,
                      startTime: new Date(el.AnswerTime).toLocaleDateString() + ' ' + new Date(el.AnswerTime).toLocaleTimeString(),
                      endTime: new Date(el.EndTime).toLocaleDateString() + ' ' +  new Date(el.EndTime).toLocaleTimeString(),
                      reason: el.Reason,
                      filename: 'http://172.16.25.45:4000/' + el.RecordFileName
                    }
                })
              })
          
          axios.post('http://172.16.25.43:4000/api/cdr/department_report',{
            departmentId: this.$store.getters.USERDATA.departmentId,
            startDate : this.value_from, 
            endDate : this.value_to
          }).then( res => {
            const data = res.data
            this.report_data = data
          })

      },
      currentPage(newPage, oldPage){
        axios.post('http://172.16.25.43:4000/api/cdr/department_calls',{
          departmentId: this.$store.getters.USERDATA.departmentId,
          currentPage: newPage,
          perPage: this.perPage,
          startDate : this.value_from, 
          endDate : this.value_to
        }).then( res => {
            const data = res.data.data
            this.rows = res.data.count
            
            this.items = data.map( el => { 
                return {
                  source: el.source,
                  destination: el.destination,
                  status: el.Status,
                  startTime: new Date(el.AnswerTime).toLocaleDateString() + ' ' + new Date(el.AnswerTime).toLocaleTimeString(),
                  endTime: new Date(el.EndTime).toLocaleDateString() + ' ' +  new Date(el.EndTime).toLocaleTimeString(),
                  reason: el.Reason,
                  filename: 'http://172.16.25.45:4000/' + el.RecordFileName
                }
            })
        })

        axios.post('http://172.16.25.43:4000/api/cdr/department_report',{
          departmentId: this.$store.getters.USERDATA.departmentId,
          startDate : this.value_from, 
          endDate : this.value_to
        }).then( res => {
          const data = res.data
          this.report_data = data
        })
    }
  },
  mounted(){
    
  },
  created(){
      const today = new Date().toISOString().split('T')[0]
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate()+1)
      
      this.value_from = today
      this.value_to = tomorrow.toISOString().split('T')[0]
      const startDate = this.value_from 
      const endDate = this.value_to
      console.log(startDate,endDate)

      axios.get(`http://172.16.25.43:4000/api/department/${this.$store.getters.USERDATA.departmentId}`)
        .then( res => {
          const data = res.data
          this.department_name = data.name
        })
      axios.post('http://172.16.25.43:4000/api/cdr/department_calls',{
        departmentId: this.$store.getters.USERDATA.departmentId,
        currentPage: this.currentPage,
        perPage: this.perPage,
        startDate,
        endDate
      }).then( res => {
          const data = res.data.data
          console.log(data)
          this.rows = res.data.count

          this.items = data.map( el => {
              return {
                source: el.source,
                destination: el.destination,
                status: el.Status,
                startTime: new Date(el.AnswerTime).toLocaleDateString() + ' ' + new Date(el.AnswerTime).toLocaleTimeString(),
                  endTime: new Date(el.EndTime).toLocaleDateString() + ' ' +  new Date(el.EndTime).toLocaleTimeString(),
                reason: el.Reason,
                filename: 'http://172.16.25.45:4000/' + el.RecordFileName
              }
          })
        }
      )

      axios.post('http://172.16.25.43:4000/api/cdr/department_report',{
        departmentId: this.$store.getters.USERDATA.departmentId,
        startDate,
        endDate
      }).then( res => {
        const data = res.data
        this.report_data = data
      })
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
 h2{
   font-family: "Poppins", sans-serif;
 }
 .count_rep{
   color: blue
 }
</style>
