import request from '/@/utils/request';
export function reqUserInfo() {
  return request({
    url: '/api/infos',
    method: 'get',
    params: {
    //复杂类型的属性名要引号括起来，而populate：*就没问题（populate查询关联表项与媒体文件） 
     'populate[0]':'photo'
    }
  });
}