<style>
    .frame-layout {
        width: 140vh;
        height: auto;
    }

    .frame-carousel-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
<template>
    <page-frame>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div slot="slotOther">
            <Layout class="frame-layout">
                <Content>
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
                </Content>
            </Layout>
        </div>
    </page-frame>
</template>
<script>
    import PageFrame from '../components/pageFrame';

    export default {
        // 注册组件
        components: {PageFrame},

        created: function () {
        },

        methods: {}
    };
</script>