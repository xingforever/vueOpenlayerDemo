<template>
 <div class="mapControl">
   <MousePositon></MousePositon>
   <MouseZoom></MouseZoom>
   <MapScaleLine></MapScaleLine>
 </div>
</template>
 
<script>
import MousePositon from './MousePosition' 
import MouseZoom from './MapZoom' 
import MapScaleLine from './MapScaleLine' 
export default {
 name: 'MapControls',
  components: {
      MousePositon,
      MouseZoom,
      MapScaleLine
  }
}
</script>
 
