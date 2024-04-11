<template>
  <var-button type="primary" text @click="to('#/')">返回</var-button>
  <div class="main">
    <h3 style="color: var(--white-color);text-align: center;">注册</h3>
    <var-input v-model="email" placeholder="邮箱"/>
    <var-input v-model="username" placeholder="用户名"/>
    <var-input v-model="password" placeholder="密码" type="password"/>
    <var-input v-model="code" placeholder="验证码" style="width: 320px;display: inline-block;"/>
    <var-button type="primary" @click="getCode" class="get2" :disabled="!email">{{ text }}</var-button>
    <var-button type="primary" :disabled="!email || !username || !password || !code" @click="main" style="margin-left: 175px;">注册</var-button>
  </div>
</template>

<script setup>
  import { Snackbar } from '@varlet/ui'
  import global from '@/global'
  import request from '@/request'
  import { ref } from 'vue'

  const code = ref()
  const email = ref()
  const username = ref()
  const password = ref()
  const text = ref(global.countdowns[4])

  function main() {
    request.register(email.value, username.value, password.value, code.value)
  }

  async function getCode() {
    if (document.querySelector('.get2').innerText == '获取') {
      request.verification(email.value, 'register')
      text.value = 60
      global.countdowns[4] = 60
      var timerd = setInterval(() => {
        text.value--
        global.countdowns[4]--
      }, 1000)
      setTimeout(() => {
        text.value = '获取'
        global.countdowns[4] = '获取'
        clearInterval(timerd)
      }, 60000)
    } else {
      Snackbar.warning('你想干什么？')
    }
  }

  function to(path) {
    location.hash = path
  }
</script>

<style scoped>
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 400px;
    height: 320px;
    margin: auto;
    z-index: 4;
    border-radius: 5%;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
</style>