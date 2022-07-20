<template>
    <div id="myheader">
        <div id='header-list'>
            <ul>
                <li><a class="header-a" @click="change_page('Home')">Home</a></li>
                <li><a class="header-a" @click="change_page('Login')">to Login</a></li>
            </ul>
        </div>
        <div id='header-right'>
            <b-dropdown v-if="username" id="dropdown-left" :text="username" variant="primary" class="m-2">
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myheader',
    data: function() {
        return {
         
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
        }
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
  margin-right: 12%;
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