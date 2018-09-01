<template>
  <div>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
const MyFooter = () => import('~/components/Footer.vue')

export default {
  components: {
    MyFooter
  }
}
</script>
