<template>
   <div>
     <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem>商品分类</BreadcrumbItem>
      </Breadcrumb>
     </div>
     <div class="layout-content-detail">
       <div class="layout-search">
         <div style="float:left;">
            <Button shape="circle" type="primary" icon="plus" @click="addGoodsSort">添加分类</Button>
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
      v-model="addModel"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="formItem" :model="formItem" label-position="right" :label-width="120" :rules="rules">
        <FormItem prop="title" label="请输入分类名称：">
          <i-input v-model="formItem.title" clearable placeholder="请输入分类名称">
          </i-input>
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
      addModel: false,
      title: '添加',
      rules: {
        title: [{required: true, message: '分类名称不能为空', trigger: 'blur'}]
      },
      formItem: {
        title: ''
      },
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
                      this.details(parmas.row.id, parmas.index, parmas.row.brand_name)
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
    this.getSortList()
  },
  methods: {
    rowClassName (row, index) {
      return 'demo-table-info-row'
    },
    changePage (page) {

    },
    addGoodsSort () {
      this.addModel = true
      this.title = '添加'
    },
    details (id, index, data) {
      this.$router.push({path: 'brandList/' + JSON.stringify(data) + '/' + id + '/' + index})
    },
    ok () {
      let that = this
      that.$refs.formItem.validate((valid) => {
        if (valid) {
          that.$http.post('/admin/v1/brand', {
            title: that.formItem.title
          }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              that.getSortList()
              that.$Message.success('添加成功')
            } else {
              that.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    cancel () {

    },
    getSortList () {
      let that = this
      that.$http.get('/admin/v1/brand', {
        openId: ''
      }).then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          // that.sortList = res.data
        } else {
          that.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style>
</style>
