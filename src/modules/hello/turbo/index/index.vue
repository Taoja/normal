<template>
  <div class="app">
    <div class="logo">
      <img src="@a/turbo.png" alt="">
    </div>
    <h3>WELCOME TO YOUR TURBO APP</h3>
    <div v-for="(obj, name) in global" :key="name">
      <h4>{{name}}</h4>
      <ul>
        <li v-for="(value, key) in obj" :key="key"><a :href="value">{{key}}</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      global: Global
    }
  }
}
</script>
<style lang="scss" scoped>
.app{
  font-family: 'PingFang-SC','Avenir', 'Helvetica', 'Arial';
  text-align: center;
  .logo{
    width: 200px;
    margin: 60px auto;
    >img{
      width: 100%;
      display: block;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
