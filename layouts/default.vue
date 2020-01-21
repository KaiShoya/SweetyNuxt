<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <div class="navbar-item">Sweety</div>
        <nuxt-link class="navbar-item" to="/" exact-active-class="is-active">価格検索</nuxt-link>
        <nuxt-link class="navbar-item" to="/hotel" exact-active-class="is-active">ホテル一覧</nuxt-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          v-on:click="active = !active"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div v-bind:class="[{ 'is-active': active }, 'navbar-menu']" id="navMenu">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/tos" exact-active-class="is-active">利用規約</nuxt-link>
          <!-- <nuxt-link class="navbar-item" to="availability" exact-active-class="is-active">空室状況</nuxt-link> -->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <!-- <div class="navbar-item">
                  <span></span>
                </div> -->
                <a class="button is-primary" href="">
                  <span>ログイン</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content">
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
