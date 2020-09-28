<template>
    <div class="countrydiv">

        <el-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="manual"  
  >
    
      <div>
            <span>市区：</span>
            <el-link type="primary" >章贡区</el-link>
            <el-link type="primary" >南康区</el-link>
            <el-link type="primary" >瑞金市</el-link>
            <el-link type="primary" >赣县区</el-link>
        </div>
        <div>
            <span>县：</span>
            <el-link>信丰县</el-link>
            <el-link>大余县</el-link>
            <el-link>上犹县</el-link>
            <el-link>崇义县</el-link>
            <el-link> 安远县</el-link>
            <el-link>定南县</el-link>
            <el-link>全南县</el-link>
            <el-link>宁都县</el-link>
            <el-link>于都县</el-link>
            <el-link>兴国县</el-link>
            <el-link>会昌县</el-link>
            <el-link>寻乌县</el-link>
            <el-link>石城县</el-link>
            <el-link>龙南县</el-link>
        </div>
         <el-button slot="reference">click 激活</el-button>
  </el-popover>
      

    </div>
</template>

<script>
    export default {
        name: 'map-locationsearch',
        data() {
            return {
                msg: 'Welcome to your vueName'
            }
        }
    }
</script>

<style scoped >
.countrydiv{
    width: 100px;
    height: 80px;
    float: right;
}
</style>