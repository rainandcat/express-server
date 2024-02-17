<script>
import {updateResourcesApi} from '@/resource'

export default {
    data() {
    return {
      key: '',
      value:'',
      tableData:[],
      dialogVisible:false
    }
  },
  mounted(){
    const keyValue=this.$route.query.keyValue
    this.key=keyValue.key
    this.value=keyValue.value
  },
  methods:{
    updateData(){
      updateResourcesApi(this.key,{value:this.value}).then((res)=>{
          this.dialogVisible=true
      })
    },
    goToHome(){
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<template>
    <main class="edit-container p-10 text-right">
      <div class="input-container flex flex-col">
        <el-input
            class="input-value"
            v-model="key"
            size="mini"
            disabled/>
        <el-input
            class="input-value"
            v-model="value"
            size="mini"/>
      </div>
      <el-button type="primary" @click="updateData">Sumit</el-button>
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

<style lang="scss" scoped>
.edit-container{
    .input-container{
        .input-value{
           @apply mb-3;
        }
    }
}
</style>