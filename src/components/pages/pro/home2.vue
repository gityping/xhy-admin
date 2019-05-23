<template>
   <div class="maindiv">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
    </vue-particles>
    <div class="contentdiv">
      sss
    </div>
  </div>
</template>
<script>
import starrySky from '../../widgts/starrySky'
export default {
  components: {
    starrySky
  },
  data () {
    return {
      datas: ''
    }
  },
  mounted () {
    this.datas = 'oo'
  }
}
</script>
<style>
 .maindiv {
   width: 100%;
   height: 100%;
 }
 .contentdiv {
    position:absolute;
    left:1px;
    top:60px;
    backgroun:#00000000;
    width:100%;
    height:100%;
 }
</style>
