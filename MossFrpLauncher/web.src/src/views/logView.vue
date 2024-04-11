<template>
  <var-button type="primary" text style="margin-left: 30px;" @click="clear">
    <var-icon name="trash-can-outline" />
    <span>清空</span>
  </var-button>
  <div class="log">{{ global.tunnelLog }}</div>
</template>

<script setup>
  import global from '@/global'
  import { onUnmounted } from 'vue'

  var timerId = setInterval(() => {
    global.runings2.forEach(e => {
      aardio.getProcOut(e).then(res => {
        global.tunnelLog += res == null ? '' : res
      })
    })
    document.querySelector('.log').innerText = global.tunnelLog
  }, 500)

  function clear() {
    document.querySelector('.log').innerText = ''
    global.tunnelLog = ''
  }

  onUnmounted(() => {
    clearInterval(timerId)
  })

</script>

<style scoped>
  .log {
    color: var(--white-color);
    margin: auto;
    width: 1000px;
    height: 460px;
    background-color: #9370DB3F;
    border-radius: 5%;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 10px;
    overflow-y: auto;
  }
</style>