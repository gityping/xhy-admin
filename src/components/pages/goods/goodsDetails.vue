<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem>商品列表</BreadcrumbItem>
        <BreadcrumbItem>商品详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="layout-content-detail">
      <div class="table_content">
        <Form>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="商品名称:">
                <span>{{mydetails.name}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="分类/品牌:">
                <span>{{mydetails.f_brand_name}}  - {{details.s_brand_name}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="图片:">
                  <img v-for="(item, index) in mydetails.pic_list" :src="item.pic" :key="index" style="width: 120px; height: 100px;margin-left: 20px;">
                <!-- <span>{{details.allow_sale}}</span> -->
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="上/下架:">
                <span>{{mydetails.allow_sale === 1 ? '上架' : '下架'}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="市场价:">
                <span>{{mydetails.market_price}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="出售价:">
                <span>{{mydetails.sale_price}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="标签:">
                <span>{{mydetails.tag}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="商品规格:">
                <div v-for="(item, index) in mydetails.specs" :key="index">
                  <span>{{item.title}}</span><br/>
                  <span v-for="(item, index) in item.content" :key="index" style="margin-left: 80px;">{{item}}</span>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="规格明细:">
                <div>
                  <Row>
                    <i-col span="2">{{this.rulesTitle}}</i-col>
                    <i-col span="3">purchase_price</i-col>
                    <i-col span="3">sale_price</i-col>
                    <i-col span="3">market_price</i-col>
                    <i-col span="3">warehousing_count</i-col>
                    <i-col span="3">specs</i-col>
                    <i-col span="3">cover</i-col>
                  </Row>
                  <Row v-for="(item, index) in detailsList" :key="index">
                    <i-col span="2" style="margin-left: 75px;">{{item}}</i-col>
                    <i-col span="3"><span>{{mydetails.product_detail[index].purchase_price}}</span></i-col>
                    <i-col span="3"><span>{{mydetails.product_detail[index].sale_price}}</span></i-col>
                    <i-col span="3"><span>{{mydetails.product_detail[index].market_price}}</span></i-col>
                    <i-col span="3"><span>{{mydetails.product_detail[index].count}}</span></i-col>
                    <i-col span="3"><span>{{mydetails.product_detail[index].specs}}</span></i-col>
                    <i-col><img :src="mydetails.product_detail[index].cover" style="width: 80px; height: 80px;"></i-col>
                  </Row>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="商品备注:">
                <span>{{mydetails.remark}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="12">
            <i-col span="8">
              <FormItem label="商品详情:">
                <span v-html="mydetails.detail"></span>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mydetails: {
        f_brand_id: '',
        s_brand_id: '',
        name: '',
        cover: '',
        product_no: '',
        detail: '',
        allow_sale: '1',
        tag: '',
        market_price: '',
        remark: '',
        market_no: '',
        sale_price: '',
        specs: [],
        pic_list: [],
        product_detail: []
      },
      goodsId: this.$route.params.goodsId,
      rulesTitle: '',
      detailsList: [],
      details: {
        purchase_price: [],
        sale_price: [],
        market_price: [],
        warehousing_count: [],
        specs: [],
        cover: []
      },
      rulesValue: []
    }
  },
  methods: {
    getgoodsDetailss (id) {
      let that = this
      that.$http.get('admin/v1/product/' + id).then(res => {
        console.log(res)
        if (res.status === 200) {
          var index = 0
          this.rulesTitle = ''
          this.mydetails = res.data
          this.rulesValue = res.data.specs
          this.detailsList.length = res.data.product_detail.length
          if (this.rulesValue.length === 1) {
            this.rulesTitle = this.rulesValue[0].title
            this.detailsList = this.rulesValue[0].content
          } else if (this.rulesValue.length === 2) {
            this.rulesTitle = this.rulesValue[0].title + '    ' + this.rulesValue[1].title
            for (let i = 0; i < this.rulesValue[0].content.length; i++) {
              for (let j = 0; j < this.rulesValue[1].content.length; j++) {
                var title =
                  this.rulesValue[0].content[i] +
                  '    ' +
                  this.rulesValue[1].content[j]
                console.log(title)
                this.detailsList[index] = title
                index++
              }
            }
          } else {
          }
          // debugger
          console.log('res.data.product_detail')
          console.log(res.data.product_detail)
          // that.details = res.data.product_detail
          for (let i = 0; i < res.data.product_detail.length; i++) {
            this.details.market_price[i] =
              res.data.product_detail[i].market_price
            this.details.purchase_price[i] =
              res.data.product_detail[i].purchase_price
            this.details.sale_price[i] = res.data.product_detail[i].sale_price
            this.details.specs[i] = res.data.product_detail[i].specs
            // this.details.cover[i] = res.data.product_detail[i].cover
            this.details.warehousing_count[i] =
              res.data.product_detail[i].count
            this.coverList.push({
              name: 'file.name',
              url: res.data.product_detail[i].cover,
              showProgress: false,
              status: 'finished'
            })
          }
          for (let i = 0; i < res.data.pic_list.length; i++) {
            this.uploadList.push({
              name: 'file.name',
              url: res.data.pic_list[i].pic,
              showProgress: false,
              status: 'finished'
            })
          }
          // this.value.push(res.data.f_brand_name)
          // this.value.push(res.data.s_brand_name)
          // this.addForm.cover = res.data.cover
        } else {
          that.$Message.error(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.getgoodsDetailss(this.goodsId)
  }
}
</script>
