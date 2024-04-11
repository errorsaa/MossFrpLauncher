<template>
  <var-card
    class="tunnel"
    :subtitle="`节点：${codeInfo.node} 可用端口：${Number(codeInfo.port)+1}~${Number(codeInfo.port)+9}`"
    :description="`状态：${status[codeInfo.status]} 到期时间：${new Date(Number(codeInfo.stop)).toLocaleString()} 带宽：${codeInfo.band}Mbps`">
    <template #extra>
      <var-space>
        <var-button type="primary" @click="script" :disabled="!name || !type || !localIp || !localPort || !remotePort">
          <var-icon name="plus" />
          <span>生成脚本</span>
        </var-button>
        <var-button type="primary" @click="copy" :disabled="!name || !type || !localIp || !localPort || !remotePort">
          <var-icon name="content-copy" />
          <span>复制链接</span>
        </var-button>
        <var-button type="primary" @click="edit = true">
          <var-icon name="code-json" />
          <span>编辑</span>
        </var-button>
        <var-button type="primary" @click="dialog = true">
          <var-icon name="trash-can-outline" />
          <span>删除</span>
        </var-button>
      </var-space>
    </template>
    <template #title>
      <div style="padding: 16px;">
        <span class="name">{{ name ? name : '未命名' }}</span>
        <var-space style="display: inline-flex;">
          <var-switch 
            lazy-change
            v-model="switcher"
            @before-change="handleBeforeChange"
            :disabled="!name || !type || !localIp || !localPort || !remotePort"/>
          <span>{{ switcher ? '开' : '关' }}</span>
        </var-space>
      </div>
    </template>
  </var-card>
  <var-popup v-model:show="edit">
    <div class="edit">
      <div>
        <var-select placeholder="请选择映射类型" v-model="type">
          <var-option label="tcp"/>
          <var-option label="udp"/>
        </var-select>
        <var-select placeholder="真实IP转发" v-model="proxy">
          <var-option :label="null"/>
          <var-option label="v1"/>
          <var-option label="v2"/>
        </var-select>
        <var-input v-model="name" class="nobr" placeholder="隧道名称（英文）"/>
        <var-input v-model="localIp" class="nobr2" placeholder="本地地址"/>
        <var-input v-model="localPort" class="nobr" placeholder="本地端口"/>
        <var-input v-model="remotePort" class="nobr2" placeholder="远程端口"/>
        <var-input v-model="band" class="nobr" placeholder="增加带宽（可空）"/>
        <var-input v-model="date" class="nobr2" placeholder="续期（可空）"/>
        <var-checkbox v-model="compression" style="position: absolute; left: 20px;bottom: 30px;">数据压缩</var-checkbox>
        <var-checkbox v-model="encryption" style="position: absolute;right: 20px;bottom: 30px;">数据加密</var-checkbox>
      </div>
      <var-button
        type="primary"
        @click="save"
        style="margin: 25px;margin-left: 175px;"
        :disabled="!name || !type || !localIp || !localPort || !remotePort">
        保存
      </var-button>
    </div>
  </var-popup>
  <var-dialog v-model:show="dialog" @confirm="remove" title="删除穿透码">
    <span>
      此操作将永久删除 {{ codeInfo.node }} 节点上的 
      {{ codeInfo.number }} 穿透码并返回一定量的
      银币，删除后您将无法访问此穿透码所关
      联的服务，且对应端口资源、带宽资源将
      立即释放，此操作一经确认无法撤回哦～
    </span>
    <p>请输入 {{ codeInfo.node }}-{{ codeInfo.number }} 以确认</p>
    <var-input v-model="tunnelname" />
  </var-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import request from '@/request'
  import { Snackbar } from '@varlet/ui'
  import global from '@/global'

  const { codeInfo } = defineProps(['codeInfo'])
  const tunnelInfo = JSON.parse(localStorage.getItem(codeInfo.number)) ? JSON.parse(localStorage.getItem(codeInfo.number)) : {}
  const status = {
    run: '运行',
    outdated: '到期',
    banned: '封禁'
  }
  const name = ref(tunnelInfo.name)
  const type = ref(tunnelInfo.type)
  const localIp = ref(tunnelInfo.localIp)
  const localPort = ref(tunnelInfo.localPort)
  const remotePort = ref(tunnelInfo.remotePort)  
  const band = ref()
  const date = ref()
  const dialog = ref(false)
  const edit = ref(false)
  const tunnelname = ref()
  const switcher = ref(global.runings[codeInfo.number])
  const proxy = ref()
  const compression = ref()
  const encryption = ref()

  function writeIni() {
    aardio.writeFile(`/config/${codeInfo.node}-${codeInfo.number}.ini`, `
      [common] enter
      server_addr=${codeInfo.node}.mossfrp.cn enter
      server_port=${codeInfo.port} enter
      token=${codeInfo.code} enter
      [${tunnelInfo.name}] enter
      type=${tunnelInfo.type} enter
      local_ip=${tunnelInfo.localIp} enter
      local_port=${tunnelInfo.localPort} enter
      remote_port=${tunnelInfo.remotePort} enter
      proxy_protocol_version=${proxy.value ? proxy.value : ''} enter
      use_compression=${compression.value ? compression.value : 'false'} enter
      use_encryption=${encryption.value ? encryption.value : 'false'}
      `.replace(/\s/g, '').replace(/\enter/g, '\n'))
  }
  function handleBeforeChange(value, change) {
    change(value)
    global.runings[codeInfo.number] = value
    value ? global.runings2.push(codeInfo.number) : global.runings2.pop(codeInfo.number)
    if (value) {
      writeIni()
      aardio.createProc(codeInfo.node, codeInfo.number, `.\\bin\\frpc.exe -c ./config/${codeInfo.node}-${codeInfo.number}.ini`)
    } else {
      aardio.exitProc(codeInfo.number)
    }
  }
  function script() {
    writeIni()
    aardio.writeFile(`/script/${codeInfo.node}-${codeInfo.number}.bat`, `echo off\n..\\bin\\frpc.exe -c ../config/${codeInfo.node}-${codeInfo.number}.ini`)
    Snackbar.success(`已生成，脚本位置：软件根目录/script/${codeInfo.node}-${codeInfo.number}.bat`)
  }
  function copy() {
    aardio.writeText(`${codeInfo.node}.mossfrp.cn:${tunnelInfo.remotePort}`)
    Snackbar.success('已复制')
  }
  function remove() {
    if (tunnelname.value == `${codeInfo.node}-${codeInfo.number}`) {
      request.removeCode(codeInfo.node, codeInfo.number)
    } else {
      Snackbar.info('输入错误')
    }
  }
  function save() {
    tunnelInfo.name = name.value
    tunnelInfo.type = type.value
    tunnelInfo.localIp = localIp.value
    tunnelInfo.localPort = localPort.value
    tunnelInfo.remotePort = remotePort.value
    localStorage.setItem(codeInfo.number, JSON.stringify(tunnelInfo))
    edit.value = false
    if (date.value) {
      request.dateCode(codeInfo.node, codeInfo.number, date.value)
      date.value = ''
    } 
    if (band.value) {
      request.bandCode(codeInfo.node, codeInfo.number, band.value)
      band.value = ''
    }
  }
</script>

<style scoped>
  .nobr,
  .nobr2 {
    display: inline-block;
  }
  .nobr2 {margin-left: 22px;}
  .tunnel {
    width: 484px;
    height: 220px;
    margin: 20px;
    display: inline-block;
  }
  .name {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 80px;
    margin-right: 300px;
  }
  .edit {
    width: 450px;
    height: 360px;
    padding: 18px;
  }
</style>