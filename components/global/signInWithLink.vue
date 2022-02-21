<template>
<div>
    <form class="form-signin" @submit.prevent="signInWithLink">
      <div>
      <label for="signin-email" class="label">メールアドレス</label>
      <input
        id="signin-email"
        v-model="email"
        class="input-gray"
        type="email"
        pattern=".+@(.+\.kyoto-u\.ac\.jp|kyoto-u\.ac\.jp|kyoto-u\.jp)"
        placeholder="kyoto-u.ac.jp / kyoto-u.jp"
        autocomplete="email"
        required
      />
      </div>

      <button type="submit" class="button-submit">ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    uid: ""
  }),
  methods: {
    signInWithLink() {
      if(this.$fire.auth.isSignInWithEmailLink(window.location.href)){
        this.email = this.$router.currentRoute.params.name
        this.$fire.auth.signInWithEmailLink(email, window.location.href)
        .then(() => {
          this.$toast.success('ログインしました')
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
      } 
    },
  },
}
</script>

