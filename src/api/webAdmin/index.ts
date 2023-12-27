import request from '/@/utils/request';
export function webAdminUserList(params: any) {
  return request({
    url: '/admin/user/list',
    method: 'get',
  });
}