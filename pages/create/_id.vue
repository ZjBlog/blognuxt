<template>
  <div  style="background: #efefef;" >
      <span style="color:#efefef">99</span>
    <div style="min-height:655px;text-align:center;max-width:1200px;margin:0 auto;">
      <div>
        <el-row style="margin-top:20px;">
          <el-col :span="12" :offset="6"><el-input placeholder="请输入标题" v-model="title" :maxlength="50" clearable> </el-input></el-col>
        </el-row>
        <el-row style="margin-top:20px;">
         <el-col :span="12" :offset="6"><el-input type="textarea" :rows="5" placeholder="请输入简介" v-model="description" :maxlength="240"> </el-input></el-col>
        </el-row>
        <el-row style="margin-top:20px;">
         <el-col :span="4" :offset="14">
          <el-switch
            v-model="pub"
            active-text="公开"
            inactive-text="私有">
          </el-switch>
         </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
        <no-ssr>
        <vue-editor v-model="content" placeholder="开始写文章吧"></vue-editor>
        </no-ssr>
        </el-row>
        <el-button type="primary" style="margin-top:10px;" @click="save" :disabled="dis">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'create',
  data () {
    return {
      id: '',
      dis: false,
      loading: true,
      show: false,
      auth: false,
      content: '',
      title: '',
      description: '',
      pub: false
    }
  },
  validate ({ store }) {
    if (store.state.authUser) {
      return true
    } else {
      store.dispatch('detail')
      return false
    }
  },
  fetch ({store}) {
    store.commit('indexChange', 3)
  },
  methods: {
    save () {
      this.dis = true
      if (!this.title) {
        this.dis = false
        this.$message({
          message: '请输入标题',
          showClose: true,
          type: 'error',
          center: true
        })
        return false
      }
      if (!this.description) {
        this.dis = false
        this.$message({
          message: '请输入简介',
          showClose: true,
          type: 'error',
          center: true
        })
        return false
      }
      if (!this.content) {
        this.dis = false
        this.$message({
          message: '请输入内容',
          showClose: true,
          type: 'error',
          center: true
        })
        return false
      }
      let files = {[this.title]: {content: this.content}}
      if (this.id) {
        this.$axios.$patch(`https://gitee.com/api/v5/gists/${this.id}`, {'description': this.description, 'files': files, 'public': this.pub}).then(res => {
          this.open2()
        })
      } else {
        this.$axios.$post('https://gitee.com/api/v5/gists', {'description': this.description, 'files': files, 'public': this.pub}).then(res => {
          this.open2()
        })
      }
    },
    open2 () {
      this.$confirm('是否继续写博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.title = ''
        this.content = ''
        this.description = ''
        this.dis = false
        if (this.id) {
          this.$router.push('/create.html')
        }
      }).catch(() => {
        window.location.href = '/'
      })
    }
  },
  async asyncData ({params, app, error}) {
    if (!params.id) {
      return
    }
    try {
      let result = await app.$axios.$get('/api/v5/gists/' + params.id)
      let vm = {}
      vm.pub = result.public
      for (let key in result.files) {
        vm.title = key
        vm.description = result['description']
        vm.content = result.files[key].content
        break
      }
      return {title: vm.title, pub: vm.pub, description: vm.description, content: vm.content}
    } catch (err) {
      error({ statusCode: err.response.status, message: err.response.data.message })
    }
  },
  mounted () {
    this.id = this.$route.params.id
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-block {
  transition: all 0.2s ease 0s;
  display: inline-flex;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:center;
  align-items:center;
  padding-top: 80px;
}
</style>
