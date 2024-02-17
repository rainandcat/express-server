<script>
import {getResourcesApi,deleteResourcesApi} from '@/resource'

export default {
    data() {
    return {
      searchKey: '',
      searchValue:'',
      tableData:[],
      dialogVisible:false,
      deleteKey:null
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
    showDeleteDialog(index){
      this.dialogVisible = true
      this.deleteIndex=index
    },
    deleteData(){
      deleteResourcesApi(this.filterData[this.deleteIndex].key).then((res)=>{
          this.filterData.splice(this.deleteIndex, 1);
          this.dialogVisible = false
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
          <el-button  @click="showDeleteDialog(scope.$index)" type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>Confirm whether to delete the data?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteData()">Confirm</el-button>
      </span>
    </el-dialog>
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