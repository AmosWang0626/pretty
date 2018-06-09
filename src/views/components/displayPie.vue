<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
    import echarts from 'echarts';
    import httpUtil from '../../libs/util';

    export default {
        name: 'displayPie',
        data() {
            return {
                seriesData: {
                    cash: 1000,
                    bankCard: 1000,
                    aliPay: 1000,
                    weChat: 1000
                }
            };
        },

        created: function () {
            this.getData();
        },

        mounted() {
            this.$nextTick(() => {
                this.changeView();
            });
        },

        methods: {
            getData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.seriesData = res.data;
                        this.changeView();
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/bill/paymentWayData').then(callback);
            },

            changeView: function () {
                let displayPie = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['现金', '银行卡', '支付宝', '微信']
                    },
                    series: [
                        {
                            name: '支付占比',
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '50%'],
                            data: [
                                {value: this.seriesData.cash, name: '现金', itemStyle: {normal: {color: '#e85b7d'}}},
                                {value: this.seriesData.bankCard, name: '银行卡', itemStyle: {normal: {color: '#ddc772'}}},
                                {value: this.seriesData.aliPay, name: '支付宝', itemStyle: {normal: {color: '#56abe4'}}},
                                {value: this.seriesData.weChat, name: '微信', itemStyle: {normal: {color: '#01d10c'}}}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                displayPie.setOption(option);
                window.addEventListener('resize', function () {
                    displayPie.resize();
                });
            }
        }
    };
</script>
