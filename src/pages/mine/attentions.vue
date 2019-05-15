<template>
  <section>
    <Head :title="title"></Head>
  </section>
</template>
<script>
import Head from '../../components/head.vue'
export default{
  name: "attentions",
  data(){
    return{
      title:'我的关注'
    }
  },
  components:{
    Head
  },
}
</script>
<style>
</style>
