<template>
	<el-form size="large" class="login-content-form" :model="registerData.ruleForm" :rules="rules" ref="formCheck">
		<el-form-item class="login-animation1" prop="account">
			<el-input text :placeholder="$t('message.sign_up.placeholder1')" v-model="registerData.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation1" prop="email">
				<el-input text :placeholder="$t('message.account.accountPlaceholder4')" v-model="registerData.ruleForm.email" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Message /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		<el-form-item class="login-animation2" prop="password">
			<el-input
				:type="registerData.isShowPassword1 ? 'text' : 'password'"
				:placeholder="$t('message.sign_up.placeholder2')"
				v-model="registerData.ruleForm.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="registerData.isShowPassword1 ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="registerData.isShowPassword1 = !registerData.isShowPassword1"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3">
			<el-button round type="primary" v-waves class="login-content-submit" @click="Register" :loading="registerData.loading.sign_up">
				<span>{{ $t('message.sign_up.btnText') }}</span>
			</el-button>
		</el-form-item>
		<div class="login-animation4 login-msg">{{ $t('message.sign_up.msgText') }}</div>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqRegister } from '/@/api/login/index';
import { ElMessage } from 'element-plus';
// 定义变量内容
interface registerData_form {
	username: string;
	password: string;
	email: string;
}
const registerData = reactive({
	isShowPassword1: false,
	loading: {
		sign_up: false,
	},
	ruleForm: {
		username: '',
		password: '',
		email: '',
	} as registerData_form,
});
const formCheck = ref();
const validatorUsername =  (rule: any, value: any, callback: any) => {
	if (/^[a-zA-Z0-9]{5,12}$/.test(value)) {
		callback();
	} else {
		callback(new Error('账号长度不能小于5位或大于12位'));
	}
};
const validatorPassWord =  (rule: any, value: any, callback: any) => {
	if (/^(?![0-9]+$)[a-z0-9]{1,50}$/.test(value)) {
		callback();
	} else {
		callback(new Error('密码必须包含至少一个数字和一个小写字母，并且长度在6到12个字符之间'));
	}
};
const rules = reactive({
	//required，务必要校验的
	//trigger：触发校验时机，blur是失去焦点触发，change是文本变化触发
	username: [{ validator: validatorUsername, trigger: 'change' }],
	password: [{ validator: validatorPassWord, trigger: 'change' }],
	email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
});
const Register = async () => {
	try{
	await formCheck.value.validate()
	registerData.loading.sign_up = true;
	let result = await reqRegister(registerData.ruleForm);
		if (result.user.username) {
			ElMessage({
				message: '注册成功',
				type: 'success',
				duration: 2000,
			});
			registerData.loading.sign_up = false;
			registerData.ruleForm = {
				username: '',
				password: '',
				email: '',
			} as registerData_form;
			
		}
	}catch(e){
		ElMessage({
				message: '账号或邮箱已存在',
				type: 'error',
				duration: 2000,
			});
			registerData.loading.sign_up = false;
	}
}

</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
	.login-msg {
		color: var(--el-text-color-placeholder);
	}
	.login-animation3 {
		margin-top: -20px;
	}

	.login-animation4 {
		margin-top: -10px;
	}
}
</style>
