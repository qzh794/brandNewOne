<template>
	<div class="system-user-container layout-padding">
		<el-form inline>
			<!-- 搜索框 -->
			<el-form-item>
				<el-input v-model="state.categoryName" placeholder="请输入查询参数"></el-input>
			</el-form-item>
			<el-form-item style="margin-left: -20px">
				<el-button size="primary" plain icon="search" @click="search">搜索</el-button>
				<el-button size="danger" plain icon="close" @click="reset">重置</el-button>
				<el-button size="primary" plain icon="plus" @click="addCategory">新增</el-button>
			</el-form-item>
		</el-form>
		<el-card shadow="hover" class="layout-padding-auto">
			<el-table border :data="categoryListArr" style="margin-bottom: 40px">
				<el-table-column label="分类名称" prop="categoryName">
					<!-- <template #default="{ row }">
						<div>
							{{ row.categoryName }}
						</div>
					</template> -->
				</el-table-column>
				<el-table-column label="序号" prop="orderNum">
					<!-- <template #default="{ row }">
						<div>
							{{ row.orderNum }}
						</div>
					</template> -->
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
			<el-pagination
				v-model:current-page="state.pageNum"
				v-model:page-size="state.pageSize"
				:pageSizes="[3, 6, 9, 12]"
				:total="state.total"
				layout="prev, pager, next, jumper,sizes, total"
				background
				@size-change="onSizeChange"
				@current-change="onCurrentChange"
			>
			</el-pagination>
		</el-card>
		<el-dialog v-model="state.dialogTableVisible" :title="state.changeBrand" draggable>
			<el-form :model="addModel" :rules="state.rules" ref="formCheck" label-width="80px">
				<el-form-item label="分类名称" prop="categoryName">
					<el-input v-model="addModel.categoryName"></el-input>
				</el-form-item>
				<el-form-item label="分类序号" prop="orderNum">
					<el-input v-model="addModel.orderNum"></el-input>
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
import { reactive, ref, onMounted,nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { addCategoryApi,getCategoryApi,delCategoryApi,editCategoryApi } from '/@/api/category';
let state = reactive({
	pageNum: 1,
	pageSize: 3,
	total: 0,
	categoryName: '',
	dialogTableVisible: false,
	changeBrand: '',
	rules: {
		categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
		orderNum: [{ required: true, message: '请输入分类序号', trigger: 'blur' }],
	},
});
let categoryListArr=ref([])
const formCheck = ref();
let addModel = reactive({
	id:'',
	orderNum: '',
	categoryName:'',
});
const addCategory=()=>{
	state.dialogTableVisible=!state.dialogTableVisible
	clearParams()
	nextTick(()=>{
        formCheck.value.clearValidate('categoryName')
        formCheck.value.clearValidate('orderNum')
    })
}

const getCategoryList = async () => {
	let result = await getCategoryApi(state.pageNum,state.pageSize,state.categoryName);
	state.total = result.meta.pagination.total;
	categoryListArr.value = result.data.map((item: any) => {
		const {
			id,
			attributes: {
				categoryName,
				orderNum,
			},
		} = item;
		return {
			id,
			categoryName,
			orderNum,
		};
	});

}
const onSizeChange = () => {
	getCategoryList()
};
const onCurrentChange = () => {
	getCategoryList()
};

const handleEdit = (row: any) => {
	state.dialogTableVisible = true;
	state.changeBrand = '编辑';
	Object.assign(addModel, row);
};
const handleDelete = (row: any) => {
	addModel.id = row.id;
	ElMessageBox.confirm('确定要删除这个品牌吗？', '确认删除', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			// 用户点击确定按钮，执行删除操作
			await delCategoryApi(addModel.id);
			getCategoryList();
		})
		.catch(() => {
			// 用户点击取消按钮，不执行任何操作
		});
};
const clearParams = () => {
	addModel.categoryName = '';
	addModel.orderNum = '';
};
const cancel=()=>{
	state.dialogTableVisible=!state.dialogTableVisible
}
const reset=async()=>{
	state.pageNum=1;
	state.categoryName='';	
	await getCategoryList();
}

const search=async()=>{
   await getCategoryList();
}
const confirm=async()=>{
	await formCheck.value.validate();
	if (!addModel.id) {
		await addCategoryApi(addModel);
		ElMessage({
			type: 'success',
			message: '添加成功',
		});
		getCategoryList();
	}
	if (addModel.id) {
		await editCategoryApi(addModel);
		
		ElMessage({
			type: 'success',
			message: '修改成功',
		});
		getCategoryList();	
	}
	state.dialogTableVisible = !state.dialogTableVisible;
}
onMounted(() => {
	getCategoryList()
	
});
</script>

<style>
.avatar-uploader {
	width: 178px;
	height: 178px;
	display: block;
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
}
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
