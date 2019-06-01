<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem>商品列表</BreadcrumbItem>
        <BreadcrumbItem>添加商品</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="layout-content-detail">
      <div class="table_content">
        <Form :label-width="60">
          <Row>
            <i-col span="8">
              <FormItem label="商品名称">
                <Input v-model="addToform.name" placeholder="请输入商品名称" style="z-index:100;"/>
              </FormItem>
            </i-col>
            <i-col span="8">
              <!-- <FormItem label="新闻标题">
                <Input v-model="addToform.title" placeholder="请输入新闻标题"/>
              </FormItem> -->
              <FormItem label="分类/品牌" :label-width="70">
                <!-- <Select
                  multiple
                  v-model="addToform.f_brand_id">
                  <Option v-for="(item, index) in categoryList" :value="item" :key="index">{{item}}</Option>
                </Select> -->
                <Cascader :data="data" v-model="value" style="z-index:1000;"></Cascader>
              </FormItem>
            </i-col>
            <!-- <i-col span="8">
              <FormItem label="二级分类" style="margin-left:30px;">
                <Select
                  multiple
                  v-model="addToform.s_brand_id">
                  <Option v-for="(item, index) in categoryList" :value="item" :key="index">{{item}}</Option>
                </Select>
              </FormItem>
            </i-col> -->
          </Row>
          <!-- <Row>
            <i-col span="8">
              <FormItem label="商品名称">
                <Input v-model="addToform.name" placeholder="请输入商品名称" style="z-index:100;"/>
              </FormItem>
            </i-col>
          </Row> -->
          <Row>
            <i-col>
              <FormItem label="缩略图" style="z-index:100;">
                <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" style="z-index:100;">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                  <!-- v-show="!uploadList || uploadList.length == 0" -->
                <Upload
                  v-show="uploadList.length < 5"
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :format="['ico', 'png', 'jpg', 'jpeg']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="https://upload.qiniup.com"
                  :data="{token: qiniuToken}"
                  style="display: inline-block;width:258px;">
                  <div style="width: 258px;height:158px;line-height: 158px;">
                      <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="商品编号">
                <Input v-model="addToform.product_no" placeholder="请输入商品编号"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="上架/下架" :label-width="70">
                <RadioGroup v-model="addToform.allow_sale">
                  <Radio label="1">上架</Radio>
                  <Radio label="2">下架</Radio>
                </RadioGroup>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="商品标签">
                <Input v-model="addToform.tag" placeholder="请输入商品标签"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="市场价">
                <Input v-model="addToform.market_price" placeholder="请输入市场价"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="售价">
                <Input v-model="addToform.sale_price" placeholder="请输入售价"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem label="产品编号">
                <Input v-model="addToform.market_no" placeholder="请输入产品编号"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="">
                <Button type="success" @click="addGoodsRules">添加商品规格</Button>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="商品规格" v-show="rulesValue.length > 0">
                <div v-for="(item, index) in rulesValue" :key="index">
                  <Row>
                    <i-col span="1">规格名：</i-col>
                    <i-col span="2" class="divvalue">{{item.title}}</i-col>
                  </Row>
                  <Row>
                    <i-col span="1">规格值：</i-col>
                    <i-col span="2" class="divvalue" v-for="(item, index1) in item.content" :key="index1">{{item}}</i-col>
                    <i-col><Button type="error" class="divdelete" @click="deleteRules(index)">删除规格</Button></i-col>
                  </Row>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="规格明细" v-show="detailsList.length > 0">
                <div>
                  <Row>
                    <i-col span="2">{{this.rulesTitle}}</i-col>
                    <!-- <i-col span="2">name</i-col> -->
                    <i-col span="3">purchase_price</i-col>
                    <i-col span="3">sale_price</i-col>
                    <i-col span="3">market_price</i-col>
                    <i-col span="3">warehousing_count</i-col>
                    <!-- <i-col span="2">platform_profit</i-col> -->
                    <!-- <i-col span="2">market_profit</i-col> -->
                    <!-- <i-col span="2">market_no</i-col> -->
                    <i-col span="3">specs</i-col>
                    <!-- <i-col span="2">remark</i-col> -->
                    <i-col span="3">cover</i-col>
                  </Row>
                  <Row v-for="(item, index) in detailsList" :key="index">
                    <i-col span="2">{{item}}</i-col>
                    <!-- <i-col span="2"><Input style="width: 100px; z-index: 99;" v-model="details.name[index]" placeholder="请输入"/></i-col> -->
                    <i-col span="3"><Input style="width: 100px; z-index: 99;" v-model="details.purchase_price[index]" placeholder="请输入"/></i-col>
                    <i-col span="3"><Input style="width: 100px; z-index: 99;" v-model="details.sale_price[index]" placeholder="请输入"/></i-col>
                    <i-col span="3"><Input style="width: 100px; z-index: 99;" v-model="details.market_price[index]" placeholder="请输入"/></i-col>
                    <i-col span="3"><Input style="width: 100px; z-index: 99;" v-model="details.warehousing_count[index]" placeholder="请输入"/></i-col>
                    <!-- <i-col span="2"><Input style="width: 100px; z-index: 99;" v-model="details.platform_profit[index]" placeholder="请输入"/></i-col> -->
                    <!-- <i-col span="2"><Input style="width: 100px; z-index: 99;" v-model="details.market_profit[index]" placeholder="请输入"/></i-col> -->
                    <!-- <i-col span="2"><Input style="width: 100px; z-index: 99;" v-model="details.market_no[index]" placeholder="请输入"/></i-col> -->
                    <i-col span="3"><Input style="width: 100px; z-index: 99;" v-model="details.specs[index]" placeholder="请输入"/></i-col>
                    <!-- <i-col span="2"><Input style="width: 100px; z-index: 99;" v-model="details.remark[index]" placeholder="请输入"/></i-col> -->
                    <i-col>
                      <div class="demo-upload-list" v-if="coverList[index]" style="width: 80px;height: 80px;line-height: 80px;">
                        <template v-if="coverList[index]" >
                          <img :src="coverList[index].url" style="width: 80px;height: 80px;line-height: 80px;">
                          <!-- <div class="demo-upload-list-cover" style="width: 80px;height: 80px;line-height: 80px;">
                            <Icon type="ios-trash-outline" @click.native="handleRemoveSingle(item)"></Icon>
                          </div> -->
                        </template>
                        <template v-else>
                          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                      </div>
                      <Upload
                        v-show="!coverList[index]"
                        :show-upload-list="false"
                        :default-file-list="defaultList1"
                        :on-success="handleSuccessSingle"
                        :on-error="handleError"
                        :format="['ico', 'png', 'jpg', 'jpeg']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUploadSingle"
                        multiple
                        type="drag"
                        action="https://upload.qiniup.com"
                        :data="{token: qiniuToken}"
                        style="display: inline-block;width:80px;">
                        <div style="width: 80px;height:80px;line-height: 80px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                      </Upload>
                    </i-col>
                  </Row>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="16">
              <FormItem label="备注">
                <Input v-model="addToform.remark" type="textarea" :rows="3" placeholder="请输入备注"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="商品详情">
                <VueUEditor class="editor-box" @ready="editorReady" ueditorPath="./static/ueditor/" style="height:400px;"></VueUEditor>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button type="primary" id="test" @click="commit">保存</Button>
            <Button style="margin-left: 16px;">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Modal
      v-model="addModal"
      width='480px'
      title="添加规格"
      ok-text="保存"
      @on-ok="add()"
      cancel-text="取消">
      <Form :label-width="80" :model="addForm" :rules="editformRules">
        <FormItem label="规格名">
          <Input v-model="addForm.name" placeholder="请输入规格名称"/>
        </FormItem>
        <FormItem label="规格值">
          <Row>
            <i-col v-for="(item, index) in rulesList" :key="index" span="7" class="itemvalue">
              <Input v-model="rulesList[index]" placeholder="请输入规格值" clearable @on-clear="clear"/>
            </i-col>
            <Button type="primary" icon="md-add" @click="addItem" style="margin-left: 5px;margin-top:5px;"></Button>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import VueUEditor from 'vue-ueditor'
