<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: 'displayGrid',

        mounted() {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '3%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['二月', '三月', '四月', '五月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '水费',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#2e7ce1'
                            }
                        },
                        data: [120, 90, 230, 210]
                    },
                    {
                        name: '电费',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#1c0079'
                            }
                        },
                        data: [257, 358, 290, 330]
                    },
                    {
                        name: '网费',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#70bfea'
                            }
                        },
                        data: [379, 269, 310, 478]
                    },
                    {
                        name: '物业费',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#77e550'
                            }
                        },
                        data: [320, 334, 390, 330]
                    },
                    {
                        name: '场地使用费',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#ffc11b'
                            }
                        },
                        data: [820, 546, 624, 258]
                    }
                ]
            };
            const displayGrid = echarts.init(document.getElementById('service_request_con'));

            displayGrid.setOption(option);

            window.addEventListener('resize', function () {
                displayGrid.resize();
            });
        }
    };
</script>