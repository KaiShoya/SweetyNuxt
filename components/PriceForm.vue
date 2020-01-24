<template>
  <div id="form">
    <!-- <nav class="level">
      <div class="level-left">
        <div class="level-item">利用する地域</div>
        <div class="level-item">
          <button
            v-for="area in areasList"
            v-bind:class="[areaSelected == area.id ? 'is-primary' : '', 'button']"
            v-on:click="changeArea(area.id)"
          >{{ area.name }}</button>
        </div>
      </div>
    </nav> -->
    <nav class="level">
      <div class="level-left">
        <div class="level-item">利用する曜日</div>
        <div class="level-item">
          <button
            v-bind:class="[dowId == 1 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(1)"
          >月</button>
          <button
            v-bind:class="[dowId == 2 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(2)"
          >火</button>
          <button
            v-bind:class="[dowId == 3 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(3)"
          >水</button>
          <button
            v-bind:class="[dowId == 4 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(4)"
          >木</button>
          <button
            v-bind:class="[dowId == 5 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(5)"
          >金</button>
          <button
            v-bind:class="[dowId == 6 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(6)"
          >土</button>
          <button
            v-bind:class="[dowId == 7 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(7)"
          >日</button>
        </div>
        <div class="level-item">
          <button
            v-bind:class="[dowId == 8 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(8)"
          >祝日</button>
          <button
            v-bind:class="[dowId == 9 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(9)"
          >祝前日</button>
          <button
            v-bind:class="[dowId == 0 ? 'is-primary' : '', 'button']"
            v-on:click="changeDowId(0)"
          >全曜日</button>
        </div>
      </div>
    </nav>

    <nav class="level">
      <div class="level-left">
        <div class="level-item">利用開始時間</div>
        <div class="level-item select">
          <select
            name="start_hour"
            v-bind:value="startHour"
            v-on:change="changeStartHour($event.target.value)"
          >
            <option
              v-for="d in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]"
            >{{d}}</option>
          </select>
          <span>：</span>
          <select
            name="start_time"
            v-bind:value="startTime"
            v-on:change="changeStartTime($event.target.value)"
          >
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
        <div class="level-item">
          <button class="button" v-on:click="changeStartHourTime('now')">今から</button>
          <button class="button" v-on:click="changeStartHourTime(null)">指定しない</button>
        </div>
      </div>
    </nav>

    <nav class="level">
      <div class="level-left">
        <div class="level-item">利用時間</div>
        <div class="level-item">
          <input
            class="input"
            type="text"
            name="utilization_time"
            style="width: 60px;"
            v-bind:value="utilizationTime"
            v-on:change="changeUtilizationTime($event.target.value)"
          />
          <span>分</span>
        </div>
        <div class="level-item">
          <button class="button" v-on:click="changeUtilizationTime('60')">60</button>
          <button class="button" v-on:click="changeUtilizationTime('90')">90</button>
          <button class="button" v-on:click="changeUtilizationTime('120')">120</button>
          <button class="button" v-on:click="changeUtilizationTime('180')">180</button>
        </div>
        <div class="level-item">
          <button class="button" v-on:click="changeUtilizationTime('Free')">フリータイム</button>
          <button class="button" v-on:click="changeUtilizationTime('Lodging')">宿泊</button>
        </div>
      </div>
    </nav>

    <nav class="level">
      <div class="level-left">
        <div class="level-item">空室状況</div>
        <div class="level-item has-text-centered">
          <label class="checkbox" style="margin-right: 1rem;">
            <input
              type="checkbox"
              value="1"
              v-bind:checked="isAvailable1"
              v-on:change="changeIsAvailable($event)"
            />
            <span class="tag is-success">あり</span>
          </label>
          <label class="checkbox" style="margin-right: 1rem;">
            <input
              type="checkbox"
              value="2"
              v-bind:checked="isAvailable2"
              v-on:change="changeIsAvailable($event)"
            />
            <span class="tag is-danger">なし</span>
          </label>
          <label class="checkbox">
            <input
              type="checkbox"
              value="0"
              v-bind:checked="isAvailable0"
              v-on:change="changeIsAvailable($event)"
            />
            <span class="tag is-warning">不明</span>
          </label>
        </div>
      </div>
    </nav>

    <label class="checkbox">
      <input
        type="checkbox"
        id="card_accepted"
        v-bind:checked="cardAccepted"
        v-on:change="changeCardAccepted(!cardAccepted)"
      />
      クレジットカード可
    </label>
  </div>
</template>

<script>
export default {
  props: {
    dowId: {
      type: Number,
      required: true
    },
    startHour: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    utilizationTime: {
      type: String
    },
    isAvailable0: {
      type: Boolean,
      required: true
    },
    isAvailable1: {
      type: Boolean,
      required: true
    },
    isAvailable2: {
      type: Boolean,
      required: true
    },
    cardAccepted: {
      type: Boolean,
      required: true
    },
    areaSelected: {
      type: Number,
      required: true
    },
    areasList: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeDowId: function (value) {
      this.$emit('update:dowId', value)
    },
    changeStartHour: function (value) {
      this.$emit('update:startHour', value)
    },
    changeStartTime: function (value) {
      this.$emit('update:startTime', value)
    },
    changeStartHourTime: function (condition) {
      if (condition == 'now') {
        const date = new Date()
        const h = date.getHours()
        const m = date.getMinutes()

        if (m < 15) {
          this.changeStartHour(String(h))
          this.changeStartTime('15')
        } else if (m < 30) {
          this.changeStartHour(String(h))
          this.changeStartTime('30')
        } else if (m < 45) {
          this.changeStartHour(String(h))
          this.changeStartTime('45')
        } else {
          this.changeStartHour(String(h + 1))
          this.changeStartTime('00')
        }
      } else if (condition == null) {
        this.changeStartHour('0')
        this.changeStartTime('00')
      }
    },
    changeUtilizationTime: function (value) {
      this.$emit('update:utilizationTime', value)
    },
    changeIsAvailable: function (value) {
      this.$emit('update:isAvailable' + value.target.value, value.target.checked)
    },
    changeCardAccepted: function (value) {
      this.$emit('update:cardAccepted', value)
    },
    changeArea: function (value) {
      this.$emit('update:areaSelected', value)
    }
  }
}
</script>
