<template>
  <section class="container">
    <img src="~/assets/img/logo.png" alt="Nuxt.js Logo" class="logo"  style="width:200px;margin-top:20px;"/>
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <nuxt-link class="button" to="/">
      Homepage
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.container{
  text-align: center;
  min-height: 650px;
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
