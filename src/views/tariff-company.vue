<style>
    .company {
        padding-top: 3%;
        margin: 0 auto;
        width: 360px;
    }
</style>

<template>
    <div class="company">
        <Form :model="companyForm" :label-width="90">
            <FormItem label="业务类型">
                <Select v-model="companyForm.business" style="width: 300px">
                    <Option value="WATER">水费</Option>
                    <Option value="ELECTRICITY">电费</Option>
                    <Option value="NETWORK">网费</Option>
                    <Option value="PROPERTY">物业费</Option>
                    <Option value="PARKING">停车费</Option>
                    <Option value="SITE">场地使用费</Option>
                </Select>
            </FormItem>
            <FormItem label="公司名称">
                <Input v-model="companyForm.name" placeholder="公司名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="公司地址">
                <al-selector v-model="companyForm.city" size="small" style="width: 400px"
                             data-type="name"></al-selector>
                <Col span="2" style="text-align: center"></Col>
                <Input v-model="companyForm.address" placeholder="公司地址" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="联系电话">
                <Input v-model="companyForm.telephone" placeholder="联系电话" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="组织机构代码">
                <Input v-model="companyForm.organizationCode" placeholder="组织机构代码" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="企业法人">
                <Input v-model="companyForm.legalName" placeholder="企业法人" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="成立时间">
                <Input v-model="companyForm.establish" placeholder="成立时间" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="注册资金">
                <Input v-model="companyForm.registerCapital" placeholder="注册资金" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="状态">
                <i-switch v-model="companyForm.status" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary">Submit</Button>
                <Button type="ghost" style="margin-left: 8px">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                companyForm: {
                    business: '',
                    name: '',
                    city: '',
                    address: '',
                    telephone: '',
                    organizationCode: '',
                    legalName: '',
                    establish: '',
                    registerCapital: '',
                    status: true,
                }
            };
        }
    };
</script>
