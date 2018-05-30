<style>
    /* 表格分页相关UI */
    .other {
        text-align: center;
    }
</style>
<template>
    <page-frame>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div class="other" slot="slotOther">
            <Upload action="/property/file/upload/"
                    name="file"
                    type="drag"
                    :on-success="uploadSuccess"
                    :headers="header">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>拖拽上传或选择文件上传</p>
                </div>
            </Upload>
            {{this.imgUrl}}
        </div>
    </page-frame>
</template>
<script>
    // import httpUtil from '../../libs/util';
    // import dateUtil from '../../libs/date';
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {
                header: {
                    token: localStorage.getItem('token'),
                    rolesId: localStorage.getItem('rolesId')
                },
                imgUrl: '',
                other: '',
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
        },

        methods: {
            // 图片上传
            uploadSuccess: function (res) {
                if (res && res.respCode === '1000') {
                    this.$Message.success(res.respMsg);
                    this.imgUrl = '图片上传成功,路径: ' + res.body;
                } else {
                    this.$Message.error('上传图片失败');
                }
            }
        }
    };
</script>