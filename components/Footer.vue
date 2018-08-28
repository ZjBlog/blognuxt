<template>
    <div class="footer">
        <div  id='web' :data-clipboard-text="path"></div>
        <div class="bo">
        <a style="color:white"  href="javascript:void(0)" @click="sendmail" id='copy' data-clipboard-text="zhangjun521ly@gmail.com">
        <i class="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
        <a href="https://github.com/zhangjunTracy"  target="_blank" style="color:white">
        <i class="fa fa-github fa-2x" aria-hidden="true"></i></a>
        <a href="https://stackoverflow.com//users/6622851/mr-zhang"  target="_blank" style="color:white">
        <i class="fa fa-stack-overflow fa-2x" aria-hidden="true"></i></a>
        </div>
        <canvas id="c"></canvas>
    </div>
</template>
<script>
import {aa} from '~/assets/js/common.js'
import Clipboard from 'clipboard'
export default {
  name: 'footerblog',
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    aa()
    this.path = window.location.href
  },
  methods: {
    sendmail () {
      let clipboard = new Clipboard('#copy')
      clipboard.on('success', e => {
        clipboard.destroy()
        this.$message({
          showClose: true,
          type: 'success',
          message: '邮箱复制成功,欢迎发邮件给我!!!',
          duration: 3000
        })
      })
      clipboard.on('error', e => {
        clipboard.destroy()
        this.$message({
          showClose: true,
          type: 'success',
          message: '欢迎发邮件给我 :  zhangjun521ly@gmail.com ',
          duration: 3000
        })
      })
    }
  }
}
</script>
<style  lang="less" scoped>
canvas{
  position: absolute;
  cursor: crosshair;
  width:100%;
  height:100px;
  }
.footer {
    position: relative;
    background-size: 150%;
    width: 100%;
    height: 100px;
    .bo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
    line-height: 100px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    }
}
</style>
