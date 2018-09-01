<template>
  <div class="index-box">
    <div class="banner">
      <div class="swiper-container" style="clean:both">
        <div class="swiper-wrapper">
          <div class="swiper-slide bg1" :style="{background: url1}">这世上最快的捷径就是脚踏实地</div>
          <div class="swiper-slide bg2" :style="{background: url2}">笔耕不掇，天道酬勤</div>
          <div class="swiper-slide bg3" :style="{background: url3}">十年磨一剑，一朝试锋芒</div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>

    <div class="tt">
      <div style="text-align: center;width: 30%;cursor:pointer;" @click="dd">
        <div class="xwcms"></div>
      </div>
      <div style="width: 70%;">
         <no-ssr>
          <aplayer autoplay
          :music="mp3[0]" :list="mp3"/>
         </no-ssr>
      </div>
    </div>
    <div class="kuai-box" v-for="(listItem, index1) in menuList" :class="{bgfff: false}" :key="index1">
      <div class="kuai-main">
        <h3>{{ listItem.text }}</h3>
        <div class="list">
          <div class="item"  v-for="(item, index2) in listItem.items" :class="{nom: (index2 + 1) % 3 === 0}" :key="index2" @click="detail(item.id,index1)">
            <div class="img-box">
              <img :src="item.img" :class="{img: index1 === 0}"/>
              <div class="imgma-box" if="item.imgma">
                <img :src="item.imgma" class="imgma"/>
              </div>
            </div>
            <div :class="{descinfo1: index1 === 0, descinfo: index1 !== 0}">
              <div class="a-box">
                <h6>{{ item.title }}</h6>
                <span class="time" v-if="index1 == 0">{{ item.created_at }}</span>
                <span class="time" v-if="index1 == 1">{{ item.created_at | time }}</span>
                <p :class="{height: index1 === 0}" :title="item.description">{{ item.description }}</p>
                <div class="button" v-if="index1 != 0" style="text-align:center;">
                  <div class="btn">查看详情</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;height: 20px;"></div>
    </div>
    <div class="tt1" style="text-align:center;">
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="allTotal"
      >
    </el-pagination>
    </div>
  </div>
</template>

