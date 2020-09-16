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
import { Point,LineString, Polygon } from "ol/geom";
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
import { getArea, getLength } from "ol/sphere.js";
import ImageLayer from "ol/layer/Image";
import Text from "ol/style/Text";

let mapHelper = {
  map: null,
  allLayers: [],
  tempLayers: {}, //临时图层
  isDraw: false,
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
      color: "yellow",
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
measureStyle:new Style({
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

  //初始化地图对象
  initMap () {
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
        projection: mapconfig.projection, //使用这个坐标系
        center: mapconfig.center,
        zoom: mapconfig.zoom,
        minzoom: mapconfig.maxZoom,
        maxZoom: mapconfig.maxZoom
      }),  
      controls:[
        // olControls.zoom,
        // olControls.mousePositionControl,
        // olControls.scaleLine

      ]    

    })
    //初始化临时图层
    mapHelper.initTemLayers();
   
  },
  initTemLayers () {
    
    mapHelper.tempLayers = {
      _search: "search_Layer", //查询层
      _common: "common_Layer", //展示层
     
      search_Layer: null,
      common_Layer: null,
      init: function () {       
        this.search_Layer = mapHelper.createVecLayer(this._search)
        mapHelper.map.addLayer(this.search_Layer);
        this.common_Layer = mapHelper.createVecLayer(this._common)
        mapHelper.map.addLayer(this.common_Layer);
      },
      clear: function () {
      
        this.search_Layer.getSource().clear();
        this.common_Layer.getSource().clear();
      }
    }
    //创建临时图层
    mapHelper.tempLayers.init()


  },
  initControls(){
   mapHelper.map.addControl(olControls.zoom),
   mapHelper.map.addControl(olControls.mousePositionControl),
   mapHelper.map.addControl(olControls.scaleLine)
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
  // 根据图层名获取图层
  getLayerByName(name) {
    let allLayers = mapHelper.map.getLayers().getArray()
    let layer = allLayers.filter(item => {
      return item.get('name') === name
    })
    return layer
  },
  // 获取所有图层
  getAllLayers () {
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
  //-----------------------------工具栏-----------------------------------
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

    mapHelper.tempLayers.common_Layer.getSource().addFeature(feature);
    mapHelper.tempLayers.common_Layer.setVisible(true)

    //设置视图中心
    mapHelper.map.getView().setCenter([parseFloat(lon), parseFloat(lat)])
    return 'ok'
  },
//添加绘图
  addPoltInteraction(type) {
    mapHelper.addPoltInteractionFun(type)
  },
  //标绘方法 --layer -标绘
  addPoltInteractionFun(type) {
    if (mapHelper.plottingOption.draw != null) {
      mapHelper.map.removeInteraction(mapHelper.plottingOption.draw); // 防止多次点击添加多个图层
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
    mapHelper.plottingOption.draw = new Draw({
      source: source,
      type: _type,
      style: mapHelper.drawStyle,
      geometryFunction: geometryFunction
    });
    //添加Interaction
    mapHelper.map.addInteraction(mapHelper.plottingOption.draw);
    //监听绘制开始
    mapHelper.plottingOption.draw.on("drawstart", evt => {
     
      mapHelper.plottingOption.sketch = evt.feature;
      let plottingLayer = new VectorLayer({
        source: source,
        style: mapHelper.drawStyle,
        zIndex: 9,
        name: "标绘"
      });
      mapHelper.map.addLayer(plottingLayer);

    });
    mapHelper.plottingOption.draw.on("drawend", evt => {
     
      mapHelper.map.removeInteraction(mapHelper.plottingOption.draw);
    });
  },
  //清除工具栏创建的要素和图层
  clearLayers() {
    mapHelper.tempLayers.clear();
    mapHelper.removeLayerByName("标绘");
  },
  // 添加测量标注
  createMeasureTooltip() {
    if (mapHelper.measureOption.measureTooltipElement) {
      mapHelper.measureOption.measureTooltipElement.parentNode.removeChild(
        mapHelper.measureOption.measureTooltipElement
      );
    }
    mapHelper.measureOption.measureTooltipElement = document.createElement(
      "div"
    );
    mapHelper.measureOption.measureTooltipElement.className =
      "ol-tooltip ol-tooltip-measure";
    mapHelper.measureOption.measureTooltip = new OlOverlay({
      id: "空间测量",
      element: mapHelper.measureOption.measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center"
    });
    mapHelper.map.addOverlay(mapHelper.measureOption.measureTooltip);
  },
  //添加测量标注
  createHelpTooltip() {
    if (mapHelper.measureOption.helpTooltipElement) {
      mapHelper.measureOption.helpTooltipElement.parentNode.removeChild(
        mapHelper.measureOption.helpTooltipElement
      );
    }
    mapHelper.measureOption.helpTooltipElement = document.createElement(
      "div"
    );
    mapHelper.measureOption.helpTooltipElement.className =
      "ol-tooltip hidden";
    mapHelper.measureOption.helpTooltip = new OlOverlay({
      id: "空间测量",
      element: mapHelper.measureOption.helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
  },
  // 格式化距离
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
  // 格式化面积
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
  // 设置提示信息
  pointerMoveHandler(evt) {
    if (evt.dragging) {
      return;
    }   
    if (mapHelper.measureOption.sketch) {
      let geom = mapHelper.measureOption.sketch.getGeometry();
      if (geom instanceof Polygon) {
        mapHelper.measureOption.helpMsg = mapHelper.measureOption.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        mapHelper.measureOption.helpMsg = mapHelper.measureOption.continueLineMsg;
      }
    }
    mapHelper.measureOption.helpTooltipElement.innerHTML = mapHelper.measureOption.helpMsg;
    mapHelper.measureOption.helpTooltip.setPosition(evt.coordinate);
    mapHelper.measureOption.helpTooltipElement.classList.remove("hidden");
    
  },
  //空间测量
 
  spaceMeasure(measureType) {
   
   mapHelper.map.on("pointermove", mapHelper.pointerMoveHandler);
  mapHelper.map.getViewport().addEventListener("mouseout", () => {
    mapHelper.measureOption.helpTooltipElement.classList.add("hidden");
  });
  mapHelper.addInteractionFun(measureType);
},
addInteractionFun(measureType) {
  
  if (mapHelper.measureOption.draw != null) {
    mapHelper.map.removeInteraction(mapHelper.measureOption.draw); // 防止多次点击添加多个图层
  }
  let source = new VectorSource();
  // 绘制时的样式
  mapHelper.measureOption.draw = new Draw({
    source: source,
    type: measureType,
    style: mapHelper.measureStyle
  });
  mapHelper.map.addInteraction(mapHelper.measureOption.draw);
  mapHelper.measureOption.draw.on("drawstart", evt => {
    mapHelper.measureOption.sketch = evt.feature;
    let type = mapHelper.measureOption.sketch.getGeometry();
    if (type instanceof Point) {
      // 如果是绘制点
      let pointCoordinates = mapHelper.measureOption.sketch.getGeometry()
        .flatCoordinates;
        mapHelper.measureOption.measureTooltipElement.innerHTML = pointCoordinates;
        mapHelper.measureOption.measureTooltip.setPosition(
        pointCoordinates
      );
    } else {
      // 如果是绘制线和面
      let tooltipCoord = evt.coordinate;
      mapHelper.measureOption.listener = mapHelper.measureOption.sketch
        .getGeometry()
        .on("change", evt => {
          let geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = mapHelper.formatArea(geom);
            tooltipCoord = geom
              .getInteriorPoint()
              .getCoordinates();
          } else if (geom instanceof LineString) {
            output = mapHelper.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          mapHelper.measureOption.measureTooltipElement.innerHTML = output;
          mapHelper.measureOption.measureTooltip.setPosition(
            tooltipCoord
          );
        });
    }
  });

  mapHelper.measureOption.draw.on("drawend", () => {  
    mapHelper.measureOption.measureTooltipElement.appendChild(
      mapHelper.measureOption.popupcloser
    );
    mapHelper.measureOption.measureTooltipElement.className =
      "ol-tooltip ol-tooltip-static";
      mapHelper.measureOption.measureTooltip.setOffset([0, -7]);
      mapHelper.measureOption.sketch = null;
      mapHelper.measureOption.measureTooltipElement = null;
      mapHelper.createMeasureTooltip();
    mapHelper.map.un("pointermove",mapHelper.pointerMoveHandler);
    mapHelper.map.removeInteraction(mapHelper.measureOption.draw);
    mapHelper.measureOption.helpTooltipElement.classList.add("hidden");
  });
  // 将画好的 VectorLayer 图层添加到 map 中
  let measureLayer = new VectorLayer({
    source: source,
    style: mapHelper.measureStyle,
    zIndex: 9,
    name: "空间测量"
  });
  mapHelper.map.addLayer(measureLayer);
  mapHelper.createMeasureTooltip();
  mapHelper.createHelpTooltip();
  // 删除测量标注
  mapHelper.measureOption.popupcloser = document.createElement("a");
  mapHelper.measureOption.popupcloser.innerHTML =
    '<span style="color:red;font-size:18px;"></span>';
    mapHelper.measureOption.popupcloser.href = "javascript:void(0);";
    mapHelper.measureOption.popupcloser.classList.add("ol-popup-closer");
    mapHelper.measureOption.popupcloser.onclick = e => {
    let parentNode = e.target.parentNode.parentNode.parentNode;
    parentNode.remove();
    measureLayer.getSource().clear();
  };
},
// 清除空间测量
clearToolDraw(){
  mapHelper.tempLayers.clear();
  mapHelper.removeLayerByName('标绘')
  mapHelper.removeLayerByName('空间测量')
}
}
export default mapHelper