<template>
   <div>
     <div class="infotable">
       <el-table
         :show-header="false"
         :data="tableData"          
         style="width:200px"
         height:30      
         max-height:300
         :stripe="true"
       >         
         <el-table-column min-width="10" prop="key"></el-table-column>
         <el-table-column  min-width="10"  prop="value"></el-table-column>
        
       </el-table>
     </div>
   </div>
</template>
<script>
export default {
  name: "featureinfo-detail",  
  props:['tableData'],  
}
</script>
<style scoped>
.infotable{
    height:200px !important;   
    width: 300px;
    overflow :auto;
}
</style>

