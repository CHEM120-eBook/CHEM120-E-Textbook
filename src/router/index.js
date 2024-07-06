import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Unit1View from '../views/Unit1View.vue'
import Unit2View from '../views/Unit2View.vue'
import Unit3View from '../views/Unit3View.vue'
import Unit4View from '../views/Unit4View.vue'

const routes=[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/unit1',
    name: 'unti1',
    component: Unit1View
  },

  {
    path: '/unit2',
    name: 'unit2',
    component: Unit2View
  },

  {
    path: '/unit3',
    name: 'unit3',
    component: Unit3View
  },

  {
    path: '/unit4',
    name: 'unit4',
    component: Unit4View
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
