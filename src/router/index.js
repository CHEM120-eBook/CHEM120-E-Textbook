import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../components/Home + Credit/HomeView.vue'
import Unit1View from '../components/Unit 1/Element2Wide.vue'
import Unit2View from '../components/Unit 2/Element2Wide.vue'
import Unit3View from '../components/Unit 3/Element2Wide.vue'
import Unit4View from '../components/Unit 4/Element2Wide.vue'
import Unit5View from '../components/Unit 5/Element2Wide.vue'
import Credit from '../components/Home + Credit/credits.vue'

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
    component: Unit4View,
    props: true
  },

  {
    path: '/unit5',
    name: 'unit5',
    component: Unit5View,
    props: true
  },

  {
    path: '/credit',
    name: 'credit',
    component: Credit
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
