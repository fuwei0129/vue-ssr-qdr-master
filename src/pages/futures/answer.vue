<template>
  <section>
    <mt-header title="回答" style="font-size:16px;">
      <mt-button class="normal" slot="left" @click="cancel()">取消</mt-button>
      <mt-button class="normal yellow" slot="right">发送</mt-button>
    </mt-header>
    <div class="form pd15">
      <textarea class="txt_question" placeholder="请输入您要向大咖提的问题"></textarea>
      <div class="uploads">
        <div class="ico_add" @click="chooseImg()"></div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  name:'answer',
  data(){
    return{

    }
  },
  methods:{
      cancel(){
        this.$router.back(-1);
      },
      chooseImg(){
        
      }
  }
}
</script>
<style>
.normal{
  font-size:14px!important;
}
.yellow{
  color:#f9a12c!important;
}
</style>
