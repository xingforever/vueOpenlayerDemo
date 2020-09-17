<template>
 <div class="custom-scaleLine" id="scaleLineControl">
 
 </div>
</template>
 
<script>
export default {
 name: 'map-scaleline',

}
</script>
 
<style >
 .custom-scaleLine {
    position:absolute;    
    background: rgba(0,60,136,0.3);
    border-radius: 4px;
    bottom: 10px;
    left: 8px;
    padding: 2px;
    position: absolute;
   
}
.ol-scale-line
 {
    bottom: 25px !important;
}
</style>