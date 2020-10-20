<template>
  <div>
    <div class="infotable">
      <el-table :data="tableDatas" max-height:300 :stripe="true" :row-style="{height: '5px'}">
        <el-table-column min-width="10" prop="key" label="属性名"></el-table-column>
        <el-table-column min-width="10" prop="value" label="属性值"></el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "map-featureinfo",
    props: {
      tableDatas: Array
    },
    watch: {
      tableData(val) {
        this.tableDatas = this.val;
      }
    }

  }
</script>
<style lang="less" scoped>
  .infotable {
    min-height: 100px;
    max-height: 250px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border: whitesmoke;
    background-color: white;
    padding: 0px 5px 5px 5px;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
-webkit-box-sizing:border-box; /* Safari */
  }

  /deep/ .el-table .cell {

    line-height: 15px;
  }

  /deep/ .el-table td,
  .el-table th {
    padding: 5px 0px 10px 0px;

  }

  /deep/ .el-table__header,
  .is-leaf {
    padding: 0px;
  }
</style>