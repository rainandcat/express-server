import axios from 'axios';

const apiPath='/api/'

export const getList= async()=> await axios.get(`${apiPath}resources`)