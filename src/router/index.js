import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {index: 1},
    components: {
      default: () => import('../views/Home'),
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {index: 13},
    components: {
      default: () => import('../components/login'),

    }
  },
  {
    path: '/register',
    name: 'register',
    meta: {index: 17},
    components: {
      default: () => import('../components/register'),
    }
  },
  {
    path: '/recordWord',
    name: 'recordWord',
    meta: {index: 14},
    components: {
      default: () => import('../components/recordWord'),
    }
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {index: 15},
    components: {
      default: () => import('../views/admin')
    }
  },
  {
    path: '/write',
    name: 'write',
    meta: {index: 16},
    components: {
      default: () => import('../components/writer')
    }
  },
  {
    path: '/web',
    name: 'web',
    meta: {index: 2},
    components: {
      default: () => import('../views/program'),
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
      default: () => import('../views/todoList'),
    }
  },
  // {
  //   path: '/note',
  //   name: 'note',
  //   meta: {index: 5},
  //   components: {
  //     default: () => import('../views/note'),
  //   }
  // },
  // {
  //   path: '/noteInfo/:noteInfo',
  //   name: 'noteInfo',
  //   meta: {index: 12},
  //   components: {
  //     default: () => import('../views/noteInfo'),
  //   }
  // },
  {
    path: '/message',
    name: 'message',
    meta: {index: 6},
    components: {
      default: () => import('../views/comment'),
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
      default: () => import('../views/CET4'),
    },
  },
  {
    path: '/word/:word',
    name: 'word',
    meta: {index: 9},
    components: {
      default: () => import('../views/word')
    },
  },
  // {
  //   path: '/reading/:read',
  //   name: 'read',
  //   meta: {index: 10},
  //   components: {
  //     default: () => import('../views/essay'),
  //   },
  // },
  {
    path: '/feed',
    name: 'feed',
    meta: {index: 10},
    components: {
      default: () => import('../components/feed.vue'),
    }
  },
  {
    path: '*',
    meta: {index: 11},
    components: {
      default: () => import('../views/404'),
    }
  }
]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
