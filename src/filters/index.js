import moment from 'moment'
const filter = {
  datefilter:function(value){
    return moment(value*1000).format('YYYY-MM-DD HH:mm:ss')
  },
  datefilter1:function(value){
    return moment(value).format('YYYY-MM-DD')
  },
  datefilter2:function(value){
    return moment(value*1000).format('MM/DD-HH:mm')
  },
  timefilter:function(value){
    return moment(value).format('HH:mm')
  },
  timefilter1:function(value){
    return moment(value).format('hh:mm:ss')
  },
  yearformat:function(value){
    return moment(value).format('YYYY')
  },
  monthformat:function(value){
    return moment(value).format('MM')
  },
  dayformat:function(value){
    return moment(value).format('DD')
  },
  twodecimal:function(val){
    val = Number(val)
    return val.toFixed(2)
  },
}

export default filter;
