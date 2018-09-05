<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide bg" :style="{background: url1}">笔耕不掇，天道酬勤</div>
        <div class="swiper-slide bg" :style="{background: url2}">十年磨一剑，一朝试锋芒</div>
        <div class="swiper-slide bg" :style="{background: url3}">这世上最快的捷径就是脚踏实地</div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
import configration from '~/static/configuration.json'
export default {
  head () {
    return {
      link: [{rel: 'stylesheet', href: 'https://cdn.bootcss.com/Swiper/4.3.0/css/swiper.min.css'}]
    }
  },
  data () {
    return {
      url1: 'url(' + configration.bannerOne + ') no-repeat center center',
      url2: 'url(' + configration.bannerTwo + ') no-repeat center center',
      url3: 'url(' + configration.bannerThree + ') no-repeat center center',
      swiperOption: {
        loop: true,
        autoplay: true,
        delay: 3000,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
  }
}
</script>


<style lang="less" scoped>
  .swiper {
    height: 500px;
    width: 100%;
  }
  .bg {
    height: 100%;
    background-size: 100%;
  }
  .swiper-slide {
    font-size: 70px;
    color: #fff;
    line-height: 500px;
    text-align: center;
    text-shadow: 5px 5px 14px rgba(0, 0, 0, 0.6);
  }
</style>
