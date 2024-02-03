<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {getResourcesApi,updateResourcesApi,addResourcesApi,deleteResourcesApi} from '@/resource'

export default {
  components:{TheWelcome},
    data() {
    return {
      inputKey: '',
      inputValue:''
    }
  },
  mounted(){
    this.getResources()
  },
  methods:{
    getResources(){
      getResourcesApi().then(res => {
        console.log(res.data)
        console.log(typeof res.data)
      }).catch(error => {
        console.error(error);
      });
    },
    updateData(){
      updateResourcesApi(this.inputKey,{value:this.inputValue}).then((res)=>{
          console.log(res)
      })
    },
    addData(){
      let jsonData=this.isJsonString(this.inputValue)?JSON.parse(this.inputValue):this.inputValue;
      addResourcesApi(this.inputKey,{value:jsonData}).then((res)=>{
          console.log(res)
      })
    },
    deleteData(){
      deleteResourcesApi(this.inputKey).then((res)=>{
          console.log(res)
      })
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
</script>

<template>
  <main>
    <el-input placeholder="Please input key" v-model="inputKey"></el-input>
    <el-input placeholder="Please input value" v-model="inputValue"></el-input>
    <el-button @click="updateData" type="success">put</el-button>
    <el-button @click="addData" type="success">post</el-button>
    <el-button @click="deleteData" type="success">delete</el-button>
  </main>
</template>
