import nasaApp from './components/nasaApp.vue'
import homeApp from './components/home.vue'
import roverApp from './components/rover.vue'
import latestPhotosApp from './components/latestPhotos.vue'
export default [
  {path:'/', component: homeApp},
  {path:'/nasaApp', component: nasaApp},
  {path:'/roverApp', component: roverApp},
  {path:'/latestPhotosApp', component: latestPhotosApp}
]
