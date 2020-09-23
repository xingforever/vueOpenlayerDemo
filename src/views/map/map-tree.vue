<template>
 <div class="">
 <el-tree
 :data="data"
  :props="defaultProps"
  :expand-on-click-node="false"
  :filter-node-method="filterNode"
  highlight-current
  node-key="id"
  ref="tree"
  default-expand-all
  @node-click="handleNodeClick"
  @node-drop="handleDrop"
  draggable

 ></el-tree>
  
 </div>
</template>
 
<script>
export default {
 name: 'map-tree',
 data () {
 return 
 {
    
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    
 }
 
 },
 methods:{
      // 拖拽事件 参数依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop: async function(draggingNode, dropNode, dropType, ev) {
          var paramData = [];
          // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
          // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
          var data = dropType != "inner" ? dropNode.parent.data : dropNode.data;
          var nodeData = dropNode.level == 1 && dropType != "inner" ? data : data.children;
          // 设置父ID,当level为1说明在第一级，pid为空
          nodeData.forEach(element => {
            element.pid = dropNode.level == 1 ? "" : data.id;
          });
          nodeData.forEach((element, i) => {
            var dept = {
              deptId: element.id,
              parentDeptId: element.pid,
              order: i
            };
            paramData.push(dept);
          });
        
          this.loading = true;
        //   // 得到这次操作需要变更的数据范围，请求后台批量处理即可...
        //   DeptAPI.updateDeptTreeOrder(JSON.stringify(paramData)).then(res => {
        //     console.log(res);
            //自行逻辑，可以加提示框message
            this.loading = false;
          
    }
 
 }
}
</script>
 
<style scoped lang = "sass">
 
</style>