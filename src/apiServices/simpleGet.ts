import { api } from '@/api'

export const getItemsForPageServiceForGet = async (path:string, offset: string|number, limit: string|number):Promise<any> => {
  if(!path && !offset) {
    throw new Error('path and page are required')
  }
  try {
    const res = await api.get(`${path}?offset=${offset}&limit=${limit}`)
    return res
  } catch (error) {
    return error
  }
}


export const getItemByIdServiceForGet = async (path:string ,id:number):Promise<any> => {
  if(!path && !id) {
    throw new Error('path and id are required')
  }
  try {
    const res = await api.get(`${path}/${id}`)
    return res
  } catch (error) {
    return error
  }
}