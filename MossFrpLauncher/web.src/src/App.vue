<template>
  <RouterView />
  <var-bottom-navigation v-model:active="active" @change="handleChange" fixed variant class="nav">
    <var-bottom-navigation-item label="首页" icon="home" />
    <var-bottom-navigation-item label="管理隧道" icon="menu" />
    <var-bottom-navigation-item label="日志" icon="xml" />
    <var-bottom-navigation-item label="设置" icon="cog" />
    <Var-bottom-navigation-item label="关于" icon="information" />
  </var-bottom-navigation>
  <var-overlay v-model:show="show" @click="click" :close-on-key-escape="false">
    <var-loading description="我们不生产数据，我们只是数据的搬运工 —— ∞ errors" :loading="show" color="var(--color-success)" class="loading">
    </var-loading>
  </var-overlay>
</template>

<script setup>
  import global from './global'
  import show from './global/show'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { StyleProvider, Themes, Snackbar } from '@varlet/ui'

  const active = ref(0)
  const router = useRouter()
  const navname = {
    '#/home': 0,
    '#/tunnel': 1,
    '#/log': 2,
    '#/setting': 3,
    '#/about': 4
  }
  const navname2 = [
    '#/home',
    '#/tunnel',
    '#/log',
    '#/setting',
    '#/about'
  ]
  const styles = [
    null,
    Themes.dark,
    Themes.md3Light,
    Themes.md3Dark
  ]
  const style = localStorage.getItem('style')
  var nav
  StyleProvider(styles[style == null ? 3 : style])

  onMounted(() => nav = document.querySelector('.nav'))
  router.beforeEach(() => {
    if (['#/home', '#/tunnel', '#/log', '#/setting', '#/about'].indexOf(location.hash) == -1) {
      nav.style.display = 'none'
    } else {
      nav.style.display = 'flex'
      active.value = navname[location.hash]
    }
    if (['#/', '#/register', '#/reSetPassword'].indexOf(location.hash) == -1 && !global.logged) {
      location.hash = '#/'
    }
  })
  function click() {
    Snackbar.error('再点噶给你看（︶^︶）')
    show.value = true
  }
  function handleChange(act) {
    if (location.hash != '#' + navname2[act]) {
      location.hash = (navname2[act])
    }
  }
  /*document.onkeydown = function(e) {
    var evt = window.event || e
    var code = evt.keyCode || evt.which
    if (code > 111 && code < 124) {
      if (evt.preventDefault) {
        evt.preventDefault()
      } else {
        evt.keyCode = 0
        evt.returnValue = false
      }
    }
  }*/
</script>

<style>
  * {
    --white-color: #F9F9F9;
    --light-color: #87CEFA;
  }
  body {
    background-image: url('@/assets/bg.png');
    background-repeat: no-repeat;
  }
  body::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #69696943;
    z-index: -1; 
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
</style>