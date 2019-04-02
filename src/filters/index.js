import moment from 'moment'
const filter = {
  datefilter:function(value){
    return moment(value*1000).format('YYYY-MM-DD HH:mm:ss')
  },
  datefilter1:function(value){
    return moment(value).format('YYYY-MM-DD')
  },
  timefilter:function(value){
    return moment(value).format('HH:mm')
  },
  twodecimal:function(val){
    val = Number(val)
    return val.toFixed(2)
  },
}

export default filter;
