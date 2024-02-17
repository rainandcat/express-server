<template>
  <div class="w-full">
    <el-header class="bg-primary leading-11">
      <ul>
        <li class="list-none">
          <router-link to="/create">Create Data</router-link>
        </li>
      </ul>
    </el-header>
    <el-main>
        <router-view />
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
  .el-header {
    a {
      @apply text-white
    }
  }
</style>