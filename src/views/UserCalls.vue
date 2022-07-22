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
        axios.post('http://localhost:4000/api/cdr/department_calls',{
            departmentId: this.$store.getters.USERDATA.departmentId
        }).then( res => {
                const data = res.data
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