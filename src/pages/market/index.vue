<template>
  <section>
    <div class="marketbox pdb52">
      <div class="tab-header">
				<span :class="index == currentIndex?'on':''" v-for='(item,index) in tabArr' :key="index"  @click="change(item.value,index)">{{item.text}}</span>
			</div>
      <div class="mar-table mt10">
        <div class="mar-tbody">
          <div class="item"
            :class="[item.ZhangDie > 0?'-market-color--red':'-market-color--green',(item.ZhangDie > 0 && changedIndex == index) ?'bgcolor-red':'',(item.ZhangDie < 0 && changedIndex == index) ?'bgcolor-green':'']"
            v-for="(item,index) in exponentsData"
            :key="index">
            <div class="cell">
              <div class="name">{{nameformat(item.ZhongWenJianCheng)}}</div>
              <div class="name-en">{{item.Obj}}</div>
            </div>
            <div class="cell">
              <div class="val">{{item.ZuiXinJia}} <span v-if="item.ZhangDie > 0" class="arrow -market-color">▲</span><span v-else class="arrow -market-color">▼</span></div>
              <time>{{item.ShiJian | datefilter2}}</time>
            </div>
            <div class="cell -market-color" style="flex:.8">
              <div class="ratio" v-if="item.ZhangDie > 0">+{{item.ZhangDie}}</div>
              <div class="ratio" v-else>{{item.ZhangDie}}</div>
              <div class="amount" v-if="item.ZhangDie > 0">+{{item.ZhangFu}}%</div>
              <div class="amount" v-else>{{item.ZhangFu}}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import global from '../../utils/global'
