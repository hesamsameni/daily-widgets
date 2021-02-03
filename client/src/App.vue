<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Layouts/Header.vue'
export default {
  components: { Header },
}
</script>
