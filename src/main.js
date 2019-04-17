import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

function consoleDesp() {
    const log = console.log;
    console.log = function () {
      log.call(this, ...arguments);
      store.commit('pushLogger', arguments[0])
    };
}

consoleDesp ()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
