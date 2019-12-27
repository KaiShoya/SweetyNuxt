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
  </section>
</template>

<script>
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
      sortKey: 'price',
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
  }
}
</script>

<style scoped>
.box {
  padding: 1rem;
  margin: 0.5rem !important;
}
</style>
