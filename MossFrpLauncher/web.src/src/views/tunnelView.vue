<template>
  <var-space>
    <var-button type="primary" text @click="createCode = true">
      <var-icon name="plus" />
      <span>创建穿透码</span>
    </var-button>
    <var-button type="primary" text icon="" @click="load">
      <var-icon name="refresh" />
      <span>刷新</span>
    </var-button>
  </var-space>
  <div id="tunnels">
    <tunnels />
  </div>
  <var-popup v-model:show="createCode">
    <div class="createCode">
      <p class="price data">单价：</p>
      <p class="prices data" style="top: 150px;">总价：</p>
      <p class="info">{{ global.nodeData[nodeName] ? global.nodeData[nodeName].info : null }}</p>
      <div class="inp">
        <var-select placeholder="请选择节点" v-model="node" :on-change="change">
          <var-option :label="v.name" v-for="v in global.nodeData"/>
        </var-select>
        <var-input v-model.number="band" :rules="[(v) => v > 0 || '最低1Mbps']" placeholder="带宽" :on-change="change" />
        <var-input v-model.number="date" :rules="[(v) => v > 2 || '最低3天']" placeholder="天数" :on-change="change" />
        <var-button
          type="primary"
          style="width: 100px;margin-left: 30px;margin-top: 10px;"
          @click="create"
          :disabled="!node || !band || !date">
          创建
        </var-button>  
      </div>
    </div>
  </var-popup>
</template>

<script setup>
  import tunnels from '@/components/tunnels.vue'
  import global from '@/global'
  import request from '@/request'
  import { createApp, ref } from 'vue'
  import { Dialog } from '@varlet/ui'

  const createCode = ref(false)
  const node = ref()
  const band = ref('1')
  const date = ref('3')
  const coins = {
    'gold': '金币',
    'silver': '银币',
    'mixed': '金或银币'
  }
  var nodeName

  async function load() {
    await request.getCodeData()
    createApp(tunnels).mount('#tunnels')
  }
  function create() {
    let price = global.nodeData[nodeName].price
    let coin = global.nodeData[nodeName].coin
    Dialog(`此操作将会消耗${price*band.value*date.value}${coins[coin]}`).then(res => {
      if (res == 'confirm') {
        request.createCode(nodeName, date.value, band.value)
        createCode.value = false
      }
    })
  }
  function change() {
    if (node.value != '') {
      nodeName = node.value.split('-')[0]
      let price = global.nodeData[nodeName].price
      let coin = global.nodeData[nodeName].coin
      document.querySelector('.price').innerText = `单价：${price}${coins[coin]}`
      document.querySelector('.prices').innerText = `总价：${price*band.value*date.value}${coins[coin]}`
    }
  }
</script>

<style scoped>
  .createCode {
    width: 400px;
    height: 230px;
    padding: 18px;
  }
  .data {
    color: var(--color-text);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 200px
  }
  .inp {
    width: 160px;
    position: absolute;
    right: 18px;
    top: 18px;
  }
  .info {
    width: 200px;
    height: 100px;
    color: var(--color-text);
    white-space: wrap;
  }
</style>