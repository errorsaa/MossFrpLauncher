import axios from 'axios'
import global from '@/global'
import show from '@/global/show'
import { sha256 } from 'js-sha256'
import { Snackbar } from '@varlet/ui'

async function reqApi(reqType, data) {
  data.type = reqType
  show.value = true
  var res = await axios.post('https://https.ghs.wiki:7002/API?void=post', data)
  show.value = false
  if (res.status != 200) {
    Snackbar.error('请求api出错啦〒▽〒')
    return
  } else if (res.data.status == 401) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    Snackbar.info('登录已失效，自动重新登录中')
    login(userInfo.loginType, userInfo.account, userInfo.password, true).then(() => {
      Snackbar.info('重新进行请求')
      data.token = global.token
      reqApi(reqType, data)
    })
  }
  return res.data
}

async function login(loginType, account, password, crypted = false) {
  reqApi('login',{
    loginType,
    account,
    password: crypted ? password : sha256(password),
    encryption: 'true'
  }).then(res => {
    if (res && res.status == 200) {
      global.logged = true
      Snackbar.success('登录成功ψ(｀∇´)ψ')
      global.token = res.token
      getInfo().then(() => location.hash = '#/home')
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function getCodeData() {
  var res = await reqApi('userCode', {
    token: global.token,
    getAsList: 'true'
  })
  if (res) {
    global.codeData = res.codeData
  }
}

async function getNodeData() {
  var res = await reqApi('allNode', {
    token: global.token
  })
  if (res) {
    global.nodeData = res.nodeData
  }
}

async function getUserInfo() {
  var res = await reqApi('userInfo', {
    token: global.token
  })
  if (res) {
    global.userInfo = res.userInfo
  }
}

async function getNotice() {
  var res = await reqApi('notice', {
    token: global.token
  })
  if (res) {
    global.noticeData = res.noticeData
  }
}

async function getInfo() {
  await getCodeData()
  await getNodeData()
  await getUserInfo()
  await getNotice()
  await update()
}

async function createCode(node, date, band) {
  reqApi('createCode', {
    token: global.token,
    node,
    date: date,
    band: band
  }).then(res => {
    if (res.status == '200') {
      Snackbar.success('创建成功ヾ(≧▽≦*)o')
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function removeCode(node, number) {
  reqApi('removeCode', {
    token: global.token,
    node,
    number
  }).then(res => {
    if (res.status == '200') {
      Snackbar.success(`已删除返回：${res.coin}银币`)
      localStorage.removeItem(number)
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function signIn() {
  reqApi('signIn', {
    token: global.token
  }).then(res => {
    Snackbar.success(`今日幸运值：${res.luck}${res.luckMessage}\r\n${res.signInMessage}`)
  })
}

async function verification(email, key) {
  reqApi('verification', {
    email,
    key
  }).then(res => {
    if (res.status == 200) {
      Snackbar.success('验证码已发送')
    }
  })
}

async function infoUpdate(key, value, code, code2 = null) {
  var data = {
    token: global.token,
    key,
    value,
    code
  }
  if (code2 != null) data.code2 = code2
  reqApi('infoUpdate', data).then(res => {
    if (res.status == 200) {
      Snackbar.success('更新成功')
    } else if (res.status == 403) {
      Snackbar.warning(res.message)
    } else {
      Snackbar.warning('验证码错误')
    }
  })
}

async function register(email, username, password, code) {
  reqApi('register', {
    email,
    username,
    password,
    code
  }).then(res => {
    if (res.status == 200) {
      Snackbar.success('注册成功o((>ω< ))o')
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function forgetPassword(email, password, code) {
  reqApi('forgetPassword', {
    email,
    password,
    code
  }).then(res => {
    if (res.status == 200) {
      Snackbar.success('重置成功q(≧▽≦q)')
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function dateCode(node, number, date) {
  reqApi('dateCode', {
    token: global.token,
    node,
    number,
    date
  }).then(res => {
    if (res.status == 200) {
      var type = res.type == 'MIXED' ? '金或银币' : res.type == 'GOLD' ? '金币' : '硬币'
      Snackbar.success(`续期成功,消耗${res.coin}${type}`)
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function bandCode(node, number, band) {
  reqApi('bandCode', {
    token: global.token,
    node,
    number,
    band
  }).then(res => {
    if (res.status == 200) {
      var type = res.type == 'MIXED' ? '金或银币' : res.type == 'GOLD' ? '金币' : '硬币'
      Snackbar.success(`增加成功,消耗${res.coin}${type}`)
    } else {
      Snackbar.warning(res.message)
    }
  })
}

async function update() {
  axios.get('http://up.happy233.click/version.php').then(res => {
    if (res.status == 200 && res.data) {
      if (res.data.version > global.version) {
        window.close()
        aardio.update(global.version, res.data.version)
      }
    }
  })
}

export default {
  login,
  signIn,
  bandCode,
  dateCode,
  register,
  getNotice,
  infoUpdate,
  createCode,
  removeCode,
  getCodeData,
  getNodeData,
  getUserInfo,
  verification,
  forgetPassword
}