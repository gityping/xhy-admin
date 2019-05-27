<template>
   <div>
     <div class="layout-breadcrumb">
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>日志列表</BreadcrumbItem>
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
