<template>
 <div class="">
 <mapFeatureinfo :tabledata="tableData"></mapFeatureinfo>
 </div>
</template>
 
<script>
import mapFeatureinfo from '@/views/map/map-featureinfo'

export default {
 name: 'test',
 data () {
 return {
 msg:'Welcome to your vueName',
 tableData: [
        {key: '单号', value: '1001'},
        {key: '商品名称', value: '篮球'},
        {key: '价格', value: '120.00'},
        {key: '订单日期', value: '2017-03-01'},
        {key: '付款方式', value: '在线支付'},
        {key: '收货地址', value: '北京市海淀区西北旺镇'},
      ],
 }
 },
 components:{
   mapFeatureinfo
 }
}
</script>
 
<style scoped >
 
</style>