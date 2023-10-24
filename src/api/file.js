import instance from '@/http/index.js'

// 绑定上传者
export const bindFileAndUser = (name, url) => {
	return instance({
		url: '/file/bindFileAndUser',
		method: 'POST',
		data: {
			name,
			url
		}
	})
}

// 更新下载量
export const updateDownload = (download_number, id) => {
	return instance({
		url: '/file/updateDownload',
		method: 'POST',
		data: {
			download_number,
			id
		}
	})
}

// 下载文件
export const downloadFile = (id) => {
	return instance({
		url: '/file/downloadFile',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取文件列表
export const fileList = () => {
	return instance({
		url: '/file/fileList',
		method: 'POST',
	})
}

// 获取文件列表总数
export const fileListLength = () => {
	return instance({
		url: '/file/fileListLength',
		method: 'POST',
	})
}

// 监听换页返回数据 文件列表
export const returnFilesListData = (pager) => {
	return instance({
		url: '/file/returnFilesListData',
		method: 'POST',
		data: {
			pager
		}
	})
}


// searchFlie
export const searchFlie = (file_name) => {
	return instance({
		url: '/file/searchFlie',
		method: 'POST',
		data: {
			file_name
		}
	})
}

// 删除文件
export const deleteFlie = (id,file_name) => {
	return instance({
		url: '/file/deleteFlie',
		method: 'POST',
		data: {
			id,
			file_name
		}
	})
}