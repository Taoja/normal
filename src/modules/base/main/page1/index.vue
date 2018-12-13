<template>
  <div>
    <div class="abc">{{msg}}</div>
    <div>{{msg2}}</div>
    <img src="@a/fail.png" alt="">
    <test></test>
  </div>
</template>
<script>
import test from '@c/extend/test.vue'
export default {
  data () {
    return {
      msg: Global.host,
      msg2: ENV.mpaas_domainName
    }
  },
  components: {
    test
  },
  mounted() {
    console.log(Global, ENV)
  },
}
</script>

