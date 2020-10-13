<template>
    <div>
        <div class="box-search">
            <div class="bar-search">
                <el-button size="small" round class="btn_openlayers" @click="isShowLayManager = true">图层</el-button>
                <el-input class="txt_search" placeholder="请输入内容" v-model="input3">
                    <el-button size="mini" slot="append" type="primary" icon="el-icon-search">搜索</el-button>
                </el-input>

            </div>
        </div>
        <div class="layersearch-resource" v-show="isShowLayManager">
            <div class="layersearch-head">
                <span >图层控制</span>                
                <div style="float: right;padding-right: 14px;">
                    <img  src="/img/mapindex/del.png" class="layersearch-hide" @click="isShowLayManager=false">
                   
                </div>
            </div>
            <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :props="defaultProps"
                @check='(click, checked)=>{checkNode(click, checked)}' ref='tree'>
            </el-tree>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'map-layersearch',
        data() {
            return {

                input3: '',
                drawer: false,
                direction: 'ltr',
                data: [{
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [{
                                id: 9,
                                label: '三级 1-1-1'
                            }, {
                                id: 10,
                                label: '三级 1-1-2'
                            }]
                        }]
                    },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                    }, {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                isShowLayManager:false

            };

        },
        methods: {
            checkNode(node, ischeck) {

                // console.log(this.$refs.tree)
                //  let ckey = this.$refs.tree.getCurrentKey()
                //  let cnode = this.$refs.tree.getCurrentNode()
                //  let chknodes = this.$refs.tree.getCheckedNodes()
                // // console.log(nodes)
                //  console.log(ckey)
                //  console.log(cnode)
                // console.log(chknodes)
                console.log(node)
                console.log(ischeck)
            },
            hideLayManager(){
                this.isShowLayManager=false
            }
        }
    }
</script>

<style scoped>
    .box-search {
        position: absolute;
        top: 40px;
        left: 15px;
        z-index: 2;
    }

    .bar-search {
        width: 368px;
        height: 50px;
        background: #fff;
        border-radius: 2px;
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .2), 0 -1px 0 rgba(0, 0, 0, .02);
    }

    .btn_openlayers {
        float: left;
        margin: 8px;
        color: #fff;
        background: #65a3f3;
        cursor: pointer;
    }

    .txt_search {
        position: absolute;
        float: left;
        width: 290px;
        height: 20px;
        line-height: 26px;
        margin-top: 6px;
        font-size: 14px;
    }

    .layersearch-resource {
        position: absolute;
        top: 64px;
        bottom: 38px;
        width: 380px;
        padding: 10px;
        box-sizing: border-box;
        z-index: 2;
        background: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, .3);
        left: 0px;
        display: block;
    }
    .layersearch-head{
        margin-bottom: 10px;
    }
     .layersearch-hide{
      cursor: pointer;
    }
</style>