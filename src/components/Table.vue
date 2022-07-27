<template>
    <div id='tablecdr'>
        <b-table id="my-table" 
                 dark bordered small
                 :items="items"
                 :fields="fields"
        >
            
            <template #cell(filename)="data">
                <audio :src=data.item.filename controls></audio>
            </template>

        </b-table>
        
    </div>
</template>
<script>
export default {
    props: {
      items: []
    },
    data: () => {
        return {
            fields: [
                {key: 'source',label: 'От'},
                {key: 'destination',label: 'Кому'},
                {key: 'status',label: 'Статус'},
                {key: 'startTime',label: 'Начало'},
                {key: 'endTime',label: 'Конец'},
                {key: 'reason',label: 'Причина'}, 
                {key: 'filename',label: 'Запись'},       
            ],
        }
    },
    mounted(){
        console.log('TE',this.items)
    }
}
</script>