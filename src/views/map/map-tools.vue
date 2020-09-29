<template>

  <div class="mapTools">
    <el-button type="info" icon="el-icon-picture" class="toolButton" plain>规划专题图</el-button>
    <el-button type="info" icon="el-icon-folder-add" class="toolButton"  plain>加载</el-button>

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
            <el-button type="info" icon="el-icon-search" class="toolButton" slot="reference" plain >查询</el-button>   
          
        </el-popover>



    <el-button type="info" icon="el-icon-map-location" class="toolButton" @click="location" plain>定位</el-button>
    <el-button type="info" icon="el-icon-delete" class="toolButton" @click="clearAll" plain>清除</el-button>
    <el-button type="info" icon="el-icon-s-order" class="toolButton" @click="showManagerlayer" plain>图层管理
    </el-button>
    <el-select class="toolSelect" ref="EL_toolSelect" v-model="value" @change="changeTools"
      :popper-append-to-body="false" placeholder="工具">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
<mapLayermanager2 :panelShow.sync="layManagerShow"></mapLayermanager2>

  </div>
</template>

<script>
  import {
    toolsHelper,   
    layerManager
  } from '../../utils/mapHelper.js'
  import mapLayermanager2 from '@/views/map/map-layermanager2'
  import draggable from 'vuedraggable'
  export default {    
    name: 'map-tools',
    data() {
      return {       
        options: [{
          value: 'MeasurePoint',
          label: '测点'
        }, {
          value: 'MeasureLineString',
          label: '测距离'
        }, {
          value: 'MeasurePolygon',
          label: '测面积'
        }, {
          value: 'DrawPoint',
          label: '绘制点'
        }, {
          value: 'DrawLineString',
          label: '绘制线'
        }, {
          value: 'DrawBox',
          label: '绘制矩形'
        }, {
          value: 'DrawPolygon',
          label: '绘制面'
        }],
        value: '工具',
         areas: ['章贡区', '南康区', '赣县区', '瑞金市', '龙南市'],
        countrys: ['信丰县', '大余县', '上犹县', '崇义县', '安远县', '定南县', '全南县', '宁都县', '于都县', '兴国县', '会昌县', '寻乌县', '石城县'],
        layManagerShow:false,        
      }
    },
    components: {
      draggable,
     mapLayermanager2
    },
    methods: {
      location() {
        this.$prompt('请输入经纬度', '定位(lon,lat)', {
          confirmButtonText: '定位',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          //中文逗号分隔
          let arr = value.split('，');
          if (arr.length == 1) {
            //英文逗号分隔
            arr = value.split(',');
          }
          //输入数据 逗号分隔后不是2 个
          if (arr.length != 2) {
            this.$message({
              type: 'info',
              message: '请输入经纬度，并用逗号分隔'
            });
            return;
          }
          const msg = toolsHelper.setLocation(arr)
          if (msg != 'ok') {
            this.$message({
              type: 'info',
              message: msg
            });
          }
        })
      },
      changeTools(val) {
        switch (val) {
          case 'MeasurePoint':
            toolsHelper.spaceMeasure('Point')
            break;
          case 'MeasureLineString':
            toolsHelper.spaceMeasure('LineString')
            break;
          case 'MeasurePolygon':
            toolsHelper.spaceMeasure('Polygon')
            break;
          case 'DrawLineString':
            toolsHelper.addPoltInteraction('LineString')
            break;
          case 'DrawPoint':
            toolsHelper.addPoltInteraction('Point')
            break;
          case 'DrawBox':
            toolsHelper.addPoltInteraction('Box')
            break;
          case 'DrawPolygon':
            toolsHelper.addPoltInteraction('Polygon')
          default:
            break
        }
        //重置为不选择
        this.value = "工具";

      },
      clearAll() {
        toolsHelper.clearToolDraw()
      },     
      showManagerlayer(){
      this.layManagerShow=true
      }   
    }
  }
</script>

<style lang="less" scoped>
  .mapTools {
    position: absolute;
    top: 40px;
    right: 50px;
    z-index: 3;
    cursor: pointer;
    background-color: white;
    border-radius: 6px;
  }
  .toolButton {
    margin-left: 1px !important;
    margin-right: 1.6px !important;
    padding-top: 4px !important;    
    padding-left: 8px !important;    
    padding-right: 8px !important;
    padding-bottom: 10px !important;    
    border-radius: 4px !important;
    font-size: 12px !important;
    border: none;
    color: #2b2c2d !important;
  }

  .toolSelect {
    font-size: 12px !important;
    padding: 2px 2px !important;
    width: 70px !important;   
    font-size: 10px !important;
  }

  .el-input {
    font-size: 12px !important;
    padding: 2px 2px !important;
    width: 65px !important;
    height: 24px !important;
    font-size: 10px !important;
  }

  /deep/ .el-input__inner {
    border: 0px solid #ffffff !important;
    color: #2b2c2d !important;
    font-size: 12px !important;
    line-height: 24px !important;
    padding: 0 0px !important;
    width: 30px !important;
  }
  .el-button--info {
    background-color: white !important;
    border-color: white !important;
  }
  .el-select-dropdown__item {
    font-size: 10px !important;
    padding: 0 10px;
  }
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
   
 
</style>