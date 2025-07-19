import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'






import navBar from './components/navbar.vue'
Vue.component('navBar', navBar);

import SideContent from './components/SideContent.vue'
Vue.component('SideContent', SideContent);

import pdfViewKu from './components/pdfView.vue'
Vue.component('pdfViewKu', pdfViewKu);


import belumMenikah from './components/templateSurat/belumMenikah.vue'
Vue.component('belumMenikah', belumMenikah);

import berdomisili from './components/templateSurat/berdomisili.vue'
Vue.component('berdomisili', berdomisili);

import tidakMampu from './components/templateSurat/tidakMampu.vue'
Vue.component('tidakMampu', tidakMampu);

import usaha from './components/templateSurat/usaha.vue'
Vue.component('usaha', usaha);

import belumMemilikiRumah from './components/templateSurat/belumMemilikiRumah.vue'
Vue.component('belumMemilikiRumah', belumMemilikiRumah);

import tidakBekerja from './components/templateSurat/tidakBekerja.vue'
Vue.component('tidakBekerja', tidakBekerja);



// import VueGallery from 'vue-gallery'
// Vue.component('VGallery', VueGallery)


import kendaraanOperasional from './views/bumdes/component/kendaraanOperasional.vue'
Vue.component('kendaraanOperasional', kendaraanOperasional);
import pelaksanaOperasional from './views/bumdes/component/pelaksanaOperasional.vue'
Vue.component('pelaksanaOperasional', pelaksanaOperasional);
import pelatihan from './views/bumdes/component/pelatihan.vue'
Vue.component('pelatihan', pelatihan);
import sarProd from './views/bumdes/component/sarProd.vue'
Vue.component('sarProd', sarProd);
import usahaKeuangan from './views/bumdes/component/usahaKeuangan.vue'
Vue.component('usahaKeuangan', usahaKeuangan);






Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
