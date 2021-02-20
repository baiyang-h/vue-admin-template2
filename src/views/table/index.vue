<template>
  <a-form
      class="advanced-search-form"
      ref="formRef"
      :model="formState"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 17 }"
  >
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item label="菜名" name="name">
          <a-input v-model:value="formState.name" placeholder="菜名" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="做菜方式" name="method">
          <a-input v-model:value="formState.method" placeholder="做菜方式" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="难易等级" name="level">
          <a-select v-model:value="formState.level" placeholder="难易等级">
            <a-select-option value="初级入门">初级入门</a-select-option>
            <a-select-option value="新手尝试">新手尝试</a-select-option>
            <a-select-option value="中级掌勺">中级掌勺</a-select-option>
            <a-select-option value="高级厨师">高级厨师</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="功效" name="tags">
          <a-input v-model:value="formState.tags" placeholder="功效" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="end">
      <a-button @click="onReset">重置</a-button>
      <a-button type="primary" style="margin-left: 10px" @click="onSearch">搜索</a-button>
    </a-row>
  </a-form>
  <a-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :rowKey="(record) => record.meauID"
      @change="onTableChange"
  ></a-table>
</template>

<script>
import api from 'api';
import {onMounted, reactive, toRefs, ref} from "vue";

const columns = [
  {
    title: '菜名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '做菜方式',
    dataIndex: 'method',
    key: 'method',
    width: 100,
  },
  {
    title: '难度',
    dataIndex: 'level',
    key: 'level',
    width: 100,
  },
  {
    title: '简介',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '说明',
    dataIndex: 'techniques',
    key: 'techniques',
    ellipsis: true,
  },
];

export default {
  name: "Table",

  setup() {

    const formRef = ref();

    const state = reactive({
      data: [],
      columns,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      }
    })

    // 表单
    const formState = reactive({
      name: '',
      method: '',
      level: '',
      tags: ''
    });

    onMounted(() => {
      fetchList();
    })

    // 列表数据
    function fetchList() {
      state.loading = true
      api.table.getTableData({
        page: state.pagination.current,
        pageSize: state.pagination.pageSize,
        ...formState,
        name: '柠檬戚风蛋糕'
      }).then(r => {
        state.loading = false
        state.data = r.data.list || []
        state.pagination.total = r.data.total
      })
    }

    function onTableChange(pagination){
      state.pagination.current = pagination.current;
      state.pagination.pageSize = pagination.pageSize;
      fetchList()
    }

    // 搜索
    function onSearch() {
      fetchList()
    }

    // 重置
    function onReset() {
      formRef.value.resetFields()
    }

    return {
      ...toRefs(state),
      formRef,
      formState,
      onTableChange,
      onSearch,
      onReset
    };

  }
}
</script>

<style scoped>
.advanced-search-form {
  margin-bottom: 20px;
}
</style>