import { basePost } from '@/libs/request'

export const getTableData = data => basePost('/food/get_data', data);