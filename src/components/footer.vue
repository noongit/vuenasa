<template>
  <footer>
  <div class="arrow">
    <p>&#8595;</p>
  </div>

  </footer>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
footer {
  width: 100%;
  bottom: 0;
  height: 50px;
  position: fixed;
  padding-bottom: 5px;
}
.arrow {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: #e3e3e3;
  border-radius: 50%;
}

.arrow p {
  color: #fff;
  margin: 0;
  padding: 0 0 12px 0;
  font-size: 40px;
}

</style>
