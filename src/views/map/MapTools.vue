<template>

<div class="mapTools">
  <el-button  class="toolButton" plain>规划专题图</el-button>  
   <el-button class="toolButton"  plain>查询</el-button>  
   <el-button class="toolButton" plain>定位</el-button>  
    <el-button class="toolButton" plain>清除</el-button>  
     <el-select class="toolSelect" v-model="value" placeholder="工具">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 </div>
</template>
 
<script>
export default {
 name: 'vueName',
 data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
}
</script>
 
<style >
 .mapTools{
     float:right; 
     margin-top:20px;
     margin-right:5px;
     border:0.5px solid gray
 }
 .toolButton{
       margin-top:1px;
       margin-left:1px;
       padding-left: 1px;
 }
 
 .toolSelect{
     width: 90px;
 }
</style>