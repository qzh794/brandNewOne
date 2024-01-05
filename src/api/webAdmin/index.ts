import request from '/@/utils/request';
export function webAdminUserList() {
  return request({
    url: '/admin/user/list',
    method: 'get',
  });
}