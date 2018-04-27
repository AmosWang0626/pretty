<style>
    .frame-div {
        width: 93vh;
        height: auto;
    }

    .frame-carousel-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
<template>
    <page-frame :pageFrameStyle='frameStyle'>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div slot="slotOther">
            <Layout>
                <Content>
                    <div class="frame-div">
                        <Carousel autoplay loop>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/1111.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/2222.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/3333.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/4444.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/5555.jpg"/>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </Content>
                <Sider hide-trigger :style="{background: '#fff',marginTop: '80px', marginRight: '80px'}">
                    <Steps :current="2" direction="vertical">
                        <Step title="已完成" content="数据库设计"></Step>
                        <Step title="已完成" content="构思业务逻辑"></Step>
                        <Step title="进行中" content="设计页面"></Step>
                        <Step title="待进行" content="整体联调"></Step>
                    </Steps>
                </Sider>
            </Layout>
        </div>
    </page-frame>
</template>
<script>
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                frameStyle: {
                    // activeName: '1-1',
                    // openNames: ['1'],
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
        },

        methods: {}
    };
</script>