export default {
  components: { VueUEditor },
  data () {
    return {
      qiniuToken: '',
      uploadList: [],
      defaultList: [],
      defaultList1: [],
      categoryList: [],
      addToform: {
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
      ueditor: {},
      addModal: false,
      addForm: {
        name: ''
      },
      editformRules: {},
      rulesList: [],
      rulesValue: [],
      rulesTitle: '',
      details: {
        // name: [],
        purchase_price: [],
        sale_price: [],
        market_price: [],
        warehousing_count: [],
        // platform_profit: [],
        // market_profit: [],
        // market_no: [],
        specs: [],
        // remark: [],
        cover: []
      },
      detailsList: [],
      priductDetailsList: [],
      coverList: [],
      pic: [],
      0: [],
      data: [],
      value: [],
      goodsId: this.$route.params.goodsId
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
    // this.coverList = this.$refs.uploadsingle.fileList
    console.log(this.$refs)
    // console.log(this.coverList)

    this.getQiniuToken()
    this.getSortData()
    if (this.goodsId === '0') {

    } else {
      this.getgoodsDetailss(this.goodsId)
    }
  },
  methods: {
    editorReady (editorInstance) {
      this.ueditor = editorInstance
      this.ueditor.setContent(this.addToform.detail)
      this.ueditor.setHeight(500)
      this.ueditor.addListener('contentChange', () => {
        this.addToform.detail = this.ueditor.getContent()
      })
    },
    getSortData () {
      let that = this
      that.$http.get('admin/v1/brand').then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          for (let i = 0; i < res.data.entities.length; i++) {
            that.data.push({
              value: res.data.entities[i].id,
              label: res.data.entities[i].title,
              children: []
            })
            for (let n = 0; n < res.data.entities[i].child.length; n++) {
              console.log(res.data.entities[i].child[n].title)
              if (res.data.entities[i].child.length === 0) {
              } else {
                that.data[i].children.push({
                  value: res.data.entities[i].child[n].id,
                  label: res.data.entities[i].child[n].title
                })
              }
            }
          }
          console.log(that.data)
        } else {
          that.$Message.error(res.data.msg)
        }
      })
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleRemoveSingle (file) {
      // const fileList = this.$refs.uploadsingle.fileList
      // this.$refs.uploadsingle.fileList.splice(fileList.indexOf(file), 1)
      // this.details.cover.splice(index, 1, '')
      // this.coverList.splice(index, 1)
      // console.log(this.details.cover)
    },
    handleSuccess (res, file) {
      file.url = 'http://image.govlan.com/' + res.key
      file.name = res.key
      this.addToform.cover = file.name
    },
    handleSuccessSingle (res, file) {
      console.log(res)
      console.log(file)
      file.url = 'http://image.govlan.com/' + res.key
      file.name = res.key
      this.coverList.push({
        name: file.name,
        url: file.url,
        showProgress: false,
        status: 'finished'
      })
      for (let i = 0; i < this.coverList.length; i++) {
        this.details.cover[i] = this.coverList[i].url
        this.pic[i] = this.coverList[i].name
      }
      console.log(this.details.cover)
    },
    handleError (error) {
      console.log(error)
      this.getQiniuToken(true)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传ico格式的文件。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件太大了',
        desc: '文件 ' + file.name + ' 太大了, 文件大小不得超过2M。'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多上传5个文件。'
        })
      }
      return check
    },
    handleBeforeUploadSingle () {
      const check = this.coverList.length < 20
      if (!check) {
        this.$Notice.warning({
          title: '只能上传一个文件。'
        })
      }
      return check
    },
    // 获取七牛token
    getQiniuToken (force) {
      this.qiniuToken = localStorage.qiniuToken
      if (this.qiniuToken === null || this.qiniuToken === undefined || this.qiniuToken === '' || force) {
        let self = this
        this.$http.get('/admin/v1/qiniu/token').then((res) => {
          if (parseInt(res.status) === 200) {
            self.qiniuToken = res.data.token
            localStorage.qiniuToken = self.qiniuToken
          }
        })
      }
    },
    addGoodsRules () {
      this.addModal = true
      this.addForm.name = ''
      this.rulesList = []
      // this.$nextTick(() => {
      //   this.coverList = this.$refs.editUpload.fileList
      // })
      console.log(this.$refs)
    },
    add () {
      this.rulesValue.push(
        {
          title: this.addForm.name,
          content: this.rulesList
        }
      )
      this.detailsValue()
      console.log(this.rulesValue)
    },
    detailsValue () {
      var index = 0
      this.rulesTitle = ''
      this.detailsList = []
      if (this.rulesValue.length === 1) {
        this.rulesTitle = this.rulesValue[0].title
        this.detailsList = this.rulesValue[0].content
      } else if (this.rulesValue.length === 2) {
        this.rulesTitle = this.rulesValue[0].title + '    ' + this.rulesValue[1].title
        for (let i = 0; i < this.rulesValue[0].content.length; i++) {
          for (let j = 0; j < this.rulesValue[1].content.length; j++) {
            var title = this.rulesValue[0].content[i] + '    ' + this.rulesValue[1].content[j]
            console.log(title)
            this.detailsList[index] = title
            index++
          }
        }
      } else {}
    },
    addItem () {
      this.rulesList.push('')
    },
    clear () {
      // this.rulesList.pop()
    },
    commit () {
      const that = this
      if (this.goodsId === '0') {
        var picList = []
        for (let i = 0; i < this.uploadList.length; i++) {
          picList.push(this.uploadList[i].name)
        }
        for (let i = 0; i < this.detailsList.length; i++) {
          this.priductDetailsList.push({
            // name: this.details.name[i] ? this.details.name[i] : '',
            purchase_price: this.details.purchase_price[i] ? this.details.purchase_price[i] : '',
            sale_price: this.details.sale_price[i] ? this.details.sale_price[i] : '',
            market_price: this.details.market_price[i] ? this.details.market_price[i] : '',
            warehousing_count: this.details.warehousing_count[i] ? this.details.warehousing_count[i] : '',
            // platform_profit: this.details.platform_profit[i] ? this.details.platform_profit[i] : '',
            // market_profit: this.details.market_profit[i] ? this.details.market_profit[i] : '',
            // market_no: this.details.market_no[i] ? this.details.market_no[i] : '',
            specs: this.details.specs[i] ? this.details.specs[i] : '',
            // remark: this.details.remark[i] ? this.details.remark[i] : '',
            cover: this.coverList[i].name ? this.coverList[i].name : ''
          })
        }
        console.log(this.priductDetailsList)
        this.$http.post('/admin/v1/product', {
          f_brand_id: this.value[0],
          s_brand_id: this.value[1],
          name: this.addToform.name,
          cover: this.addToform.cover,
          product_no: this.addToform.product_no,
          detail: this.addToform.detail,
          allow_sale: this.addToform.allow_sale,
          tag: this.addToform.tag,
          market_price: this.addToform.market_price,
          remark: this.addToform.remark,
          market_no: this.addToform.market_no,
          sale_price: this.addToform.sale_price,
          specs: this.rulesValue,
          pic_list: picList,
          product_detail: this.priductDetailsList
        }).then(res => {
          if (res.status === 200) {
            console.log(res)
            that.$Message.success('商品添加成功！')
            this.$router.back()
          } else {
            that.$Message.error('商品添加失败！')
          }
        })
      } else {

      }
    },
    deleteRules (index) {
      console.log(index)
      this.rulesValue.splice(index, 1)
      this.detailsValue()
      this.details.name = []
      this.details.purchase_price = []
      this.details.sale_price = []
      this.details.market_price = []
      this.details.warehousing_count = []
      this.details.platform_profit = []
      this.details.market_profit = []
      this.details.market_no = []
      this.details.specs = []
      this.details.remark = []
      this.details.cover = []
    },
    getgoodsDetailss (id) {
      let that = this
      that.$http.get('admin/v1/product/' + id).then((res) => {
        console.log(res)
        if (res.status === 200) {
          var index = 0
          this.rulesTitle = ''
          // this.detailsList = []
          this.addToform = res.data
          this.rulesValue = res.data.specs
          this.detailsList.length = res.data.product_detail.length
          if (this.rulesValue.length === 1) {
            this.rulesTitle = this.rulesValue[0].title
            this.detailsList = this.rulesValue[0].content
          } else if (this.rulesValue.length === 2) {
            this.rulesTitle = this.rulesValue[0].title + '    ' + this.rulesValue[1].title
            for (let i = 0; i < this.rulesValue[0].content.length; i++) {
              for (let j = 0; j < this.rulesValue[1].content.length; j++) {
                var title = this.rulesValue[0].content[i] + '    ' + this.rulesValue[1].content[j]
                console.log(title)
                this.detailsList[index] = title
                index++
              }
            }
          } else {}
          // debugger
          console.log('res.data.product_detail')
          console.log(res.data.product_detail)
          // that.details = res.data.product_detail
          for (let i = 0; i < res.data.product_detail.length; i++) {
            this.details.market_price[i] = res.data.product_detail[i].market_price
            this.details.purchase_price[i] = res.data.product_detail[i].purchase_price
            this.details.sale_price[i] = res.data.product_detail[i].sale_price
            this.details.specs[i] = res.data.product_detail[i].specs
            // this.details.cover[i] = res.data.product_detail[i].cover
            this.details.warehousing_count[i] = res.data.product_detail[i].count
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
  }
}
</script>

<style scoped>
.enterprise_box{
  margin-top: 23px;
}
.table_icon{
  border: 1px solid #dddee1;
  width: 86px;
  height: 86px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.table_icon_add{
  color: #dddee1;
}
.title{
  line-height: 35px;
}
.demo-upload-list{
  display: inline-block;
  width: 260px;
  height: 160px;
  text-align: center;
  line-height: 160px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.itemvalue {
  margin: 5px;
}
.divvalue {
  /* border: '1px solid #0000FF'; */
  /* border-bottom-width: 1px;
  border-bottom-color: #666; */
  border-width: 1px;
  border-style: solid;
  border-color: #5666;
  padding-left: 5px;
  margin: 5px;
  /* width: 200px; */
  /* display: block; */
  /* display: flex; */
  /* float: left; */

}
.divdelete {
  /* border-width: 1px;
  border-style: solid;
  border-color: #5666;
  padding: 5px;
  color: #fff;
  background-color: aqua; */
  margin-top: 5px;
}
</style>
