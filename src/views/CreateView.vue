<script>
import {addResourcesApi,downloadExampleApi} from '@/resource'

export default {
    data() {
    return {
      inputValue:'',
      tableData:[],
      dialogVisible:false,
      showAlert:false
    }
  },
  methods:{
    addData(){
        if(!this.isJsonString(this.inputValue)){
            this.showAlert=true
            return
        }
        let jsonData=JSON.parse(this.inputValue);
        addResourcesApi(jsonData).then((res)=>{
            this.dialogVisible=true
        })
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    },
    downloadExampleFile(){
      downloadExampleApi().then((res)=>{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example.xlsx');
        document.body.appendChild(link);
        link.click();
      })
    },
    goToHome(){
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<template>
    <main class="create-container p-10">
        <div class="flex justify-between">
            <h2 class="mb-1">Create Data</h2>
            <el-button @click="downloadExampleFile" type="primary" size="small">Download</el-button>
        </div>
        <el-alert
            v-if="showAlert"
            title="It's not JSON"
            type="error">
        </el-alert>        
        <div class="input-container flex flex-col my-3">
            <el-input
                class="input-value"
                v-model="inputValue"
                type="textarea"
                :rows="5"/>
        </div>
        <div class="text-right">
            <el-button  type="primary" @click="addData">Sumit</el-button>
        </div>
        <el-dialog
            class="text-center"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>Sucess</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goToHome()">Confirm</el-button>
            </span>
        </el-dialog>
    </main>
</template>