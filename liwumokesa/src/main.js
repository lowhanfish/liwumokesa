import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);


import VueRandomColor from 'vue-randomcolor'
Vue.use(VueRandomColor)


// import Dropdown from 'vue-simple-search-dropdown';
// Vue.use(Dropdown);

import * as VueGoogleMaps from 'vue2-google-maps'

// console.log($store.state.GOOGLE_API)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC-CK-C9E_OOkeMe9IkN-Jcj2Np0n3p_ho',
    v: '3.26',
    libraries: 'places, drawing, visualization',  // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  autobindAllEvents: true,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)


import sideBar from './components/sideBar.vue'
Vue.component('SideBar', sideBar);

import topBar from './components/topBar.vue'
Vue.component('topBar', topBar);

import ProgressLoading from './components/ProgressLoading.vue'
Vue.component('ProgressLoading', ProgressLoading);

import pdfViewKu from './components/pdfView.vue'
Vue.component('pdfViewKu', pdfViewKu);


import fileView from './components/fileView.vue'
Vue.component('fileView', fileView);




import kendaraanOperasional from './views/website/bumdes/component/kendaraanOperasional.vue'
Vue.component('kendaraanOperasional', kendaraanOperasional);
import pelaksanaOperasional from './views/website/bumdes/component/pelaksanaOperasional.vue'
Vue.component('pelaksanaOperasional', pelaksanaOperasional);
import pelatihan from './views/website/bumdes/component/pelatihan.vue'
Vue.component('pelatihan', pelatihan);
import sarProd from './views/website/bumdes/component/sarProd.vue'
Vue.component('sarProd', sarProd);
import usahaKeuangan from './views/website/bumdes/component/usahaKeuangan.vue'
Vue.component('usahaKeuangan', usahaKeuangan);


import pamongPendidikanNonFormal from './components/riwayatPamong/pamongPendidikanNonFormal.vue'
Vue.component('pamongPendidikanNonFormal', pamongPendidikanNonFormal);
import pamongPendidikanFormal from './components/riwayatPamong/pamongPendidikanFormal.vue'
Vue.component('pamongPendidikanFormal', pamongPendidikanFormal);
import pamongJabatan from './components/riwayatPamong/pamongJabatan.vue'
Vue.component('pamongJabatan', pamongJabatan);
import pamongKeluarga from './components/riwayatPamong/pamongKeluarga.vue'
Vue.component('pamongKeluarga', pamongKeluarga);
import pamongPrestasi from './components/riwayatPamong/pamongPrestasi.vue'
Vue.component('pamongPrestasi', pamongPrestasi);




import Print from 'vue-print-nb'
Vue.use(Print);


import belumMenikah from './components/templateSurat/belumMenikah.vue'
Vue.component('belumMenikah', belumMenikah);
import domisili from './components/templateSurat/domisili.vue'
Vue.component('domisili', domisili);
import tidakMampu from './components/templateSurat/tidakMampu.vue'
Vue.component('tidakMampu', tidakMampu);
import usaha from './components/templateSurat/usaha.vue'
Vue.component('usaha', usaha);
import belumMemilikiRumah from './components/templateSurat/belumMemilikiRumah.vue'
Vue.component('belumMemilikiRumah', belumMemilikiRumah);
import tidakBekerja from './components/templateSurat/tidakBekerja.vue'
Vue.component('tidakBekerja', tidakBekerja);



// const socket = io('http://socketserver.com:5010');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
