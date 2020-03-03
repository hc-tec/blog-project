import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home'
import notFound from '../components/notFound'
import word from '../views/word'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: home,
    }
  },
  {
    path: '/web',
    name: 'web',
    components: {
      
    }
  },
  {
    path: '/algorithm',
    name: 'algorithm',
    components: {
      
    }
  },
  {
    path: '/note',
    name: 'note',
    components: {
      
    }
  },
  {
    path: '/test',
    name: 'test',
    components: {
      
    }
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    components: {

    }
  },
  {
    path: '/word',
    name: 'words',
    components: {
      default: notFound
    },
  },
  {
    path: '/word/:word',
    name: 'word',
    components: {
      default: word
    },
  },
  // {
  //   path: '*',
  //   components: {
  //     default: notFound,
  //   }
  // }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
