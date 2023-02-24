<template>
  <div id="app">
    <span :key="getkey">
      <!-- <Login @getKey="key" v-if="token === null || token === ''"></Login> -->
      <Menu :key="getkey"></Menu>
    </span>
  </div>
</template>

<script>
import Menu from '@/components/Menu/NavigationMenu.vue'

export default {
  name: 'App',
  data() {
    return {
      getkey: 0
    }
  },
  methods: {
    key(data) {
      this.getkey = data
      console.log(this.getkey)
    }
  },
  components: {
    Menu
  },
  created() {
    this.$store.commit('getToken', localStorage.getItem('token'))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
