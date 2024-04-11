<template>
  <div class="tunnels">
    <tunnel :codeInfo="v" v-for="v in global.codeData" />
  </div>
</template>

<script setup>
  import tunnel from './tunnel.vue'
  import global from '@/global'

</script>

<style scoped>
  .tunnels {
    width: 100vw;
    height: 490px;
    overflow-y: auto;
  }
</style>