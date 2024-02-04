<script setup>
import Layout from './components/Layout.vue'
</script>

<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
        >
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span>Navigator One</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <Layout />
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .el-aside{
    background-color: #1B263B;
  }
  .container{
    height: 100vh;
  }
  .el-container{
    background-color: #E0E1DD;
  }
  .el-menu{
    background-color: #0D1B2A;
    color: #fff;
    .el-menu-item{
      &:focus,&:hover,&.is-active{
        background-color: #0D1B2A;
      }
    }
  }
</style>
