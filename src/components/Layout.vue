<template>
  <div class="layout-container">
    <el-header>
      <ul>
        <li>
          <router-link to="/">Create Data</router-link>
        </li>
      </ul>
    </el-header>
    <el-main>
        <router-view />
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
  .layout-container{
    width: 100%;
  }
  .el-header {
    background-color: #415A77;
    line-height: 60px;
    a{
      color: #fff;
    }
  }
  ul{
    li{
      list-style:none
    }
  }
</style>