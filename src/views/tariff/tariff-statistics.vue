<style>
    .card-title {
        color: #abafbd;
    }

    .data-source-row {
        height: 250px;
    }

    .line-chart-con {
        height: 300px;
    }

    /* 页面相关UI */
    .page-sole {
        text-align: center;
    }

</style>
<template>
    <page-frame :pageFrameStyle='frameStyle'>
        <div class="page-sole" slot="slotOther">
            <Row :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        支付渠道
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Row>

            <Row :style="{marginTop: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        前三个月缴费统计
                    </p>
                    <div class="line-chart-con">
                        <service-requests></service-requests>
                    </div>
                </Card>
            </Row>
        </div>
    </page-frame>
</template>
<script>
    import PageFrame from '../components/pageFrame';
    import dataSourcePie from '../components/dataSourcePie';
    import serviceRequests from '../components/serviceRequests';

    export default {
        data() {
            return {
                // 给模板页设置样式
                frameStyle: {
                    openNames: ['4'],
                }
            };
        },

        // 注册组件
        components: {
            PageFrame,
            dataSourcePie,
            serviceRequests
        }
    };
</script>