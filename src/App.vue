<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.getuserInfo()
  },
  methods:{
    //初始化，判断有没有用户信息，有则自动登录
    getuserInfo(){
      this.$ajax.get('autologin')
        .then(res=>{
          if(res.data.code===200){
            this.$store.commit('user',res.data.user)
          }else {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
