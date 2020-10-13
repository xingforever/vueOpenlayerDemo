<template>
   <div>
     <div class="infotable">
       <el-table
         :show-header="false"
         :data="tableData"          
         style="width:200px"
         height:30      
         max-height:300
         :stripe="true"
       >         
         <el-table-column min-width="10" prop="name"></el-table-column>
         <el-table-column  min-width="10"  prop="amount1"></el-table-column>
        
       </el-table>
     </div>
   </div>
</template>
<script>
export default {
  name: "mallMember-detail",
  data() {
    return {
    //请求回来的数据
      dataForm: {
          headImg:'erere',
          id:1,
          createDate:'2010-1-2',
          nickName:'hlx',
          phone:'11111',
          gradeName:'22',
          gradeCode:'daa',
          channel:'324343',
          provinceName:'2132ffsdf',
          cityName:'kx',
          districtName:'ererew'
      },
    };
  },
  computed: {
  //因为数据用到了dataform中的数据，所以写在了computed中
    tableData() {
      return [
        {
          id: this.dataForm.headImg,
          name: "用户ID",
          amount1: this.dataForm.id,
          amount2: "注册时间",
          amount3: this.dataForm.createDate
        },
        {
          id: this.dataForm.headImg,
          name: "微信昵称",
          amount1: this.dataForm.nickName,
          amount2: "手机号码",
          amount3: this.dataForm.phone
        },
        {
          id: this.dataForm.headImg,
          name: "会员名称",
          amount1: this.dataForm.gradeName,
          amount2: "会员等级",
          amount3: this.dataForm.gradeCode
        },
        {
          id: this.dataForm.headImg,
          name: "用户来源",
          amount1: this.dataForm.channel,
          amount2: "常住地",
          amount3:
            this.dataForm.provinceName +
            this.dataForm.cityName +
            this.dataForm.districtName
        }
      ];
    }
  },
  methods: {
    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      }else{
        return "background:#ffffff;";
      }
    },
    // 和并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
  }
};
</script>
<style scoped>
.infotable{
    height:200px !important;   
    width: 300px;
    overflow :auto;
}
</style>

