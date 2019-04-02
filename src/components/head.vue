<template>
  <mt-header :title="title" fixed>
    <router-link to="" slot="left">
      <mt-button icon="back" @click="$router.back(-1)"></mt-button>
    </router-link>
  </mt-header>
</template>
<script>
export default{
  props:{
    title:{
      type:String,
      default: () => {
        return ''
      }
    }
  },
  data(){
    return{

    }
  },
}
</script>
<style>
.mint-header{
  background-color: #131a25;
}
</style>
