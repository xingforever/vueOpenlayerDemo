<template>

 
        <el-popover placement="bottom" width="300"  trigger="click"  >
            <div class="countrydiv">
        <div class="areas">
            <span>市区：</span>            
                <el-link v-for="area in areas" :key="area"  type="primary" > 
                    {{area}}
                    </el-link>  
        </div>
        <div class="countrycontent">          
            <div  class="countrytitle">
            <span> 县：</span>
           </div>
         <div class='countys'>          
            <el-link v-for="country in countrys" :key="country">{{country}}</el-link>
        </div>
        </div>        
            </div>        
            <el-button  slot="reference">click 激活</el-button>
        </el-popover>

   
</template>

<script>
    export default {
        name: 'map-locationsearch',
        data() {
            return {
                areas: ['章贡区', '南康区', '赣县区', '瑞金市', '龙南市'],
                countrys: ['信丰县', '大余县', '上犹县', '崇义县', '安远县', '定南县', '全南县', '宁都县', '于都县', '兴国县', '会昌县', '寻乌县', '石城县'],
                
            }
        }
    }
</script>

<style scoped>
    .countrydiv {
        width: 300px;
        height: 100px;
        float: left;
    }
    .areas {
        height: 30px;
        
    }
    .countrycontent{
        float: left;
        width: 300px;
    }
    .countys {
        height: 80px;
     width: 230px;
        float:left;
       
    }
    .el-link {
        margin-left: 4px;
    }
    .countrytitle{
        
        width: 40px;
        float:left;
   
    }
    .div-inline{
        display:inline;
        
    }
</style>