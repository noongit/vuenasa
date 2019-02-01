<template>
  <div>
    <headerApp></headerApp>
    <router-view></router-view>
  </div>
</template>

<script>
import constants from './common/constants'
import header from './components/header.vue'
import nasa from './components/nasaApp.vue'
import footer from './components/footer.vue'
import home from './components/home.vue'
import rover from './components/rover.vue'
import latestPhotos from './components/latestPhotos.vue'

export default {
  components: {
    'headerApp': header,
    'nasaApp': nasa,
    'footerApp': footer,
    'homeApp': home,
    'roverApp': rover,
    'latestPhotosApp': latestPhotos
  },
  data () {
    return {

    }
  }
}
</script>

<style>
html {
    height: 100%;
}
body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}
</style>
