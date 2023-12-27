<template>
	<div class="system-user-container layout-padding">
		<el-form inline>
			<!-- 搜索框 -->
			<el-form-item>
				<el-input placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item style="margin-left: -20px">
				<el-button size="primary" plain icon="search">搜索</el-button>
				<el-button size="danger" plain icon="close">重置</el-button>
				<el-button size="primary" plain icon="plus" @click="addAdmin">新增</el-button>
			</el-form-item>
		</el-form>
		<el-card shadow="hover" class="layout-padding-auto">
			<el-table border style="margin-bottom: 40px">
				<el-table-column label="用户名">
					<template #default="{ row }">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="性别">
					<template #default="{ row }">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="邮箱">
					<template #default="{ row }">
						<div>1</div>
					</template>
				</el-table-column>
				<el-table-column label="账号">
					<template #default="{ row }">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template #default="{ row }">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template #default="{ row }">
						<div>
							<el-button type="warning" size="default" @click="handleEdit(row)">编辑</el-button>
							<el-button type="danger" size="default" @click="handleDelete(row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog v-model="state.dialogVisible" :title="state.changeBrand" draggable>
			<el-form :model="state.addModel" :rules="rules" ref="formCheck">
				<el-form-item label="用户名" prop="nickname">
					<el-input v-model="state.addModel.nickname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="state.addModel.sex">
					<el-radio :label="'0'">男</el-radio>
					<el-radio :label="'1'">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="state.addModel.email"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="username">
					<el-input v-model="state.addModel.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="state.addModel.password"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="blocked">
					<el-radio-group v-model="state.addModel.blocked">
					<el-radio :label="'0'">正常</el-radio>
					<el-radio :label="'1'">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" size="default" @click="cancel">取消</el-button>
				<el-button type="primary" size="default" @click="confirm">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { reactive,ref,nextTick } from 'vue';
const state = reactive({
	dialogVisible: false,
	changeBrand: '',
	addModel: {
		userId: '',
		username: '',
		password: '',
		nickname: '',
		email: '',
		sex: '',
		blocked: '',
	},
	searchParam: {
		nickname: '',
	},	
})
const rules=reactive({
		nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
		email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
		username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
		blocked: [{ required: true, message: '请选择状态', trigger: 'blur' }],
		sex: [{ required: true, message: '请选择性别', trigger: 'blur' }]	
	})
const formCheck = ref()
 
const addAdmin=()=>{
	state.dialogVisible=!state.dialogVisible
	nextTick(()=>{
        formCheck.value.clearValidate('nickname')
        formCheck.value.clearValidate('password')
		formCheck.value.clearValidate('email')
		formCheck.value.clearValidate('username')
		formCheck.value.clearValidate('blocked')
		formCheck.value.clearValidate('sex')
    })
}
const cancel=()=>{
	state.dialogVisible=!state.dialogVisible
}
const confirm=async()=>{
	await formCheck.value.validate()
	state.dialogVisible=!state.dialogVisible
}
const handleEdit = (row) => {
	console.log(11);
};
const handleDelete = (row) => {
	console.log(11);
};
</script>

<style lang="scss">

</style>
