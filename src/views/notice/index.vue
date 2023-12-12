<template>
	<div class="system-user-container">
		<el-card shadow="hover" style="margin: 5px 0">
            <el-button @click="addTrademark">新增</el-button>
			<el-table border :data="state.noticeList" style="margin-bottom: 40px">
				<el-table-column label="标题" prop="name">
                    <template #default="{ row }">
                <div>
                    {{row.title}}
                </div>
            </template>
				</el-table-column>
				<el-table-column label="内容" prop="category1Id">
					<template #default="{ row }">
                <div>
                    {{row.content}}
                </div>
            </template>
				</el-table-column>
				<el-table-column label="分类" prop="category2Id">
					<template #default="{ row }">
                <div>
                    {{row.sort}}
                </div>
            </template>
				</el-table-column>
                <el-table-column label="创建时间" prop="category2Id">
					<template #default="{ row }">
                <div>
                    {{row.createTime}}
                </div>
            </template>
				</el-table-column>
				
				<el-table-column label="Action" width="180px">
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
		<!-- <el-dialog v-model="state.dialogTableVisible" :title="state.changeBrand">
			<el-form ref="form" :model="ebookListParams" label-width="80px">
				<el-form-item label="标题">
					<el-input :disabled="state.disabled" v-model="ebookListParams.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item label="分类">
                    <el-input></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input :disabled="state.disabled" type="textarea" v-model="ebookListParams.description" placeholder="请输入描述"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" size="default" @click="cancel">取消</el-button>
				<el-button type="primary" size="default" @click="confirm">确定</el-button>
			</template>
		</el-dialog> -->
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { reqEbookList, editEbook, delEbook, addEbook } from '/@/api/ebook/index';
import { ElMessage, ElMessageBox } from 'element-plus';
let state = reactive({
	pageNum: 1,
	pageSize: 4,
	total: 0,
	disabled: false,
	dialogTableVisible: false,
	changeBrand: '',
    noticeList:[]
});
// let ebookListParams = reactive({
// 	id: '',
// 	name: '',
// 	category1Id: '',
// 	category2Id: '',
// 	description: '',
// 	docCount: '',
// 	viewCount: '',
// 	voteCount: '',
// 	cover: '',
// 	coverId: '',
// });
// const clearable = () => {
// 	ebookListParams.category1Id = '';
// 	ebookListParams.category2Id = '';
// 	ebookListParams.name = '';
// 	ebookListParams.id = '';
// 	ebookListParams.description = '';
// 	ebookListParams.docCount = '';
// 	ebookListParams.viewCount = '';
// 	ebookListParams.voteCount = '';
// 	ebookListParams.cover = '';
// };

const getReqEbookList = async () => {
	let result = await reqEbookList(state.pageNum, state.pageSize);
    state.total=result.total
    console.log(result);
    state.noticeList=result.list
    console.log(state.noticeList);
};
const addTrademark = () => {
	state.dialogTableVisible = true;
	state.disabled = false;
	state.changeBrand = '新增';
};
onMounted(() => {
	// 调用接口获取数据
	getReqEbookList();
    
});

const onSizeChange = () => {
	getReqEbookList();
};
const onCurrentChange = () => {
	getReqEbookList();
};

// const handleEdit = (row: any) => {
// 	state.dialogTableVisible = true;
// 	state.disabled = false;
// 	state.changeBrand = '编辑';
// 	Object.assign(ebookListParams, row);
// };
// const handleDelete = (row: any) => {
// 	ebookListParams.id = row.id;
// 	ElMessageBox.confirm('确定要删除这个品牌吗？', '确认删除', {
// 		confirmButtonText: '确定',
// 		cancelButtonText: '取消',
// 		type: 'warning',
// 	})
// 		.then(async () => {
// 			// 用户点击确定按钮，执行删除操作
// 			await delEbook(ebookListParams.id);
// 			getReqEbookList();
// 		})
// 		.catch(() => {
// 			// 用户点击取消按钮，不执行任何操作
// 		});
// };



const cancel = () => {
	state.dialogTableVisible = false;
};
const confirm = async () => {
	if (!ebookListParams.id) {
		await addEbook(ebookListParams);
		state.dialogTableVisible = false;
		ElMessage({
			type: 'success',
			message: '添加成功',
		});
		getReqEbookList();
	}
	if (ebookListParams.id) {
		await editEbook(ebookListParams);
		state.dialogTableVisible = false;
		ElMessage({
			type: 'success',
			message: '修改成功',
		});
		getReqEbookList();
	}
};
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
