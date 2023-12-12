import request from '/@/utils/request';
export function reqEbookList(pageNum: number, pageSize: number) {
	return request({
		url: `/api/e-books`,
		method: 'get',
		params:{
			'populate': 'deep',
			'pagination[page]':pageNum,
			'pagination[pageSize]':pageSize
		}
	});
}
export function editEbook(data: any) {
	return request({
		url: `/api/e-books/${data.id}`,
		method: 'put',
		params: {
			'populate[0]': 'cover',
		},
		data: {
			data: {
				id: data.id,
				name: data.name,
				category1Id: data.category1Id,
				category2Id: data.category2Id,
				description: data.description,
				cover: {
					id: data.coverId,
				},
			},
		},
	});
}
export function delEbook(id: string) {
	return request({
		url: `/api/e-books/${id}`,
		method: 'delete',
	});
}

export function addEbook(data: any) {
	return request({
		url: '/api/e-books',
		method: 'post',
		params: {
			'populate[0]': 'cover',
		},
		data: {
			data: {
				name: data.name,
				category1Id: data.category1Id,
				category2Id: data.category2Id,
				description: data.description,
				cover: {
					id: data.coverId
				},
			},
		},
	});
}
