<template>
    <header>
        <!-- <img src="../img/backtop.jpg" alt=""> -->
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/roverApp">Advanced search</router-link>
            </li>
            <li>
                <router-link to="/latestPhotosApp">Latest photos</router-link>
            </li>
            <li>
                <router-link to="/nasaApp">Custom search</router-link>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    data () {
        return {
            titles: ['Custom search', 'Home', 'Mars hovers'],
            titlesSlide: 'true'
        }
    }
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom: 1px solid #eee;
}
ul {
    display: flex;
    justify-content: space-between;
    padding: 0px;
    min-width: 400px;
    width: 50%;
    max-width: 840px;
    min-width: 400px;
    margin: 0;

}
ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    font-weight: 400;
    font-size: 20px;
    flex-direction: column;

}

ul li a {
    position:relative;
    text-decoration: none;
    display:flex;
    flex-direction: column;
    align-items: center;
    color: #444;
    padding: 30px 10px 30px 10px;
}

.router-link-exact-active {
    color: #ff5300;
}

</style>
