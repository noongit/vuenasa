<template>
    <div class="mainWrap">
        <h2>Choose rover</h2>
        <ul class="switch">
            <li v-on:click="onRoverClick('curiosity')" v-bind:class="{active: this.rovers.curiosity}">Curiosity</li>
            <li v-on:click="onRoverClick('opportunity')" v-bind:class="{active: this.rovers.opportunity}">Opportunity</li>
            <li v-on:click="onRoverClick('spirit')" v-bind:class="{active: this.rovers.spirit}">Spirit</li>
        </ul>
        <h2>Camera type</h2>
        <ul class="switch">
            <li v-on:click="trueCamera('front')" v-bind:class="{active: this.cameras.front}">Front Hazard Avoidance Camera</li>
            <li v-on:click="trueCamera('rear')" v-bind:class="{active: this.cameras.rear}">Rear Hazard Avoidance Camera</li>
        </ul>
        <div class="solsWrapper" v-if="searchIsVisible">
            <h2>Sols</h2>
            <ul class="sols">
                <li><strong>Current Sol day:</strong>{{this.sols}}<input v-model="sols"></input></li>
            </ul>
            <button v-on:click="onSearchButtonClick()">Search</button>
        </div>
        <img v-for="(img, index) in imgs" v-bind:src="imgs[index]" alt="">
        <h2 v-if="!imgs[0] && searchClicked">No images where found ;с</h2>
    </div>
</template>

<script>

import constants from '../common/constants';

export default {
    data () {
        return {
            rovers: {
                curiosity: false,
                spirit: false,
                opportunity: false
            },
            cameras: {
                rear: false,
                front: false
            },
            imgs: [],
            sols: 0,
            searchClicked: false,
            searchIsVisible: false,
            error: false
        }
    },

    methods: {

        getUrl: function (currentRoverName, currentRoverSols, camera) {
            let api = constants.API_URL,
            key = constants.API_KEY;
            return api + currentRoverName + '/photos?sol='+ currentRoverSols +'&camera='+camera+'haz&api_key=' + key;
        },

        onSearchButtonClick: function () {
            let rover = this.getSelectedRoverName(),
            sols = this.sols,
            camera = this.getSelectedCameraLetter();
            this.executeSearchingByParams(rover, sols, camera);
        },

        executeSearchingByParams: function (currentRoverName, currentRoverSols, camera) {
            this.$http.get(this.getUrl(currentRoverName, currentRoverSols, camera))
            .then(response => {
                this.imgs = [];
                this.imageArrayFill(response);
                this.searchClicked = true;
            });
        },

        imageArrayFill: function (response) {
            var n = 30;
            for (var i = 0; i < n; ++i) {
                if (this.errorHandler(response, i)){
                    this.imgs.push(response.body.photos[i].img_src);
                }
            }
        },

        errorHandler: function (response, i) {
            if (response.body.photos[i] == undefined){
                this.error = true;
                return false;
            } else {
                return true;
                this.error = false;
            }
        },

        trueCamera: function (cameraName) {
            for (let name in this.cameras) {
                if (name == cameraName) {
                    this.cameras[name] = true;
                } else {
                    this.cameras[name] = false;
                }
            }
            this.checkSearchShowing();
        },

        onRoverClick: function (roverName) {
            this.trueRover(roverName);
            this.checkSearchShowing();
        },

        checkSearchShowing: function() {
            let rover = this.getSelectedRoverName(),
            camera = this.getSelectedCameraLetter();
            if (rover && camera) {
                this.searchIsVisible = true;
                this.getLatestSol();
            }
        },

        trueRover: function (roverName) {
            for (let name in this.rovers) {
                if (name == roverName) {
                    this.rovers[name] = true;
                } else {
                    this.rovers[name] = false;
                }
            }
        },

        getSelectedRoverName: function() {
            for (let name in this.rovers) {
                if (this.rovers[name] == true) {
                    return name;
                }
            }
        },

        getSelectedCameraLetter: function () {
            for (let name in this.cameras) {
                if (this.cameras[name] == true) {
                    return name.charAt(0);
                }
            }
        },

        getLatestSol: function () {
            let rover = this.getSelectedRoverName(),
            sol = 100,
            camera = this.getSelectedCameraLetter();
            this.$http.get(this.getUrl(rover, sol, camera))
            .then(function(response) {
                this.sols = ''+response.body.photos[0].rover.max_sol;
            });
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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

h2 {
    font-size: 25px;
    font-weight: 400;
    margin: 0 0 20px 0;
}

.switch {
    display: flex;
    justify-content: space-around;
    list-style: none;
    min-width: 400px;
    width: 50%;
    max-width: 840px;
    padding: 0;
}

.switch li {
    padding: 8px;
    border:1px solid #fff;
    cursor: pointer;
    background: #eee;
    font-size: 20px;
}

button {
    background: #fff;
    border: 2px solid #ffc6aa;
    padding: 8px 13px 8px 13px;
    outline: inherit;
    margin-bottom: 10px;
}

.sols {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    list-style: none;
    min-width: 400px;
    width: 50%;
    max-width: 840px;
    padding: 0;
    align-items: center;
}

.sols li {
    margin-bottom: 3px;
    width: 400px;
    display: flex;
    justify-content: space-between;
}

.sols input {
    width: 35px;
}

.active {
    background: #ffc6aa !important;
    z-index: +1;
}

button:active {
    background: #ffc6aa;

}

strong {
    font-weight: 500;
}

img {
    max-width: 100%;
    min-width: 400px;
}

.solsWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>
