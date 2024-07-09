import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../components/Home/HomeView.vue'
import Unit1View from '../components/Unit 1/Element2Wide.vue'
import Unit2View from '../components/Unit 2/Element2Wide.vue'
import Unit3View from '../components/Unit 3/Element2Wide.vue'
import Unit4View from '../components/Unit 4/Element2Wide.vue'

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
