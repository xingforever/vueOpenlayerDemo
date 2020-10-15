<template>
   <div>
     <div class="infotable">
       <el-table
        :key="Math.random()"         
         :data="tableDatas"       
         height:30      
         max-height:300
         :stripe="true"
         :row-style="{height: '5px'}"
       >         
         <el-table-column min-width="10" prop="key" label="属性名"></el-table-column>
         <el-table-column  min-width="10"  prop="value"  label="属性值"></el-table-column>
        
       </el-table>
     </div>
   </div>
</template>
<script>
export default {
  name: "map-featureinfo",  
  data() {
    return{
     tableDatas:this.tableData
    }
  },
   props:['tableData']
}
</script>
<style lang="less" scoped>
.infotable{
    height:180px !important;   
    width: 250px;
    overflow :auto;
}
/deep/ .el-table .cell {
  
    line-height: 15px;
}
/deep/ .el-table td, .el-table th {
    padding: 5px 0px 10px 0px;
    
    }
    /deep/ .el-table__header , .is-leaf{
      padding: 0px;
    }
  

</style>

