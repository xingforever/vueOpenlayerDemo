<template>

    <div id="mapType-wrapper" @mouseover="mouseEnter()" :class="{'expand':active}"  @mouseout="mouseOut()" >
        <div id="mapType">
            <div class="mapTypeCard panorama1 mapChange choosedType" :class="{'active':selectnum==0}"  data-num=0  data-name="tdtImg,tdtCia" @click="changeMap($event)"><span>影像地图</span></div>
            <div class="mapTypeCard panorama mapChange choosedType" :class="{'active':selectnum==1}"   data-num=1 data-name="tdtTer,tdtCta" @click="changeMap($event)" ><span>地形地图</span></div>
            <div class="mapTypeCard normal  mapChange  choosedType"       :class="{'active':selectnum==2}"  data-num=2   data-name="tdtVec,tdtCva" @click="changeMap($event)"  ><span>矢量地图</span></div>
            <div class="mapTypeCard mapChange earth  choosedType"   :class="{'active':selectnum==3}"   data-num=3   data-name="cesuimmap" @click="changeMap($event)" > <span>三维地球</span> </div>
        </div>
    </div>
</template>

<script>
  import{ toolsHelper, mapHelper}  from '../../utils/mapHelper.js'

    export default {
        name: 'map-change',
        data() {
            return {              
              active: false,
              selectnum:0
            }
        },
        mounted() {
           this.selectnum=0
           const arr=["tdtImg,tdtCia"]        
         
        },
        methods: {
           
            changeMap: function (event) { 
         
            let str = [event.srcElement.dataset.name][0]  
            
            if(str=='cesuimmap') {
              this.$emit('setShowinfo', false)
            
            }else{
             this.$emit('setShowinfo',true)                        
            //提交  --修改baseMap的可见性             
            var arr = str.split(',');                   
            mapHelper.changeBaseMapVisible(arr)
            }
            },  
            mouseEnter:function(){
               this.active=true
            },
             mouseOut:function(){
                this.active=false
            }
        }
    }
</script>

<style>
    /*切换地图的样式*/
    #mapType-wrapper {
        position: absolute;
        bottom: 40px;
        right: 5px;
        z-index: 3;
        cursor: pointer;
    }

    #mapType .mapTypeCard {
        position: absolute;
        padding-left: 5px;
        height: 50px;
        width: 75px;
        border-radius: 3px;
        top: 5px;
        box-sizing: border-box;
        background-image: url('../../assets/img/mapIcons/shadow_6bf0ecd.png');
        display: inline-block;
        transition-property: right, background-image;
        transition-duration: .4s;
        border: 1px solid rgba(153, 153, 153, .42);
        text-align: center;
    }

    #mapType .mapTypeCard:hover {
        border: 1px solid #3385ff;
    }

    /*#mapType .active {
    display: none;
}*/

    .mapTypeCard span {
        background-color: rgba(254, 254, 254, 0.68);
        font-size: 12px;
        border-radius: 1px;
        padding: 1px 3px;
        top: 2px;
    }

    #mapType .mapTypeCard.active span {
        background: #3385ff;
        color: #fff;
    }

    .normal {
        z-index: 2;
        background-position: 0 0;
        right: 10px;
        background-size: 86px 240px;
    }

    .earth {
        z-index: 3;
        right: 5px;
        background-position: 0 -180px;
    }

    .panorama {
        z-index: 1;
        right: 15px;
        /*background-image:url('../../Content/Images/maptype.png');*/
        background-position: -1px -121px;
        /*border-left:1px solid rgba(153,153,153,1);*/
    }

    .panorama1 {
        z-index: 0;
        right: 20px;
        /*background-image:url('../../Content/Images/maptype.png');*/
        background-position: -1px -60px;
        /*border-left:1px solid rgba(153,153,153,1);*/
    }

    .choosedType {
        background-image: url('../../assets/img/mapIcons/maptype.png') !important;
    }

    .switch-box {
        padding-left: 5px;
        position: absolute;
        bottom: 2px;
    }

    .expand #mapType .normal {
        background-image: url('../../assets/img/mapIcons/maptype.png');
        right: 85px;
    }

    .expand #mapType .earth {
        right: 5px;
    }

    .expand #mapType .panorama {
        right: 165px;
    }

    .expand #mapType .panorama1 {
        right: 245px;
    }

    .expand #mapType {
        width: 326px;
        height: 60px;
        background: rgba(225, 225, 225, .6);
        border-radius: 3px;
    }

    #mapType {
        height: 60px;
        width: 80px;
        cursor: pointer;
        transition-property: width, background-color;
        transition-duration: .4s;
        background-color: rgba(255, 255, 255, 0);
    }

    #mapType .mapTypeCard.active {
        border: 1px solid #3385ff;
    }
</style>