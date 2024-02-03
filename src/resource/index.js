import axios from 'axios';

const apiPath='/api/'

export const getResourcesApi= async()=> await axios.get(`${apiPath}resources`)
export const updateResourcesApi= async(key,data)=> await axios.put(`${apiPath}resources/${key}`,data)