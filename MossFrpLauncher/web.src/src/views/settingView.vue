<template>
  <div class="boader">
    <h3>账户与安全</h3>
    <span class="account">当前登录账户：{{ global.userInfo.email }}</span>
    <var-button type="primary" style="margin-left: 590px;" @click="exit">退出登录</var-button>
    <span>信息泄露？那就来这里</span>
    <var-button type="primary" @click="show = true" style="margin-left: 760px;margin-top: 5px;">修改用户信息</var-button>
  </div>
  <div class="boader">
    <h3>启动器设置</h3>
    <h2>主题设置</h2>
    <var-space direction="column" size="large">
      <var-button block @click="() => setStyle(0)">Material Design 2 亮色</var-button>
      <var-button block @click="() => setStyle(1)">Material Design 2 暗色</var-button>
      <var-button block @click="() => setStyle(2)">Material Design 3 亮色</var-button>
      <var-button block @click="() => setStyle(3)">Material Design 3 暗色</var-button>
    </var-space>
  </div>
  <var-popup v-model:show="show">
    <div class="popup">
      <var-select v-model="type">
        <var-option label="邮箱"/>
        <var-option label="密码"/>
        <var-option label="用户名"/>
      </var-select>
      <div class="email" v-if="type == '邮箱'">
        <var-input v-model="email" placeholder="新邮箱"/>
        <var-input v-model="code" placeholder="旧邮箱验证码" class="inp"/>
        <var-button type="primary" @click="getCode(0)">{{ djs }}</var-button>
        <var-input v-model="code2" placeholder="新邮箱验证码" class="inp"/>
        <var-button type="primary" @click="getCode(1, false)" :disabled="!email">{{ djs2 }}</var-button>
      </div>
      <div class="password" v-if="type == '密码'">
        <var-input v-model="password" placeholder="新密码" type="password"/>
        <var-input v-model="code3" placeholder="验证码" class="inp"/>
        <var-button type="primary" @click="getCode(2)">{{ djs3 }}</var-button>
      </div>
      <div class="username" v-if="type == '用户名'">
        <var-input v-model="username" placeholder="新用户名"/>
        <var-input v-model="code4" placeholder="验证码" class="inp"/>
        <var-button type="primary" @click="getCode(3)"">{{ djs4 }}</var-button>
      </div>
      <var-button
        type="primary"
        style="width: 80px;margin-left: 120px;"
        :disabled="type == '邮箱' ? !code || !code2 || !email : type == '密码' ? !code3 || !password : !code4 || !username"
        @click="update">
        更新
      </var-button>
    </div>
  </var-popup>
</template>

<script setup>
  import global from '@/global'
  import request from '@/request'
  import { Snackbar, StyleProvider, Themes } from '@varlet/ui'
  import { ref } from 'vue'

  const code = ref()
  const code2 = ref()
  const code3 = ref()
  const code4 = ref()
  const email = ref()
  const username = ref()
  const password = ref()
  const show = ref(false)
  const type = ref('邮箱')
  const djs = ref(global.countdowns[0])
  const djs2 = ref(global.countdowns[1])
  const djs3 = ref(global.countdowns[2])
  const djs4 = ref(global.countdowns[3])
  const djss = [
    djs,
    djs2,
    djs3,
    djs4,
  ]
  const styles = [
    null,
    Themes.dark,
    Themes.md3Light,
    Themes.md3Dark
  ]

  async function getCode(dis, email = true) {
    var dj = djss[dis]
    if (dj.value == '获取') {
      request.verification(email ? global.userInfo.email : email.value, 'infoUpdate')
      dj.value = 60
      global.countdowns[dis] = 60
      var timerd = setInterval(() => {
        dj.value--
        global.countdowns[dis]--
      }, 1000)
      setTimeout(() => {
        dj.value = '获取'
        global.countdowns[dis] = '获取'
        clearInterval(timerd)
      }, 60000)
    } else {
      Snackbar.warning('你想干什么?')
    }
  }

  function update() {
    request.infoUpdate(
      type.value == '邮箱' ? 'email' : type.value == '密码' ? 'password' : 'username',
      type.value == '邮箱' ? email.value : type.value == '密码' ? password.value : username.value,
      type.value == '邮箱' ? code.value : type.value == '密码' ? code3.value : code4.value,
      type.value == '邮箱' ? code2.value : null
    )
    show.value = false
  }
  function setStyle(num) {
    localStorage.setItem('style', num)
    StyleProvider(styles[num])
  }
  function exit() {
    localStorage.clear()
    location.hash = '/#/'
  } 
</script>

<style scoped>
  .boader {
    margin: 10px;
    padding: 10px;
    color: var(--white-color);
    border: 3px solid var(--light-color);
    border-radius: 10px;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .account {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 350px;
    display: inline-block;
  }
  .popup {
    width: 320px;
    height: 280px;
    padding: 10px;
  }
  .inp {
    width: 240px;
    display: inline-block;
  }
</style>