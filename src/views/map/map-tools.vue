<template>
  <div>
    <div class="mapTools">


      <el-button type="info" icon="el-icon-picture" class="toolButton" @click="onPreview">规划专题图
      </el-button>


      <i class="el-icon-search" style="width:12px; height:14"> </i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          属性查询<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="hoverFeatureSearch">悬浮查询</el-dropdown-item>
          <el-dropdown-item command="clickFeatureSearch">点击查询</el-dropdown-item>
          <el-dropdown-item command="boxFeatureSearch">框选查询</el-dropdown-item>
          <el-dropdown-item command="closeFeatureSearch">关闭查询</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-popover placement="bottom" width="300" trigger="click">
        <div class="countrydiv">
          <div class="areas">
            <span>市区：</span>
            <el-link v-for="area in areas" :key="area" type="primary">
              {{area}}
            </el-link>
          </div>
          <div class="countrycontent">
            <div class="countrytitle">
              <span> 县：</span>
            </div>
            <div class='countys'>
              <el-link v-for="country in countrys" :key="country">{{country}}</el-link>
            </div>
          </div>
        </div>
        <el-button type="info" icon="el-icon-view" class="toolButton" slot="reference" plain>导航</el-button>
      </el-popover>
      <el-button type="info" icon="el-icon-map-location" class="toolButton" @click="location" plain>定位</el-button>
      <el-button type="info" icon="el-icon-delete" class="toolButton" @click="clearAll" plain>清除</el-button>
      <el-button type="info" icon="el-icon-s-order" class="toolButton" @click="showManagerlayer" plain>图层管理
      </el-button>

      <el-dropdown @command="toolsCommand">
        <span class="el-dropdown-link">
          工具<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="item in tooloptions" :key="item.value"  :command="item.value">{{item.label}}</el-dropdown-item>
         
        </el-dropdown-menu>
      </el-dropdown>


    </div>
    <!-- 大图浏览 -->
    <el-image-viewer v-if="showViewer" :on-close="()=>{showViewer=false}" :url-list="srcList">
    </el-image-viewer>
    <!-- 要素信息查询 -->
    <div id='olmap_popup' class='olmap_popup_info' v-show="isShowFeatureOverlay">
      <div class="olmap_popup_head">
        <span>详细信息</span>
        <img src="@/assets/img/toolIcons/del.png" class="deletefeatureinfo" @click="closefeatureInfo" />
      </div>
      <div class="olmap_popup_detail">
        <mapFeatureinfo :featureInfoDatas="featureInfoData"></mapFeatureinfo>
      </div>
      <div class="olmap_popup_tail">
      </div>

    </div>
     <!-- 框选图层选择 -->
    <el-dialog title="选择查询的图层" :visible.sync="boxlayerSelectVisible"   width="25%">
    <el-select v-model="boxSelectLayerName" placeholder="请选择">
    <el-option
      v-for="item in layManagerNames"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button @click="boxlayerSelectVisible = false">取 消</el-button>
      <el-button type="primary" @click="openBoxSearch">确定</el-button>
    </div>
  </el-dialog>
    <!-- 图层管理 -->
   <mapLayermanager2 :panelShow.sync="layManagerShow"></mapLayermanager2>
   <mapFeatureinfotable v-show="isGetData"></mapFeatureinfotable>
  </div>

</template>

