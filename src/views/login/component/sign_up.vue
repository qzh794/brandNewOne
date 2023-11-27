<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.sign_up.placeholder1')" v-model="registerData.ruleForm.account" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
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
		<el-form-item class="login-animation2">
				<el-input
					:type="registerData.isShowPassword2 ? 'text' : 'password'"
					:placeholder="$t('message.account.accountPlaceholder5')"
					v-model="registerData.ruleForm.repassword"
					autocomplete="off"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
					</template>
					<template #suffix>
						<i
							class="iconfont el-input__icon login-content-password"
							:class="registerData.isShowPassword2 ? 'icon-yincangmima' : 'icon-xianshimima'"
							@click="registerData.isShowPassword2 = !registerData.isShowPassword2"
						>
						</i>
					</template>
				</el-input>
			</el-form-item>
		<el-form-item class="login-animation3">
			<el-button round type="primary" v-waves class="login-content-submit">
				<span>{{ $t('message.sign_up.btnText') }}</span>
			</el-button>
		</el-form-item>
		<div class=" login-animation4 login-msg">{{ $t('message.sign_up.msgText') }}</div>
	</el-form>
</template>

<script setup lang="ts" >
import { reactive } from 'vue';

// 定义变量内容
interface registerData_form {
	account: string;
	password: string;
	repassword: string;
}
const registerData = reactive({
	isShowPassword1: false,
	isShowPassword2: false,
	ruleForm: {
		account: '',
		password: '',
		repassword: '',
	} as registerData_form,
});
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
	.login-animation3{
		margin-top: -20px;
	}

 .login-animation4{
		margin-top: -10px;
	}
}
</style>
