<template>
  <div class="hello"  style="background: #efefef;">
      <el-row class="header">
        <el-col :span="6">
          <div>
            <img src="~/static/logo.png" width="100px;" height="100%" style="margin-left:50%"/>
          </div>
        </el-col>
        <el-col :span="16">
          <el-menu
            :default-active="index"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1fa0ff"
            text-color="#fff"
            active-text-color="#FF755C">
            <el-menu-item index="1">首&nbsp;&nbsp;&nbsp;&nbsp;页</el-menu-item>
            <el-menu-item index="2">文章详情</el-menu-item>
            <el-menu-item index="3">每天一记</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">友情链接</a></el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
  </div>
</template>
<script>
export default {
  name: 'headerblog',
  data () {
    return {
    }
  },
  mounted () {
  },
  props: { index: { type: String,
    default: '1' }
  },
  components: {
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '2') {
        if (window.location.href.indexOf('detail') !== -1) {
          console.info('保持当前页面状态')
        } else {
          this.$router.push('/detail')
        }
      } else if (key === '1') {
        this.$router.push('/')
      } else if (key === '3') {
        this.$router.push('/create.html')
      } else {
        this.$router.push('/')
      }
      // router.push({ path: 'register', query: { plan: 'private' }})
      // router.push({ name: 'user', params: { userId }}) // -> /user/123
      // router.push({ path: `/user/${userId}` }) // -> /user/123
      // 这里的 params 不生效
      // router.push({ path: '/user', params: { userId }}) // -> /user
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu--horizontal>.el-menu-item {
  height: 100px;
  line-height:100px;
}
.el-menu-item {
  font-size: 30px;
  font-weight: 400;
}
a{text-decoration:none}
ul{text-align:center;}
.header {
  background-color: #1fa0ff;
  height: 100px;
}
</style>
