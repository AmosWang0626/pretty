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

        </div>
    </page-frame>
</template>
<script>
    // import httpUtil from '../../libs/util';
    // import dateUtil from '../../libs/date';
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {};
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
        },

        methods: {}
    };
</script>