<template>
    <div class="mainWrap">
        <h2>Choose rover</h2>
        <ul class="switch">
            <li v-on:click="onRoverClick('curiosity')" v-bind:class="{active: this.rovers.curiosity}">Curiosity</li>
            <li v-on:click="onRoverClick('opportunity')" v-bind:class="{active: this.rovers.opportunity}">Opportunity</li>
            <li v-on:click="onRoverClick('spirit')" v-bind:class="{active: this.rovers.spirit}">Spirit</li>
        </ul>
        <div class="mainContent">
            <div class="imageBoxes" v-for="(img, index) in imgs">
                <img v-bind:src="imgs[index]"></img>
                <h2 v-if="notFound">No images where found ;с</h2>
                <div class="cameraType">
                    <span class="fas fa-camera"></span>
                    <p v-bind:class="camerasShortName[index]" v-on:click="executeSearchingByParams(camerasShortName[index])">{{camerasFullName[index]}}</p>
                </div>
            </div>
        </div>
        <h2 v-if="!imgs[0] && notFound">No images where found ;с</h2>
        <div v-if="loader" class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <div v-on:click="more()" class="showMore" v-if="imgs[0]">
            <p>Search more</p>
        </div>
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
            camerasFullName:[],
            camerasShortName:[],
            imgs: [],
            sols: 100,
            notFound: false,
            searchIsVisible: false,
            shownImgs: 6,
            currentCamType: '',
            error: false,
            loader: false
        }
    },

    methods: {

        executeSearchingByParams: function (camera) {
            this.$http.get(this.getUrl(camera))
            .then(function(response) {
                this.arraysDataClean();
                this.arraysDataFill(response);
            })
        },

        arraysDataClean: function() {
            this.imgs = [];
            this.camerasFullName = [];
            this.camerasShortName = [];
        },

        arraysDataFill: function(response) {
            let n = this.shownImgs;
            for (var i = 0; i < n; ++i) {
                if (this.errorHandler(response, i)) {
                    this.camerasFullName.push(response.body.photos[i].camera.full_name);
                    this.camerasShortName.push(response.body.photos[i].camera.name.toLowerCase());
                    this.imgs.push(response.body.photos[i].img_src);
                }
            }
            this.loader = false;
        },

        errorHandler: function (response, i) {
            if (response.body.photos[i] == undefined){
                this.error = true;
                return false;
                this.notFound = false;
            } else {
                return true;
                this.error = false;
                this.notFound = true;
            }
        },

        onRoverClick: function (currentRoverName) {
            this.loader = true;
            this.trueRover(currentRoverName);
            this.getLatestSol();
        },

        trueRover: function (currentRoverName) {
            for (let name in this.rovers) {
                if (name == currentRoverName) {
                    this.rovers[name] = true;
                } else {
                    this.rovers[name] = false;
                }
            }
        },

        getUrl: function (camera) {
            let api = constants.API_URL,
            key = constants.API_KEY,
            camType = this.cameraType(camera),
            currentRoverName = this.getSelectedRoverName();
            this.currentCamType = camera;
            return api + currentRoverName + '/photos?sol=' + this.sols + '&' + camType +'api_key=' + key;
        },

        cameraType: function (camera) {
            if (camera !== undefined) {
                return '&camera=' + camera + '&';
            } else {
                return '';
            }
        },

        more: function () {
            this.loader = true;
            this.sols = this.sols - 1;
            this.addPreviousImgs(this.currentCamType);
        },

        addPreviousImgs: function (camera) {
            this.$http.get(this.getUrl(camera))
            .then(function(response) {
                this.arraysDataFill(response);
            });
        },

        getSelectedRoverName: function() {
            for (let name in this.rovers) {
                if (this.rovers[name] == true) {
                    return name;
                }
            }
        },

        getLatestSol: function () {
            this.sols = 100;
            this.$http.get(this.getUrl())
            .then(function(response) {
                this.sols = ''+response.body.photos[0].rover.max_sol;
                this.executeSearchingByParams();
                this.loader = false;
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


.active {
    background: #ffc6aa !important;
}

strong {
    font-weight: 500;
}

.mainContent {
    min-width: 400px;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px 5px
}
.imageBoxes {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #444;
}

.imageBoxes img {
    max-width: 100%;
}

.cameraType {
    min-width: 100px;
    border-top: 1px solid #444;
    display: flex;
    font-size: 3em;
    height: 50px;
    width: 1fr;
    padding: 0 0 2px 5px;
}

.cameraType p {
    margin: 12px 0 0 5px;
    font-size: 1.5vw;
    cursor: pointer;
    width:
}

.cameraType p:hover {
    text-decoration: underline;
}

.showMore {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 60px;
    background: #fff;
    border: 2px solid #444;
    margin: 5px 0 2px 0;
    cursor: pointer;
}
.showMore p {
    font-size: 25px;
}

.showMore:hover {
    background: #ffc6aa;
}

.lds-ring {
  display: inline-block;
  position: fixed;
  width: 64px;
  height: 64px;
  margin: 300px 0 0 0;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 150px;
  height: 150px;
  margin: 6px;
  border: 6px solid #e3e3e3;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e3e3e3 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fas .fa-camera {
    min-width: 10px;
}
</style>
