<template>
     <div class="demo-block login"  style="background: aquamarine;">
       <div class="main" v-if="!$store.state.authUser">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名" suffix-icon="el-icon-edit" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" >
            <el-input v-model="ruleForm.pwd" placeholder="请输入密码" suffix-icon="el-icon-edit" :maxlength="6" type="password"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:135px;">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-form>
       </div>
       <div class="main" style="text-align:center" v-else>
         <h2>登录成功,欢迎您! {{$store.state.authUser}}</h2>
        <el-button type="success" icon="el-icon-edit" @click="create">写笔记</el-button>
        <el-button type="success" icon="el-icon-delete" @click="logout">退出登录</el-button>
        <el-button type="success" icon="el-icon-search" @click="go">随便看看</el-button>
       </div>
       <canvas id="background"></canvas>
      </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    go () {
      this.$router.push('/')
    },
    create () {
      this.$router.push('/create')
    },
    submitForm (formName) {
      if (!this.ruleForm.name) {
        this.$message({
          type: 'error',
          message: '请输入用户名',
          showClose: true,
          duration: 2000
        })
        return false
      }
      if (!this.ruleForm.pwd) {
        this.$message({
          type: 'error',
          message: '请输入密码',
          showClose: true,
          duration: 2000
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(formName)
        } else {
          this.$message({
            type: 'error',
            message: '账号或密码格式不正确,请重试！',
            showClose: true,
            duration: 2000
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async login (formName) {
      try {
        await this.$store.dispatch('login', {
          username: this.ruleForm.name,
          password: this.ruleForm.pwd
        })
      } catch (e) {
        this.$message({
          type: 'error',
          message: '账号或密码错误,请重试',
          showClose: true,
          duration: 2000
        })
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message,
          showClose: true,
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scoped>
#background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
}
.demo-block {
  transition: all 0.2s ease 0s;
  display: inline-flex;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:center;
  padding-top: 80px;
}
.login {
  width: 100%;
  min-height: 650px;
}
.main {
  width: 40%;
  max-width: 1200px;
}
</style>
