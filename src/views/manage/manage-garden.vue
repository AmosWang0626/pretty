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
    <page-frame>
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
                <Form ref="garden" :model="garden" :label-width="0">
                    <FormItem label="园区名称" prop="types">
                        <Input v-model="garden.types" disabled placeholder="中原工学院科技园" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="园区地址" prop="amount">
                        <Input v-model="garden.amount" disabled placeholder="郑州市新郑市107国道西50米" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="园区大小" prop="amount">
                        <Input v-model="garden.amount" disabled placeholder="115亩" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="联系电话" prop="amount">
                        <Input v-model="garden.amount" disabled placeholder="设备数量" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="设备数量" prop="amount">
                        <Input v-model="garden.amount" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="为深入实施科研强校战略，加快科技成果转化和高新技术产业化，实现产学研用结合，促进教学研究型大学建设，2010年中原工学院开始筹划建设科技园，2011年在学校西侧完成征地100多亩。2012年，经广泛调研、反复论证，学校出台了《关于科技园建设与发展的指导意见》，成立了科技园管理委员会，并正式开工建设科技园，成为河南省唯一个独立自建的高校科技园区。" style="width: 300px"></Input>
                    </FormItem>
                </Form>
            </Layout>
        </div>
    </page-frame>
</template>
<script>
    import PageFrame from '../components/pageFrame';

    export default {

        data() {
            return {
                // 下拉列表
                businessList: [],

                garden: {
                    types: '',
                    amount: '',
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