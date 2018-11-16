<template>
  <div>
    <div class="abc">{{msg}}</div>
    <div>{{msg2}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: Global.host,
      msg2: ENV.mpaas_domainName
    }
  },
  mounted() {
    console.log(Global, ENV)
  },
}
</script>
<style lang="stylus" scoped>
.abc
  color red
</style>
