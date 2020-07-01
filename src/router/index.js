import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { index: 1 },
    components: {
      default: () => import(/* webpackChunkName: "Home" */ '../views/Home')
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: { index: 13 },
    components: {
      default: () => import(/* webpackChunkName: "login" */ '../components/login')

    }
  },
  {
    path: '/register',
    name: 'register',
    meta: { index: 17 },
    components: {
      default: () => import(/* webpackChunkName: "register" */ '../components/register')
    }
  },
  {
    path: '/file',
    name: 'file',
    meta: { index: 18 },
    components: {
      default: () => import(/* webpackChunkName: "file" */ '../views/file')
    }
  },
  {
    path: '/recordWord',
    name: 'recordWord',
    meta: { index: 14 },
    components: {
      default: () => import(/* webpackChunkName: "record" */ '../components/recordWord')
    }
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { index: 15 },
    components: {
      default: () => import(/* webpackChunkName: "admin" */ '../views/admin')
    }
  },
  {
    path: '/write',
    name: 'write',
    meta: { index: 16 },
    components: {
      default: () => import(/* webpackChunkName: "writer" */ '../components/writer')
    }
  },
  {
    path: '/web',
    name: 'web',
    meta: { index: 2 },
    components: {
      default: () => import(/* webpackChunkName: "program" */ '../views/program')
    }
  },
  {
    path: '/web/:web',
    name: 'webArticle',
    meta: { index: 3 },
    components: {
      default: () => import(/* webpackChunkName: "article" */ '../components/programArticle')
    }
  },
  {
    path: '/todoList',
    name: 'todoList',
    meta: { index: 4 },
    components: {
      default: () => import(/* webpackChunkName: "todoList" */ '../views/todoList')
    }
  },
  {
    path: '/message',
    name: 'message',
    meta: { index: 6 },
    components: {
      default: () => import(/* webpackChunkName: "message" */ '../views/comment')
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   meta: { index: 7 },
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   components: {
  //     default: () => import(/* webpackChunkName: "about" */ '../views/About')
  //   }
  // },
  {
    path: '/space',
    name: 'space',
    meta: { index: 21 },
    // component: () => import(/* webpackChunkName: "space" */ '../views/space.vue')
    components: {
      default: () => import(/* webpackChunkName: "space" */ '../views/space')
    }
  },
  {
    path: '/word',
    name: 'words',
    meta: { index: 8 },
    components: {
      default: () => import(/* webpackChunkName: "word" */ '../views/CET4')
    }
  },
  {
    path: '/word/:word',
    name: 'word',
    meta: { index: 9 },
    components: {
      default: () => import(/* webpackChunkName: "words" */ '../views/word')
    }
  },
  {
    path: '/feed',
    name: 'feed',
    meta: { index: 10 },
    components: {
      default: () => import(/* webpackChunkName: "feed" */ '../components/feed.vue')
    }
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { index: 20 },
    components: {
      default: () => import(/* webpackChunkName: "chat" */ '../views/chat')
    }
  },
  {
    path: '*',
    meta: { index: 11 },
    components: {
      default: () => import(/* webpackChunkName: "404" */ '../views/404')
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
