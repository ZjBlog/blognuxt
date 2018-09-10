<template>
    <header class="layout-header">
        <div class="layout-header-nav-wrapper">
            <ul class="layout-header-nav">
                <li  class="layout-header-nav-item" :class="$store.state.index===1 ? 'curr1': ''">
                    <nuxt-link to="/" tag="a" :class="$store.state.index===1 ? 'curr': ''">首&nbsp;&nbsp;页</nuxt-link>
                </li>
                <li  class="layout-header-nav-item" :class="$store.state.index===2 ? 'curr1': ''">
                    <nuxt-link to="/" tag="a" :class="$store.state.index===2 ? 'curr': ''">文章详情</nuxt-link>
                </li>
                <li  class="layout-header-nav-item" :class="$store.state.index===3 ? 'curr1': ''">
                     <nuxt-link to="/create" tag="a" :class="$store.state.index===3 ? 'curr': ''">每天一记</nuxt-link>
                </li>
                <li  class="layout-header-nav-item"><a href="www.baidu.com">友情链接</a></li>
                <li class="layout-header-nav-item-right">
                    <nuxt-link to="/login" tag="a" v-if="!$store.state.authUser">猿码集</nuxt-link>
                    <nuxt-link to="/login" tag="a" v-else>欢迎您, {{$store.state.authUser}}</nuxt-link>
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
export default {
  name: 'headerblog',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key) {
      if (key === 2) {
        if (window.location.href.indexOf('detail') !== -1) {
          console.info('保持当前页面状态')
        } else {
          let vm = this
          this.$message({
            message: '先找篇笔记看看吧.',
            showClose: true,
            type: 'success',
            center: true,
            onClose: function () {
              vm.$router.push('/')
            },
            duration: 2000
          })
        }
      } else if (key === 1) {
        this.$router.push('/')
      } else if (key === 3) {
        if (!this.$store.state.authUser) {
          let vm = this
          this.$message({
            message: '你还没有登录.',
            showClose: true,
            type: 'success',
            center: true,
            onClose: function () {
              vm.$router.push('/login')
            },
            duration: 2000
          })
        } else {
          this.$router.push({path: '/create'})
        }
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
// $(function () {
//     if('/'==window.location.pathname) {
//         $('#h1 a').addClass('curr');
//     }else if ('/pages/intro.html' ==window.location.pathname) {
//          $('#h2 a').addClass('curr');
//     } else if('/pages/rules.html' ==window.location.pathname) {
//         $('#h3 a').addClass('curr');
//     } else if('/pages/registration.html' ==window.location.pathname) {
//         $('#h4 a').addClass('curr');
//     } else if('/pages/contact.html' ==window.location.pathname) {
//         $('#h5 a').addClass('curr');
//     }
// })
</script>
<style scoped>
    .layout-header {
        color: white;
    }
    .layout-header-nav-wrapper {
        background-color: #08c68a;
        width: 100%;
    }

    .layout-header-nav {
        height: 48px;
        margin: 0;
        padding: 0;
        display: block;
        list-style: none;
    }
    .layout-header-nav-item {
        float: left;
        width: 20%;
        height: 48px;
        margin: 0;
        text-align: center;
        line-height: 48px;
        vertical-align: middle;
    }

    .layout-header-nav-item:hover {
        background-color: #ffbb1c;
    }

    .layout-header-nav-item a {
        color: #FFFFFF;
        font-size: 16px;
        display: inline-block;
        width: 96px;
        height: 48px;
        text-decoration: none;
    }

    .layout-header-nav-item a:hover {
        background: url(/images/hover.png) no-repeat;
        width:96px;
        height:54px;
    }
    .curr1 {
        background-color: #ffbb1c;
    }
    .curr {
        background: url(/images/hover.png) no-repeat;
    }
    .layout-header-nav-item a.curr {
        background: url(/images/hover.png) no-repeat;
        width:96px;
        height:54px;
    }

    .layout-header-nav-item-right{
        float:right;
        background: url(/images/right-nav.png) no-repeat;
        width:20%;
        height:48px;
        text-align: left;
    }

    .layout-header-nav-item-right a{
        color: #FFFFFF;
        font-size: 16px;
        display: inline-block;
        line-height: 48px;
        margin-left: 15%;
        height:48px;
        text-decoration: none;
    }
</style>
