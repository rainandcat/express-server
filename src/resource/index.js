import axios from 'axios';

const apiPath='/api/'

export const getResourcesApi= async()=> await axios.get(`${apiPath}resources`)
export const updateResourcesApi= async(key,data)=> await axios.put(`${apiPath}resources/${key}`,data)
export const addResourcesApi= async(key,data)=> await axios.post(`${apiPath}resources/${key}`,data)
export const deleteResourcesApi= async(key)=> await axios.delete(`${apiPath}resources/${key}`)
export const downloadExampleApi= async()=> await axios.get(`${apiPath}download/example`, { responseType: 'blob' })