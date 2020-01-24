<template>
  <section class="section">
    <div>
      <button
        v-for="area in areasList"
        v-bind:class="[areaSelected == area.id ? 'is-primary' : '', 'button']"
        v-on:click="changeArea(area.id)"
      >{{ area.name }}</button>
    </div>
    <div>
      空き状況：
      <span class="tag is-success">あり</span>
      <span class="tag is-danger">なし</span>
      <span class="tag is-warning">不明</span>
    </div>
    <b-tabs v-model="activeTab">
      <b-tab-item :label="area.name" v-for="area in detailAreas" v-bind:key="area.id">
        <div class="box" v-for="hotel in hotels[area.id]">
          <card
            :name="hotel.name"
            :address="hotel.address"
            :phone="hotel.phone"
            :availability="hotel.availability"
            :updated_at_availability="hotel.updated_at_availability"
            :credit="Boolean(hotel.credit_card)"
            :website="hotel.website"
          />
        </div>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import card from '@/components/HotelCard'

export default {
  components: {
    card
  },
  data () {
    return {
      activeTab: 0,
      areasList: [],
      areaSelected: 1,
      detailAreas: [],
      hotels: []
    }
  },
  created () {
    this.$axios.$get('/api/areas').then((res) => {
      this.areasList = res
      this.updateDatas()
    })
  },
  methods: {
    updateDatas: function () {
      this.hotels = []
      this.detailAreas = []
      this.getDetailAreas(this.areaSelected).then((detailAreas) => {
        this.detailAreas = detailAreas
        this.detailAreas.unshift({ id: 0, area_id: this.areaSelected, name: '全て' })
        detailAreas.forEach((value, i) => {
          this.getHotels(value.id).then((hotels) => {
            this.hotels.push(hotels)
          })
        })
      })
    },
    async getDetailAreas (detailAreaId) {
      return await this.$axios.$get(`/api/area?id=${detailAreaId}`)
    },
    async getHotels (areaId) {
      const url = areaId == 0 ? `/api/hotels?area=${this.areaSelected}` : `/api/hotels?detail_area=${areaId}`
      return await this.$axios.$get(url)
    },
    changeArea: function (areaId) {
      this.areaSelected = areaId
      this.updateDatas()
    }
  }
}
</script>

<style scoped>
.box {
  padding: 1rem;
  margin: 0.5rem !important;
  /* margin-bottom: 0.5rem !important; */
}
</style>
