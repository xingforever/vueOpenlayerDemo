//天地图密钥
 const  tianditukey="5213f265b5d0df2d26092944a19cb6c2"
//天地底图地址
 const baseMapSrc = 
  {           
    tdtImg:  `http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+tianditukey,
    tdtCia:`http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtVec:  `http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=`+tianditukey,
    tdtCva: `http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtTer: `http://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
    tdtCta: `http://t0.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=`+tianditukey,
  }
  const baseMapNames=["tdtImg","tdtCia","tdtVec","tdtCva","tdtTer","tdtCta"]

const mapconfig={
    center:[114.93, 25.83], //地图中心-赣州
    zoom:15,          //地图缩放级别
    maxZoom:20,//最高缩放级别
    minZoom:10,//最低缩放级别
    mapSrc:baseMapSrc,//底图图层
    scaleLine:false,//比例尺显示
    projection:'EPSG:4326' ,//坐标系
    constrainResolution:true,//
   baseMapNames:baseMapNames
};

export default mapconfig

