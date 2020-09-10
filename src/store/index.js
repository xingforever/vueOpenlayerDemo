import Vue from 'vue'
import Vuex from 'vuex'
import { Map, View } from "ol";
import mapconfig from '../config/mapconfig.js'
import baseLayers from'../utils/baseLayers.js'
import olControls from '../utils/olControls.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // olmap: null,//默认是null ,通过方法赋值
    // allLayers:[],//map中所有图层
    // currentVisibleLayerIndex: 0,//当前可见图层的Index
    // currentSelectedLayerName: "",//当前选中图层的name
   
  },
  mutations: {

    // //初始化地图对象
    // initMap(state,map){     
    //   state.olmap=map;
    //   //state.allLayers=map.getAllLayers().getArray()
    // },
    // //底图地图可见性-设置为ture 的数组--存储name
    // changeBaseMapVisible(state,array){
    //   //先获取所有底图图层, 并且设置Visible为false
    //   const baseMapNames=mapconfig.baseMapNames
    //   for (let i = 0; i < baseMapNames.length; i++) {
    //     let layer = this.commmit("getLayerByName",baseMapNames[i])
    //     layer.setVisible(false);
    //   }
    //   // 对 进行显示的图层 设置Visible 为true 
    //   for (let i = 0; i < array.length; i++) {
    //     let layer = this.commmit("getLayerByName",array[i])
    //     layer.setVisible(true);
    //   }   
    // },
    // //通过名字移除图层
    // removeLayerByName(state,name) {      
    //   let layer = this.commmit("getLayerByName",name)
    //   layer.forEach(item => {
    //     state.olmap.removeLayer(item)
    //   })
    // },  
    // // 根据图层名获取图层
    // getLayerByName(state,name) {
    //   let allLayers =  state.olmap.getLayers().getArray()
    //   let layer = allLayers.filter(item => {
    //     return item.get('name') === name
    //   })
    //   return layer
    // },  
    // getBaseLayers(state){
    //   const names= mapconfig.baseMapNames

    // },
    // // 获取所有图层
    // getAllLayers(state) {
    //   let layers =  state.olmap.getLayers().getArray()
    //   return layers
    // }
    

   
  },
  actions: {
  },
  modules: {
  }
})
