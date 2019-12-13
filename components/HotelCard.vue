<template>
  <div>
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <span
              v-bind:class="[availability == 1 ? 'is-success' : availability == 2 ? 'is-danger' : 'is-warning', 'tag']"
            >
              <small v-if="updated_at_availability == null">未更新</small>
              <small v-else>{{ updated_at_availability }}</small>
            </span>
            <span v-if="credit == true" class="tag is-info">
              <small>クレカOK</small>
            </span>
            <br />
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${ address }`"
              target="_blank"
              rel="noopener"
            >
              <strong style="font-size: 1.2rem;line-hight: 10px;">{{ name }}</strong>
            </a>
            <a v-if="website" :href="`${website}`" target="_blank" rel="noopener">{{ website }}</a>
            <span v-else>{{ website }}</span>
            <br />
            <small>{{ address }}</small>
            <small>
              <a :href="`tel:${ phone }`">{{ phone }}</a>
            </small>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    availability: {
      type: Number
    },
    updated_at_availability: {
      type: String
    },
    credit: {
      type: Boolean,
      required: true
    },
    website: {
      type: String
    }
  }
}
</script>
