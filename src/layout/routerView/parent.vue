<template>
	<div class="layout-parent">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component :is="Component" :key="state.refreshRouterViewKey" class="w100"/>
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts" name="layoutParentView">
import { computed, reactive, onBeforeMount, onUnmounted, nextTick, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';
import mittBus from '/@/utils/mitt';
// 定义变量内容
const route = useRoute();
const storesKeepAliveNames = useKeepALiveNames();
const storesThemeConfig = useThemeConfig();
const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames);
const { themeConfig } = storeToRefs(storesThemeConfig);
const state = reactive<ParentViewState>({
	refreshRouterViewKey: '', // tagsview 右键菜单刷新时
	keepAliveNameList: [],
});

// 设置主界面切换动画
const setTransitionName = computed(() => {
	return themeConfig.value.animation;
});
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return themeConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList;
});

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
	state.keepAliveNameList = keepAliveNames.value;
	mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
		state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name);
		state.refreshRouterViewKey = '';
		nextTick(() => {
			state.refreshRouterViewKey = fullPath;
			state.keepAliveNameList = keepAliveNames.value;
		});
	});
});
// 页面加载时
onMounted(() => {
	nextTick(() => {
		setTimeout(() => {
			if (themeConfig.value.isCacheTagsView) {
				let tagsViewArr: RouteItem[] = Session.get('tagsViewList') || [];
				cachedViews.value = tagsViewArr.filter((item) => item.meta?.isKeepAlive).map((item) => item.name as string);
			}
		}, 0);
	});
});
// 页面卸载时
onUnmounted(() => {
	mittBus.off('onTagsViewRefreshRouterView', () => {});
});
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
	() => route.fullPath,
	() => {
		state.refreshRouterViewKey = decodeURI(route.fullPath);
	},
	{
		immediate: true,
	}
);
</script>
