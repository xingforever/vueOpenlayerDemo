import Vue from 'vue'
import Vuex from 'vuex'
import { Map, View } from "ol";
import mapconfig from '../config/mapconfig.js'
import baseLayers from'../utils/baseLayers.js'
import olControls from '../utils/olControls.js'


let mapHelper= {
     map:null,
     allLayers:[],
     
    //初始化地图对象
    initMap:function(){     
    this.map=new Map({  
        target:'map',     
        layers: [      
          baseLayers.tdtVec,   
          baseLayers.tdtImg,
          baseLayers.tdtTer,
          baseLayers.tdtCva,
          baseLayers.tdtCia,   
          baseLayers.tdtCta,
     
        ],
        view: new View({
          projection: mapconfig.projection,    //使用这个坐标系
          center: mapconfig.center,  
          zoom: mapconfig.zoom,
          minzoom:mapconfig.maxZoom,
          maxZoom:mapconfig.maxZoom        
        }),
        controls:[
          olControls.zoom,
          olControls.mousePositionControl,
          olControls.scaleLine,
          olControls.rotate,
          olControls.fullScreen,         
        ]

      })    
    } ,  
  //底图地图可见性-设置为ture 的数组--存储name
  changeBaseMapVisible:function(strs){
  //   let allLayers=this.map.getLayers().getArray()
  //   console.log(allLayers);
  //   console.log(allLayers[0])
  //   var layer=(allLayers[0])
  //  console.log(layer.values_)
  //  console.log(layer.values_.visible)

  //   //先获取所有底图图层, 并且设置Visible为false
   let arr=this.map.getLayers().getArray()    
  for (let i = 0; i < arr.length; i++) {
      arr[i].setVisible(false)     
  }
    console.log(strs)
  //   // 对 进行显示的图层 设置Visible 为true 
    for (let i = 0; i < strs.length; i++) {
      console.log(strs[i])
      let layer =this.getLayerByName(strs[i])
      if(layer!=null)
      {
        layer.setVisible(true)
      }
      
    
    
    }   
    },
  //通过名字移除图层
  removeLayerByName:function(name) {      
    let layer = this.getLayerByName(name)
    layer.forEach(item => {
      this.map.removeLayer(item)
    })
  },
  // 根据图层名获取图层
  getLayerByName:function(name) {  
    let allLayers =  this.map.getLayers().getArray()
    let layer = allLayers.filter(item => {
      return item.get('name') === name
    })
    return layer[0]   
  },
  // 获取所有图层
  getAllLayers:function() {
    let layers =  this.map.getLayers().getArray()
    return layers
  }


}
export default mapHelper


