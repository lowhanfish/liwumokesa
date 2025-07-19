<template>
  <div  style="height:700px">
       <vue-pdf-app :pdf="pdfFile"></vue-pdf-app>
       <!-- <vue-pdf-app pdf="https://server.erabirusultra.com/uploads/1622613680209.pdf"></vue-pdf-app> -->
      <!-- <embed src="https://server.erabirusultra.com/uploads/1622613680209.pdf" width="500" height="375" type="application/pdf"> -->
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";



export default {

  props: ["pdfFile"],
  components: {
      VuePdfApp,
  },
}
</script>

<style>

</style>