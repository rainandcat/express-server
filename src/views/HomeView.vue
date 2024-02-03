<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {getResourcesApi,updateResourcesApi} from '@/resource'

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
    }
  }
}
</script>

<template>
  <main>
    <el-input placeholder="Please input key" v-model="inputKey"></el-input>
    <el-input placeholder="Please input value" v-model="inputValue"></el-input>
   <el-button @click="updateData" type="success">Success</el-button>
  </main>
</template>
