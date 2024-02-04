<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {getResourcesApi,updateResourcesApi,addResourcesApi,deleteResourcesApi} from '@/resource'

export default {
  components:{TheWelcome},
    data() {
    return {
      inputKey: '',
      inputValue:'',
      tableData:[]
    }
  },
  mounted(){
    this.getResources()
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

<style lang="scss" scoped>
.table-container{
  padding: 50px;
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
    <el-table
      :data="tableData"
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
          <el-button @click="handleClick" type="text" size="small">Edit</el-button>
          <el-button type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>
