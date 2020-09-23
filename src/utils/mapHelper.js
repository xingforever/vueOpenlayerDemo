import {
  Map,
  View
} from "ol";
import mapconfig from '../config/mapconfig.js'
import {
  Zoom,
  MousePosition,
  ScaleLine,
  FullScreen,
  Rotate
} from 'ol/control';
import {
  createStringXY
} from 'ol/coordinate';
import {
  Fill,
  Stroke,
  Circle,
  Style,
  Icon
} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import {
  Point,
  LineString,
  Polygon
} from "ol/geom";
import VectorSource from 'ol/source/Vector';
import {
  Draw,
  Modify,
  Snap,
  defaults
} from "ol/interaction";
import {
  createBox
} from "ol/interaction/Draw";
import OlOverlay from "ol/Overlay";
import {
  getArea,
  getLength
} from "ol/sphere.js";
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import TileWMS from "ol/source/TileWMS"
import {
  register
} from 'ol/proj/proj4';
import proj4 from 'proj4';
import Projection from 'ol/proj/Projection';
import TileGrid from 'ol/tilegrid/TileGrid';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import GeoJSON from 'ol/format/GeoJSON';
import {ImageArcGISRest, OSM} from 'ol/source';
import {Image as ImageLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import EsriJSON from 'ol/format/EsriJSON';
import axiosHelper from '@/router/axiosHelper'

const mapSrc = mapconfig.mapSrc

//--------------------------底图 --------------------------------------
const baseLayers = {

  /*天地图矢量*/
  tdtVec: new TileLayer({
    id: 'base_tdtVec',
    name: 'tdtVec',
    zIndex: -1000000000,
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous', //允许跨域
      url: mapSrc.tdtVec
    })
  }),
  /*天地图影像*/
  tdtImg: new TileLayer({
    id: 'base_tdtImg',
    name: 'tdtImg',
    zIndex: -1000000000,
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: mapSrc.tdtImg
    })
  }),

  /*天地图地形*/
  tdtTer: new TileLayer({
    id: 'base_tdtTer',
    zIndex: -1000000000,
    name: 'tdtTer',
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: mapSrc.tdtTer
    })
  }),
  /*天地图矢量标注*/
  tdtCva: new TileLayer({
    id: 'base_tdtCva',
    zIndex: -999999999,
    name: 'tdtCva',
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: mapSrc.tdtCva
    })
  }),
  /*天地图影像标注*/
  tdtCia: new TileLayer({
    id: 'base_tdtCia',
    zIndex: -999999999,
    name: 'tdtCia',
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: mapSrc.tdtCia
    })
  }),
  /*天地图地形标注*/
  tdtCta: new TileLayer({
    id: 'base_tdtCta',
    zIndex: -999999999,
    name: 'tdtCta',
    visible: false,
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: mapSrc.tdtCta
    })
  }),
}
//--------------------------地图控件 ----------------------------------
const olControls = {
  //全屏控件
  fullScreen: new FullScreen(),
  //比例尺控件
  scaleLine: new ScaleLine({
    target: document.getElementById("scaleLineControl"),
    minWidth: 64,
    bar: false,
    steps: 4,
    text: false,
    units: 'metric'

  }),
  //旋转
  rotate: new Rotate(),
  //放大缩小
  zoom: new Zoom({
    className: "custom-zoom",
    target: document.getElementById("zoomControl")
  }),
  //鼠标位置
  mousePositionControl: new MousePosition({
    //坐标格式
    coordinateFormat: createStringXY(5),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: "EPSG:4326",
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: "custom-mouse-position",
    //显示鼠标位置信息的目标容器
    target: document.getElementById("mouse-position"),
    //未定义坐标的标记
    undefinedHTML: "&nbsp;",
    //显示 经纬度
    coordinateFormat: function (e) {
      return "经度：" + e[0].toFixed(3) + "° , 纬度：" + e[1].toFixed(3) + "°";
    },

  })

}
//--------------------------地图Helper --------------------------------
export let mapHelper = {
  map: null,
  proj4490: null,
  //初始化地图对象
  initMap() {
    //定义坐标系 -CSC2000 
    mapHelper.definedProjection()

    //地图对象   
    mapHelper.map = new Map({
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
        //mapHelper.definedProjection()
        projection: mapconfig.projection, //使用这个坐标系
        center: mapconfig.center,
        zoom: mapconfig.zoom,
        minzoom: mapconfig.maxZoom,
        maxZoom: mapconfig.maxZoom
      }),
      controls: [
        olControls.zoom,
        olControls.mousePositionControl,
        olControls.scaleLine

      ]

    })
    //工具初始化
    toolsHelper.initTools();

  },
  //定义坐标系
  definedProjection() {
    proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
    register(proj4);
    var projection = new Projection({
      code: 'EPSG:4490',
      extent: [107.66615218883604, 16.780085439091835, 113.39113536886373, 20.948901121306612]
    });
    mapHelper.proj4490 = projection;
  },
  //通过名字移除图层
  removeLayerByName(name) {
    let layer = mapHelper.getLayerByName(name)
    if (typeof (layer) == "undefined") {
      return;
    }
    layer.forEach(item => {
      mapHelper.map.removeLayer(item)
    })
  },
  // 清除所有覆盖图层
  removeAllOverlay() {
    let layers = mapHelper.map.getOverlays().getArray();
    layers.forEach(item => {
      mapHelper.map.removeOverlay(item);
    });
  },
  // 根据图层名获取图层
  getLayerByName(name) {
    let allLayers = mapHelper.getAllLayersArray()
    let layer = allLayers.filter(item => {
      return item.get('name') === name
    })
    return layer
  },
  // 获取所有图层
  getAllLayers() {
    let layers = mapHelper.map.getLayers()
    return layers
  },
  getAllLayersArray() {
    let layers = mapHelper.map.getLayers().getArray()
    return layers
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
  },
  //底图地图可见性-设置为ture 的数组--存储name
  changeBaseMapVisible: function (strs) {

    //   //先获取所有底图图层, 并且设置Visible为false
    let arr = mapconfig.baseMapNames
    for (let i = 0; i < arr.length; i++) {
      let layer = mapHelper.getLayerByName(arr[i])[0]
      if (layer != null) {
        layer.setVisible(false)
      }
    }
    // 对 进行显示的图层 设置Visible 为true 
    for (let i = 0; i < strs.length; i++) {
      // console.log(strs[i])
      let layer = mapHelper.getLayerByName(strs[i])[0]
      if (layer != null) {
        layer.setVisible(true)
      }
    }
  },
  //设置地图可见范围
  ZoonAtExtent(extent){
    let view =mapHelper.map.getView();
    view.fit(extent, mapHelper.map.getSize());
  },
  //设置地图可见中心
  ZoonAtCenter(center){
    let view =mapHelper.map.getView();
    view.setCenter(center);
   }
}
//--------------------------地图工具Helper-----------------------------
export let toolsHelper = {
  //临时图层
  tempLayers: {},
  // 标绘设置
  plottingOption: {
    textVector: null,
    layer: null,
    sketch: null,
    draw: null,
    listener: null
  },
  //绘图样式-标绘
  drawStyle: new Style({
    fill: new Fill({
      color: "rgba(255,255,255,.5)"
    }),
    stroke: new Stroke({
      color: "green",
      lineDash: [10, 10],
      width: 2
    }),
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: "green"
      }),
      fill: new Fill({
        color: "red"
      })
    })
  }),
  //空间测量设置
  measureOption: {
    layer: null,
    sketch: null,
    helpTooltipElement: null,
    helpTooltip: null,
    measureTooltipElement: null,
    measureTooltip: null,
    continuePolygonMsg: "",
    continueLineMsg: "",
    helpMsg: "",
    draw: null,
    listener: null,
    popupcloser: null
  },
  //测量 样式
  measureStyle: new Style({
    fill: new Fill({
      color: "rgba(255,255,255,.5)"
    }),
    stroke: new Stroke({
      color: "blue",
      lineDash: [10, 10],
      width: 2
    }),
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: "yellow"
      }),
      fill: new Fill({
        color: "red"
      })
    })
  }),
  //初始化tool
  initTools() {
    toolsHelper.tempLayers = {
      common_Layer: null,
      _common: "common_Layer", //展示层
      init: function () {
        this.common_Layer = mapHelper.createVecLayer(this._common)
        mapHelper.map.addLayer(this.common_Layer);
      },
      clear: function () {
        this.common_Layer.getSource().clear();
      }
    }
    toolsHelper.tempLayers.init()
  },
  //定位
  setLocation(locate) {
    //经度0-180，维度0-90
    let longrg = /^-?(([0-9]|[0-9][0-9]|1[0-7][0-9])(\.[0-9]+)?|180)$/;
    let latreg = /^-?([0-8]?[0-9](\.[0-9]+)?|90)$/;
    const lon = locate[0]
    const lat = locate[1]
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
        src: require('../assets/img/toolIcons/pos.png'),

      }))
    });
    //创建要素
    var feature = new Feature({
      geometry: new Point([parseFloat(lon), parseFloat(lat)])
    });
    //要素设置 图标
    feature.setStyle(locationIcon)

    //展示层加载要素
    toolsHelper.tempLayers.common_Layer.getSource().addFeature(feature);
    toolsHelper.tempLayers.common_Layer.setVisible(true)
    //设置视图中心
    mapHelper.map.getView().setCenter([parseFloat(lon), parseFloat(lat)])
    return 'ok'
  },
  //添加绘图
  addPoltInteraction(type) {
    toolsHelper.addPoltInteractionFun(type)
  },
  //标绘方法 --layer -标绘
  addPoltInteractionFun(type) {
    if (toolsHelper.plottingOption.draw != null) {
      mapHelper.map.removeInteraction(toolsHelper.plottingOption.draw); // 防止多次点击添加多个图层
    }
    let source = new VectorSource();
    let style = null;
    let _type = type;
    let geometryFunction = null;
    if (type == "Box") {
      geometryFunction = createBox();
    } else {
      geometryFunction = null;
    }
    if (type != "Box") {
      _type = type;
    } else if (type == "Box") {
      _type = "Circle";
    }
    //绘制时的样式
    toolsHelper.plottingOption.draw = new Draw({
      source: source,
      type: _type,
      style: toolsHelper.drawStyle,
      geometryFunction: geometryFunction
    });
    //添加Interaction
    mapHelper.map.addInteraction(toolsHelper.plottingOption.draw);
    //监听绘制开始
    toolsHelper.plottingOption.draw.on("drawstart", evt => {
      toolsHelper.plottingOption.sketch = evt.feature;
      let plottingLayer = new VectorLayer({
        source: source,
        style: toolsHelper.drawStyle,
        zIndex: 9,
        name: "标绘"
      });
      mapHelper.map.addLayer(plottingLayer);

    });
    toolsHelper.plottingOption.draw.on("drawend", evt => {
      mapHelper.map.removeInteraction(toolsHelper.plottingOption.draw);
    });
  },
  // 添加测量标注
  createMeasureTooltip() {
    if (toolsHelper.measureOption.measureTooltipElement) {
      toolsHelper.measureOption.measureTooltipElement.parentNode.removeChild(
        toolsHelper.measureOption.measureTooltipElement
      );
    }
    toolsHelper.measureOption.measureTooltipElement = document.createElement(
      "div"
    );
    toolsHelper.measureOption.measureTooltipElement.className =
      "ol-tooltip ol-tooltip-measure";
    toolsHelper.measureOption.measureTooltip = new OlOverlay({
      id: "空间测量",
      element: toolsHelper.measureOption.measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center"
    });
    mapHelper.map.addOverlay(toolsHelper.measureOption.measureTooltip);
  },
  //添加测量标注
  createHelpTooltip() {
    if (toolsHelper.measureOption.helpTooltipElement) {
      toolsHelper.measureOption.helpTooltipElement.parentNode.removeChild(
        toolsHelper.measureOption.helpTooltipElement
      );
    }
    toolsHelper.measureOption.helpTooltipElement = document.createElement(
      "div"
    );
    toolsHelper.measureOption.helpTooltipElement.className =
      "ol-tooltip hidden";
    toolsHelper.measureOption.helpTooltip = new OlOverlay({
      id: "空间测量",
      element: toolsHelper.measureOption.helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
  },
  //格式化距离
  formatLength(line) {
    let sourceProj = mapHelper.map.getView().getProjection(); // 获取投影坐标系
    let length = getLength(line, {
      projection: sourceProj
    });
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + " " + "km";
    } else {
      output = Math.round(length * 100) / 100 + " " + "m";
    }
    return output;
  },
  //格式化面积
  formatArea(polygon) {
    let sourceProj = mapHelper.map.getView().getProjection(); // 获取投影坐标系
    let area = getArea(polygon, {
      projection: sourceProj
    });
    let output;
    if (area > 10000) {
      output =
        Math.round((area / 1000000) * 100) / 100 +
        " " +
        "km<sup>2</sup>";
    } else {
      output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    }
    return output;
  },
  //设置提示信息
  pointerMoveHandler(evt) {
    if (evt.dragging) {
      return;
    }
    if (toolsHelper.measureOption.sketch) {
      let geom = toolsHelper.measureOption.sketch.getGeometry();
      if (geom instanceof Polygon) {
        toolsHelper.measureOption.helpMsg = toolsHelper.measureOption.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        toolsHelper.measureOption.helpMsg = toolsHelper.measureOption.continueLineMsg;
      }
    }
    toolsHelper.measureOption.helpTooltipElement.innerHTML = toolsHelper.measureOption.helpMsg;
    toolsHelper.measureOption.helpTooltip.setPosition(evt.coordinate);
    toolsHelper.measureOption.helpTooltipElement.classList.remove("hidden");

  },
  //空间测量
  spaceMeasure(measureType) {

    mapHelper.map.on("pointermove", toolsHelper.pointerMoveHandler);
    mapHelper.map.getViewport().addEventListener("mouseout", () => {
      toolsHelper.measureOption.helpTooltipElement.classList.add("hidden");
    });
    toolsHelper.addInteractionFun(measureType);
  },
  //添加标注
  addInteractionFun(measureType) {

    if (toolsHelper.measureOption.draw != null) {
      mapHelper.map.removeInteraction(toolsHelper.measureOption.draw); // 防止多次点击添加多个图层
    }
    let source = new VectorSource();
    // 绘制时的样式
    toolsHelper.measureOption.draw = new Draw({
      source: source,
      type: measureType,
      style: toolsHelper.measureStyle
    });
    mapHelper.map.addInteraction(toolsHelper.measureOption.draw);
    toolsHelper.measureOption.draw.on("drawstart", evt => {
      toolsHelper.measureOption.sketch = evt.feature;
      let type = toolsHelper.measureOption.sketch.getGeometry();
      if (type instanceof Point) {
        // 如果是绘制点
        let pointCoordinates = toolsHelper.measureOption.sketch.getGeometry()
          .flatCoordinates;
        toolsHelper.measureOption.measureTooltipElement.innerHTML = pointCoordinates;
        toolsHelper.measureOption.measureTooltip.setPosition(
          pointCoordinates
        );
      } else {
        // 如果是绘制线和面
        let tooltipCoord = evt.coordinate;
        toolsHelper.measureOption.listener = toolsHelper.measureOption.sketch
          .getGeometry()
          .on("change", evt => {
            let geom = evt.target;
            let output;
            if (geom instanceof Polygon) {
              output = toolsHelper.formatArea(geom);
              tooltipCoord = geom
                .getInteriorPoint()
                .getCoordinates();
            } else if (geom instanceof LineString) {
              output = toolsHelper.formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            toolsHelper.measureOption.measureTooltipElement.innerHTML = output;
            toolsHelper.measureOption.measureTooltip.setPosition(
              tooltipCoord
            );
          });
      }
    });

    toolsHelper.measureOption.draw.on("drawend", () => {
      toolsHelper.measureOption.measureTooltipElement.appendChild(
        toolsHelper.measureOption.popupcloser
      );
      toolsHelper.measureOption.measureTooltipElement.className =
        "ol-tooltip ol-tooltip-static";
      toolsHelper.measureOption.measureTooltip.setOffset([0, -7]);
      toolsHelper.measureOption.sketch = null;
      toolsHelper.measureOption.measureTooltipElement = null;
      toolsHelper.createMeasureTooltip();
      mapHelper.map.un("pointermove", toolsHelper.pointerMoveHandler);
      mapHelper.map.removeInteraction(toolsHelper.measureOption.draw);
      toolsHelper.measureOption.helpTooltipElement.classList.add("hidden");
    });
    // 将画好的 VectorLayer 图层添加到 map 中
    let measureLayer = new VectorLayer({
      source: source,
      style: toolsHelper.measureStyle,
      zIndex: 9,
      name: "空间测量"
    });
    mapHelper.map.addLayer(measureLayer);
    toolsHelper.createMeasureTooltip();
    toolsHelper.createHelpTooltip();
    // 删除测量标注
    toolsHelper.measureOption.popupcloser = document.createElement("a");
    toolsHelper.measureOption.popupcloser.innerHTML =
      '<span style="color:red;font-size:18px;"></span>';
    toolsHelper.measureOption.popupcloser.href = "javascript:void(0);";
    toolsHelper.measureOption.popupcloser.classList.add("ol-popup-closer");
    toolsHelper.measureOption.popupcloser.onclick = e => {
      let parentNode = e.target.parentNode.parentNode.parentNode;
      parentNode.remove();
      measureLayer.getSource().clear();
    };
  },
  //清除工具标绘
  clearToolDraw() {
    toolsHelper.tempLayers.clear();
    mapHelper.removeLayerByName('标绘')
    mapHelper.removeLayerByName('空间测量')
    mapHelper.map.un("pointermove", toolsHelper.pointerMoveHandler);
    mapHelper.map.removeInteraction(toolsHelper.plottingOption.draw);
    mapHelper.removeAllOverlay()
  }

}

//--------------------------图层管理-----------------------------------
export let layerManager = {
  //每一个服务对象
  //   let mapServicesData={
  //     mapService_Name:'',//名称
  //     mapServie_Alias:'',//别名
  //     mapServie_Type:'',//类型
  //     mapService_Url:[],// 数组
  //     mapServie_Info：[]//信息
  //     mapService_Index:[]//图层位置
  //     mapService_Prj:'',//坐标系
  //     mapService_Center:'',//服务的地图中心
  //     mapService_extent:[],//服务的显示范围
  //     mapService_params:{},//服务 附带的参数设置
  //     mapService_className:''//服务的分组
  //    mapService_Server:''//服务的分组
  //  }
  


  //添加自定义本地服务
  //@ type--服务类型  url --- 服务地址， prj -- 服务坐标  remark -备注信息
  allLayers: [], //所有图层列表
  layerGroups: [], //服务组名称列表-tree
  mangerLayer: [], //图层管理器有的服务列表
  mapServicesDatas:[], //地图服务信息
  InitLayerManager(){
    //1 发送请求 -- 获取数据库存储服务数据--
    //2 获取数据 ---标准化---成为 mapServicesData
    //3
    layerManager.mapServicesDatas=[
      {
      mapService_Name:'NKKG',//名称
      mapServie_Alias:'南康控规',//别名
      mapServie_Type:'WMS',//类型
      mapService_Url:'http://192.168.1.112:6080/arcgis/rest/services/test/NKKG/MapServer',// 数组
      mapServie_Info:'南康控规',//信息
      mapService_Index:0,//图层位置
      mapService_Prj:'4327',//坐标系
      mapService_Center:'',//服务的地图中心
      mapService_extent:[],//服务的显示范围
      mapService_params:{},//服务 附带的参数设置
      mapService_className:'控规',//服务的分组
      mapService_Server:'ArcGIS Server',
      mapService_IsShow:true//服务的分组


    },   
      {
      mapService_Name:'KGDL',//名称
      mapServie_Alias:'控规道路',//别名
      mapServie_Type:'WMS',//类型
      mapService_Url:'http://192.168.1.112:6080/arcgis/rest/services/test/KGDL/MapServer',// 数组
      mapServie_Info:'控规道路',//信息
      mapService_Index:0,//图层位置
      mapService_Prj:'4327',//坐标系
      mapService_Center:'',//服务的地图中心
      mapService_extent:[],//服务的显示范围
      mapService_params:{},//服务 附带的参数设置
      mapService_className:'控规',//服务的分组
      mapService_Server:'ArcGIS Server',//服务的分组
      mapService_IsShow:true

    },
    {
      mapService_Name:'KXGK',//名称
      mapServie_Alias:'控规道路',//别名
      mapServie_Type:'WMS',//类型
      mapService_Url:'http://192.168.1.112:6080/arcgis/rest/services/test/KGDL/MapServer',// 数组
      mapServie_Info:'控规道路',//信息
      mapService_Index:0,//图层位置
      mapService_Prj:'4327',//坐标系
      mapService_Center:'',//服务的地图中心
      mapService_extent:[],//服务的显示范围
      mapService_params:{},//服务 附带的参数设置
      mapService_className:'控规',//服务的分组
      mapService_Server:'ArcGIS Server',//服务的分组
      mapService_IsShow:true
    }
  
    ]



  },

   AddMapService(name){
    layerManager.mapServicesDatas.forEach(function(value,i){
      　　if(value.mapServie_Type=='WMS'){
           if(value.mapService_Server=="ArcGIS Server"){
             //添加ArcGIS Server 的WMS服务
             if(name==value.mapService_Name){
              const res=layerManager.AddArcGISWMSService(value)
              if(res){
                //管理图层添加信息'
                console.log(value)                
                layerManager.mangerLayer.push(value)
              }
             }
             
           }
           }
           else if(value.mapServie_Type=='WMTS'){

           }else if(value.mapServie_Type=='WFS'){

           }
           
       
      })


   },

   AddArcGISWMSService(mapServicesData){
    try {
      var arcGisSource = new TileArcGISRest({
        url: mapServicesData.mapService_Url
      })
      console.log(mapServicesData.mapService_Url)
      var arcGISLayers = new TileLayer({
        source: arcGisSource,
        name:mapServicesData. mapService_Name,
        opacity: 0.8,
        visible: true
      })
     // var extent=arcGISLayers.getExtent();
      mapHelper.map.addLayer(arcGISLayers)
    //  console.log(extent)
     // mapHelper.ZoonAtExtent(extent)
      return true ;
   }
   catch(err){
      console.log(err)
       return false;
   }
   


    
    return true
    //排序-- 获取map图层顺序
    // --添加至图层管理器中
    //定位显示
   },

//改变图层的位置
   ChangeLayerIndex(name,index){
    let allLayers=mapHelper.getAllLayers();
    let layers=mapHelper.getLayerByName(name);
    allLayers.insertAt(index,layers);
   },
  testAddWMTS() {
    var origin = [-400.0, 400.0];
    // 分辨率
    var resolutions = [5.9486525145757E-4, 2.97432625728785E-4, 1.5228550437313792E-4, 7.614275218656896E-5, 3.807137609328448E-5];
    //地图范围
    var fullExtent = [114.76551122216428, 25.80037564980754, 115.01345105897177, 25.945284825062597];
    let tileGrid = new TileGrid({
      tileSize: 256,
      origin: origin,
      extent: fullExtent,
      resolutions: resolutions
    });

    let wmsLayer = new ImageLayer({
      source: new ImageArcGISRest({
        url: 'http://192.168.1.112:6080/arcgis/rest/services/test/GHDK2/MapServer/', 
        ratio: 1,//  服务地址    
        params: {
          layers: '规划地块 '
        },
         tileGrid: tileGrid,
       projection: mapconfig.projection
      }),
      visible: true,
      zIndex: 0,

    })
    // let wmsLayer = new TileWMS({
    //   source: new XYZ({
    //     url: 'http://192.168.1.112:6080/arcgis/rest/services/test/GHDK2/MapServer/tile/{z}/{y}/{x}', //  服务地址    
    //     params: {
    //       LAYERS : '规划地块 ',
    //       VERSION :'1.3.0',
    //       tiled:true,


    //     },
        
    //   //  projection: mapconfig.projection
    //   }),
    //   visible: true,
    //   zIndex: 0,

    // })
    mapHelper.map.addLayer(wmsLayer)

  },
  testAddWMS() {
    // http://192.168.1.112:6080/arcgis/rest/services/test/KGDL/MapServer
    //  TileArcGISRest

    var ArcGisSource = new TileArcGISRest({
      url: "http://192.168.1.112:6080/arcgis/rest/services/test/KGDL/MapServer"
    })
    var ArcGISLayers = new TileLayer({
      source: ArcGisSource,
      opacity: 0.8,
      visible: true
    })
    mapHelper.map.addLayer(ArcGISLayers)
  },
  testAddWMTS2(){  
//url,name,center,projection,remark,index
    let wmsLayer = new ImageLayer({
      source: new ImageArcGISRest({
        url: 'http://192.168.1.112:6080/arcgis/rest/services/test/GHDK2/MapServer/', 
        ratio: 1,//  服务地址    
        params: {
          layers: '规划地块 '
        },      
       projection: mapconfig.projection
      }),
      visible: true,
      zIndex: 0,

    })
    
    mapHelper.map.addLayer(wmsLayer)

  },
  testAddWFS(){  
    //let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetCapabilities&service=WFS"
    let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetFeature&service=WFS&typename=test_WFSService:zgguihua"
    let response= axiosHelper.requestByGet(url)     
    let jsonFormat =new GeoJSON();
    var features = jsonFormat.readFeatures(response)
    console.log(features)
    var vectorSource = new VectorSource()
    if (features.length > 0) {
      vectorSource.addFeatures(features);
    }
    var vector = new VectorLayer({
      source: vectorSource ,         
    }); 
  
    mapHelper.map.addLayer(vector)  
   
  },
  testAddWFSQuery(){  
   // let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetCapabilities&service=WFS"
    let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetFeature&service=WFS&typename=test_WFSService:zgguihua"
    //let response= axiosHelper.requestByGet(url)  
    // console.log(response) 
    // let esrijsonFormat =new EsriJSON();
    // var features = esrijsonFormat.readFeatures(response)
    // console.log(features)
    var vectorSource = new VectorSource({
      format: new  GeoJSON(),
      url: function(extent) {
        return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
            'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
            'outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
      },
      strategy:bboxStrategy
    })
  
    var vector = new VectorLayer({
      source: vectorSource ,  
      style: new Style({
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
        })
      })
    }); 
  
    mapHelper.map.addLayer(vector)  
    var extent=vector.getExtent()
    var view = mapHelper.map.getView();
    view.fit(extent, map.getSize());
  },
  testAddWFSQuery2(){  
    // let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetCapabilities&service=WFS"
     let url="http://192.168.1.112:6080/arcgis/services/test/WFSService/MapServer/WFSServer?request=GetFeature&service=WFS&typename=test_WFSService:zgguihua&outputFormat=application/json"
     
     var vectorSource = new VectorSource({
       format: new  GeoJSON(),
       url: url,
       strategy:bboxStrategy
     })
   
     var vector = new VectorLayer({
       source: vectorSource ,  
       style: new Style({
         stroke: new Stroke({
             color: 'rgba(0, 0, 255, 1.0)',
             width: 2
         })
       })
     }); 
   
     mapHelper.map.addLayer(vector)  
     var extent=vector.getExtent()
     var view = mapHelper.map.getView();
     view.fit(extent, map.getSize());
   },
  //添加动态的WMS 服务
  addTileWMS(url, prj, className, index) {

  },


}

//  //--------------------------投影切换-----------------------------------
// export let  transformManager={


// }