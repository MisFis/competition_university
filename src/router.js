import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

function castRouteParams(route) {
    return {
        id: Number(route.params.id),
    };
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import(/* webpackChunkName: "main" */ './views/PageMain.vue')
    },
    {
      path: '/question/:id',
      name: 'PageQuestion',
      props: castRouteParams,
      component: () => import(/* webpackChunkName: "main" */ './views/PageQuestion.vue')
    }
  ]
})
