<template>
    <div id="myheader">
        <div id='header-list'>
            <ul>
                <li><a class="header-a" @click="change_page('Home')">Home</a></li>
                <li><a class="header-a" @click="change_page('UserCalls')">Мои звонки</a></li>
            </ul>
        </div>
        
        <div id='header-right'>
            <b-dropdown v-if="username" id="dropdown-left" :text="username" variant="primary" class="m-2">
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-dropdown>
        </div>
        <div id='header-right' v-if="this.$store.getters.USERDATA.Role == 'admin'">
            <b-dropdown :text="department_name" variant="warning" class="m-2">
                <b-dropdown-item 
                    v-for="department in departments" :key="department.id" @click="change_department(department.id)"
                >
                    {{department.name}}
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'myheader',
    data: function() {
        return {
            departments: [],
            department_name : ''
        }
    },
    computed: {
        username(){
            console.log('DATA',this.$store.getters.USERDATA)
            if (Object.keys(this.$store.getters.USERDATA).length != 0){
                return this.$store.getters.USERDATA.Surname + ' ' + this.$store.getters.USERDATA.Name[0] + '.' + this.$store.getters.USERDATA.Patronymic[0]
            }
            else{
                return ''
            }
        }  
    },
    methods: {
        logout(){
            localStorage.removeItem('user');
            document.location.reload();
        },
        change_page(page){
            this.$router.push({name: page})
        },
        change_department(id){
            const storagedata = this.$store.getters.USERDATA
            storagedata.departmentId = id
            this.$store.commit('SET_USERDATA', storagedata);
            localStorage.setItem('user', JSON.stringify(storagedata));
            document.location.reload();
        }
    },
    created(){

        axios.get('http://172.16.25.43:4000/api/department/all').then( res => {
            const data = res.data
            this.department_name = data.filter( el => {
                if (el.id == this.$store.getters.USERDATA.departmentId) return true
            })[0].name

            data.forEach(element => {
                this.departments.push({
                    id: element.id,
                    name: element.name
                })
            });
            console.log('DEPARTMENTS',this.departments)

        })
    }
}
</script>
<style scoped>
 #myheader{
     width: 98%;
     margin-left: 1%;
     margin-top: 0.5%;
     padding: 1%;
     height: 50px;
     background-color: rgba(43, 3, 223, 0.844);
     border-radius: 50px;
 }
 #header-right{
     float: right;
     padding: -1%;
     margin-top: -1%;
     margin-right: 10%;
 }
 #header-list{
    float: left;
    padding: -1%;
    margin-right: 10%;
    margin-top: -0.7%;
 }
 ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
 
  width: 600px;
 }

 li {
  float: left;
  margin-right: 7%;
 }

 .header-a {
  display: block;
  color: white;
  text-align: center;
  padding: 9px;
  text-decoration: none;
  border-radius: 50px;
 }

 .header-a:hover {
  cursor: pointer;
  background-color: rgba(234, 17, 96, 0.844);
  animation: color_change 0.4s;
 }
 @-webkit-keyframes color_change {
	from { background-color: blue; }
	to { background-color: rgba(234, 17, 96, 0.844); }
}
@-moz-keyframes color_change {
	from { background-color: blue; }
	to { background-color: rgba(234, 17, 96, 0.844); }
}
@-ms-keyframes color_change {
	from { background-color: blue; }
	to { background-color: rgba(234, 17, 96, 0.844); }
}
@-o-keyframes color_change {
	from { background-color: blue; }
	to { background-color: rgba(234, 17, 96, 0.844)red; }
}
@keyframes color_change {
	from { background-color: blue; }
	to { background-color: rgba(234, 17, 96, 0.844); }
}
</style>