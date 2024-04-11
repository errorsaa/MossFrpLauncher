<template>
  <div style="overflow-y: auto;height: 525px;color: var(--white-color);">
    <h2>MossFrp Launcher</h2>
    <p>当前版本：{{ global.version }}</p>
    <h3>作者</h3>
    <p>*</p>
    <var-button type="primary" @click="to('https://www.mossfrp.top')">打开MossFrp官网</var-button>
    <p>提示：本软件并非MossFrp官方开发</p>
    <var-card
    title="更新日志"
    v-model:floating="floating"
    style="width: 300px;text-align: center;"
    @click="floating = true">
    <template #floating-content>
      <var-divider dashed />
        <div style="color: var(--button-default-text-color);">
          <p>1.0.0版本</p>
          <span>编写部分基础功能</span>
          <p>1.0.1版本</p>
          <span>添加隧道设置以及自动检测更新</span>
        </div>
    </template>
  </var-card>
  </div>
</template>

<script setup>
  import global from '@/global'
  import { ref } from 'vue'

  const floating = ref(false)

  function to(path) {
    aardio.to(path)
  }
</script>