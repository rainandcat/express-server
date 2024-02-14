<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {getResourcesApi,updateResourcesApi,addResourcesApi,deleteResourcesApi,downloadExampleApi} from '@/resource'

export default {
  components:{TheWelcome},
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

<style lang="scss" scoped>
.search-container{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  .input-value{
    width: 20%;
    margin-right: 1rem;
  }
}
.table-container{
  padding: 40px;
  text-align: center;
}
.el-table{
  width: 100%;
  ::v-deep thead{
    tr{
      th{
        background-color: #778DA9;
        color: #fff;
      }
    }
  }
  ::v-deep .el-table__fixed-right-patch{
    background-color: #778DA9;
  }
}

</style>

<template>
  <main class="table-container">
    <div class="search-container">
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
      height="750"
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
