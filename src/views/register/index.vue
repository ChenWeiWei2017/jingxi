<template>
  <div>
    <header>
      <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        :fixed="true"
        :placeholder="true"
        @click-left="onClickLeft"
      />
    </header>
    <main>
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginData.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="loginData.confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          placeholder="确认密码"
          clearable
          :rules="[{ required: true, message: '请填写确认密码' },{validator: validatePwd, message: '两次密码输入不一致'}]"
        />
        <van-field
          v-model="loginData.sms"
          clearable
          name="sms"
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" native-type="button" type="primary" :disabled="smsBtn.disable" @click="sendSms">{{ smsBtn.text }}</van-button>
          </template>
        </van-field>
        <van-row gutter="10" class="btns">
          <van-col span="12">
            <van-button type="info" native-type="submit" block>注册</van-button>
          </van-col>
          <van-col span="12">
            <van-button type="default" native-type="button" block @click="goLogin">返回登录</van-button>
          </van-col>
        </van-row>
      </van-form>

    </main>
  </div>
</template>

<script>
import { NavBar, Col, Row, Button, Form, Field } from 'vant'
import { register } from '@/api/user'

export default {
  name: 'Register',
  components: {
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  },
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        confirmPassword: '',
        sms: ''
      },
      smsBtn: {
        text: '发送验证码',
        disable: false
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      const loading = this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '注册中...',
        forbidClick: true
      })
      register(values).then(() => {
        loading.message = '注册成功'
        loading.icon = 'success'
        setTimeout(() => {
          loading.clear()
        }, 2000)
      }).catch(() => {
        loading.clear()
      })
    },
    goLogin() {
      this.$router.push({ name: 'login' })
    },
    sendSms() {
      let time = 10
      this.smsBtn.disable = true
      const count = setInterval(() => {
        time--
        if (time > 0) {
          this.smsBtn.text = `${time}s后重新发送`
        } else {
          clearInterval(count)
          this.smsBtn.text = `重新发送验证码`
          this.smsBtn.disable = false
        }
      }, 1000)
    },
    validatePwd(val) {
      return val === this.loginData.password
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    padding-top: 15px;

    .btns {
      padding: 15px 16px;
    }
  }
</style>
