<template>
  <section class="section">
    <h1 class="title is-1">{{ hotel.name }}</h1>
    <b-field label="住所" horizontal>{{ hotel.address }}</b-field>
    <b-field label="電話番号" horizontal>{{ hotel.phone }}</b-field>
    <b-field label="クレジットカード" horizontal>{{ Boolean(hotel.credit_card) ? "利用可" : "利用不可" }}</b-field>
    <b-field v-if="hotel.website != null" label="WEBサイト" horizontal>{{ hotel.website }}</b-field>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">地図</label>
      </div>
      <div id="map" class="field-body"></div>
    </div>
  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      hotel: {}
    }
  },
  mounted () {
    this.$axios.$get(`/api/hotels/${this.$route.params.id}`).then((res) => {
      this.hotel = res[0]
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2hveWE3NyIsImEiOiJjazZnMGM1aWQwdzBoM2ttdjd5aHhndTNmIn0.fW_ZTpSosGVFH01swyXocw'
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [Number(this.hotel.lon), Number(this.hotel.lat)],
        zoom: 15
      })

      new mapboxgl.Marker().setLngLat([Number(this.hotel.lon), Number(this.hotel.lat)]).addTo(map);
    })
  }
}
</script>

<style scoped>
#map {
  height: 500px;
}
</style>
