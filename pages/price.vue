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
    />

    <div class="box" v-for="price in orderedPrices">
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
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import priceform from '@/components/PriceForm'
import card from '@/components/PriceCard'

export default {
  components: {
    priceform,
    card
  },
  data () {
    return {
      dowId: 0,
      startHour: '0',
      startTime: '00',
      utilizationTime: null,
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
      prices: []
    }
  },
  created () {
    moment.locale('ja')
    this.getHotels()
  },
  methods: {
    getHotels: function () {
      const url = this.cardAccepted ? '/api/hotels?credit' : '/api/hotels'
      this.$axios.$get(url).then((res) => {
        this.hotels = res
        this.getPrices()
      })
    },
    getPrices: function () {
      this.$axios.$get(`/api/prices?hotels=[${this.hotelIds}]`).then((res) => {
        this.prices = []
        res.forEach((value, i) => {
          const hotel = this.getHotel(value.hotel_id)
          this.prices.push({
            dow: value.day_of_week,
            availability: hotel.availability,
            updated_at_availability: (hotel.updated_at_availability == null) ? null : moment(new Date(hotel.updated_at_availability)).fromNow(),
            credit: Boolean(hotel.credit_card),
            hotel_name: hotel.name,
            utilization_time: value.utilization_time,
            time_zone_start: value.time_zone_start.slice(0, -3),
            time_zone_end: value.time_zone_end.slice(0, -3),
            min_price: value.min_price,
            max_price: value.max_price
          })
        })
      })
    },
    getHotel: function (id) {
      return this.hotels.filter((element) => {
        return (element.id == id)
      })[0]
    }
  },
  computed: {
    orderedPrices: function () {
      return _.orderBy(this.prices, ['min_price'], ['asc'])
    },
    hotelIds: function () {
      return this.hotels.map((element) => { return element.id })
    }
  },
  watch: {
    cardAccepted: function (val) {
      this.getHotels(val)
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
