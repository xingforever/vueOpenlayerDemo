<template>

<div class="mapTools">
  <el-button  type="info" icon="el-icon-picture"  class="toolButton" plain>规划专题图</el-button>  
  <el-button type="info" icon="el-icon-folder-add" class="toolButton"  plain>加载</el-button>  
   <el-button type="info" icon="el-icon-search" class="toolButton"    plain>查询</el-button>  
   <el-button type="info" icon="el-icon-map-location" class="toolButton" @click="location"  plain>定位</el-button>  
    <el-button  type="info" icon="el-icon-delete" class="toolButton" plain>清除</el-button>  
     <el-select  class="toolSelect" v-model="value" placeholder="工具">
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
import mapHelper from '../../utils/mapHelper';
export default {
 name: 'MapTool',
 data() {
      return {
        options: [{
          value: '测面积',
          label: '测面积'
        }, {
          value: '测距离',
          label: '测距离'
        }, {
          value: '绘制点',
          label: '绘制点'
        }, {
          value: '绘制线',
          label: '绘制线'
        }, {
          value: '绘制线',
          label: '绘制面'
        }],
        value: '工具'
      }
    },  
  methods: {
     location() {
        this.$prompt('请输入经纬度', '定位(lat,lon)', {
          confirmButtonText: '定位',
          cancelButtonText: '取消',          
        }).then(({ value }) => {
         //中文逗号分隔
          let arr = value.split('，');
          if(arr.length==1){
            //英文逗号分隔
             arr=value.split(',');
          }
          //输入数据 逗号分隔后不是2 个
          if(arr.length!=2){
            this.$message({
            type: 'info',
            message: '请输入经纬度，并用逗号分隔'
          }); 
          return;
          }          
          const msg= mapHelper.setLocation(arr)
          if (msg!='ok'){
             this.$message({
            type: 'info',
            message: msg
          }); 
          }
        })
      }
    
   
  
}
}

</script>
 
<style >
 .mapTools{
  position: absolute;
   top: 40px;
   right: 20px;
   z-index: 3;
   cursor: pointer;    
   border:0.5px solid rgb(162, 164, 168);
   background-color:rgb(203, 217, 243);
   border-radius:6px ;
     
 }
 .toolButton{
       margin-top:1px  !important;;
       margin-left:1px  !important;
       margin-right:1px  !important;
       padding: 8px 8px  !important;
       border-radius:6px  !important;
       font-size: 10px  !important ;
      
 }
 
 .toolSelect{
    font-size: 10px !important;  
    padding: 2px 2px  !important;
 
 }
.toolSelect .el-input__inner{
    padding: 0px 1px  !important;
    height: 28px!important;
    border-radius:6px  !important;
    width: 60px !important;
    font-size: 10px  !important ;
     background-color: #f4f4f5 !important;
 }
</style>