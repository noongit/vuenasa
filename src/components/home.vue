<template>
    <div class="mainWrap">
        <h1>CURIOSITY</h1>
        <h2>Story about mars rover</h2>
        <p>
            Wherever you are in the world right now, I'm a very long way away. I'm not even on the same planet as you.
            I'm a Mars rover. Built to explore far-off places - places too far away or dangerous for human to visit.
        </p>
        <p>
            As soon as I was safely on the surface, I sent a message to my NASA team letting them know I had landed.
            Because of the huge distance between Mars and Earth, the message took 15 minutes to get back to Earth.
            It was a tense time in the control room as everyone waited. Then the words everyone wanted to hear where
            read out.<strong>"Touchdown confirmed. We're safe on Mars!"</strong>
        </p>
        <h2>I made it.</h2>
    </div>
</template>

<script>
export default {
    data () {
        return {
            sol: 'Explore'
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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.mainWrap h1 {
    font-size: 40px;
    color: #ff5300;
    margin: 20px 0 0 0;
}

p {
    font-size: 20px;
    min-width: 400px;
    max-width: 1000px;
    line-height: 1.6;
}


</style>
