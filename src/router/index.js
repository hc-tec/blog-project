import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home'
import notFound from '../views/404'
import word from '../views/word'
import english from '../views/CET4'
import essay from '../views/essay'
import program from '../views/program'
import todoList from '../views/todoList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {index: 1},
    components: {
      default: home,
    }
  },
  {
    path: '/web',
    name: 'web',
    meta: {index: 2},
    components: {
      default: program,
    }
  },
  {
    path: '/web/:web',
    name: 'webArticle',
    meta: {index: 3},
    components: {
      default: () => import('../components/programArticle')
    }
  },
  {
    path: '/todoList',
    name: 'todoList',
    meta: {index: 4},
    components: {
      default: todoList,
    }
  },
  {
    path: '/note',
    name: 'note',
    meta: {index: 5},
    components: {

    }
  },
  {
    path: '/test',
    name: 'test',
    meta: {index: 6},
    components: {

    }
  },
  {
    path: '/about',
    name: 'about',
    meta: {index: 7},
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    components: {
      default: () => import('../views/About')
    }
  },
  {
    path: '/word',
    name: 'words',
    meta: {index: 8},
    components: {
      default: english
    },
  },
  {
    path: '/word/:word',
    name: 'word',
    meta: {index: 9},
    components: {
      default: word
    },
  },
  {
    path: '/reading/:read',
    name: 'read',
    meta: {index: 10},
    components: {
      default: essay,
    },
  },
  {
    path: '*',
    meta: {index: 11},
    components: {
      default: notFound,
    }
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
