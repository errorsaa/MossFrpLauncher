<template>
  <div class="main">
    <h3 style="color: var(--white-color);text-align: center;">登录</h3>
    <var-input v-model="user" class="inp" placeholder="邮箱/UID"/>
    <var-input v-model="password" type="password" class="inp" placeholder="密码"/>
    <var-button type="primary" outline text @click="to('#/reSetPassword')">忘记密码？</var-button>
    <var-button type="primary" class="btn" @click="main" :disabled="!user || !password">登录</var-button>
    <var-button type="primary" outline text style="margin-left: 50px;" @click="to('#/register')">注册账户</var-button>
  </div>
</template>

<script setup>
  import { sha256 } from 'js-sha256'
  import request from '@/request'
  import { ref } from 'vue'

  const user = ref()
  const password = ref()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  
  if (userInfo) {
    request.login(userInfo.loginType, userInfo.account, userInfo.password, true)
  }
  function to(path) {
    location.hash = path
  }
  function main() {
    var loginType = user.value.indexOf('@') == -1 ? 'userID' : 'email'
    request.login(loginType, user.value, password.value)
    localStorage.setItem('userInfo', JSON.stringify({
      loginType,
      account: user.value,
      password: sha256(password.value)
    }))
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
    height: 230px;
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
  .btn {
    width: 100px;
    margin-left: 50px;
    margin-top: 15px;
  }
  .inp {
    margin-top: 10px;
    width: 350px;
    margin-left: 25px;
  }
</style>