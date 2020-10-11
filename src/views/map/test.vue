<template>
    <div>
        <el-button @click="onPreview">预览</el-button>
        <el-image-viewer 
                     v-if="showViewer" 
                     :on-close="closeViewer" 
                     :url-list="[url]" />
    </div>
</template>
<script>
    // 导入组件
    import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
    
    export default {
      name: 'Index',
      components: { ElImageViewer },
      data() {
        return {
          showViewer: false, // 显示查看器
          url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
      },
      methods: {
        onPreview() {
          this.showViewer = true
        },
        // 关闭查看器
        closeViewer() {
          this.showViewer = false
        }
    }}
</script>