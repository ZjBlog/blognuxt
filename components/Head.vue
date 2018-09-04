<template>
    <header class="layout-header">
        <div class="layout-header-nav-wrapper">
            <ul class="layout-header-nav">
                <li  class="layout-header-nav-item" :class="$store.state.index===1 ? 'curr1': ''"><a href="javascript:void(0)" :class="$store.state.index===1 ? 'curr': ''" @click="handleSelect(1)">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</a></li>
                <li  class="layout-header-nav-item" :class="$store.state.index===2 ? 'curr1': ''"><a href="javascript:void(0)" :class="$store.state.index===2 ? 'curr': ''" @click="handleSelect(2)">文章详情</a></li>
                <li  class="layout-header-nav-item" :class="$store.state.index===3 ? 'curr1': ''"><a href="javascript:void(0)" :class="$store.state.index===3 ? 'curr': ''" @click="handleSelect(3)">每天一记</a></li>
                <li  class="layout-header-nav-item"><a href="javascript:void(0)" @click="handleSelect(4)">友情链接</a></li>
                <li class="layout-header-nav-item-right"><a href="http://stbei.com">圣陶杯</a></li>
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
