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
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <b-button
                  class="navbar-item"
                  :type="active ? 'is-text' : 'is-dark'"
                  size="is-midium"
                  icon-left="email"
                  tag="a"
                  href="https://github.com/KaiShoya/SweetyNuxt/issues"
                  target="_blank"
                ></b-button>
              </p>
              <p class="control">
                <b-button
                  class="navbar-item"
                  :type="active ? 'is-text' : 'is-dark'"
                  size="is-midium"
                  icon-left="github-circle"
                  tag="a"
                  href="https://github.com/KaiShoya/SweetyNuxt"
                  target="_blank"
                ></b-button>
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
