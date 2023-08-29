<template>
	<el-dialog v-model="dialogFormVisible" title='删除操作' width="30%" center>
		<span>是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="deleteadmin">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { onBeforeUnmount, ref } from 'vue'
	import {
		bus
	} from "@/utils/mitt.js"
	import {
		changeIdentityToUser
	} from '@/api/userinfor.js'
	import { ElMessage } from 'element-plus'
	const userid = ref()
	bus.on('deleteId', (id : number) => {
		console.log(id)
		userid.value = id
	})
	const emit = defineEmits(['success'])
	const deleteadmin = async () => {
		const res = await changeIdentityToUser(userid.value)
		console.log(res)
		if (res.status == 0) {
			ElMessage({
				message: '对管理员降职成功',
				type: 'success',
			})
			emit('success')
			dialogFormVisible.value = false
		} else {
			ElMessage.error('对管理员降职失败')
			dialogFormVisible.value = false
		}

	}

	// 弹窗开关
	const dialogFormVisible = ref(false)

	// 打开编辑管理员的弹窗
	const open = () => {
		dialogFormVisible.value = true
	}

	defineExpose({
		open
	})

	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style lang="scss" scoped>

</style>