import request from '/@/utils/request';
export function reqLogin(data: any) {
  const { account, password } = data;
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      account,
      password 
    }
  });
}
export function reqRegister(data: any){
	return request({
		url: '/api/register',
		method: 'post',
		data:data
	});
}