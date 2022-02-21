<template>
  <div >
    <progress id="count" max="1000" :value="usersCount"> </progress>
    <div>
  <label for="count">現在 {{usersCount}}筆</label>/
  目標 1000筆
  </div>

  
  </div>
</template>
<script>
export default {
  data: () => ({
    usersCount: "~"
  }),
async created(){
  const usersDataRef = this.$fire.firestore.collection('usersData').doc('doc')
  if (usersDataRef == null){ return }
  usersDataRef.get()
    .then((usersDataDoc)=>{
      this.usersCount = usersDataDoc.data().usersCount
    })
  }
}
</script>
<style scoped>
::-webkit-progress-value {
  background-color: theme("colors.primary.500");
}

::-webkit-progress-bar {
  background-color: var( --input-bg);
}
</style>
