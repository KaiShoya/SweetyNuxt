<template>
  <section class="section">
    <div>
      空き状況：
      <span class="tag is-success">あり</span>
      <span class="tag is-danger">なし</span>
      <span class="tag is-warning">不明</span>
    </div>
    <div class="box" v-for="hotel in hotels">
      <card
        :name="hotel.name"
        :address="hotel.address"
        :phone="hotel.phone"
        :availability="hotel.availability"
        :updated_at_availability="hotel.updated_at_availability"
        :credit="hotel.credit_card"
        :website="hotel.website"
      />
    </div>
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
      hotels: []
    }
  },
  created () {
    this.$axios.$get('/api/hotels').then((res) => {
      this.hotels = res
    })
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
