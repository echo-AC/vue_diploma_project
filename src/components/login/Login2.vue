<template>
  <div>
    <div class="all">
      <!-- <div class="cover"></div> -->

      <div class="info">
        <h1 class="glowIn" style="color: rgb(3, 233, 244)">Hello World</h1>
        <p class="glowIn">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
          pellentesque id nibh tortor. Suspendisse ultrices gravida dictum fusce
          ut placerat orci nulla. A lacus vestibulum sed arcu.
        </p>
      </div>

      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input
              v-model="loginForm.phoneNumber"
              type="text"
              name=""
              required=""
            />
            <label>phone</label>
          </div>
          <div class="user-box">
            <input
              v-model="loginForm.password"
              type="password"
              name=""
              required=""
            />
            <label>Password</label>
          </div>
          <a href="#" @click="login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            sign in
          </a>

          <a href="#" @click="dialogFormVisible = true">
            <!-- <span></span>
            <span></span>
            <span></span>
            <span></span> -->
            sign up
          </a>
        </form>
      </div>
    </div>

    <video autoplay muted>
      <source src="../../../public/video/未命名的设计.mp4" type="video/mp4" />
    </video>

    <!-- 注册的弹框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form
        :model="registerinfo"
        label-position="left"
        label-width="100px"
        style="color: black"
        ref="logonFormRef"
      >
        <el-form-item prop="name" label="用户名">
          <el-input
            v-model="registerinfo.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            v-model="registerinfo.phoneNumber"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="密码">
          <el-input
            v-model="registerinfo.password2"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password1" label="确认密码">
          <el-input
            v-model="registerinfo.password1"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-input
            v-model="registerinfo.role"
            placeholder="普通用户:1 管理员:2"
          ></el-input>
        </el-form-item>
        <el-form-item prop="cityid" label="城市id">
          <el-input
            v-model="registerinfo.city"
            placeholder="请输入城市id"
          ></el-input>
        </el-form-item>
        <el-form-item prop="reason" label="申请理由">
          <el-input
            v-model="registerinfo.resolution"
            placeholder="请输入申请理由"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="logon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var glowInTexts = document.querySelectorAll(".glowIn");
    glowInTexts.forEach((glowInText) => {
      let letters = glowInText.textContent.split("");
      glowInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        glowInText.append(span);
      });
    });
    return {
      /* 注册弹框 */
      dialogFormVisible: false,
      isLogin: false,
      //注册信息
      registerinfo: {
        userName: "123",
        phoneNumber: "18980530000",
        password2: "245631212",
        password1: "245631212",
        role: 1,
        city: 1,
        resolution: "测试",
      },
      //这是登录的数据
      loginForm: {
        phoneNumber: "17365575658",
        password: "ppp",
      },
    };
  },
  methods: {
    /* 将登录成功之后的token,保存到客户端的sessionstorage中*/
    async login() {
      if (this.loginForm.phoneNumber.length != 11)
        this.$message.error("请输入正确的手机号");

      let res = await this.$request("post", "/user/login", this.loginForm, 1);
      console.log(res);
      //将token保存到sessionStorage
      window.sessionStorage.setItem("token", res.data.data);

      this.$router.push("/home");
      this.$message.success("登录成功");
      this.$store.commit("changeLogin", true);
      window.sessionStorage.setItem("login", true);

      // this.$axios({
      //   method: "post",
      //   baseURL: "/api2",
      //   url: "/user/login",
      //   data: {
      //     phoneNumber: "17365575658",
      //     password: "ppp",
      //   },
      //    headers:{
      //       'Content-Type': 'application/json'
      // }
      // }).then((value) => {
      //   console.log(value);
      // });
    },
    //清空按钮
    resetLoginForm() {
      this.loginForm = {};
    },
    async logon() {
      // //先不进行进行表单验证
      if (this.registerinfo.phoneNumber.length != 11) {
        this.$message.error("请输入正确的手机号");
        return;
      }

      if (this.registerinfo.password2 != this.registerinfo.password1) {
        this.$message.error("密码不一致!");
        return;
      }

      // 这里要发送登录的请求
      let res = await this.$request(
        "post",
        "/user/logon",
        this.registerinfo,
        1
      );
      console.log(res);

      this.dialogFormVisible = false;
      this.loginForm = {};
      this.$message.success("请重新登录");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

p {
  margin: 0em 5em 4em 5em;
}

h1,
p {
  text-align: left;
  line-height: 1.8;
  font-family: Lora, serif;
}

.glowIn {
  color: white;

  span {
    animation: glow-in 0.8s both;
  }
}

@keyframes glow-in {
  from {
    opacity: 0;
  }
  65% {
    opacity: 1;
    text-shadow: 0 0 25px white;
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 0.7;
  }
}

.info {
  width: 650px;
  position: absolute;
  left: 100px;
  top: 23%;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 75%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}

video {
  position: fixed;
  right: -200px;
  bottom: 0px;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  /*加滤镜*/
  // filter: blur(15px); //背景模糊设置
  // -webkit-filter: grayscale(100%);
  // filter:grayscale(100%); //背景灰度设置
  z-index: -11;
  object-fit: fill;
}
source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>