//天地图密钥
 const  tianditukey="5213f265b5d0df2d26092944a19cb6c2"
 const BaseServerurl = "http://192.168.1.112:8765";
//天地底图地址
 const baseMapSrc = 
  {           
    tdtImg: 
    BaseServerurl+'/TilesImg/{z}/{x}/{y}.png',
    //`http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+tianditukey,

    tdtCia:`http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtVec:  `http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+tianditukey,
    tdtCva: `http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtTer: `http://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtCta: `http://t0.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
  }
const baseMapNames=["tdtImg","tdtCia","tdtVec","tdtCva","tdtTer","tdtCta"]
const mapServiceType=['WMS','WFS','WMTS','TMS','WCS']
const mapDataType=['Shp','Json']


let mapServicesData={
   name:'',//名称
   alias:'',//别名
   type:'',//类型
   urls:[],// 数组
   prj:'',//坐标系
   center:'',//服务的地图中心
   extent:[],//服务的显示范围
   params:{},//服务 附带的参数设置
   className:''//服务的分组
}

const mapconfig={
    center:[114.93, 25.83], //地图中心-赣州
    zoom:15,          //地图缩放级别
    maxZoom:20,//最高缩放级别
    minZoom:10,//最低缩放级别
    mapSrc:baseMapSrc,//底图图层
    scaleLine:false,//比例尺显示
    projection:'EPSG:4326' ,//坐标系
    constrainResolution:true,//
    baseMapNames:baseMapNames,//底图图层名
    mapServiceType:mapServiceType,//地图服务类型
    mapDataType:mapDataType//地图数据类型

};

export default mapconfig

