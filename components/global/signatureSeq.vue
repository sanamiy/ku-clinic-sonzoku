<template>
  <div class="blue-frame">
    <div v-if="this.accountCreated == 0">
      <sign-up></sign-up>
    </div>
    <div v-if="this.accountCreated == 1">
      📩 メールボックスを確認し、所属付き署名を完了させてください
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    accountCreated: 0,
  }),
  async beforeMount(){
    if( this.$route.params.accountCreated == 1 ){
      this.accountCreated = 1 
    }
  }
}
</script>
<style scoped>
.blue-frame{
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 0.4em;
  padding: 0.8em;
  background-color: var(--primary-color);
}
</style>