<template>
  <div>
    <div class="box">
      <h1>hht管理系统</h1>
      <div class="manBox">
        <a v-for="(item,i) in devList" :key="i" :style="{ background: item.color }" @click="devTypeClick(item.type)">{{ item.name }}</a>
      </div>
    </div>
    <img src="../../assets/bg.png" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      devList: [
        {
          name: 'f6s资源管理系统',
          type: 1,
          color: '#FF7676'
        },
        {
          name: 'j6管理系统',
          type: 2,
          color: '#FFC17E'
        },
        {
          name: 'hht测试管理系统',
          type: 5,
          color: '#4CAEFF'
        },
        {
          name: 'g63管理系统',
          type: 3,
          color: 'rgb(255, 111, 165)'
        },
        {
          name: 'g9s管理系统',
          type: 4,
          color: 'rgb(41, 41, 41)'
        }
      ]
    }
  },
  methods: {
    devTypeClick(type) {
      localStorage.setItem('type', type)
      window.location.href = './dist/index.html'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #7cc1ff;
}
.box {
  text-align: center;
  width: 100%;
  height: 40vh;
  padding-top: 20vh;
  background-color: #7cc1ff;
}
.manBox {
  display: flex;
  justify-content: space-around;
}
.manBox a{
  border-radius: 5vh;
}
h1 {
  font-size: 44px;
  color: #fff;
}
.box a {
  text-align: left;
  display: inline-block;
  text-decoration: none;
  background: transparent;
  color: #000;
  width: 180px;
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
img {
  position: fixed;
  bottom: 0px;
  right: 0px;
  height: 40vh;
  width: 100%;
}
</style>
