<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.account.accountPlaceholder1')" v-model="loginData.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="loginData.isShowPassword ? 'text' : 'password'"
				:placeholder="$t('message.account.accountPlaceholder2')"
				v-model="loginData.ruleForm.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="loginData.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="loginData.isShowPassword = !loginData.isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3">
			<el-col :span="15">
				<el-input text maxlength="4" :placeholder="$t('message.account.accountPlaceholder3')" v-model="loginData.code" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Position /></el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
				<el-button class="login-content-code" v-waves>1234</el-button>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation4">
			<div class="login-content-forget-password">
				<span class="login-content-forget-password-button" @click="dialogVisible = !dialogVisible">忘记密码</span>
			</div>
			<el-button type="primary" class="login-content-submit" round v-waves @click="onSignIn" :loading="loginData.loading.signIn">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
	<!-- 忘记密码弹窗 -->
	<el-dialog v-model="dialogVisible" title="忘记密码" width="30%" draggable>
		<el-form size="large" class="login-content-form"  ref="ruleFormRef" :rules="rules" :model="forgetData.ruleForm">
			<el-form-item class="login-animation1" :label="$t('message.account.accountPlaceholder1')" prop="username">
				<el-input text :placeholder="$t('message.account.accountPlaceholder1')" v-model="forgetData.ruleForm.username" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-User /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item class="login-animation1" :label="$t('message.account.accountPlaceholder4')" prop="email">
				<el-input text :placeholder="$t('message.account.accountPlaceholder4')" v-model="forgetData.ruleForm.email" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Message /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialog_handle"> 下一步 </el-button>
			</span>
		</template>
	</el-dialog>
	<!-- 修改密码弹窗2 -->
	<el-dialog v-model="dialogVisible2" title="修改密码" width="30%" draggable>
		<el-form size="large" class="login-content-form" ref="ruleFormRef" :rules="rules" :model="forgetData.ruleForm">
			<el-form-item class="login-animation2" prop="password">
				<el-input
					:type="forgetData.isShowPassword1 ? 'text' : 'password'"
					:placeholder="$t('message.account.accountPlaceholder2')"
					v-model="forgetData.ruleForm.password"
					autocomplete="off"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
					</template>
					<template #suffix>
						<i
							class="iconfont el-input__icon login-content-password"
							:class="forgetData.isShowPassword1 ? 'icon-yincangmima' : 'icon-xianshimima'"
							@click="forgetData.isShowPassword1 = !forgetData.isShowPassword1"
						>
						</i>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item class="login-animation2" prop="repassword">
				<el-input
					:type="forgetData.isShowPassword2 ? 'text' : 'password'"
					:placeholder="$t('message.account.accountPlaceholder5')"
					v-model="forgetData.ruleForm.repassword"
					autocomplete="off"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
					</template>
					<template #suffix>
						<i
							class="iconfont el-input__icon login-content-password"
							:class="forgetData.isShowPassword2 ? 'icon-yincangmima' : 'icon-xianshimima'"
							@click="forgetData.isShowPassword2 = !forgetData.isShowPassword2"
						>
						</i>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialog_handle2">上一步</el-button>
				<el-button type="primary" @click="dialogVisible2 = false"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import { reqLogin } from '/@/api/login';
// 定义变量内容
const { t } = useI18n();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const router = useRouter();
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialog_handle = () => {
	dialogVisible.value = !dialogVisible.value;
	dialogVisible2.value = !dialogVisible.value;
	
};
const dialog_handle2 = () => {
	dialogVisible2.value = !dialogVisible2.value;
	dialogVisible.value = !dialogVisible.value;
	
};
interface loginData_form {
	username: string;
	password: string;
}
interface forgetData_form {
	username: string;
	email: string;
	password:string;
	repassword:string;
}

const loginData = reactive({
	isShowPassword: false,
	code: '1234',
	ruleForm: {
		username: '',
		password: '',
	} as loginData_form,
	loading: {
		signIn: false,	
	},
});
const forgetData=reactive({
	isShowPassword1: false,
	isShowPassword2: false,
	ruleForm: {
		username: '',
		email: '',
		password: '',
		repassword:''
	} as forgetData_form,
	loading: {
		signIn: false,	
	},
})
const ruleFormRef=ref()


const rules = reactive({
	username: [{ required: true, message: t('message.account.accountPlaceholder1'), trigger: 'blur' }],
	email:  [{ required: true, message: t('message.account.accountPlaceholder4'), trigger: 'blur' }],
	password: [{ required: true, message: t('message.account.accountPlaceholder2'), trigger: 'blur' }],
	repassword: [{ required: true, message: t('message.account.accountPlaceholder5'), trigger: 'blur' }],
})
// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});
// 登录
const onSignIn = async () => {
	try{
	loginData.loading.signIn=true
	const result=await reqLogin(loginData.ruleForm);
	const {jwt:token}=result
	if(result.message=='登陆成功'){
		ElMessage({
			type:'success',
			message: result.message,
		})
	}
		// 存储 token 到浏览器缓存
	Session.set('token', token);
	// 可以拿到token
	console.log(Session.get('token'));
	
	Cookies.set('account', loginData.ruleForm.username);
	if (!themeConfig.value.isRequestRoutes) {
		// 前端控制路由，2、请注意执行顺序
		const isNoPower = await initFrontEndControlRoutes();
		signInSuccess(isNoPower);
	} else {
		// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
		// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
		const isNoPower = await initBackEndControlRoutes();
		// 执行完 initBackEndControlRoutes，再执行 signInSuccess
		signInSuccess(isNoPower);
		
		
	}
	}catch(e){
		loginData.loading.signIn=false
		ElMessage({
			type:'error',
			message:'账号出错',
		})
	}
}
	
// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
	if (isNoPower) {
		ElMessage.warning('抱歉，您没有登录权限');
		Session.clear();
	} else {
		// 初始化登录成功时间问候语
		let currentTimeInfo = currentTime.value;
		// 登录成功，跳到转首页
		// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
		if (route.query?.redirect) {
			router.push({
				path: <string>route.query?.redirect,
				query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
			});
		} else {
			router.push('/');
		}
		// 登录成功提示
		const signInText = t('message.signInText');
		ElMessage.success(`${currentTimeInfo}，${signInText}`);
		// 添加 loading，防止第一次进入界面时出现短暂空白
		NextLoading.start();
	}
	loginData.loading.signIn = false;
};
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
	.login-content-forget-password {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		.login-content-forget-password-button {
			margin-top: -10px;
			cursor: pointer;
			color: #409eff;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 5px;
	}
}
</style>
