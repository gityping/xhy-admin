<template>
   <div>
     <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem>商品列表</BreadcrumbItem>
      </Breadcrumb>
     </div>
     <div class="layout-content-detail">
       <div class="layout-search">
         <div style="float:left;">
            <Button shape="circle" type="primary" icon="plus" @click="addGoods">添加商品</Button>
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
      dataList: [],
      columns: [
        {
          key: 'name',
          title: '商品名称'
        },
        {
          key: 'cover',
          title: '商品图片',
          render: (h, parmas) => {
            return h('div', {
              attrs: {
                style: 'width: auto;height: 40px;'
              }
            }, [
              h('img', {
                attrs: {
                  src: parmas.row.cover,
                  style: 'width: 60px;height: 40px;border-radius: 2px; align: center;'
                }
              })
            ])
          }
        },
        {
          key: 'product_no',
          title: '商品编号'
        },
        {
          key: 'sale_price',
          title: '出售价格'
        },
        {
          key: 'f_brand_name',
          title: '分类'
        },
        {
          key: 's_brand_name',
          title: '品牌'
        },
        {
          key: 'allow_sale',
          title: '上/下架',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {
                  props: {
                    type: (function () {})(),
                    size: 'small'
                  },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {}
                  }
                },
                (function () {
                  if (params.row.allow_sale === 1) {
                    return '上架'
                  } else {
                    return '下架'
                  }
                })()
              )
            ])
          }
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
                      this.$router.push({ path: '/pages/goodsDetails/' + parmas.row.id })
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
                      this.$router.push({ path: '/pages/addGoods/' + parmas.row.id })
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
    this.getGoodsData()
  },
  methods: {
    getGoodsData () {
      this.$http.post('/admin/v1/product/search', {
        page: 1,
        page_size: 10
      }).then(res => {
        if (res.status === 200) {
          console.log(res)
          this.dataList = res.data.entities
          this.pageInfo = res.data.pageInfo
        } else {
          this.$Message.error('商品获取失败！')
        }
      })
    },
    rowClassName (row, index) {
      return 'demo-table-info-row'
    },
    changePage (page) {

    },
    addGoods () {
      this.$router.push({ path: '/pages/addGoods/0' })
    }
  }
}
</script>
<style>
</style>
