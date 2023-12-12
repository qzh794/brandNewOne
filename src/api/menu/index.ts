import request from '/@/utils/request';

/**
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 */
export function reqMenuList(id: number) {
	return request({
		url: '/api/returnMenuList',
		method: 'post',
		data: { id },
	});
}
