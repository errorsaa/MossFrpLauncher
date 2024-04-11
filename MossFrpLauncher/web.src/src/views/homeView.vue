<template>
  <div class="userInfo">
    <h3>用户信息</h3>
    <p class="infoTitle">用户组</p>
    <p class="infoTitle">银币</p>
    <p class="infoTitle">金币</p>
    <br />
    <span class="infoData" style="width: 150px;">{{ level[userInfo.level] }}</span>
    <span class="infoData">{{ userInfo.silver }}</span>
    <span class="infoData">{{ userInfo.gold }}</span>
  </div>
  <div class="userInfo">
    <img :src="`https://q1.qlogo.cn/g?b=qq&nk=${userInfo.qq}&s=100`" class="avatar"/>
    <span class="name color">{{ userInfo.username }}</span>
    <br />
    <p class="infoTitle">UID</p>
    <p class="infoTitle">隧道数</p>
    <br />
    <span class="infoData">{{ userInfo.userID }}</span>
    <span class="infoData">{{ `${global.codeData.length}/10` }}</span>
    <var-space style="margin-top: 5px;">
      <var-button type="primary" @click="signIn" :disabled="global.userInfo.signIn">签到</var-button>
      <var-button type="primary" @click="reload">刷新</var-button>
    </var-space>
  </div>
  <div class="notice">
    <h3 style="color: var(--color-text);">公告</h3>
    <div class="SUPER"></div>
    <div class="TOP"></div>
    <div class="NORMAL"></div>
  </div>
</template>

<script setup>
  import { createApp, onMounted } from 'vue'
  import global from '@/global'
  import notice from '@/components/notice.vue'
  import request from '@/request'

  var userInfo = global.userInfo
  const level = {
    'admin': '站长',
    'staff': '管理员',
    'provider': '贡献者',
    'default': '普通用户',
    'banned': '小黑屋'
  }

  function signIn() {
    request.signIn()
  }

  async function reload() {
    await request.getUserInfo()
    await request.getCodeData()
    userInfo = global.userInfo
    location.hash = '#/'
    location.hash = '#/home'
  }

  onMounted(() => {
    document.querySelector('.SUPER').innerHTML = ''
    document.querySelector('.TOP').innerHTML = ''
    document.querySelector('.NORMAL').innerHTML = ''
    global.noticeData.forEach(e => {
      let card = createApp(notice, {title: e.title, text: e.text})
      let div = document.createElement('div')
      div.style.margin = '10px'
      document.querySelector('.'+e.type).appendChild(div)
      card.mount(div)
    })
  })
    
</script>

<style scoped>
  .userInfo {
    padding: 18px;
    border: 5px solid var(--light-color);
    border-radius: 15%;
    width: 450px;
    height: 210px;
    margin: 10px;
    color: var(--white-color);
  }
  .infoTitle {
    display: inline-block;
    width: 150px;
  }
  .infoData {
    width: 150px;
    display: inline-block;
  }
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
  .name {
    position: absolute;
    bottom: 282px;
    margin-left: 10px;
  }
  .notice {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 18px;
    width: 480px;
    height: 470px;
    border: 5px solid var(--light-color);
    border-radius: 5%;
    overflow-y: auto;
  }
</style>