<template>
    <div id='edittable'>
        <b-table small striped hover :items="items"  :fields="fields" responsive="sm">
            <template #cell(index)="data">
                {{ data.item.id }}
            </template>
            <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                    Изменить
                </b-button>
            </template>
        </b-table>
       <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
            <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
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
                'index',
                'source',
                'destination',
                'status',
                'startTime',
                'endTime',
                'reason',
                'actions'          
            ],
          selected: 'unknown',
          options: [
            { value: 'unknown', text: 'unkown' },
            { value: 'Концультация', text: 'Концультация' },
          ],
          cdrid: null,
      }
    },
    methods: {
        change(id){
            console.log(id)
            
        },
        info(item, index, button){
            this.infoModal.title = `Row index: ${index}`
            this.infoModal.content = JSON.stringify(item, null, 2)
            this.cdrid = item.id
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
            console.log(this.cdrid,this.selected)
            axios.post('http://localhost:4000/api/cdr/updateReason',{id: this.cdrid, reason: this.selected }).then( res => {
                console.log(res.data)
            })
            this.cdrid = null
            this.selected = 'unknown'
        },
    },
}
</script>