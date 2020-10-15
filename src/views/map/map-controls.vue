<template>

 <div class="mapControl">
   <mapMouseposition></mapMouseposition>
   <mapZoom></mapZoom>
   <mapZoom></mapZoom>
 </div>
 
</template>
 
<script>
import mapMouseposition from '@/views/map/map-mouseposition'
import mapScaleline from '@/views/map/map-scaleline'
import mapZoom from '@/views/map/map-zoom'
export default {
 name: 'map-controls',
  components: {
      mapMouseposition,
      mapZoom,
      mapScaleline
  }
}
</script>
 
