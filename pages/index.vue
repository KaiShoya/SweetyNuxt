<template>
  <section class="section">
    <priceform
      v-bind:dowId.sync="dowId"
      v-bind:startHour.sync="startHour"
      v-bind:startTime.sync="startTime"
      v-bind:utilizationTime.sync="utilizationTime"
      v-bind:isAvailable0.sync="isAvailable[0]"
      v-bind:isAvailable1.sync="isAvailable[1]"
      v-bind:isAvailable2.sync="isAvailable[2]"
      v-bind:cardAccepted.sync="cardAccepted"
      v-bind:areaSelected.sync="areaSelected"
      v-bind:areasList="areasList"
      v-bind:displayedResults.sync="displayedResults"
    />

    <b-tabs v-model="activeTab">
      <b-tab-item :label="area.name" v-for="area in detailAreas" v-bind:key="area.id">
        <div class="box" v-for="price in prices[area.id]">
          <card
            :dow="price.dow"
            :day_of_week="price.day_of_week"
            :availability="price.availability"
            :updated_at_availability="price.updated_at_availability"
            :credit="price.credit"
            :hotel_name="price.hotel_name"
            :utilization_time="price.utilization_time"
            :time_zone_start="price.time_zone_start"
            :time_zone_end="price.time_zone_end"
            :min_price="price.min_price"
            :max_price="price.max_price"
          />
        </div>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import _ from 'lodash'
import priceform from '@/components/PriceForm'
import card from '@/components/PriceCard'

export default {
  components: {
    priceform,
    card
  },
  data () {
    return {
      dowId: 1,
      startHour: '0',
      startTime: '00',
      utilizationTime: '',
      isAvailable: [true, true, false],
      cardAccepted: false,
      day_of_week: [
        { id: 0, name: '全曜日' },
        { id: 1, name: '月' },
        { id: 2, name: '火' },
        { id: 3, name: '水' },
        { id: 4, name: '木' },
        { id: 5, name: '金' },
        { id: 6, name: '土' },
        { id: 7, name: '日' },
        { id: 8, name: '祝日' },
        { id: 9, name: '祝前日' }
      ],
      hotels: [],
      prices: [],
      activeTab: 0,
      areasList: [],
      areaSelected: 1,
      detailAreas: [],
      displayedResults: '30'
    }
  },
  created () {
    const today = new Date()
    let dow = today.getDay()
    // 日曜日の番号を入れ替える 0->7
    if (dow == 0) dow = 7
    this.dowId = dow

    this.$axios.$get('/api/areas').then((res) => {
      this.areasList = res
      this.updateHotels()
    })

  },
  methods: {
    updateHotels: function () {
      this.hotels = []
      this.prices = []
      this.detailAreas = []
      this.getDetailAreas(this.areaSelected).then(async (detailAreas) => {
        this.detailAreas = detailAreas
        this.detailAreas.unshift({ id: 0, area_id: this.areaSelected, name: '全て' })
        for (let detailArea of detailAreas) {
          const hotels = await this.getHotels(detailArea.id)
          this.hotels.push(hotels)
          const prices = await this.getPrices(detailArea.id)
          this.prices.push(prices)
        }
      })
    },
    async updatePrices () {
      for (let detailArea of this.detailAreas) {
        this.$set(this.prices, detailArea.id, [])
        const prices = await this.getPrices(detailArea.id)
        this.$set(this.prices, detailArea.id, prices)
      }
    },
    async getDetailAreas (detailAreaId) {
      return await this.$axios.$get(`/api/area?id=${detailAreaId}`)
    },
    async getHotels (areaId) {
      const data = []
      if (this.cardAccepted)
        data.push('credit')

      const availability = []
      this.isAvailable.forEach((value, i) => {
        if (value)
          availability.push(i)
      })
      data.push(`availability=${JSON.stringify(availability)}`)

      if (areaId == 0) {
        data.push(`area=${this.areaSelected}`)
      } else {
        data.push(`detail_area=${areaId}`)
      }

      return await this.$axios.$get(`/api/hotels?${data.join('&')}`)
    },
    async getPrices (areaId) {
      if (this.hotels[areaId].length <= 0) {
        // hotelsが空だった時の処理
        return []
      }
      const res = await this.$axios.$get(
        `/api/prices?hotels=[${this.hotelIds(areaId)}]&dow=${this.dowId}&startHour=${this.startHour}&startTime=${this.startTime}&utilizationTime=${this.utilizationTime}`
      )
      return _.orderBy(res.map(function (value) {
        const hotel = this.getHotel(areaId, value.hotel_id)
        return {
          dow: value.day_of_week,
          availability: hotel.availability,
          updated_at_availability: hotel.updated_at_availability,
          credit: Boolean(hotel.credit_card),
          hotel_name: hotel.name,
          utilization_time: value.utilization_time,
          time_zone_start: value.time_zone_start.slice(0, -3),
          time_zone_end: value.time_zone_end.slice(0, -3),
          min_price: value.min_price,
          max_price: value.max_price
        }
      }, this), ['min_price'], ['asc'])
    },
    getHotel: function (areaId, id) {
      return this.hotels[areaId].filter((element) => {
        return (element.id == id)
      })[0]
    }
  },
  computed: {
    hotelIds: function () {
      return function (id) {
        return this.hotels[id].map((element) => { return element.id })
      }
    }
  },
  watch: {
    dowId: function () {
      this.updatePrices()
    },
    startHour: function () {
      this.updatePrices()
    },
    startTime: function () {
      this.updatePrices()
    },
    utilizationTime: function () {
      this.updatePrices()
    },
    cardAccepted: function () {
      this.updateHotels()
    },
    isAvailable: function () {
      this.updateHotels()
    }
  }
}
</script>

<style scoped>
.box {
  padding: 1rem;
  margin: 0.5rem !important;
}
</style>
