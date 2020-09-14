import {
  Map,
  View
} from "ol";
import mapconfig from '../config/mapconfig.js'
import baseLayers from '../utils/baseLayers.js'
import olControls from '../utils/olControls.js'
import {
  fromLonLat,
  transform
} from "ol/proj";
import {
  Fill,
  Stroke,
  Circle,
  Style
} from 'ol/style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

let mapHelper = {
  map: null,
  allLayers: [],
  tempLayers: {}, //临时图层

  //初始化地图对象
  initMap: function () {
    //地图对象   
    this.map = new Map({
      target: 'map',
      layers: [
        baseLayers.tdtVec,
        baseLayers.tdtImg,
        baseLayers.tdtTer,
        baseLayers.tdtCva,
        baseLayers.tdtCia,
        baseLayers.tdtCta,

      ],
      view: new View({
        projection: mapconfig.projection, //使用这个坐标系
        center: mapconfig.center,
        zoom: mapconfig.zoom,
        minzoom: mapconfig.maxZoom,
        maxZoom: mapconfig.maxZoom
      }),
      controls: [
        olControls.zoom,
        olControls.mousePositionControl,
        olControls.scaleLine,
        olControls.rotate,
        //olControls.fullScreen,         
      ]

    })


  },
  initTemLayers: function () {
    const that = this;//将this对象复制给tha
    this.tempLayers = {
     
      _draw: "draw_Layer", //绘图层
      _search: "search_Layer", //查询层
      _common: "common_Layer", //展示层
      draw_Layer: null,
      search_Layer: null,
      common_Layer: null,    
      init: function () {          
        this.draw_Layer=that.createVecLayer(this._draw)
        that.map.addLayer(this.draw_Layer);   
        this.search_Layer= that.createVecLayer(this._search)
        that.map.addLayer(this.search_Layer);
        this.common_Layer=that.createVecLayer(this._common)
        that.map.addLayer( this.common_Layer);
      },
      clear: function () {
        that.draw_Layer.getSource().clear();
        that.search_Layer.getSource().clear();
        that.common_Layer.getSource().clear();
      }
    }
    //创建临时图层
    this.tempLayers.init()

   console.log(this.tempLayers)
   console.log(this.tempLayers.common_Layer)
  },
  //底图地图可见性-设置为ture 的数组--存储name
  changeBaseMapVisible: function (strs) {
    //   let allLayers=this.map.getLayers().getArray()
    //   console.log(allLayers);
    //   console.log(allLayers[0])
    //   var layer=(allLayers[0])
    //  console.log(layer.values_)
    //  console.log(layer.values_.visible)

    //   //先获取所有底图图层, 并且设置Visible为false
    let arr = mapconfig.baseMapNames
    for (let i = 0; i < arr.length; i++) {
      let layer = this.getLayerByName(arr[i])
      if (layer != null) {
        layer.setVisible(false)
      }
    }
    // 对 进行显示的图层 设置Visible 为true 
    for (let i = 0; i < strs.length; i++) {
      // console.log(strs[i])
      let layer = this.getLayerByName(strs[i])
      if (layer != null) {
        layer.setVisible(true)
      }
    }
  },
  //通过名字移除图层
  removeLayerByName: function (name) {
    let layer = this.getLayerByName(name)
    layer.forEach(item => {
      this.map.removeLayer(item)
    })
  },
  // 根据图层名获取图层
  getLayerByName: function (name) {
    let allLayers = this.map.getLayers().getArray()
    let layer = allLayers.filter(item => {
      return item.get('name') === name
    })
    return layer[0]
  },
  // 获取所有图层
  getAllLayers: function () {
    let layers = this.map.getLayers().getArray()
    return layers
  },
  //定位
  setLocation: function (locate) {
    console.log(locate)
    //经度0-180，维度0-90
    let longrg = /^-?(([0-9]|[0-9][0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/;
    let latreg = /^-?([0-8]?[0-9](\.[0-9]+)?|90)$/;
    const lon = locate[0]
    const lat = locate[1]
    alert(lon)
    alert(lat)
    if (!longrg.test(lon)) {
      return '经度范围为0-180';
    }
    if (!latreg.test(lat)) {
      return '纬度范围0-90';
    }
    //创建图标
    var locationIcon = new Style({
      image: new Icon(({
        color: [0, 109, 255, 0.5],
        anchor: [0.5, 1],
        scale: 0.7,
        crossOrigin: 'anonymous',
        src: '../../assets/img/toolIcons/pos.png',
       
      }))
    });
    //创建要素
    var feature = new Feature({
      geometry: new Point([parseFloat(lon), parseFloat(lat)])
    });
    //要素设置 图标
    feature.setStyle(locationIcon)
    // var vectorSource = new VectorSource({
    //  features:[feature]
    //  });
    //展示层加载要素
  
    this.tempLayers.common_Layer.getSource().addFeature(feature);
    this.tempLayers.common_Layer.setVisible(true)
    console.log( this.tempLayers.common_Layer.getSource().getFeatures())
    //设置视图中心
    this.map.getView().setCenter([parseFloat(lon), parseFloat(lat)])
    return 'ok'
  },
  //创建矢量图层
  createVecLayer(layername, style) {
    //style 设置
    style = style || new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#FD6531',
        width: 2
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: '#FD6531'
        })
      })
    });
    //创建矢量图层
    let vectorLayer = new VectorLayer({
      //zIndex: 2,
      declutter: false,
      source: new VectorSource(),
      name: layername,
      style: style,
      visible: true
    });

    return vectorLayer
  }


}
export default mapHelper