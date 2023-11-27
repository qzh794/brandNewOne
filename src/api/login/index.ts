import request from '/@/utils/request';
export function reqLogin(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data: data
  });
}
export function reqRegister(data){
	return request({
		url: '/api/register',
		method: 'post',
		data:data
	});
}