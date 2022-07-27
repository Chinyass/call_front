<template>
    <div class="UserCalls">
        <b-container>
            <div>
                <label for="example-datepicker">От</label>
                <b-form-datepicker id="example-datepicker" v-model="value_from" class="mb-2"></b-form-datepicker>
            </div>
            <div>
                <label for="example-datepicker2">До</label>
                <b-form-datepicker id="example-datepicker2" v-model="value_to" class="mb-2"></b-form-datepicker>  
            </div>
            <CDREDITTABLE :items="items"/>
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
import axios from 'axios'
import CDREDITTABLE from '../components/EditTable.vue'
export default {
    name: 'UserCalls',
    data : () => {
        return {
            items: [],
            value_from: '',
            value_to: '',
            perPage: 10,
            currentPage: 1,
            rows: null
        }
    },
    watch: {
        value_from(newStart,oldStart){
            axios.post('http://172.16.25.43:4000/api/cdr/user',{
                userId: this.$store.getters.USERDATA.id,
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
                    id: el.id,
                    filename: 'http://172.16.25.45:4000/' + el.RecordFileName
                    }
                })
                })

        },
        value_to(newEnd,oldEnd){
            axios.post('http://172.16.25.43:4000/api/cdr/user',{
                userId: this.$store.getters.USERDATA.id,
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
                        id: el.id,
                        filename: 'http://172.16.25.45:4000/' + el.RecordFileName
                        }
                    })
                })
        },
        currentPage(newPage, oldPage){
            axios.post('http://172.16.25.43:4000/api/cdr/user', {
            userId: this.$store.getters.USERDATA.id,
            currentPage: newPage,
            perPage: this.perPage,
            startDate,
            endDate
        })
            .then( res => {
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
                        id: el.id,
                        filename: 'http://172.16.25.45:4000/' + el.RecordFileName

                    }
                })
                console.log(this.items)
            })
        }
    },
    components: {
        CDREDITTABLE
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

        axios.post('http://172.16.25.43:4000/api/cdr/user', {
            userId: this.$store.getters.USERDATA.id,
            currentPage: this.currentPage,
            perPage: this.perPage,
            startDate,
            endDate
        })
            .then( res => {
                const data = res.data.data
                this.rows = res.data.count
                this.items = data.map( el => {
        
                    return {
                        source: el.source,
                        destination: el.destination,
                        status: el.Status,
                        startTime: new Date(el.AnswerTime).toLocaleTimeString(),
                        endTime: new Date(el.EndTime).toLocaleTimeString(),
                        reason: el.Reason,
                        id: el.id,
                        filename: 'http://172.16.25.45:4000/' + el.RecordFileName

                    }
                })
                console.log(this.items)
            })
    }
}
</script>