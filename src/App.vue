<template>
  <MainHeader title="Vue Laravel Todo App" />
      <router-view />
</template>

<script>
import MainHeader from './components/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-image: radial-gradient(circle at center center, transparent, rgb(33, 33, 33)), repeating-linear-gradient(135deg, rgb(33, 33, 33) 0px, rgb(33, 33, 33) 2px, transparent 2px, transparent 10px, rgb(33, 33, 33) 10px, rgb(33, 33, 33) 11px, transparent 11px, transparent 21px), repeating-linear-gradient(45deg, rgb(47, 47, 47) 0px, rgb(47, 47, 47) 4px, transparent 4px, transparent 8px), linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33));
  min-height: 100vh;
  color: #fff;
}

a {
  text-decoration: none;
  transition: all .4s ease-in-out;
}

a:hover {
  opacity: .8;
}

main {
  padding: 1rem;
}
</style>