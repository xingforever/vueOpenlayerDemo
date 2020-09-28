<template slot-scope="scope">
  <div class="">

    <el-popover placement="right" width="100" trigger="click" v-bind:class="[isActive?'openStyle':'closeStyle']"
      @show="showPopver" @hide="hidePopver">
      <draggable v-model="layerList" @update="datadragEnd" :options="{animation:200}">
        <div class="drag-item" v-for="(item,i) in layerList" :key="i">
          <el-row class="lays"  @mouseenter.native="delEnter()" @mouseleave.native="delLeave()">
            <el-col class="line" :span="18">
              <el-checkbox :checked="item. mapService_IsShow" @change="changeShow($event,item.mapService_Name)">&nbsp;
                &nbsp; &nbsp; &nbsp;{{item.mapServie_Alias}}</el-checkbox>
            </el-col>
            <el-col class="line" :span="6">
              <el-image v-if="delIsShow" :src="delImgUrl" @click="revLayer(item.mapService_Name)"></el-image>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <el-button slot="reference" v-bind:class="[isActive?'openlaybtn':'closelaybtn']"></el-button>
    </el-popover>


  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import {
    mapHelper,
    layerManager
  } from '../../utils/mapHelper.js'
  export default {
    name: 'map-layermanager',
    data() {
      return {
        isActive: false,
        delIsShow: true,
        delImgUrl: require('../../assets/img/layer/del.png'),
        layerList: []
        //{
        //     mapService_Name: "hlx",
        //     mapServie_Alias: "hlx",
        //     mapServie_Type: "",
        //     mapService_Url: '',
        //     mapServie_Info: "",
        //     mapService_Index: 1,
        //     mapService_IsShow: true
        //   },
        //   {
        //     mapService_Name: "hlx2",
        //     mapServie_Alias: "hlx2",
        //     mapServie_Type: "",
        //     mapServie_Info: "",
        //     mapService_Url: '',
        //     mapService_Index: 2,
        //     mapService_IsShow: true
        //   },
        //   {
        //     mapService_Name: "hlx3",
        //     mapServie_Alias: "hlx3",
        //     mapServie_Type: "",
        //     mapServie_Info: "",
        //     mapService_Url: '',
        //     mapService_Index: 3,
        //     mapService_IsShow: true
        //   }

      }
    },
    components: {
      draggable
    },
    methods: {
      datadragEnd(evt) {
        evt.preventDefault();
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // 遍历数组,将索引值赋值到对应的sort_order上面,完成排序
        let arr = this.layerList;
        let newArr = arr.map((item, i) => {
          return {
            sort_Order: i,
            mapService_Name: item.mapService_Name,
            mapService_url: item.mapService_Url
          };
        });
        //排序后数组
        console.log(newArr)
        //Laymanager sort()
        layerManager.ChangeLayersIndex(newArr)
      },     
      initLayers() {
        layerManager.InitLayerManager();
        layerManager.AddMapService("GXKG")
        layerManager.AddMapService("GXKG2")
        //  layerManager.AddMapService("NKKG")
        console.log(layerManager.mangerLayer)
        this.layerList = layerManager.mangerLayer;
      },
      showPopver() {
        this.isActive = true
      },
      hidePopver() {
        this.isActive = false
      },
      changeShow(event, name) {
        // console.log(event)
        // console.log(name)
        layerManager.ChangeLayerVisble(name, event)
      },
       delEnter() {
        this.delIsShow = true
        //console.log("鼠标进入")
      },
      delLeave() {
        this.delIsShow = false
       // console.log("鼠标移除")
      },
      revLayer(name){
       layerManager.RemoveLayerByName(name) 
       this.layerList = layerManager.mangerLayer;
       
      }


    },
    mounted() {
      this.initLayers()



    },
  }
</script>

<style scoped>
  .layerManager {
    position: absolute;
    top: 100px;
    right: 30px;
  }

  .closeStyle {
    position: absolute;
    top: 100px;
    right: 30px;
  }

  .openStyle {
    position: absolute;
    top: 100px;
    right: 200px;
  }

  .closelaybtn {
    height: 35px;
    width: 35px;
    background-image: url('../../assets/img/layer/close.png');
    padding: 0px 0px !important;
  }

  .openlaybtn {
    height: 35px;
    width: 35px;
    background-image: url('../../assets/img/layer/open.png');
    padding: 0px 0px !important;
  }
  .lays{
    height: 22px;   
    margin-bottom: 2px;
  }
   .laymanger{
   right: 30px !important;
   margin: 0,0 50px!important;
   text-align:left;
  }
</style>