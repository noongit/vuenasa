<template>
    <div class="mainWrap">
        <input v-on:keyup="search" type="search" placeholder="Search" ref="inputSearch">
        <div class="mosaic">
            <img v-for="(img, index) in imgs" v-bind:src="imgs[index]"></img>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgs: [],
            error: false
        }
    },
    methods: {
        search : function () {
            this.$http.get('https://images-api.nasa.gov/search?q='+this.$refs.inputSearch.value+'%')
            .then(response => {
                this.imgs = [];
                if (this.errorHandler(response)) {
                    this.imageArrayFill(response);
                }
            });
        },
        imageArrayFill: function(response) {
            let n = 30;
            for (var i = 0; i < n; ++i) {
                let item = response.body.collection.items[i].links[0].href.substr(0,37);
                if ( item == 'https://images-assets.nasa.gov/image/') {
                    this.imgs.push(response.body.collection.items[i].links[0].href);
                } else {
                    n++;
                }
            }
        },
        errorHandler: function (response) {
            if (response.body.collection.items == false){
                this.error = true;
                return false;
            } else {
                return true;
                this.error = false;
            }
        }
    }
}
</script>

<style scoped>
.mainWrap {
    padding-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-width: 400px;
    margin: 0 auto;
}
.mainWrap input{
    width: 20%;
    min-width: 200px;
    height: 40px;
    margin-bottom: 20px;
}
.mainWrap img {
    min-width: 250px;
    max-width: 700px;
    max-height: 400px;
    min-height: 150px;
    margin: 2.5px;
    border: 1px solid #444;
}
.mosaic {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
