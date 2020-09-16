import Rotate from 'ol/control/Rotate';
import FullScreen from 'ol/control/FullScreen';
import MousePosition from "ol/control/MousePosition";
import ScaleLine from 'ol/control/ScaleLine';
import Zoom from 'ol/control/Zoom';
import {createStringXY} from 'ol/coordinate';
//  MousePosition 鼠标位置控件
const mousePositionControl = new MousePosition({
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
        return "经度：" + e[0].toFixed(2) + "° , 纬度：" + e[1].toFixed(2) + "°";
    },
   
});
//  zoomControl  放大缩小控件
const zoomControl=new Zoom({
className: "custom-zoom",
target: document.getElementById("zoomControl")
})
//className:'custom-scaleLine',
const  scaleLineControl=new ScaleLine({ 
target: document.getElementById("scaleLineControl"),
minWidth:64,
bar:false,
steps:4,
text:false,
units:'metric'

})
const olControls={
    //全屏控件
    fullScreen:new FullScreen(),
    //比例尺控件
    scaleLine:scaleLineControl,
    //旋转
    rotate:new Rotate(),
    //放大缩小
    zoom:zoomControl,
    //鼠标位置
    mousePositionControl:mousePositionControl


}
export default olControls