import request from '/@/utils/request'
export function getCategoryApi(pageNum: number, pageSize: number,searchParam:string){
  return request({
      url: '/api/goods-categories',
      method: 'get',
      params:{
        'populate': 'deep',
        'pagination[page]':pageNum,
        'pagination[pageSize]':pageSize,
        'filters[categoryName][$startsWith]':searchParam
      }
  })
}

export function addCategoryApi(data:any) {
  return request({
    url: '/api/goods-categories',
    method: 'post',
    data:{
      data:{
        categoryName: data.categoryName,
        orderNum: data.orderNum
      }
    }
  })
}
export function editCategoryApi(data: any) {
	return request({
		url: `/api/goods-categories/${data.id}`,
		method: 'put',
		data: {
			data: {
				id: data.id,
        categoryName: data.categoryName,
        orderNum: data.orderNum
			},
		},
	});
}
export function delCategoryApi(id: string) {
	return request({
		url: `/api/goods-categories/${id}`,
		method: 'delete',
	});
}

