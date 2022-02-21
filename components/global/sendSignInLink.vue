<template>
  <div>
    <form class="form-signup" @submit.prevent="sendSignInLink">
      <div>
      <label for="signup-email" class="label">学内メールアドレス</label>
      <input
        id="signup-email"
        v-model="email"
        class="input-gray"
        type="email"
        pattern=".+@(.+\.kyoto-u\.ac\.jp|kyoto-u\.ac\.jp|kyoto-u\.jp)"
        placeholder="kyoto-u.ac.jp / kyoto-u.jp"
        autocomplete="email"
        required
      />
      </div>
      <button type="submit" class="button-submit">サインインリンク送信</button>
    </form>
    </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    randomPassword:""
  }),
  methods: {
    async sendSignInLink() {
      const continueUrl = process.env.baseUrl + `/signature-edit/?email=${this.email}`
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: true
      }
      this.$toast.info("少々お待ちください")
      try {
        await this.$fire.auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
        this.$toast.success('メールを送信しました。メール内のリンクからログインしてください')
        this.$router.push('/signature')
      } catch (error){
        console.log(error)
        this.$toast.error(error.message)
      }
    }
  }
}
</script>
