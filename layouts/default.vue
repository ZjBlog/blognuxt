<template>
  <div>
    <my-header></my-header>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
const MyFooter = () => import('~/components/Footer.vue')
const MyHeader = () => import('~/components/Head.vue')

export default {
  components: {
    MyFooter,
    MyHeader
  }
}
</script>

<style>
</style>
