<template>
  <section>
    <Head :title="title"></Head>
  </section>
</template>
<script>
import Head from '../../components/head.vue'
export default{
  name: "fans",
  data(){
    return{
      title:'我的粉丝'
    }
  },
  components:{
    Head
  },
}
</script>
<style>
</style>
