<template>
  <div>
    <div>版本1.0.4</div>
    <img src="@a/fail.png" alt="">
    <test></test>
  </div>
</template>
<script>
import test from '@c/extend/test.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    test
  },
  mounted() {
    throw new Error('123')
  },
}
</script>

