import Vue from 'vue'

const init = (App) => {
  new Vue({
    el: '#entry',
    template: '<App />',
    components: {App}
  })
}

export default init
