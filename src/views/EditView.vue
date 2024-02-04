<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {updateResourcesApi} from '@/resource'

export default {
  components:{TheWelcome},
    data() {
    return {
      key: '',
      value:'',
      tableData:[],
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
          console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container{
  padding: 40px;
  text-align: right;
    .input-container{
        display: flex;
        flex-direction: column;
        .input-value{
            margin-bottom: 0.5rem;
        }
    }
}
</style>

<template>
    <main class="edit-container">
        <div class="input-container">
            <el-input
                class="input-value"
                v-model="key"
                size="mini"
                disabled/>
            <el-input
                class="input-value"
                v-model="value"
                size="mini"
                />
        </div>
        <el-button type="primary" @click="updateData">Sumit</el-button>
    </main>
</template>