import common from '../../utils/common'
export default{
  // asyncData (store, route) {
  //   let model = {
  //     obj:'SH000001,SZ399001,SZ399005,SZ399006,SH000300,SH000016,SH000905,SH000006',
  //     field:'ZhongWenJianCheng,ShiJian,ZuiXinJia,ZhangDie,ZhangFu,ZuoShou,ZuiGaoJia,KaiPanJia,ZuiDiJia',
  //     mode:2,
  //     token:store.getters.getToken
  //   }
  //   return store.dispatch('fetchQuotes',{ model }) // 服务端渲染触发
  // },
  name:'marketindex',
  data(){
    return{
      currentIndex:0,
      obj:'SH000001,SZ399001,SZ399005,SZ399006,SH000300,SH000016,SH000905,SH000006',
      tabArr:[
        {text:'主要',value:0},
        {text:'商品',value:1},
        {text:'金融',value:2},
        {text:'指数',value:3},
        {text:'外汇',value:4}
      ],
      ws:null,
      changedIndex:-1
    }
  },
  // 计算属性
  computed: {
    exponentsData(){
      return this.$store.getters.getQuotes // store里的行情
    },
  },
  created(){
    let that = this
    that.$store.dispatch('getToken').then(()=>{
      that.getMarketData()
      that.initWebSocket()
    })
  },
  mounted(){
    var that = this
    setTimeout(() => {
      that.threadPoxi()
    }, 1000)
  },
  beforeDestroy(){
    this.ws.close()
  },
  methods:{
    removeClass(){
      var that = this
      setTimeout(() => {
        that.changedIndex = -1
      },1000)
    },
    threadPoxi(){  // 实际调用的方法
        //若是ws开启状态
        if (this.ws.readyState === this.ws.OPEN) {
            this.websocketsend()
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.ws.readyState === this.ws.CONNECTING) {
            let that = this;//保存当前对象this
            setTimeout(function () {
                that.websocketsend()
            }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
            this.initWebSocket();
            let that = this;//保存当前对象this
            setTimeout(function () {
                that.websocketsend()
            }, 500);
        }
    },
    initWebSocket(){
      const wsuri = 'ws://gw.yundzh.com/ws?token='+this.$store.getters.getToken;
      this.ws = new WebSocket(wsuri);
      this.ws.onmessage = this.websocketonmessage;
      this.ws.onclose = this.websocketclose;
    },
    websocketonmessage(e){ //数据接收
      let that = this;
      var blob = e.data;
      var reader = new FileReader();
      reader.readAsText(blob,'utf-8');
      reader.onload = function (evt) {
        var data = evt.target.result
        const res = JSON.parse(data)
        let RepDataStkData = res.Data.RepDataStkData
        if(RepDataStkData.length > 1){
          return
        }
        RepDataStkData = RepDataStkData[0]
        for (var i = 0; i < that.$store.getters.getQuotes.length; i++) {
          if(RepDataStkData.Obj === that.$store.getters.getQuotes[i].Obj){
            const index = that.$store.getters.getQuotes.indexOf(that.$store.getters.getQuotes[i])
            that.changedIndex = index
    　　　　 that.$store.getters.getQuotes.splice(index, 1, RepDataStkData)
    　　　　 break
          }
        }
        that.removeClass()
      };
    },
    websocketsend(){//数据发送
      console.log('发送数据')
      let that = this
      const field = 'ZhongWenJianCheng,ShiJian,ZuiXinJia,ZhangDie,ZhangFu,ZuoShou,ZuiGaoJia,KaiPanJia,ZuiDiJia'
      let uri = api.stkdata+"?obj=" + this.obj + "&field=" + field + "&sub=1" + "&qid=" + this.random() + "&output=json"
      this.ws.send(uri);
    },
    websocketclose(e){  //关闭
      console.log("断开连接");
    },
    random(){
      let code = "";
      let codeLength = 6;
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y');
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 35);
        code += random[index];
      }
      return code
    },
    change(val,index){ //条件筛选
      this.currentIndex = index
      if(val==0){ //主要
        this.obj = 'SH000001,SZ399001,SZ399005,SZ399006,SH000300,SH000016,SH000905,SH000006'
      }else if(val==1){ //商品
        this.obj = 'ZCAP0001,ZCCF0001,ZCCY0001,ZCFG0001,ZCJR0001,ZCLR0001,ZCMA0001,ZCOI0001,ZCPM0001,ZCRI0001,ZCRM0001,ZCRS0001,ZCSF0001,ZCSM0001,ZCSR0001,ZCTA0001,ZCWH0001,ZCZC0001'
      }else if(val==2){ //金融
        this.obj = 'SFIF0001,SFIF0002,SFIF0003,SFIF0004,SFIH0001,SFIH0002,SFIH0003,SFIH0004,SFIC0001,SFIC0002,SFIC0003,SFIC0004'
      }else if(val==3){ //指数
        this.obj = 'SH000001,SZ399001,SZ399006,IXDJIA,IXNDX,IXSPX,IXN225,IXFTSE'
      }else if(val==4){ //外汇
        this.obj = 'FXUSDCNH,FXUSDCNY,FXCNYEUR,FXCNYGBP,FXCNYJPY,FXEURCNH,FXCNHHKD,FXCNHJPY,FXJPYCNY,FXAUDCNH,FXAUDCNY,FXCADCNY'
      }
      this.getMarketData()
      var that = this
      setTimeout(() => {
        that.threadPoxi()
      }, 1000)
    },
    getMarketData(){ //获取主要行情数据
      let that = this
      let model = {
        obj:this.obj,
        field:'ZhongWenJianCheng,ShiJian,ZuiXinJia,ZhangDie,ZhangFu,ZuoShou,ZuiGaoJia,KaiPanJia,ZuiDiJia',
        mode:2,
        token:this.$store.getters.getToken
      }
      http.postmarket(api.stkdata,model).then((response) => {
        if(response.data.Err == 0){
          that.$store.commit('setQuotes',response.data.Data.RepDataStkData)
        }else{
          console.log("出错");
        }
      });
    },
    nameformat(val){
      if(val.length>5){
        val = val.substr(0,7)+'...'
      }
      return val
    }
  }
}
</script>
<style scoped>
/* tab-header */
.tab-header {
	height: 38px;
	margin-bottom: 10px;
	display: flex;
	background: #131a25;
}
.tab-header span {
	flex: 1;
	height: 38px;
	line-height: 38px;
	text-align: center;
	color: #7b92a5;
}
.tab-header span.on {
	color: #e18c2f;
}
.mar-table{
		background:#131a25;
}
.mar-table .mar-thead{
	display:flex;
}
.mar-table .mar-thead span{
	flex:1;
	padding:15px 0;
	text-align: center;
	color:#7b92a5;
}
.mar-table .item{
	border-bottom:1px solid #202a3e;
	padding: 15px 0;
	display:flex;
	text-align: center;
}
.mar-table .item:last-child{
  border-bottom:none;
}
.bgcolor-red{
  background: -webkit-linear-gradient(to right, #161f2e, #e5714c); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #161f2e, #e5714c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	transition: all .3s;
}
.bgcolor-green{
  background: -webkit-linear-gradient(to right, #161f2e, #51ac89); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #161f2e, #51ac89); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	transition: all .3s;
}
.mar-table .item .cell{
	flex:1;
}
.mar-table .item .cell .name{
  color:#fff;
  font-weight: bold;
	height:20px;
	line-height: 20px;
}
.mar-table .item .cell .val{
	font-size: 18px;
	font-weight: bold;
	margin-bottom:3px;
	height:20px;
	line-height: 20px;
}
.-market-color--red .-market-color {
	color: #ff433e;
}

.-market-color--green .-market-color {
	color: #22c760;
}
.-market-color--red .val{
	color:#ff433e;
}
.-market-color--green .val{
	color:#22c760;
}
.mar-table .item .cell .name-en,.mar-table .item .cell time{
    margin-top: 5px;
    font-size: 10px;
    color: #aeaeae;
    font-weight: bold;
}
.mar-table .item .cell .arrow{
    font-size: 12px;
}
.mar-table .item .cell .ratio {
    font-size: 14px;
    font-weight: bold;
		height:20px;
		line-height: 20px;
}
.mar-table .item .cell .amount {
    font-size: 12px;
    margin-top: 2px;
}
</style>
