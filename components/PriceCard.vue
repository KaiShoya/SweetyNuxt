<template>
  <div>
    <div class="content">
      <div>
        <span v-if="dow == 0" class="tag">{{ day_of_week }}</span>
        <span
          v-bind:class="[availability == 1 ? 'is-success' : availability == 2 ? 'is-danger' : 'is-warning', 'tag']"
        >
          <small v-if="updated_at_availability == null">未更新</small>
          <small v-else>{{ updated_at_availability }}</small>
        </span>
        <span v-if="credit" class="tag is-info">
          <small>クレカOK</small>
        </span>
      </div>
      <p>
        <strong>{{ hotel_name }}</strong>
        <span>
          <small>プラン:</small>
          <small v-if="utilization_time == 'Free'">
            <strong>フリー</strong>
          </small>
          <small v-else-if="utilization_time == 'Lodging'">
            <strong>宿泊</strong>
          </small>
          <small v-else>
            <strong>{{ utilization_time }}分</strong>
          </small>
        </span>
        <small>{{ time_zone_start }}〜{{ time_zone_end }}</small>
        <br />料金:
        <strong v-if="min_price == max_price">{{ min_price }}</strong>
        <strong v-else>{{ min_price }}〜{{ max_price }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dow: {
      type: Number,
      required: true
    },
    day_of_week: {
      type: String
    },
    availability: {
      type: Number,
      required: true
    },
    updated_at_availability: {
      type: String
    },
    credit: {
      type: Boolean,
      required: true
    },
    hotel_name: {
      type: String,
      required: true
    },
    utilization_time: {
      type: String,
      required: true
    },
    time_zone_start: {
      type: String,
      required: true
    },
    time_zone_end: {
      type: String,
      required: true
    },
    min_price: {
      type: Number,
      required: true
    },
    max_price: {
      type: Number,
      required: true
    }
  }
}
</script>
