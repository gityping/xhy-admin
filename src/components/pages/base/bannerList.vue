<template>
   <div>
     <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>基础配置</BreadcrumbItem>
        <BreadcrumbItem>banner列表</BreadcrumbItem>
      </Breadcrumb>
     </div>
     <div class="layout-content-detail">
       <div class="layout-search">
         <div style="float:left;">
            <Button shape="circle" type="primary" icon="plus" @click="addCoupon">添加用户</Button>
          </div>
       </div>
       <div class="table">
        <i-table :row-class-name="rowClassName" :loading="loading" :columns="columns" :data="dataList" class="table-content"></i-table>
      </div>
      <div class="page">
        <span class="page-content">共{{pageInfo.allNum}}条记录 共{{pageInfo.maxPage}}页</span>
        <Page :current="parseInt(pageInfo.currentPage)" show-elevator :total="parseInt(pageInfo.allNum)" :page-size="pageSize" @on-change="changePage"></Page>
      </div>
     </div>
     <Modal
      v-model="addModal"
      width='480px'
      title="添加横幅"
      ok-text="保存"
      @on-ok="addTobanner"
      cancel-text="取消">
      <Form :label-width="80">
        <FormItem label="设置连接">
          <Input v-model="addToform.url" placeholder="请输入链接地址"/>
        </FormItem>
        <FormItem label="选择栏目">
          <Select v-model="addToform.columnId" placeholder="请选择栏目">
            <Option v-for="(item, index) in columnList" :value="item.id" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="横幅图片">
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
            style="display: inline-block;width:100px;">
            <div style="width: 100px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
   </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      pageInfo: {
        allNum: 0,
        currentPage: 1,
        maxPage: 1
      },
      pageSize: 15,
      dataList: [
        {
          '1': '001',
          '2': 'wwww',
          '3': 'man',
          '4': '32'
        },
        {
          '1': '001',
          '2': 'wwww',
          '3': 'man',
          '4': '32'
        },
        {
          '1': '001',
          '2': 'wwww',
          '3': 'man',
          '4': '32'
        },
        {
          '1': '001',
          '2': 'wwww',
          '3': 'man',
          '4': '32'
        },
        {
          '1': '001',
          '2': 'wwww',
          '3': 'man',
          '4': '32'
        }
      ],
      columns: [
        {
          key: '1',
          title: 'Id'
        },
        {
          key: '2',
          title: 'name'
        },
        {
          key: '3',
          title: 'sex'
        },
        {
          key: '4',
          title: 'age'
        },
        {
          title: '操作',
          key: 'Operation',
          align: 'center',
          width: 200,
          render: (h, parmas) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      alert(666)
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                    }
                  }
                },
                '回复'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    rowClassName (row, index) {
      return 'demo-table-info-row'
    },
    changePage (page) {

    }
  }
}
</script>
<style>
</style>
