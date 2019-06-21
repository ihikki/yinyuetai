<template>
  <div id="app">
    <t-header></t-header>
    <tab></tab>
    <router-view></router-view>

  </div>
</template>
<script>
import THeader from "@/components/t-header/t-header";
import Tab from "@/components/tab/tab";

export default {
  components:{
    THeader,
    Tab,

  }
}

</script>

<style lang="stylus">
</style>
