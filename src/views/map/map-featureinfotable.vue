<template>
    <div>
        <div class="olmap-featureinfo_table" v-show="!isThumb">
            <div class="olmap_featureinfo_head">

                <span> 共有数据1110条</span>
                <span>
                    <i class="el-icon-download"></i>
                    <i class="el-icon-arrow-down" @click="showThumb"></i>
                </span>

            </div>
            <div class="olmap_featureinfo_datail">
                <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
                    <el-table-column v-for="(item, index) in tablesColumns" :key="index" :label="item.lable"
                        :prop="item.value"></el-table-column>
                </el-table>
            </div>
            <div class="olmap_featureinfo__pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                    :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                    background layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
        <div class="olmap-featureinfo_table_thumbnail" v-show="isThumb">
            <i class="el-icon-s-grid" @click="showThumb"></i>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'vueName',
        data() {
            return {
                tablesColumns: [{
                        lable: '日期',
                        value: 'date'
                    },
                    {
                        lable: '名字',
                        value: 'name'
                    },
                    {
                        lable: '地址',
                        value: 'address'
                    }

                ],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                isThumb: false,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
            }
        },
        methods: {
            //表格显示与隐藏
            showThumb() {
                if (this.isThumb) {
                    this.isThumb = false
                } else {
                    this.isThumb = true
                }
            },
             // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
        }
    }
</script>

<style scoped>
    .olmap-featureinfo_table {
        position: absolute;
        width: 99%;
        height: 45%;
        top: 50%;
        background-color: hsla(0, 0%, 100%, 0.95);
        left: 0.5%;
        z-index: 1000;
        bottom: 40px;
    }

    .olmap_featureinfo_head {
        height: 35px;
        text-align: center;
        background-color: #288fef;
        line-height: 35px;

    }

    .olmap_featureinfo_head>span {
        color: white;

    }

    .olmap_featureinfo_head span:nth-child(2) {
        float: right;
        padding-right: 20px;
    }

    .olmap-featureinfo_table_thumbnail {
        position: absolute;
        padding-left: 5px;
        cursor: pointer;
        bottom: 100px;
        background-color: #fff;
        left: 20px;
        width: 25px;
        height: 25px;
        border: 1px solid;

    }
</style>