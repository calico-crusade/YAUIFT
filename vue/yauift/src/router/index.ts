import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Todos from '../views/Todos.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/todos',
        name: 'Todos',
        component: Todos
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/todos/:id',
        name: 'todo',
        component: () => import('../views/Todo.vue')
    },
    {
        path: '*',
        redirect: '/todos'
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
