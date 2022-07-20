<template>
    <div id="header">
        <div id='header-right'>
            <b-dropdown id="dropdown-left" :text="username" variant="primary" class="m-2">
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
            </b-dropdown>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'header',
    data: function() {
        return {
            username : JSON.parse(localStorage.getItem('user')).Name
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('user');
        }
    }
}
</script>
<style scoped>
 #header{
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
 }
</style>