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
        :credit="hotel.credit"
        :website="hotel.website"
      />
    </div>
  </section>
</template>

<script>
import card from '@/components/HotelCard'
import hotels from '@/assets/hotels.json'
// import prices from '@/assets/prices.json'

export default {
  components: {
    card
  },
  data () {
    return {
      hotels: hotels
    }
  },
  created () {
    // console.log(this.hotels)
    // this.$axios.$get('/api?type=hotel').then((res: any) => {
    //   console.log(res.data)
    //   // res.data.forEach((value, i) => {
    //   //   this.hotels.push({
    //   //     id: value['id'],
    //   //     name: value['name'],
    //   //     address: value['address'],
    //   //     phone: value['phone'],
    //   //     mapcode: value['mapcode'],
    //   //     lat: value['lat'],
    //   //     lon: value['lon'],
    //   //     credit: value['credit'],
    //   //     website: value['website'],
    //   //     created_at: value['created_at'],
    //   //     updated_at: value['updated_at'],
    //   //     availability: value['availability'],
    //   //     updated_at_availability:
    //   //       value.updated_at_availability == null
    //   //         ? null
    //   //         : new Date(value.updated_at_availability)
    //   //   })
    //   // })
    // })
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
