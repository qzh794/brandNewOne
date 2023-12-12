import request from '/@/utils/request';
interface loginData_form {
	username: string;
	password: string;
}
export function reqLogin(data: loginData_form) {
  const { username, password } = data;
  return request({
    url: '/api/auth/local',
    method: 'post',
    data: {
      identifier:username,
      password
    }
  });
}  
interface registerData_form {
	username: string;
	password: string;
	email: string;
}
export function reqRegister(data:registerData_form){
  const { username, password, email } = data;
  return request({
    url: '/api/auth/local/register',
    method: 'post',
    data: {
      username,
      password,
      email
    }
  });
}
