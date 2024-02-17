<script>
import {getResourcesApi,updateResourcesApi,addResourcesApi,deleteResourcesApi,downloadExampleApi} from '@/resource'

export default {
    data() {
    return {
      searchKey: '',
      searchValue:'',
      tableData:[],
    }
  },
  mounted(){
    this.getResources()
  },
  computed:{
    filterData(){
      if (!this.searchKey && !this.searchValue) return this.tableData; 
      return this.tableData.filter(data => {
        let isMatchKey=true; 
        let isMatchValue=true
        if(this.searchKey) isMatchKey=data.key.toLowerCase().includes(this.searchKey.toLowerCase())
        if(this.searchValue) isMatchValue=data.value.toString().includes(this.searchValue)
        return isMatchKey && isMatchValue;
      })
    }
  },
  methods:{
    getResources(){
      getResourcesApi().then(res => {
        this.tableData=res.data
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
    isJsonString(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    },
    goToEdit(row){
      this.$router.push({ name: 'edit', query: { keyValue: row }})
    }
  }
}
</script>

<template>
  <main class="table-container px-10">
    <div class="search-container flex justify-end mb-2">
      <el-input
        class="input-value"
        v-model="searchKey"
        size="mini"
        placeholder="Please enter key"/>
      <el-input
        class="input-value"
        v-model="searchValue"
        size="mini"
        placeholder="Please enter value"/>
      <el-button @click="downloadExampleFile" type="primary" size="small">Download</el-button>
    </div>
    <el-table
      :data="filterData"
      height="720"
      >
      <el-table-column
        prop="key"
        label="Key"
        >
      </el-table-column>
      <el-table-column
        prop="value"
        label="Value"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button @click="goToEdit(scope.row)" type="text" size="small">Edit</el-button>
          <el-button type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<style lang="scss" scoped>
.table-container{
  .search-container{
    .input-value{
      @apply w-1/5 mr-4;
    }
  }
}
.el-table{
  @apply w-full;
  ::v-deep thead{
    tr{
      th{
        @apply bg-tableColor text-white;
      }
    }
  }
  ::v-deep .el-table__fixed-right-patch{
    @apply bg-tableColor;
  }
}
</style>