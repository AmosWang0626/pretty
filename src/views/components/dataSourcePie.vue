<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: 'dataSourcePie',
        data() {
            return {
                //66666666
            };
        },
        mounted() {
            this.$nextTick(() => {
                let dataSourcePie = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['现金', '银行卡', '支付宝', '微信', '其他']
                    },
                    series: [
                        {
                            name: '支付占比',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 2103456, name: '现金', itemStyle: {normal: {color: '#e85b7d'}}},
                                {value: 1305923, name: '银行卡', itemStyle: {normal: {color: '#ddc772'}}},
                                {value: 543250, name: '支付宝', itemStyle: {normal: {color: '#56abe4'}}},
                                {value: 798403, name: '微信', itemStyle: {normal: {color: '#01d10c'}}},
                                {value: 302340, name: '其他', itemStyle: {normal: {color: '#51636f'}}}
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
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        }
    };
</script>
