import { RouteRecordRaw } from 'vue-router';

/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		roles?: string[];
		icon?: string;
	}
}

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: 'message.router.home',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: 'message.router.system',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles: ['admin'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('/@/views/system/menu/index.vue'),
						meta: {
							title: 'message.router.systemMenu',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin'],
							icon: 'iconfont icon-caidan',
						},
					},
					{
						path: '/system/role',
						name: 'systemRole',
						component: () => import('/@/views/system/role/index.vue'),
						meta: {
							title: 'message.router.systemRole',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin'],
							icon: 'ele-ColdDrink',
						},
					},
					{
						path: '/system/user',
						name: 'systemUser',
						component: () => import('/@/views/system/user/index.vue'),
						meta: {
							title: 'message.router.systemUser',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin'],
							icon: 'iconfont icon-icon-',
						},
					}
					// {
					// 	path: '/system/dept',
					// 	name: 'systemDept',
					// 	component: () => import('/@/views/system/dept/index.vue'),
					// 	meta: {
					// 		title: 'message.router.systemDept',
					// 		isHide: false,
					// 		isKeepAlive: true,
					// 		isAffix: false,
					// 		roles: ['admin'],
					// 		icon: 'ele-OfficeBuilding',
					// 	},
					// },
					// {
					// 	path: '/system/dic',
					// 	name: 'systemDic',
					// 	component: () => import('/@/views/system/dic/index.vue'),
					// 	meta: {
					// 		title: 'message.router.systemDic',
					// 		isHide: false,
					// 		isKeepAlive: true,
					// 		isAffix: false,
					// 		roles: ['admin'],
					// 		icon: 'ele-SetUp',
					// 	},
					// },
				],
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/menu/menu1',
				meta: {
					title: '海洋生物库',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-caidan',
				},
				children: [
					{
						path: '/menu/menu1',
						name: 'menu1',
						component: () => import('/@/layout/routerView/parent.vue'),
						redirect: '/menu/menu1/menu11',
						meta: {
							title: '海洋动物',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu1/menu11',
								name: 'menu11',
								component: () => import('/@/views/menu/menu1/menu11/index.vue'),
								meta: {
									title: '海洋游泳动物',
									isHide: false,
									isKeepAlive: true,  
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu12',
								name: 'menu12',
								component: () => import('/@/layout/routerView/parent.vue'),
								meta: {
									title: '海洋浮游动物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu13',
								name: 'menu13',
								component: () => import('/@/views/menu/menu1/menu13/index.vue'),
								meta: {
									title: '海洋底栖动物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu14',
								name: 'menu14',
								component: () => import('/@/views/menu/menu1/menu14/index.vue'),
								meta: {
									title: '海洋仰泳生物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
						],
					},
					{
						path: '/menu/menu2',
						name: 'menu2',
						component: () => import('/@/views/menu/menu2/index.vue'),
						redirect: '/menu/menu2/menu21',
						meta: {
							title: '海洋植物',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu2/menu21',
								name:'menu21',
								component: () => import('/@/views/menu/menu2/menu21/index.vue'),
								meta: {
									title: '藻类植物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								}	
							},
							{
								path: '/menu/menu2/menu22',
								name:'menu22',
								component: () => import('/@/views/menu/menu2/menu22/index.vue'),
								meta: {
									title: '红树林',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								}
							}
						]
					},
					{
						path: '/menu/menu3',
						name: 'menu3',
						component: () => import('/@/views/menu/menu3/index.vue'),
						redirect: '/menu/menu3/menu31',
						meta: {
							title: '微生物',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu3/menu31',
								name:'menu31',
								component: () => import('/@/views/menu/menu3/menu31/index.vue'),
								meta: {
									title: '地下微生物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								}	
							},
							{
								path: '/menu/menu3/menu32',
								name:'menu32',
								component: () => import('/@/views/menu/menu3/menu32/index.vue'),
								meta: {
									title: '海洋微生物',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								}
							}
						]
					},
				],
			},
			{
				path: '/admin',
				name: 'error',
				component: () => import('/@/views/admin/index.vue'),
				meta: {
					title:'管理员管理',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles:['admin','common'],
					icon:'iconfont icon-crew_feature'
			}
			},
			{
				path: '/species',
				name: 'species',
				component: () => import('/@/views/species/index.vue'),
				meta: {
					title:'海洋生物种类管理',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles:['admin','common'],
					icon:'iconfont icon-crew_feature'
			}
		},
			{
				path:'/notice',
				name:'notice',
				component:()=>import('/@/views/notice/index.vue'),
				meta:{
					title:'公告管理',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles:['admin','common'],
					icon:'iconfont icon-crew_feature'
				}
			},
			{
				path: '/fun',
				name: 'funIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/fun/tagsView',
				meta: {
					title: 'message.router.funIndex',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-crew_feature',
				},
				children: [
					{
						path: '/fun/tagsView',
						name: 'funTagsView',
						component: () => import('/@/views/fun/tagsView/index.vue'),
						meta: {
							title: 'message.router.funTagsView',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/fun/waves',
						name: 'pagesWaves',
						component: () => import('/@/views/fun/waves/index.vue'),
						meta: {
							title: 'message.router.pagesWaves',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-bolangneng',
						},
					},
					{
						path: '/fun/drag',
						name: 'pagesDrag',
						component: () => import('/@/views/fun/drag/index.vue'),
						meta: {
							title: 'message.router.pagesDrag',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'ele-Pointer',
						},
					},
				],
			},
			{
				path: '/personal',
				name: 'personal',
				component: () => import('/@/views/personal/index.vue'),
				meta: {
					title: 'message.router.personal',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-gerenzhongxin',
				},
			},
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];