<script>
  import {
    mapHelper,
    toolsHelper,
    layerManager,
    dataSearchHelper
  } from '../../utils/mapHelper.js'
  import mapLayermanager2 from '@/views/map/map-layermanager2'
  import draggable from 'vuedraggable'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  import mapFeatureinfo from '@/views/map/map-featureinfo'
  import mapFeatureinfotable from '@/views/map/map-featureinfotable'
  export default {
    name: 'map-tools',
    data() {
      return {
      
        tooloptions: [{
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
        areas: ['章贡区', '南康区', '赣县区', '瑞金市', '龙南市'],
        countrys: ['信丰县', '大余县', '上犹县', '崇义县', '安远县', '定南县', '全南县', '宁都县', '于都县', '兴国县', '会昌县', '寻乌县', '石城县'],
        showViewer: false,
        layManagerShow: false,
        layManagerNames:[],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        searchValue: '开启查询',
        isShowFeatureOverlay: false,//显示单击 -查询数据结果
        featureInfoData: [], //单击- 查询数据
        boxlayerSelectVisible:false,// 框选 -选择图层
        boxSelectLayerName: '',
        isGetData:false

      }
    },
    components: {
      draggable,
      mapLayermanager2,
      ElImageViewer,
      mapFeatureinfo,
      mapFeatureinfotable
    },

    methods: {
      //开启规划专题图
      onPreview() {
        this.showViewer = true
      },
      //关闭规划专题图
      closeViewer() {
        this.showViewer = false
      },
      //属性查询时间
      handleCommand(command) {
        //悬浮查询
        console.log(command)
        console.log(command == 'clickFeatureSearch')
      
        if (command == 'hoverFeatureSearch') {
          dataSearchHelper.isOpenSearch = true
          dataSearchHelper.searchType='hoverFeatureSearch'
          mapHelper.addMapEvent('singleclick', function (evt) {
                  //点击点的坐标
            let coordinate = evt.coordinate
            //数据搜索结果
            let res = dataSearchHelper.mapHover(evt);

          }
          )
        } else if (command == 'clickFeatureSearch') {
         
          dataSearchHelper.isOpenSearch = true
          dataSearchHelper.searchType='clickFeatureSearch'
          let that = this
          //绑定事件
          mapHelper.addMapEvent('singleclick', function (evt) {
            //点击点的坐标
            let coordinate = evt.coordinate
            //数据搜索结果
            let res = dataSearchHelper.mapClick(evt);
            console.log('点击中')
            //存在数据 
            if (typeof (res) != 'undefined') {
              that.featureInfoData = res;

              dataSearchHelper.addFeatureOverlay(coordinate)
              that.isShowFeatureOverlay = true
            } else {
              //不存在数据
            }
          })

        } else if (command == 'boxFeatureSearch') {
            this.boxlayerSelectVisible=true;
            this.layManagerNames=layerManager.mangerLayerNames

          
        } else {
          dataSearchHelper.isOpenSearch = false
           dataSearchHelper.searchType=''
        }
        //this.$message('click on item ' + command);
      },
      openBoxSearch(){
       this.boxlayerSelectVisible=false
     console.log()
       if(this.boxSelectLayerName!=''){
            dataSearchHelper.isOpenSearch = true
          dataSearchHelper.searchType='boxFeatureSearch'
          let res=dataSearchHelper.mapBox(this.boxSelectLayerName)
          console.log(res)
          this.isGetData=true
           }
          
     },
     toolsCommand(command){
      this.$message('click on item ' + command);
      switch (command) {
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
       
     },
     //输入经纬度 定位
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
     
      clearAll() {
        toolsHelper.clearToolDraw()
      },
      showManagerlayer() {
        this.layManagerShow = true
      },
      onSearch(event) {
        if (this.searchValue == "开启查询") {
          console.log('查询开始')
          dataSearchHelper.isOpenSearch = true
          this.searchValue = "停止查询"
          document.getElementById("map").style.cursor = "pointer"
        } else {
          dataSearchHelper.isOpenSearch = false
          this.searchValue = "开启查询"
          document.getElementById("map").style.cursor = "default";
        }

        if (dataSearchHelper.isOpenSearch) {
          let that = this
          //绑定事件
          mapHelper.addMapEvent('singleclick', function (evt) {
            //点击点的坐标
            let coordinate = evt.coordinate
            //数据搜索结果
            let res = dataSearchHelper.mapClick(evt);
            console.log('点击中')
            //存在数据 
            if (typeof (res) != 'undefined') {
              that.featureInfoData = res;

              dataSearchHelper.addFeatureOverlay(coordinate)
              that.isShowFeatureOverlay = true
            } else {
              //不存在数据
            }
          })
        } else {
         
        }
      },
      closefeatureInfo() {
        //dataSearchHelper.removeFeatureOverlay()
        this.isShowFeatureOverlay = false
      }
    }

  }
</script>

<style lang="less" scoped>
  // ----------- 工具栏样式-----------------
  .mapTools {
    position: absolute;
    top: 40px;
    right: 50px;
    z-index: 3;
    cursor: pointer;
    background-color: white;
    border-radius: 6px;
  }

  // ----------- 属性查询样式-----------------

  .el-icon-search {
    font-size: 12px !important;
    margin-right: 5px;
  }

  .el-dropdown-menu__item {
    font-size: 10px !important;
    padding: 0 10px;
  }


  // ----------- 工具样式-----------------
  .toolButton {
    margin: 0px 1.6px 0 1px !important;
    padding: 4px 8px 10px 8px !important;
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

  // /deep/ .el-input__inner {
  //   border: 0px solid #ffffff !important;
  //   color: #2b2c2d !important;
  //   font-size: 12px !important;
  //   line-height: 24px !important;
  //   padding: 0 0px !important;
  //   width: 30px !important;
  // }

  .el-button--info {
    background-color: white !important;
    border-color: white !important;
  }

  // .el-select-dropdown__item {
  //   font-size: 10px !important;
  //   padding: 0 10px;
  // }

  // ----------- 导航样式-----------------
  .countrydiv {
    width: 300px;
    height: 100px;
    float: left;
  }

  .areas {
    height: 30px;

  }

  .countrycontent {
    float: left;
    width: 300px;
  }

  .countys {
    height: 80px;
    width: 230px;
    float: left;
  }

  .el-link {
    margin-left: 4px;
  }

  .countrytitle {
    width: 40px;
    float: left;
  }

  // ----------- 属性查询样式-----------------
  .olmap_popup_info {
    width: 270px;
    background-color: white !important;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
  }

  .olmap_popup_head {
    width: 100%;
    height: 25px;
    background-color: white;
    text-align: center;
    border-bottom: 1px solid #b6b6b6;
  }

  .olmap_popup_detail {
    width: 100%;
  }

  .olmap_popup_tail {
    width: 100%;
    height: 10px;
    border-top: 1px solid #b6b6b6;
  }

  .deletefeatureinfo {
    width: 20px;
    height: 20px;
    border-radius: 60%;
    position: absolute;
    right: 5px;
    cursor: pointer;
  }
</style>