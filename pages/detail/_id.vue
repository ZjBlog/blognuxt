<template>
  <div class="hello"  style="background: #efefef;" id="detail">
    <span style="color:#efefef">99</span>
    <div class="btn-flex"  v-if="$store.state.authUser" style="max-width:1200px;margin:0 auto;">
      <el-button type="info" round @click="edit">编辑</el-button>
      <el-button type="danger" round @click="del" style="margin-right:20px;">删除</el-button>
    </div>
    <div style="min-height:655px;text-align:center;max-width:1200px;margin:0 auto;" id="pp">
      <h1>{{title}}</h1>
      <no-ssr>
      <aplayer  :autoplay='false'
        :music="mp3"/>
     <!-- <vue-editor v-model="html"  :editorToolbar="customToolbar" disabled></vue-editor> -->
     </no-ssr>
     <!-- <comments :pageData="pageData"  :allCount="allCount" @submit="submit" @moreData="moreData" :pageSize="pageSize" :nextPage="nextPage"></comments> -->
    </div>
    <span style="color:#efefef">99</span>
  </div>
</template>
<script>
import {baidutoken} from '~/static/configuration.json'
// import { VueEditor } from 'vue2-editor'
// import '~/assets/js/Bmob-1.6.2.min.js'
// import {uuid} from '~/assets/js/uuid.js'
// const Comments = () => import('vue-comments')
const Aplayer = () => import('vue-aplayer')
// const hash = require('object-hash')
// const ls = require('local-storage')
Aplayer.disableVersionBadge = true
export default {
  name: 'detail',
  data () {
    return {
      customToolbar: [],
      id: '',
      mp3: {
      },
      title: 'No Bug Blog',
      html: 'No Bug Blog',
      desc: '',
      activeIndex2: '1',
      auth: '',
      mp5show: false,
      pageData: [],
      allCount: 0,
      pageSize: 5,
      nextPage: false,
      num: 1,
      allCount1: 0
    }
  },
  components: {
    // Comments,
    Aplayer
  },
  computed: {
  },
  methods: {
    // moreData (val) {
    //   this.num = val
    //   if (this.pageSize * this.num >= this.allCount1) {
    //     this.nextPage = false
    //   }
    //   const query = window.Bmob.Query('Blog')
    //   query.equalTo('blogId', '==', this.id)
    //   query.order('-createdAt')
    //   query.limit(this.pageSize)
    //   query.skip(this.pageSize * (val - 1))
    //   query.find().then(res => {
    //     this.pageData = [...this.pageData, ...res]
    //     console.info(res)
    //   }).catch(err => {
    //     console.info(err)
    //   })
    // },
    submit (val) {
      this.comment(val)
    },
    // initComment (id) {
    //   const query = window.Bmob.Query('Blog')
    //   query.equalTo('blogId', '==', id)
    //   query.count().then(res => {
    //     this.allCount1 = res
    //     if (res > this.pageSize * this.num) {
    //       this.nextPage = true
    //     }
    //   })
    //   const query1 = window.Bmob.Query('Blog')
    //   query1.equalTo('blogId', '==', id)
    //   query1.order('-createdAt')
    //   query1.limit(this.pageSize)
    //   query1.find().then(res => {
    //     this.pageData = res
    //     console.info(res)
    //   }).catch(err => {
    //     console.info(err)
    //   })
    // },
    // comment (val) {
    //   let md5 = ''
    //   let name = ''
    //   if (!ls.get('name')) {
    //     name = this.getName()
    //     ls.set('name', name)
    //   } else {
    //     name = ls.get('name')
    //   }
    //   if (ls.get('md5')) {
    //     md5 = ls.get('md5')
    //   } else {
    //     md5 = hash.MD5(uuid())
    //     ls.set('md5', md5)
    //   }
    //   let obj = {}
    //   obj.name = name
    //   obj.moment = val
    //   let url = `https://www.gravatar.com/avatar/${md5}?s=100&d=monsterid`
    //   obj.avatar = url
    //   const query = window.Bmob.Query('Blog')
    //   query.set('blogId', this.id)
    //   query.set('moment', val)
    //   query.set('avatar', url)
    //   query.set('name', name)
    //   query.save().then(res => {
    //     obj.createdAt = res.createdAt
    //     this.pageData.unshift(obj)
    //     this.$message.success('提交成功')
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    init (id) {
      this.$http.get(`/api/v5/gists/${id}`).then(res => {
        let result = res.data
        let m = {}
        let vm = this
        for (let key in result.files) {
          vm.title = key
          vm.desc = result['description']
          vm.html = result.files[key].content
          break
        }
        m.title = '语音预览'
        m.pic = '../../static/images/logo.png'
        m.artist = '--NBB'
        // m.src = 'http://tsn.baidu.com/text2audio?tex=' + urlencode(urlencode(this.desc)) + '&tok=' + baidutoken + '&cuid=123456789' + '&ctp=1&lan=zh&spd=6'
        this.mp3 = m
        this.mp5show = true
      })
    },
    edit () {
      this.$router.push(`/create/${this.id}.html`)
    },
    del () {
      this.$confirm('由于码云Api问题,暂不支持删除, 是否去官网删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        window.open('https://gitee.com')
        // this.$http.delete(`/v5/gists/${this.id}`).then(res => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!',
        //     onClose: function () {
        //       window.location.href = '/'
        //     }
        //   })
        // }).catch(res => {
        //   console.info(res)
        // })
      }).catch(() => {
        console.info('取消删除')
      })
    },
    getName () {
      let familyNames = ['赵', '钱', '孙', '李', '周',
        '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋',
        '沈', '韩', '杨', '朱', '秦', '尤', '许', '何',
        '吕', '施', '张', '孔', '曹', '严', '华', '金',
        '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏',
        '水', '窦', '章', '云', '苏', '潘', '葛', '奚',
        '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗',
        '凤', '花', '方', '俞', '任', '袁', '柳', '酆',
        '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷',
        '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝',
        '邬', '安', '常', '乐', '于', '时', '傅', '皮',
        '卞', '齐', '康', '伍', '余', '元', '卜', '顾',
        '孟', '平', '黄', '和', '穆', '萧', '尹']
      let givename = ['子璇', '淼', '国栋', '夫子', '瑞堂', '甜', '敏', '尚', '国贤', '贺祥', '晨涛',
        '昊轩', '易轩', '益辰', '益帆', '益冉', '瑾春', '瑾昆', '春齐', '杨', '文昊',
        '东东', '雄霖', '浩晨', '熙涵', '溶溶', '冰枫', '欣欣', '宜豪', '欣慧', '建政',
        '美欣', '淑慧', '文轩', '文杰', '欣源', '忠林', '榕润', '欣汝', '慧嘉', '新建',
        '建林', '亦菲', '林', '冰洁', '佳欣', '涵涵', '禹辰', '淳美', '泽惠', '伟洋',
        '涵越', '润丽', '翔', '淑华', '晶莹', '凌晶', '苒溪', '雨涵', '嘉怡', '佳毅',
        '子辰', '佳琪', '紫轩', '瑞辰', '昕蕊', '萌', '明远', '欣宜', '泽远', '欣怡',
        '佳怡', '佳惠', '晨茜', '晨璐', '运昊', '汝鑫', '淑君', '晶滢', '润莎', '榕汕',
        '佳钰', '佳玉', '晓庆', '一鸣', '语晨', '添池', '添昊', '雨泽', '雅晗', '雅涵',
        '清妍', '诗悦', '嘉乐', '晨涵', '天赫', '玥傲', '佳昊', '天昊', '萌萌', '若萌']
      let i = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random())
      return familyNames[i] + givename[i]
    }
  },
  mounted () {
    if (!this.$route.params.id) {
      this.$message({
        message: '找篇笔记看看吧.',
        showClose: true,
        type: 'success',
        center: true,
        onClose: function () {
          window.location.href = '/'
        },
        duration: 2000
      })
    } else {
      this.id = this.$route.params.id
      console.info(this.id)
    //   this.init(this.id)
    //   this.auth = ls.get('isAuth')
    //   window.Bmob.initialize(configration.bmobid, configration.bmobkey)
    //   this.initComment(this.id)
    }
  },
  asyncData ({params, app, error}) {
    console.info(params)
    return app.$axios.$get('/api/v5/gists/' + params.id).then(result => {
      let vm = {}
      for (let key in result.files) {
        vm.title = key
        vm.desc = result['description']
        vm.html = result.files[key].content
        break
      }
      let m = {}
      m.title = '语音预览'
      m.pic = '/logo.png'
      m.artist = '--NBB'
      m.src = 'http://tsn.baidu.com/text2audio?tex=' + encodeURI(encodeURI(vm.desc)) + '&tok=' + baidutoken + '&cuid=123456789' + '&ctp=1&lan=zh&spd=6'
      return {title: vm.title, html: vm.html, desc: vm.desc, mp3: m}
    }).catch(res => {
      error({ statusCode: 404, message: 'User not found' })
    })
  }
}
</script>
<style>
#detail .ql-toolbar {
  display: none;
}
#pp .aplayer {
  margin: 5px 0px;
}
</style>
<style scoped>
.btn-flex {
  display: flex;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:flex-end;
  align-items: center;
  margin-top: 20px;
}
</style>
