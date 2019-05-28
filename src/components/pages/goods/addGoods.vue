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
              <FormItem label="新闻标题">
                <Input v-model="addToform.title" placeholder="请输入新闻标题"/>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="新闻分类" style="margin-left:30px;">
                <Select
                  multiple
                  v-model="addToform.categoryName">
                  <Option v-for="(item, index) in categoryList" :value="item" :key="index">{{item}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="发表时间" style="margin-left:30px;">
                <DatePicker type="datetime" placeholder="请设置发表日期" v-model="addToform.publishDate" style="width:100%"></DatePicker>
                <!-- <DatePicker type="datetime" placeholder="请设置发表日期" style="width: 200px"></DatePicker> -->
              </FormItem>
            </i-col>
          </Row>
          <!-- <Row>
            <i-col>
              <FormItem label="新闻摘要">
                <Input v-model="addToform.digest" type="textarea" :rows="3" placeholder="请输入新闻简介"/>
              </FormItem>
            </i-col>
          </Row> -->
          <Row>
            <i-col>
              <FormItem label="新闻封面">
                <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
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
                <Upload
                  v-show="!uploadList || uploadList.length == 0"
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
            <i-col>
              <FormItem label="商品规格">
                <Button type="success" @click="addGoodsRules">添加商品规格</Button>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="商品规格">
                <div v-for="(item, index) in rulesValue" :key="index">
                  <Row> <i-col span="1">规格名：</i-col> <i-col span="2" class="divvalue">{{item.title}}</i-col></Row>
                  <Row> <i-col span="1">规格值：</i-col> <i-col span="2" class="divvalue" v-for="(item, index1) in item.content" :key="index1" v-show="index1 != rulesValue[index].content.length-1">{{item}}</i-col><i-col><Button type="error" class="divdelete">删除规格</Button></i-col></Row>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="规格明细">
                <div v-for="(item, index) in rulesValue" :key="index">
                  <Row> <i-col span="1">{{item.title}}</i-col> <i-col span="2"></i-col></Row>
                  <Row> <i-col span="1">规格值：</i-col> <i-col span="2" class="divvalue" v-for="(item, index1) in item.content" :key="index1" v-show="index1 != rulesValue[index].content.length-1">{{item}}</i-col><i-col><Button type="error" class="divdelete">删除规格</Button></i-col></Row>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <FormItem label="新闻内容">
                <VueUEditor class="editor-box" @ready="editorReady" ueditorPath="./static/ueditor/" style="height:400px;"></VueUEditor>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button type="primary" id="test" @click="addTonews">保存</Button>
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
      @on-ok="add"
      cancel-text="取消">
      <Form :label-width="80" :model="addForm" :rules="editformRules">
        <FormItem label="规格名">
          <Input v-model="addForm.name" placeholder="请输入规格名称"/>
        </FormItem>
        <FormItem label="规格值">
          <Row>
            <i-col v-for="(item, index) in rulesList" :key="index" span="7" class="itemvalue">
              <Input v-if="index < rulesList.length - 1" v-model="rulesList[index]" placeholder="请输入规格值" clearable @on-clear="clear"/>
              <Button v-else type="primary" icon="md-add" @click="addItem"></Button>
            </i-col>
          </Row>
        </FormItem>
        <!-- <FormItem label="选择栏目">
          <Select v-model="editForm.columnId" placeholder="请选择栏目">
            <Option v-for="(item, index) in columnList" :value="item.id" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否展示">
          <RadioGroup v-model="editForm.isShow">
            <Radio label="true">是</Radio>
            <Radio label="false">否</Radio>
          </RadioGroup>
        </FormItem> -->
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
      categoryList: [],
      addToform: {
        title: '',
        categoryName: 's',
        publishDate: '',
        digest: '',
        content: '',
        cover: ''
      },
      ueditor: {},
      addModal: false,
      addForm: {
        name: ''
      },
      editformRules: {},
      rulesList: ['', '', ''],
      rulesValue: [],
      rulesTitle: ''
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
    // this.getQiniuToken()
    // this.getCategories()
  },
  methods: {
    editorReady (editorInstance) {
      this.ueditor = editorInstance
      this.ueditor.setContent(this.addToform.content)
      this.ueditor.setHeight(500)
      this.ueditor.addListener('contentChange', () => {
        this.addToform.content = this.ueditor.getContent()
      })
    },
    getCategories () {
      const self = this
      this.$http.get('/v1/news/category').then((res) => {
        if (parseInt(res.status)) {
          var category = res.data.content
          if (category) {
            self.categoryList = JSON.parse(category)
            self.categoryList.splice(0, 1)
            console.log(self.categoryList)
          }
        }
      })
    },
    addTonews () {
      if (this.addToform.title === '' || this.addToform.title == null) {
        this.$Message.warning('新闻标题不能为空')
        return
      }
      if (this.addToform.publishDate == null || this.addToform.publishDate.length === 0) {
        this.$Message.warning('发表时间不能为空')
        return
      }
      if (this.addToform.digest == null || this.addToform.digest.length === 0) {
        this.$Message.warning('新闻概述不能为空')
        return
      }
      if (this.addToform.content == null || this.addToform.content.length === 0) {
        this.$Message.warning('新闻内容不能为空')
        return
      }
      if (this.addToform.cover == null || this.addToform.cover.length === 0) {
        this.$Message.warning('请上传新闻封面图片')
        return
      }
      var newsName = this.addToform.categoryName.toString()
      const that = this
      this.$http.post('/v1/news', {
        title: this.addToform.title,
        categoryName: newsName,
        publishDate: this.addToform.publishDate,
        digest: this.addToform.digest,
        content: this.addToform.content,
        cover: this.addToform.cover
      }).then(res => {
        if (res.status === 200) {
          console.log(res)
          that.$Message.success('新闻发布成功！')
          this.$router.push('/console/news/newslist/1')
        } else {
          that.$Message.error('新闻发布失败！')
        }
      })
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'http://image.govlan.com/' + res.key
      file.name = res.key
      this.addToform.cover = file.name
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
      const check = this.uploadList.length < 1
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
        this.$http.get('/v1/qiniu/token').then((res) => {
          if (parseInt(res.status) === 200) {
            self.qiniuToken = res.data.token
            localStorage.qiniuToken = self.qiniuToken
          }
        })
      }
    },
    addGoodsRules () {
      this.addModal = true
    },
    add () {
      this.rulesValue.push(
        {
          title: this.addForm.name,
          content: this.rulesList
        }
      )
      this.rulesTitle = ''
      if (this.rulesValue.length === 1) {
        this.rulesTitle = this.rulesValue[0]
      } else {
        this.rulesTitle = this.rulesValue[0] + this.rulesValue[1]
      }
      for (let i = 0; i < this.rulesValue.length; i++) {
        for (let j = 1; j < this.rulesValue.length; j++) {

        }
      }
      console.log(this.rulesValue)
    },
    addItem () {
      this.rulesList.push({})
    },
    clear () {
      // this.rulesList.pop()
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
