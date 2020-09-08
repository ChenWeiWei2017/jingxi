<template>
  <div>
    <header>
      <van-nav-bar
        title="登录"
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
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-row gutter="10" class="btns">
          <van-col span="12">
            <van-button type="info" native-type="submit" block>登录</van-button>

          </van-col>
          <van-col span="12">
            <van-button type="default" native-type="button" block @click="goRegister">注册</van-button>
          </van-col>
        </van-row>
      </van-form>

    </main>
  </div>
</template>

<script>
import { NavBar, Col, Row, Button, Form, Field } from 'vant'

export default {
  name: 'Login',
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
        password: ''
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
      const loading = this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      this.$store.dispatch('user/login', values)
        .then(() => {
          this.$router.push({ path: '/' })
          loading.clear()
        }).catch(() => {
          loading.clear()
        })
    },
    goRegister() {
      this.$router.push({ name: 'register' })
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
