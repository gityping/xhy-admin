<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem to="/campus/sortList">分类列表</BreadcrumbItem>
        <BreadcrumbItem>品牌列表</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div class="layout-content-detail">
      <div class="layout-search">
         <div style="float:left;">
            <Button shape="circle" type="primary" icon="plus" @click="addUser">添加品牌</Button>
          </div>
       </div>
      <!-- <i-button type="primary" @click="addUser" icon="ios-add" shape="circle" style="margin-bottom:20px;">添加品牌</i-button> -->
      <div class="table">
        <i-table :columns="columns" :data="brandList" class="table-content"></i-table>
      </div>
    </div>
    <Modal
      v-model="addModel"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="formItem" :model="formItem" label-position="right" :label-width="120" :rules="rules">
        <FormItem prop="title" label="请输入品牌名称：">
          <i-input v-model="formItem.title" clearable placeholder="请输入品牌名称">
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
      brandList: [],
      id: this.$route.params.brandId,
      index: this.$route.params.index,
      columns: [
        {
          title: 'ID',
          key: 'id',
          align: 'left'
        },
        {
          title: '品牌名称',
          key: 'title',
          align: 'left'
        },
        {
          title: ' 操作',
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
                      this.edit(parmas.row.id, parmas.row.title)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.delete(parmas.row.id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      pageSize: 15,
      pageNum: 1,
      pageInfo: {
        total: 0,
        pageNum: 1,
        pages: 1
      },
      addModel: false,
      title: '添加',
      formItem: {
        title: ''
      },
      rules: {
        title: [{required: true, message: '品牌不能为空', trigger: 'blur'}]
      },
      editId: ''
    }
  },
  methods: {
    changepage () {
    },
    addUser () {
      this.addModel = true
      this.title = '添加'
      this.formItem.title = ''
    },
    edit (id, title) {
      this.addModel = true
      this.title = '编辑'
      this.editId = id
      this.formItem.title = title
    },
    ok () {
      let that = this
      if (this.title === '添加') {
        that.$refs.formItem.validate((valid) => {
          if (valid) {
            that.$http.post('admin/v1/brand', {
              title: that.formItem.title,
              brand_id: this.id
            }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.getSortList()
                that.$Message.success('添加成功')
              } else {
                that.$Message.error(res.data.msg)
              }
            })
          }
        })
      } else {
        that.$refs.formItem.validate((valid) => {
          if (valid) {
            that.$http.put('/admin/v1/brand/' + this.editId, {
              title: that.formItem.title
            }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                that.getSortList()
                that.$Message.success('编辑成功')
              } else {
                that.$Message.error(res.data.msg)
              }
            })
          }
        })
      }
    },
    cancel () {
    },
    delete (id) {
      let that = this
      that.$Modal.confirm({
        title: '温馨提示',
        content: '您确定要删除吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          that.$http.delete('admin/v1/brand/' + id).then((res) => {
            console.log(res)
            if (res.status === 200) {
              // this.$router.back()
              this.getSortList()
              that.$Message.success('删除成功')
            } else {
              that.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    getSortList () {
      let that = this
      that.$http.get('admin/v1/brand', {
        openId: ''
      }).then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          this.brandList = res.data.entities[that.index].child
        } else {
          that.$Message.error(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.getSortList()
  }
}
</script>
