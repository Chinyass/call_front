<template>
  <div class="main" >
    <h1>Welcome!</h1>
    <br />
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Email"
      :style="input"
      v-model="form.email"
    />
    <br />
    <br />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      :style="input"
      v-model="form.password"
    />
    <br />
    <br />
    <input
      type="button"
      value="Done!"
      class="button"
      id="done"
      @click="Login"
    />
    <br />
    <br />
    <b-alert v-if="incorrect_data" show variant="danger"><p>Некорректные данные</p></b-alert>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data: function(){
      return {
          form : {
              email : '',
              password : ''
          },
          incorrect_data: false
      }
  },
  methods: {
      Login(){
          axios.post('http://localhost:4000/api/user/login',{Email: this.form.email, Password: this.form.password }).then( res => {
              const data = res.data
              console.log('ot servera',data)
              this.$store.commit('SET_USERDATA', data);
              localStorage.setItem('user', JSON.stringify(data));
              this.$router.push({name: 'Home'})
          }).catch( e => {
              console.log('ot servera',e)
              this.incorrect_data = true

              setTimeout( () => {
                this.incorrect_data = false
              },3000)
          })
        
      }
  },
  mounted(){
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { 
        this.Login();
      }
    });
  }
};
</script>

<style>
/* Import Poppins font: */
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.main {
  background-color: rgba(43, 3, 223, 0.844);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}
h1 {
  cursor: default;
  user-select: none;
}
input {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
input:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}
input:active {
  box-shadow: 0px 0px 8px -5px #000000;
}
#done {
  background: lightgreen;
}
.button {
  cursor: pointer;
  user-select: none;
}
img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}
img:hover {
  box-shadow: 0px 0px 8px -5px #000000;
  cursor: pointer;
  border-radius: 200rem;
}
</style>