<template>
  <div>
    <form class="form-signup" @submit.prevent="createUser">
      <label for="signup-email" class="label">メールアドレス</label>
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
      <button type="submit" class="button-submit">署名用リンクを送信</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    randomPassword:"",
    isNewAccount: ""
  }),
  methods: {
    async isEmailRegistered(email){
      const signInMethods = await this.$fire.auth.fetchSignInMethodsForEmail(email)
      return signInMethods.indexOf(this.$fire.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1
    },
    async createUser() {
      const continueUrl = process.env.baseUrl + `/signature-edit`
      const actionCodeSettings = {
        url: continueUrl,
        handleCodeInApp: true
      }
      // アカウントが作成済かを調べる
      this.$fire.auth.fetchSignInMethodsForEmail(this.email)
       .then((signInMethods)=>{
         console.log(this.$fire.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
          if ( signInMethods.indexOf(this.$fire.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
            this.isNewAccount = true
          } else {
            this.isNewAccount =false
          }
       }).then(()=>{
         //アカウントが作成済みの場合
          if (this.isNewAccount == true ){
            this.$toast.info("アカウントを新規作成します。少々お待ち下さい")
            this.randomPassword = Math.random().toString(30).slice(2)
            this.$fire.auth.createUserWithEmailAndPassword(
                this.email,
                this.randomPassword
                // ユーザー名を設定する
            ).then((user)=> {
              user.updateProfile({ displayName: "署名にご協力くださる皆" })
            }).catch((error)=>{
              this.$toast.error(error)
            })
       }}).then(()=>{
         // アカウントを作成ののち、またはアカウントが存在していた場合はそのまま、サインインリンクを送信する
         this.$fire.auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
       }).then((res)=>{
            this.$toast.success('メールを送信しました。メール内のリンクからログインしてください')
            this.$router.push(`/signature?accountCreated=1`)
       }).catch((error)=>{
            console.log(error)
            this.$toast.error(error.message)
          })
    }}
}

</script>
