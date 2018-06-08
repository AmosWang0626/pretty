<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
    import echarts from 'echarts';
    import httpUtil from '../../libs/util';

    export default {
        name: 'displayGrid',
        data() {
            return {
                seriesData: {
                    month: [],
                    water: [],
                    electricity: [],
                    network: [],
                    site: [],
                    property: [],
                    parking: []
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
                httpUtil.httpRequestGet('/bill/billData').then(callback);
            },

            changeView: function () {
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
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.seriesData.month
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
                            data: this.seriesData.water
                        }, {
                            name: '电费',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: '#2e792a'
                                }
                            },
                            data: this.seriesData.electricity
                        }, {
                            name: '网费',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: '#70bfea'
                                }
                            },
                            data: this.seriesData.network
                        }, {
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
                            data: this.seriesData.site
                        }, {
                            name: '停车费',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    position: 'top'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: '#ffc11b'
                                }
                            },
                            data: this.seriesData.property
                        }, {
                            name: '场地使用费',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    position: 'top'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: '#7affe4'
                                }
                            },
                            data: this.seriesData.parking
                        }
                    ]
                };
                const displayGrid = echarts.init(document.getElementById('service_request_con'));

                displayGrid.setOption(option);

                window.addEventListener('resize', function () {
                    displayGrid.resize();
                });
            }
        }
    };
</script>