<script>
import configration from '~/static/configuration.json'
import projects from '~/static/projects.json'
const Aplayer = () => import('vue-aplayer')
Aplayer.disableVersionBadge = true
export default {
  name: 'index',
  data () {
    return {
      allTotal: 0,
      currentPage1: 1,
      mp3: configration.mp3,
      url1: 'url(' + configration.bannerOne + ') no-repeat center center',
      url2: 'url(' + configration.bannerTwo + ') no-repeat center center',
      url3: 'url(' + configration.bannerThree + ') no-repeat center center',
      menuList: [{
        'text': '个人小项目',
        'items': projects.items
      }, {
        'text': '个人随笔',
        'items': []
      }]
    }
  },
  head () {
    return {
      link: [{rel: 'stylesheet', href: 'https://cdn.bootcss.com/Swiper/4.3.0/css/swiper.min.css'}],
      script: [{src: 'https://cdn.bootcss.com/Swiper/4.3.0/js/swiper.min.js'}]
    }
  },
  mounted () {
    this.init1()
    this.init()
    console.info('======================')
    console.info(process.browser)
    if (process.browser) {
      let sw = new window.Swiper('.swiper-container', {
        // loop: true,
        // direction: 'horizontal',
        // speed: 500,
        autoplay: true
        // autoplayDisableOnInteraction: false,
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // paginationType: 'fraction',
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next'
      })
      console.info(sw)
    }
  },
  methods: {
    dd () {
      window.open('https://github.com/zhangjunTracy/blog')
    },
    init () {
      this.$axios.get('/api/v5/gists?page=1&per_page=1000').then((res) => {
        this.allTotal = res.data.length
      })
    },
    init1 () {
      this.$axios.get('/api/v5/gists?page=1&per_page=6').then((res) => {
        let result = res.data
        let blogs = []
        let setArr = this.randomNum()
        for (let i = 0; i < result.length; i++) {
          for (let key in result[i].files) {
            let data = {}
            data['title'] = key
            data['description'] = result[i]['description']
            data['id'] = result[i]['id']
            data['created_at'] = result[i]['created_at']
            data['img'] = 'http://7xnxtj.com1.z0.glb.clouddn.com/' + setArr[i] + '.jpg'
            // data['img'] = 'static/images/' + setArr[i] + '.jpg'
            blogs.push(data)
            break
          }
        }
        this.menuList[1].items = blogs
      })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$axios.get(`/api/v5/gists?page=${val}&per_page=6`).then((res) => {
        let result = res.data
        let blogs = []
        let setArr = this.randomNum()
        for (let i = 0; i < result.length; i++) {
          for (let key in result[i].files) {
            let data = {}
            data['title'] = key
            data['description'] = result[i]['description']
            data['id'] = result[i]['id']
            data['created_at'] = result[i]['created_at']
            data['img'] = 'static/images/' + setArr[i] + '.jpg'
            blogs.push(data)
            break
          }
        }
        this.menuList[1].items = blogs
      })
    },
    detail (id, index) {
      if (index === 0) {
        window.open(id)
      } else {
        this.$router.push(`/detail/${id}.html`)
      }
    },
    randomNum () {
      let set = new Set()
      for (let i = 0; i < 100; i++) {
        let rand = Math.random()
        set.add(1 + Math.floor(rand * 12))
        if (set.size === 6) {
          break
        }
      }
      return Array.from(set)
    }
  },
  components: {
    Aplayer
  }
}
</script>
<style>
.el-pager li {
  background:#efefef !important;
  font-size: 18px !important;
}
.el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
  font-size: 17px !important;
}
.el-pagination button:disabled {
 background:#efefef !important;
}
.el-pagination .btn-next, .el-pagination .btn-prev {
  background-color: #efefef !important;
}
.el-pagination button, .el-pagination span:not([class*=suffix]) {
  font-size: 17px !important;
}
.el-pagination {
  margin-bottom: -32px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .main {
    height: 200px;
    display: flex;
    display: -webkit-flex;
     flex-direction: row;
     flex-wrap:nowrap;
  }
  .xwcms {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    background: no-repeat url("~/static/images/123.png") left top;
    -webkit-background-size: 220px 220px;
    -moz-background-size: 220px 220px;
    background-size: 220px 220px;
    -webkit-border-radius: 110px;
    border-radius: 110px;
    -webkit-transition: -webkit-transform 2s ease-out;
    -moz-transition: -moz-transform 2s ease-out;
    -o-transition: -o-transform 2s ease-out;
    -ms-transition: -ms-transform 2s ease-out;
  }
  .xwcms:hover {
    -webkit-transform: rotateZ(360deg);
    -moz-transform: rotateZ(360deg);
    -o-transform: rotateZ(360deg);
    -ms-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
  }
  .tt {
    margin-top: 20px;
    width: 100%;
    height: 230px;
    display: flex;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap:nowrap;
  }
  .tt1 {
    width: 100%;
    margin-bottom: 50px;
  }
.index-box {
    background: #efefef;
    min-width: 1200px;
    .banner {
      width: 100%;
      min-width: 1200px;
      height: 500px;
      position: relative;
      top: 0;
      .swiper-slide {
        font-size: 70px;
        color: #fff;
        line-height: 500px;
        text-align: center;
        text-shadow: 5px 5px 14px rgba(0, 0, 0, 0.6);
      }
      .bg1 {
        height: 100%;
        background-size: 100%;
      }
      .bg2 {
        height: 100%;
        background-size: 100%;
      }
      .bg3 {
        height: 100%;
        background-size: 100%;
      }
      .swiper-container {
        height: 500px;
      }
    }
  }
.kuai-box {
      width: 100%;
      &.bgfff {
        background: #fff;
      }
      .kuai-main {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        h3 {
          text-align: center;
          padding: 0 0 0 0;
          font-weight: 800;
          font-size: 33px;
          margin: 15px;
        }
        .desc {
          text-align: center;
          font-size: 16px;
        }
        .list {
          width: 100%;
          height: 100%;
          font-size: 0;
          .item {
            width: 30%;
            height: 348px;
            background: #fff;
            margin-top: 20px;
            margin-right: 5%;
            display: inline-block;
            cursor: pointer;
            position: relative;
            &.nom {
              margin-right: 0;
            }

            .shadow {/* 渐变阴影 */
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
              opacity: 0;
              transition: opacity 0.7s;
              z-index: 0;
            }
            &:hover .shadow {
              opacity: 1;
            }
            &:hover .descinfo {
              height: 180px;
              top: 150px;
            }
            &:hover .img {
              height: 0;
            }
            .img-box {
              width: 100%;
              height: 225px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                transition: height 0.5s;
              }
              .imgma-box {
                width: 100%;
                height: 100%;
                position: relative;
                background: #efefef;
                .imgma {
                  height: 200px;
                  width: 200px;
                  display: block;
                  position: absolute;
                  margin: auto;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                }
              }
            }

            .descinfo {
              width: 100%;
              height: 102px;
              top: 225px;
              background: #fff;
              padding-top: 5%;
              overflow: hidden;
              position: absolute;
              transition: all 0.5s;
              .a-box {
                width: 90%;
                height: 88%;
                font-size: 16px;
                margin: 0 5% 4% 5%;
                overflow: hidden;
                h6 {
                  margin: 0;
                  padding: 0;
                  line-height: 20px;
                  font-size: 16px;
                  font-weight: normal;
                  &:hover {
                    color: #f7a327;
                  }
                }
                .time {
                  font-size: 12px;
                  line-height: 30px;
                }
                p {
                  font-size: 13px;
                  color: #888;
                  line-height: 20px;
                  margin: 0;
                  &.height {
                    height: 40px;
                  }
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
                .button {
                  width: 100%;
                  height: 50px;
                  font-size: 0;
                  margin-top: 20px;
                  .btn {
                    width: 40%;
                    height: 26px;
                    display: inline-block;
                    margin: 0 5%;
                    background: #409EFF;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 26px;
                    border-radius: 18px;
                    &:hover {
                      background: #409EFF;
                    }
                  }
                }
              }
            }
            .descinfo1 {
              width: 100%;
              height: 102px;
              top: 225px;
              background: #fff;
              padding-top: 5%;
              overflow: hidden;
              position: absolute;
              transition: all 0.5s;
              .a-box {
                width: 90%;
                height: 88%;
                font-size: 16px;
                margin: 0 5% 4% 5%;
                overflow: hidden;
                h6 {
                  margin: 0;
                  padding: 0;
                  line-height: 20px;
                  font-size: 16px;
                  font-weight: normal;
                  &:hover {
                    color: #f7a327;
                  }
                }
                .time {
                  font-size: 12px;
                  line-height: 30px;
                }
                p {
                  font-size: 13px;
                  color: #888;
                  line-height: 20px;
                  margin: 0;
                  height: 40px;

                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
            }
          }
          .kong {
            width: 5%;
            height: 100px;
            display: inline-block;
          }
        }
      }
    }
</style>
