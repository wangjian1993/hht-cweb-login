<template>
  <div class="login-container">
    <canvas id="canvas" ref="canvas" class="canvas"></canvas>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <span class="svg-container">
          <wscn-icon-svg icon-class="jiedianyoujian"/>
        </span>
        <el-input name="mail" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <wscn-icon-svg icon-class="mima"/>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <!--<div class="tips">-->
        <!--admin账号为:admin@hitinga.com-->
      <!--</div>-->
      <!--<div class='tips'>editor账号:editor@hitinga.com </div>-->
    </el-form>
    <div class="city"></div>
    <div class="moon"></div>
  </div>
</template>

<script>
  import Stars from '../../../static/js/Star'
  import Moon from '../../../static/js/Moon'
  import Meteor from '../../../static/js/Meteor'
  import { isEmail } from 'utils/validate'
  // import socialSign from './socialsignin'
  export default {
    components: {},
    name: 'login',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('请输入邮箱！'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位！'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          email: 'admin@hitinga.com',
          password: ''
        },
        loginRules: {
          email: [
            {required: true, trigger: 'blur', validator: validateEmail}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false,
        showDialog: false
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: '/'})
            }).catch(err => {
            //  this.$message.error(err)
              console.log(err)
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {},
    mounted() {
      // let canvas = document.getElementById('canvas')
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')
      let width = window.innerWidth
      let height = window.innerHeight
      // 实例化月亮和星星 流星随机时间生成，所以只初始化数组
      let moon = new Moon(ctx, width, height)
      let stars = new Stars(ctx, width, height, 200)
      let meteors = []
      let count = 0
      canvas.width = width
      canvas.height = height

      const meteorGenerator = () => {
        // x位置偏移，一面经过月亮
        let x = Math.random() * width + 800
        meteors.push(new Meteor(ctx, x, height))
        // 每隔随机时间，生成新流星
        setTimeout(() => {
          meteorGenerator()
        }, Math.random() * 2000)
      }

      const frame = () => {
        count++
        count % 10 === 0 && stars.blink()
        moon.draw()
        stars.draw()

        meteors.forEach((meteor, index, arr) => {
          // 如果流星离开视野之内，销毁流星实例，回收内存
          if (meteor.flow()) {
            meteor.draw()
          } else {
            arr.splice(index, 1)
          }
        })
        requestAnimationFrame(frame)
      }
      meteorGenerator()
      frame()
      window.addEventListener('resize', () => {
       // canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        width = window.innerWidth
        height = window.innerHeight
        moon = new Moon(ctx, width, height)
        stars = new Stars(ctx, width, height, 200)
        canvas.width = width
        canvas.height = height
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .login-container {
    @include relative;
    height: 100vh;
    //    background-color: #2d3a4b;

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }

  #canvas {
    position: fixed;
    z-index: -1;
  }

  .moon {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 100px;
    top: 100px;
    background: url('../../assets/images/moon.png') no-repeat;
    background-size: cover;
  }

  .city {
    width: 100%;
    height: 170px;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    background: url('../../assets/images/city.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
</style>
