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
        currentPage(newPage, oldPage){
            axios.post('http://localhost:4000/api/cdr/user',{
            userId: this.$store.getters.USERDATA.id,
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
            })
        }
    },
    components: {
        CDREDITTABLE
    },
    mounted(){
        const today = new Date().toISOString().split('T')[0]
        this.value_from = today
        this.value_to = today
    },
    created(){
        axios.post('http://localhost:4000/api/cdr/user', {
            userId: this.$store.getters.USERDATA.id,
            currentPage: this.currentPage,
            perPage: this.perPage
        })
            .then( res => {
                const data = res.data.data
                this.rows = res.data.count
                this.items = data.map( el => {
                    return {
                        source: el.source,
                        destination: el.destination,
                        status: el.Status,
                        startTime: el.AnswerTime,
                        endTime: el.EndTime,
                        reason: el.Reason,
                        id: el.id

                    }
                })
                console.log(this.items)
            })
    }
}
</script>