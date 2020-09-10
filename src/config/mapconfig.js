
import baseConfig from './baseconfig.js'
//天地底图地址
 const baseMapSrc = 
  {           
    tdtImg:  `http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+baseConfig.tianditukey,
    tdtCia:`http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=`+baseConfig.tianditukey,
    tdtVec:  `http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+baseConfig.tianditukey,
    tdtCva: `http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=`+baseConfig.tianditukey,
    tdtTer: `http://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=`+baseConfig.tianditukey,
    tdtCta: `http://t0.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=`+baseConfig.tianditukey,
  }
  const baseMapNames=["tdtImg","tdtCia","tdtVec","tdtCva","tdtTer","tdtCta"]

    //天地图 地图
    const baseMapLayersInfo=[
        {            
            name:"影像地图",
            layernames:"'tdtImg','tdtCia'",
            picurl:'img.jpg'
        },
        {            
            name:"矢量地图",
            layernames:"'tdtVec','tdtCva'",
            picurl:'vec.jpg'
        },
        {            
            name:"地形地图",
            layernames:"'tdtTer','tdtCta'",
            picurl:'vec.jpg'
        },
        {
            name:"三维地球",
            layernames:"",
            picurl:'3D.jpg'
        }   
        
        ]
const mapconfig={
    center:[114.93, 25.83], //地图中心-赣州
    zoom:15,          //地图缩放级别
    maxZoom:20,//最高缩放级别
    minZoom:10,//最低缩放级别
    mapSrc:baseMapSrc,//底图图层
    scaleLine:false,//比例尺显示
    projection:'EPSG:4326' ,//坐标系
    constrainResolution:true,//
    baseMapLayersInfo:baseMapLayersInfo,//地图图层 信息
    baseMapNames:baseMapNames
};

export default mapconfig

