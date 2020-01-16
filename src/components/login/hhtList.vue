<template>
  <div>
    <div class="box">
        <h1>hht管理系统</h1>
        <div class="manBox">
          <a style="background-color:#FF7676; box-shadow: 0px 2px 25px #FF7676" href="./f6s-manager/index.html">f6s资源管理系统</a>
          <a style="background-color:#FFC17E; box-shadow: 0px 2px 25px #FFC17E" href="./hht-manager/index.html">j6管理系统</a>
          <a style="background-color:#4CAEFF; box-shadow: 0px 2px 25px #4CAEFF" href="./thht-manager/index.html">hht测试管理系统</a>
          <a style="background-color: rgb(255, 111, 165); box-shadow: 0px 2px 25px rgb(255, 111, 165)" href="./g63-manager/index.html">g63管理系统</a>
          <a style="background-color: rgb(41, 41, 41); box-shadow: 0px 2px 25px rgb(41, 41, 41)" href="./g9s-manager/index.html">g9s管理系统</a>
        </div>
    </div>
    <img src="../../assets/bg.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #7CC1FF;
  }
  .box {
    text-align: center;
    width: 100%;
    height: 40vh;
    padding-top: 20vh;
    background-color: #7CC1FF;
  }
  .manBox {
    display: flex;
    justify-content: space-around;
  }
  h1 {
    font-size: 44px;
    color: #fff;
  }
  .box a {
    text-align: left;
    display: inline-block;
    text-decoration: none;
    background:transparent;
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
