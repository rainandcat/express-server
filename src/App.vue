<script setup>
import Layout from './components/Layout.vue'
</script>

<template>
  <div id="app">
    <el-container class="container bg-backgroundColor h-screen max-w-none overflow-auto">
      <el-aside class="bg-secondary" width="200px">
        <el-menu
          class="text-white"
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
  .el-menu{
    @apply bg-menuColor border-menuColor;
    .el-menu-item{
      &:focus,&:hover,&.is-active{
        @apply bg-menuColor;
      }
    }
  }
</style>
