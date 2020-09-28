<template>
    <div>

        <div id="layManager" v-show="panelShow">
            <img src="../../assets/img/toolIcons/del.png" class="delete" @click="close"/>
            <div id="layManagerheader">图层管理</div>
            <hr>
            <draggable id="layersInfo" v-model="layerList" @update="datadragEnd" :options="{animation:200}" class="laytable">
                <div class="drag-item" v-for="(item,i) in layerList" :key="i">
                    <el-row class="lays" >
                        <el-col class="line" >
                            <el-checkbox :checked="item. mapService_IsShow"
                                @change="changeShow($event,item.mapService_Name)">&nbsp;
                                &nbsp; &nbsp; &nbsp;{{item.mapServie_Alias}}</el-checkbox>
                        </el-col>
                        
                    </el-row>
                </div>
            </draggable>
           
        </div>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    import {
        mapHelper,
        layerManager
    } from '../../utils/mapHelper.js'
    export default {
        name: 'map-layermanager2',
        data() {
            return {
                isActive: false,
                delIsShow: true,
                delImgUrl: require('../../assets/img/layer/del.png'),
                layerList: [],
              
            }
        },
        props:{
              panelShow:{
                 type: Boolean
              }
        },
        components: {
            draggable
        },
        methods: {
            datadragEnd(evt) {
                //图层管理器不能移动
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
            changeShow(event, name) {              
                layerManager.ChangeLayerVisble(name, event)
            },          
            revLayer(name) {
                layerManager.RemoveLayerByName(name)
                this.layerList = layerManager.mangerLayer;
            },
            close(){
             this.$emit('update:panelShow', false)
            }
        },
        mounted() {
             this.initLayers()           
             dragElement(document.getElementById(("layManager")));
        }
    }
   
   //图层控制-移动
    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
            //初始位置
            elmnt.style.top = "100px";
            elmnt.style.right = "100px";
            elmnt.style.width = "150px";
        if (document.getElementById(elmnt.id + "header")) {
                       //如果鼠标 进入头部，鼠标按下事件          
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown; 
        } else {            
            elmnt.onmousedown = dragMouseDown;
        } 

         //鼠标按下
        function dragMouseDown(e) {
             //获取鼠标位置
            e = e || window.event;
            // 获取鼠标当前位置
            pos3 = e.clientX;
            pos4 = e.clientY;           
            //鼠标按下又弹起    
            document.onmouseup = closeDragElement;
            //鼠标移动事件
            document.onmousemove = elementDrag;
                      
        }
        //元素移动
        function elementDrag(e) {           
             e = e || window.event;
            //计算要素的新位置
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            //元素设置为新位置          
           elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        //停止鼠标事件
        function closeDragElement() {
            //停止移动 事件设置为空
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
</script>

<style scoped>
    #layManager {
        position: absolute;       
        z-index: 9;
        background-color: white;
        text-align: left;
        color: black;
        border-radius:5px；   
    }
    #layManagerheader {
        padding: 10px;
        cursor: move;
        z-index: 10;      
        color: black;
    }
.laytable{
    margin-left: 10px;
    margin-bottom: 5px;
    margin-right: 10px;
}
    .delete {
        width: 20px;

        height: 20px;

        border-radius: 60%;

        position: absolute;

        top: -5px;

        right: -5px;

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

    .lays {
        height: 22px;
        margin-bottom: 2px;
    }

  
</style>