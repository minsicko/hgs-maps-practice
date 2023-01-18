<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        data: null,
        map: null,
      }
    },
    mounted() {
      kakao.maps.load(this.initMap)
    },
    methods: {
      async getData() {
        try {
          const response = await axios.get('http://192.168.20.138:3000/markers')
          this.data = response.data.positions
        } catch (err) {
          console.error(err)
        }
      },
      initMap() {
        const container = document.getElementById("map");
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 5, //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // var map = new kakao.maps.Map(document.getElementById('map'), 
        // mapOption = {
        //   center: new kakao.maps.LatLng(37.522220423851095, 127.02026035630946),
        //   level: 3
        // });
        this.map = map; 
      }
    },
  }
</script>


<!-- methods: {
  initMap() {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.map = map;
  },
}, -->

<template>
<div>
  <div id="get_data">
    <button v-on:click="getData">GET DATA</button>
  </div>
  <div id="data" v-if="data">
    <ul>
      <p v-for="item in data" :key="item.id">{{ item }}}</p>
    </ul>
  </div>
  <div id="map" style="width:500px;height:400px;"></div>
</div>
</template>

<style scoped>
button {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 15px;
}

#get_data {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5% auto;
}

#data {
  width: 550px;
  display: flex;
  text-align: center;
  margin: 5% auto;
}
</style>