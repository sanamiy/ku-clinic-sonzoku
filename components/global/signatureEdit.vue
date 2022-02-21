<template>
<div>
  <div v-if="!isLoggedIn">先にログインを完了してください</div>
  <div v-if="isLoggedIn">
    <form class="form-signin" @submit.prevent="updateSignature">
      <div class="radios">
        <div v-if="this.emailType !== '同窓生'">
          <input id="gakusei" v-model="userType" name="userType" type="radio" value="学生" required/>
          <label class="label" for="gakusei"> 学生</label>
        </div>
        <div v-if="this.emailType ==''">
          <input id="kyoushokuin" v-model="userType" name="userType" type="radio" value="教職員" />
          <label class="label" for="kyoushokuin"> 教職員 </label>
        </div>

        <div v-if="this.emailType == '同窓生'">
          <input id="sotsugyousei" v-model="userType" name="userType" type="radio" value="卒業生" required/>
          <label class="label" for="sotsugyousei"> 卒業生</label>
        </div>
        <div v-if="this.emailType == '同窓生'">
          <input id="motokyoushokuin" v-model="userType" name="userType" type="radio" value="元教職員" />
          <label class="label" for="motokyoushokuin"> 元教職員 </label>
        </div>
      </div>

      <div>
        <label for="signature-name" class="label">名前</label>
        <input
          id="signature-name"
          v-model="name"
          class="input-gray"
          type="text"
          autocomplete="name"
          required
        />
      </div>

      <div>
        <label v-if="this.emailType !== '同窓生'" for="signature-department" class="label">学部・部局</label>
        <label v-if="this.emailType == '同窓生'" for="signature-department" class="label">元学部・部局</label>
        <v-select :options="options" class="select-box" v-model="post1" id="signature-department"></v-select>
      </div>

      <div>
        <label v-if="this.emailType == '学生'" for="signature-department" class="label">所属詳細（学科・学年等）</label>
        <label v-if="this.emailType == ''" for="signature-department2" class="label">所属詳細</label>
        <label v-if="this.emailType == '同窓生'" for="signature-department2" class="label">元所属詳細</label>
        <input
          id="signature-department"
          v-model="post2"
          class="input-gray"
          type="text"
          autocomplete="off"
          required
        />
      </div>

      <button type="submit" class="button-submit">署名送信</button>
    </form>
  </div>
  </div>
</template>
<script>
import Vue from "vue";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    userType: "",
    emailType: "",
    options: ["文学部","教育学部","法学部","経済学部","理学部","医学部","薬学部","工学部","農学部","総合人間学部","文学研究科","教育学研究科","法学研究科","経済学研究科","理学研究科","医学研究科","医学部附属病院","薬学研究科","工学研究科","農学研究科","人間・環境学研究科","エネルギー科学研究科","アジア・アフリカ地域研究研究科","情報学研究科","生命科学研究科","総合生存学館","地球環境学堂","公共政策連携研究部","経営管理研究部","化学研究所","人文科学研究所","ウイルス・再生医科学研究所","エネルギー理工学研究所","生存圏研究所","防災研究所","基礎物理学研究所","経済研究所","数理解析研究所","複合原子力科学研究所","霊長類研究所","東南アジア地域研究研究所","ｉＰＳ細胞研究所","学術情報メディアセンター","生態学研究センター","野生動物研究センター","高等教育研究開発推進センター","総合博物館","フィールド科学教育研究センター","福井謙一記念研究センター","こころの未来研究センター","文化財総合研究センター","学生総合支援センター","大学文書館","アフリカ地域研究資料センター","白眉センター","学際融合教育研究推進センター","大学院横断教育プログラム推進センター","ベンチャー・ビジネス・ラボラトリー","総合専門業務室","学術研究支援室","国際教育支援室","研究国際部","国際高等教育院","高等研究院","高大接続・入試センター","環境安全保健機構","情報環境機構","図書館機構","産官学連携本部","国際戦略本部","企画・情報部","総務部","オープンイノベーション機構","情報部","研究推進部","総長・副学長・理事"],
    post1:"",
    post2:"",
    isLoggedIn: false,
    isVerified: false,
    uid: ""
  }),
  async beforeMount(){
    // ログインする
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
    // ログイン済みかどうかを調べる
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user == null) { return }
      // ログイン済みの場合ユーザー情報を取得する
      this.isLoggedIn = true
      if (user.emailVerified == false){ return }
      this.isVerified = true
      this.uid = user.uid
      this.email = user.email
      if (this.email.search(/@st.kyoto-u.ac.jp/) !== -1){
        this.emailType = "学生"
      } else if (this.email.search(/@kyoto-u.jp/) !== -1){
        this.emailType = "同窓生"
      }
      const userRef = this.$fire.firestore.collection('users').doc(user.uid)
      if (userRef == null){ return }
      userRef.get()
       .then((userDoc)=>{
         if (userDoc.data() == null){ return }
          this.name = userDoc.data().name
          this.userType = userDoc.data().type
          this.post1 = userDoc.data().post1
          this.post2 = userDoc.data().post2
        })
        .catch((error) => {
          this.$toast.error(error)
          console.log(error)
        }
      )
  })},
  methods: {
    async updateSignature(){
      const userRef = this.$fire.firestore.collection('users').doc(this.uid)
      try {
        await userRef.set({
          name: this.name,
          type: this.userType,
          email: this.email,
          post1: this.post1,
          post2: this.post2,
          updatedAt: this.$fireModule.firestore.FieldValue.serverTimestamp()
        })
        this.$toast.success("署名を送信しました")
        this.$router.push("/signature")
      } catch (error) {
        this.$toast.error(error)
        console.log('%c' + error, 'color:red')
      }
    }
}}
</script>
<style scoped>
.radios{
  margin: 1em 0;
}
</style>