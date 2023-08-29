<template>
	<breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格顶部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="search-wrapped">
					<el-input v-model="input1" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
						:prefix-icon="Search" />
				</div>
				<div class="button-wrapped">
					<el-button type="primary" @click="openCreate(2)">添加用户管理员</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%" border>
					<el-table-column type="index" width="50" />
					<el-table-column prop="account" label="账号"  />
					<el-table-column prop="name" label="姓名"  />
					<el-table-column prop="department" label="部门"  />
					<el-table-column prop="email" label="邮箱"  />
					<el-table-column label="操作" >
						<template #default="{row}">
							<div>
								<el-button type="success">编辑</el-button>
								<el-button type="danger">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 底部 -->
		<div class="table-footer">
			  <el-pagination
			    :page-size="20"
			    :pager-count="11"
			    layout="prev, pager, next"
			    :total="1000"
			  />
		</div>
	</div>
	<create ref="Create"></create>
</template>

<script lang="ts" setup>
	import {
		ref
	} from 'vue'
	import { Search } from '@element-plus/icons-vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import create from '../components/create_admin.vue'
	import {
		bus
	} from "@/utils/mitt.js"
	// 面包屑
	const breadcrumb = ref()
	// 面包屑参数
	const item = ref({
		first: '用户管理员',
	})
	const input1 = ref('')

	const tableData = ref([
		{
			id: 1
		}
	])
	
	const Create = ref()
	const openCreate = (id:number) =>{
		bus.emit('createId', id)
		Create.value.open()
	}
</script>

<style lang='scss' scoped>
</style>