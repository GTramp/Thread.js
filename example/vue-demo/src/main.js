// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import thread from './thread'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({el: '#app', components: {
    App
  }, template: '<App/>'})

// demo ========
thread.async (() => {
  let j = 0
  for (let i = 0; i < 10; i++) {
    console.log(`async :: ${i}`)
    j++
  }
  return j
}, resp => {
  console.log(resp)
}, error => {
  console.error(error)
})
