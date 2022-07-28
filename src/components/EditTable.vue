<template>
    <div id='edittable'>
        <b-table dark bordered small :items="items"  :fields="fields" responsive="sm">
            <template #cell(filename)="data">
                <audio :src=data.item.filename controls></audio>
            </template>
            <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                    Изменить
                </b-button>
            </template>
        </b-table>
       <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
            <label for="sel">Type: </label>
            <b-form-select id='sel' v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
       </b-modal> 
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
      items: []
    },
    data() {
      return {
          infoModal: {
            id: 'info-modal',
            title: '',
            content: ''
          },
          fields: [
                {key: 'source',label: 'От'},
                {key: 'destination',label: 'Кому'},
                {key: 'status',label: 'Статус'},
                {key: 'startTime',label: 'Начало'},
                {key: 'endTime',label: 'Конец'},
                {key: 'reason',label: 'Причина'},
                {key: 'filename',label: 'Запись'},
                'actions'          
            ],
          selected: 'unknown',
          options: [
            { value: 'unknown', text: 'unknown' },
          ],
          cdrid: null,
      }
    },
    methods: {
        change(id){
            console.log(id)
            
        },
        info(item, index, button){
            console.log('ITEM',item)
            this.cdrid = item.id
            this.selected = item.reason
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
            
            axios.post('http://172.16.25.43:4000/api/cdr/updateReason',{id: this.cdrid, reason: this.selected }).then( res => {
                console.log(res.data)
            })
            this.cdrid = null
            this.selected = 'unknown'
        },
    },
    mounted(){
        axios.get(`http://172.16.25.43:4000/api/reason/department/${this.$store.getters.USERDATA.departmentId}`).then( res => {
            const data = res.data
            data.forEach(element => {
                this.options.push({
                    value: element.name ,
                    text: element.name
                })
            });
        })
    }
}
</script>