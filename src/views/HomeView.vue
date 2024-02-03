<script>
import TheWelcome from '@/components/TheWelcome.vue'
import {getList} from '@/resource'

export default {
  components:{TheWelcome},
  mounted(){
    getList().then(res => {
      console.log(res.data)
      console.log(typeof res.data)
    }).catch(error => {
      console.error(error);
    });
  }
}
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
