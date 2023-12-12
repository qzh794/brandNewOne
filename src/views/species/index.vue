<template>
	<div class="system-user-container">
		<el-card shadow="hover" style="margin: 5px 0">
			<el-table border :data="ebookList" style="margin-bottom: 40px">
				<el-table-column label="封面">
					<template #default="{ row }">
						<img :src="baseURL + row.cover" alt="test" style="width: 100px; height: 100px" />
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name">
					<!-- <template #default="{ row }">
                <div>
                    {{row.name}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="分类一" prop="category1Id">
					<!-- <template #default="{ row }">
                <div>
                    {{row.category1Id}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="分类二" prop="category2Id">
					<!-- <template #default="{ row }">
                <div>
                    {{row.category2Id}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="文档数" prop="docCount">
					<!-- <template #default="{ row }">
                <div>
                    {{row.docCount}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="阅读数" prop="viewCount">
					<!-- <template #default="{ row }">
                <div>
                    {{row.viewCount}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="点赞数" prop="voteCount">
					<!-- <template #default="{ row }">
                <div>
                    {{row.voteCount}}
                </div>
            </template> -->
				</el-table-column>
				<el-table-column label="Action" width="180px">
					<template #default="{ row }">
						<div>
							<el-button type="primary" size="default" @click="addTrademark">新增</el-button>
							<el-button type="warning" size="default" @click="handleEdit(row)">编辑</el-button>
							<el-button type="danger" size="default" @click="handleDelete(row)" style="margin: 10px auto">删除</el-button>
							<el-button type="warning" size="default" @click="handleView(row)">查看</el-button>
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
		<el-dialog v-model="state.dialogTableVisible" :title="state.changeBrand">
			<el-form ref="form" :model="ebookListParams" label-width="80px">
				<el-form-item label="封面">
					<el-upload
						:disabled="state.disabled"
						class="avatar-uploader"
						action="http://localhost:1337/api/e-books"
						:http-request="handleUpload"
						:before-upload="handleBeforeUpload"
					>
						<img v-if="ebookListParams.cover" :src="baseURL + ebookListParams.cover" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="名称">
					<el-input :disabled="state.disabled" v-model="ebookListParams.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-tree-select v-model="state.value" :data="data" :render-after-expand="false" show-checkbox />
				</el-form-item>
				<el-form-item label="描述">
					<el-input :disabled="state.disabled" type="textarea" v-model="ebookListParams.description" placeholder="请输入描述"></el-input>
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
import { reactive, ref, onMounted } from 'vue';
import { reqEbookList, editEbook, delEbook, addEbook } from '/@/api/ebook/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
let state = reactive({
	pageNum: 1,
	pageSize: 3,
	total: 0,
	disabled: false,
	dialogTableVisible: false,
	changeBrand: '',
	value:''
});
let scence = ref(false);
let baseURL = 'http://localhost:1337';
let ebookList = ref([]);
let ebookListParams = reactive({
	id: '',
	name: '',
	category1Id: '',
	category2Id: '',
	description: '',
	docCount: '',
	viewCount: '',
	voteCount: '',
	cover: '',
	coverId: '',
});
const clearable = () => {
	ebookListParams.category1Id = '';
	ebookListParams.category2Id = '';
	ebookListParams.name = '';
	ebookListParams.id = '';
	ebookListParams.description = '';
	ebookListParams.docCount = '';
	ebookListParams.viewCount = '';
	ebookListParams.voteCount = '';
	ebookListParams.cover = '';
};
const data = [
	{
		value: '1',
		label: '海洋动物',
		children: [
			{
				value: '1-1',
				label: 'Level two 1-1',
			},
		],
	},
	{
		value: '2',
		label: 'Level one 2',
		children: [
			{
				value: '2-1',
				label: 'Level two 2-1',
				children: [
					{
						value: '2-1-1',
						label: 'Level three 2-1-1',
					},
				],
			},
			{
				value: '2-2',
				label: 'Level two 2-2',
				children: [
					{
						value: '2-2-1',
						label: 'Level three 2-2-1',
					},
				],
			},
		],
	},
	{
		value: '3',
		label: 'Level one 3',
		children: [
			{
				value: '3-1',
				label: 'Level two 3-1',
				children: [
					{
						value: '3-1-1',
						label: 'Level three 3-1-1',
					},
				],
			},
			{
				value: '3-2',
				label: 'Level two 3-2',
				children: [
					{
						value: '3-2-1',
						label: 'Level three 3-2-1',
					},
				],
			},
		],
	},
];
const getReqEbookList = async () => {
	let result = await reqEbookList(state.pageNum, state.pageSize);
	state.total = result.meta.pagination.total;
	ebookList.value = result.data.map((item: any) => {
		const {
			id,
			attributes: {
				name,
				category1Id,
				category2Id,
				description,
				docCount,
				viewCount,
				voteCount,
				cover: {
					data: {
						id: coverId,
						attributes: { url },
					},
				},
			},
		} = item;
		return {
			id,
			name,
			category1Id,
			category2Id,
			description,
			docCount,
			viewCount,
			voteCount,
			coverId,
			cover: url,
		};
	});
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
const addTrademark = () => {
	scence.value = true;
	state.dialogTableVisible = true;
	state.disabled = false;
	state.changeBrand = '新增';
	clearable();
};
const handleEdit = (row: any) => {
	scence.value = false;
	state.dialogTableVisible = true;
	state.disabled = false;
	state.changeBrand = '编辑';
	Object.assign(ebookListParams, row);
};
const handleDelete = (row: any) => {
	ebookListParams.id = row.id;
	ElMessageBox.confirm('确定要删除这个品牌吗？', '确认删除', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			// 用户点击确定按钮，执行删除操作
			await delEbook(ebookListParams.id);
			getReqEbookList();
		})
		.catch(() => {
			// 用户点击取消按钮，不执行任何操作
		});
};
const handleView = (row: any) => {
	state.dialogTableVisible = true;
	state.disabled = true;
	state.changeBrand = '查看';
	Object.assign(ebookListParams, row);
};

const handleBeforeUpload = (rawFile: any) => {
	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
		ElMessage.error('上传的图片应该是jpg/png格式');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('图片大小不可超过2MB!');
		return false;
	}
	return true;
};
const handleUpload = (item: any) => {
	// console.log('formData---',formData.get('files'))
		// 创建一个FormData对象
		let formData = new FormData();
		// 三个参数：字段名（指定表单字段）、字段值（指定表单字段的值）、文件名（如果要添加一个文件的话）
		formData.append('files', item.file, item.file.name);
		formData.append('data', JSON.stringify({ ebookListParams }));
		axios.post('http://localhost:1337/api/upload?populate=*', formData).then((response) => {
			// ebookListParams.id=response.data.data.id
			// ebookListParams.cover=response.data.data.attributes.cover.data.attributes.url
			// ebookListParams.coverId=response.data.data.attributes.cover.data.id
			// console.log(ebookListParams.cover);
			// console.log(ebookListParams.coverId);
			// 用于回显cover
			ebookListParams.cover = response.data[0].url;
			// 用于更换cover
			ebookListParams.coverId = response.data[0].id;
		});
}
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
