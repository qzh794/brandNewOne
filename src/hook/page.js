import {
	ref
} from 'vue'
import {
	getAdminListLength
} from '@/api/userinfor.js'

export const test = async (adminType) => {
	const res = await getAdminListLength(adminType)
	return res
}