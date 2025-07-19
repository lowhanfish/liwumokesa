import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


import  store  from '../store/index'

// console.log(store.state)


Vue.use(VueRouter);





function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}










  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/WA_Blaster',
    name: 'WA_Blaster',
    component: () => import('../views/blaster/WA_Blaster.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/routerAdd',
    name: 'routerAdd',
    component: () => import('../views/auth/routerAdd.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/levelAuth',
    name: 'levelAuth',
    component: () => import('../views/auth/levelAuth.vue'),
    beforeEnter: isLoggedIn,
  },

 
  {
    path: '/masterLevel',
    name: 'masterLevel',
    component: () => import('../views/dataMaster/masterLevel.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desKel',
    name: 'desKel',
    component: () => import('../views/dataMaster/desKel.vue'),
    beforeEnter: isLoggedIn,
  },
 
  {
    path: '/kabKota',
    name: 'kabKota',
    component: () => import('../views/dataMaster/kabKota.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kecamatan',
    name: 'kecamatan',
    component: () => import('../views/dataMaster/kecamatan.vue'),
    beforeEnter: isLoggedIn,
  },
  
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('../views/dataMaster/registrasi.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/wilayah',
    name: 'wilayah',
    component: () => import('../views/dataMaster/wilayah.vue'),
    beforeEnter: isLoggedIn,
  },






  {
    path: '/masterJenisUsaha',
    name: 'masterJenisUsaha',
    component: () => import('../views/dataMaster/masterDemografi/masterJenisUsaha.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterPotensi',
    name: 'masterPotensi',
    component: () => import('../views/dataMaster/masterDemografi/masterPotensi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterFasilitasKeagamaan',
    name: 'masterFasilitasKeagamaan',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasKeagamaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterFasilitasKesehatan',
    name: 'masterFasilitasKesehatan',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasKesehatan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterFasilitasPemerintahan',
    name: 'masterFasilitasPemerintahan',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasPemerintahan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterFasilitasPendidikan',
    name: 'masterFasilitasPendidikan',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasPendidikan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterFasilitasPenunjang',
    name: 'masterFasilitasPenunjang',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasPenunjang.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterFasilitasUmum',
    name: 'masterFasilitasUmum',
    component: () => import('../views/dataMaster/masterFasilitas/masterFasilitasUmum.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterAgama',
    name: 'masterAgama',
    component: () => import('../views/dataMaster/masterPenduduk/masterAgama.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterPekerjaan',
    name: 'masterPekerjaan',
    component: () => import('../views/dataMaster/masterPenduduk/masterPekerjaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterPendidikan',
    name: 'masterPendidikan',
    component: () => import('../views/dataMaster/masterPenduduk/masterPendidikan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterProdukHukum',
    name: 'masterProdukHukum',
    component: () => import('../views/dataMaster/masterDokumen/masterProdukHukum.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/desKelDomain',
    name: 'desKelDomain',
    component: () => import('../views/dataMaster/domain/desKelDomain.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterJenisSuket',
    name: 'masterJenisSuket',
    component: () => import('../views/dataMaster/jenisSuket/masterJenisSuket.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterJenisPamong',
    name: 'masterJenisPamong',
    component: () => import('../views/dataMaster/masterPamong/jenisPamong.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/masterJenisPamongJabatan',
    name: 'masterJenisPamongJabatan',
    component: () => import('../views/dataMaster/masterPamong/jenisPamongJabatan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterKelompokPamongJabatan',
    name: 'masterKelompokPamongJabatan',
    component: () => import('../views/dataMaster/masterPamong/kelompokPamongJabatan.vue'),
    beforeEnter: isLoggedIn,
  },


  {
    path: '/IPDDimensi',
    name: 'IPDDimensi',
    component: () => import('../views/dataMaster/IPD/dimensi.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/IPDindikator',
    name: 'IPDindikator',
    component: () => import('../views/dataMaster/IPD/indikator'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/IPDvariabel',
    name: 'IPDvariabel',
    component: () => import('../views/dataMaster/IPD/variabel.vue'),
    beforeEnter: isLoggedIn,
  },


  {
    path: '/ipd',
    name: 'ipd',
    component: () => import('../views/website/IPD/ipd.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/verifikasiIPD',
    name: 'verifikasiIPD',
    component: () => import('../views/website/IPD/verifikasiIPD.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/configurasi',
    name: 'configurasi',
    component: () => import('../views/dataMaster/configurasi.vue'),
    beforeEnter: isLoggedIn,
  },



  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/register.vue'),
    beforeEnter: isLoggedIn,
  },



  // ================================ WEBSITE ==================================
  {
    path: '/capaianKegiatan',
    name: 'capaianKegiatan',
    component: () => import('../views/website/capaian/capaianKegiatan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/galleryFoto',
    name: 'galleryFoto',
    component: () => import('../views/website/gallery/galleryFoto.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/galleryVideo',
    name: 'galleryVideo',
    component: () => import('../views/website/gallery/galleryVideo.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/galleryinfografis',
    name: 'galleryinfografis',
    component: () => import('../views/website/gallery/infografis.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/kegiatanTerbaru',
    name: 'kegiatanTerbaru',
    component: () => import('../views/website/kegiatan/kegiatanTerbaru.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/carousell',
    name: 'carousell',
    component: () => import('../views/carousell/carousell.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/profilCamat',
    name: 'profilCamat',
    component: () => import('../views/website/profil/profilCamat.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/profilPegawai',
    name: 'profilPegawai',
    component: () => import('../views/website/profil/profilPegawai.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/programUsulan',
    name: 'programUsulan',
    component: () => import('../views/website/program/programUsulan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/misi',
    name: 'misi',
    component: () => import('../views/website/visiMisi/misi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/visi',
    name: 'visi',
    component: () => import('../views/website/visiMisi/visi.vue'),
    beforeEnter: isLoggedIn,
  },



  // ================================ WEBSITE ==================================


  // ================================ KECAMATAN ==================================
  {
    path: '/dataPegawai',
    name: 'dataPegawai',
    component: () => import('../views/website/kecamatan/dataPegawai/dataPegawai.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/batas_luasWilayah',
    name: 'batas_luasWilayah',
    component: () => import('../views/website/kecamatan/demografi/batas_luasWilayah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/jenisUsaha',
    name: 'jenisUsaha',
    component: () => import('../views/website/kecamatan/demografi/jenisUsaha.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/potensiWiayah',
    name: 'potensiWiayah',
    component: () => import('../views/website/kecamatan/demografi/potensiWiayah.vue'),
    beforeEnter: isLoggedIn,
  },

  

  {
    path: '/data_agama',
    name: 'data_agama',
    component: () => import('../views/website/kecamatan/penduduk/agama.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/data_keluarga',
    name: 'data_keluarga',
    component: () => import('../views/website/kecamatan/penduduk/keluarga.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/data_pekerjaan',
    name: 'data_pekerjaan',
    component: () => import('../views/website/kecamatan/penduduk/pekerjaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/data_pendidikan',
    name: 'data_pendidikan',
    component: () => import('../views/website/kecamatan/penduduk/pendidikan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/data_piramidaPenduduk',
    name: 'data_piramidaPenduduk',
    component: () => import('../views/website/kecamatan/penduduk/piramidaPenduduk.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/data_statusSosial',
    name: 'data_statusSosial',
    component: () => import('../views/website/kecamatan/penduduk/statusSosial.vue'),
    beforeEnter: isLoggedIn,
  },



  {
    path: '/layananKeagamaan',
    name: 'layananKeagamaan',
    component: () => import('../views/website/kecamatan/fasilitasUmum/layananKeagamaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/layananKesehatan',
    name: 'layananKesehatan',
    component: () => import('../views/website/kecamatan/fasilitasUmum/layananKesehatan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/layananPemerintahan',
    name: 'layananPemerintahan',
    component: () => import('../views/website/kecamatan/fasilitasUmum/layananPemerintahan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/layananPendidikan',
    name: 'layananPendidikan',
    component: () => import('../views/website/kecamatan/fasilitasUmum/layananPendidikan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/layananUmum',
    name: 'layananUmum',
    component: () => import('../views/website/kecamatan/fasilitasUmum/layananUmum.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/saranaPenunjang',
    name: 'saranaPenunjang',
    component: () => import('../views/website/kecamatan/fasilitasUmum/saranaPenunjang.vue'),
    beforeEnter: isLoggedIn,
  },
 

  // ================================ KECAMATAN ==================================


  // ================================ PEDESAAN ==================================
  {
    path: '/desa_agama',
    name: 'desa_agama',
    component: () => import('../views/website/pedesaan/penduduk/agama.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_keluarga',
    name: 'desa_keluarga',
    component: () => import('../views/website/pedesaan/penduduk/keluarga.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_pekerjaan',
    name: 'desa_pekerjaan',
    component: () => import('../views/website/pedesaan/penduduk/pekerjaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_pendidikan',
    name: 'desa_pendidikan',
    component: () => import('../views/website/pedesaan/penduduk/pendidikan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_piramidaPenduduk',
    name: 'desa_piramidaPenduduk',
    component: () => import('../views/website/pedesaan/penduduk/piramidaPenduduk.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_statusSosial',
    name: 'desa_statusSosial',
    component: () => import('../views/website/pedesaan/penduduk/statusSosial.vue'),
    beforeEnter: isLoggedIn,
  },


  {
    path: '/desa_batas_luasWilayah',
    name: 'desa_batas_luasWilayah',
    component: () => import('../views/website/pedesaan/demografi/batas_luasWilayah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_jenisUsaha',
    name: 'desa_jenisUsaha',
    component: () => import('../views/website/pedesaan/demografi/jenisUsaha.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_potensiWiayah',
    name: 'desa_potensiWiayah',
    component: () => import('../views/website/pedesaan/demografi/potensiWiayah.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/desa_dataPegawai',
    name: 'desa_dataPegawai',
    component: () => import('../views/website/pedesaan/dataPegawai/dataPegawai.vue'),
    beforeEnter: isLoggedIn,
  },








  {
    path: '/desa_layananKeagamaan',
    name: 'desa_layananKeagamaan',
    component: () => import('../views/website/pedesaan/fasilitasUmum/layananKeagamaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_layananKesehatan',
    name: 'desa_layananKesehatan',
    component: () => import('../views/website/pedesaan/fasilitasUmum/layananKesehatan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_layananPemerintahan',
    name: 'desa_layananPemerintahan',
    component: () => import('../views/website/pedesaan/fasilitasUmum/layananPemerintahan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_layananPendidikan',
    name: 'desa_layananPendidikan',
    component: () => import('../views/website/pedesaan/fasilitasUmum/layananPendidikan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_layananUmum',
    name: 'desa_layananUmum',
    component: () => import('../views/website/pedesaan/fasilitasUmum/layananUmum.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_saranaPenunjang',
    name: 'desa_saranaPenunjang',
    component: () => import('../views/website/pedesaan/fasilitasUmum/saranaPenunjang.vue'),
    beforeEnter: isLoggedIn,
  },

  // ================================ PEDESAAN ==================================




  // ================================ DOKUMEN ==================================
  {
    path: '/desa_dok_jdih',
    name: 'desa_dok_jdih',
    component: () => import('../views/website/dokumen/jdih.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_transparansi',
    name: 'desa_dok_transparansi',
    component: () => import('../views/website/dokumen/transparansi.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_perpusDigital',
    name: 'desa_dok_perpusDigital',
    component: () => import('../views/website/dokumen/perpusDigital.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_perpusDigitalKatalog',
    name: 'desa_perpusDigitalKatalog',
    component: () => import('../views/website/dokumen/perpusDigitalKatalog.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_lainnya',
    name: 'desa_dok_lainnya',
    component: () => import('../views/website/dokumen/lainnya.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_privateDokumen',
    name: 'desa_dok_privateDokumen',
    component: () => import('../views/website/dokumen/privateDokumen.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_direktoriPermintaan',
    name: 'desa_dok_direktoriPermintaan',
    component: () => import('../views/website/dokumen/direktoriPermintaan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/desa_dok_direktoriPenyetoran',
    name: 'desa_dok_direktoriPenyetoran',
    component: () => import('../views/website/dokumen/direktoriPenyetoran.vue'),
    beforeEnter: isLoggedIn,
  },

  // ================================ DOKUMEN ==================================






  // ================================ PERSURATAN ==================================

  {
    path: '/suketAhliWaris',
    name: 'suketAhliWaris',
    component: () => import('../views/persuratan/suketAhliWaris.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketBelumMenikah',
    name: 'suketBelumMenikah',
    component: () => import('../views/persuratan/suketBelumMenikah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketBerdomisili',
    name: 'suketBerdomisili',
    component: () => import('../views/persuratan/suketBerdomisili.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketPindahDomisili',
    name: 'suketPindahDomisili',
    component: () => import('../views/persuratan/suketPindahDomisili.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakBekerja',
    name: 'suketTidakBekerja',
    component: () => import('../views/persuratan/suketTidakBekerja.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakMampu',
    name: 'suketTidakMampu',
    component: () => import('../views/persuratan/suketTidakMampu.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakMemilikiRumah',
    name: 'suketTidakMemilikiRumah',
    component: () => import('../views/persuratan/suketTidakMemilikiRumah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketUsaha',
    name: 'suketUsaha',
    component: () => import('../views/persuratan/suketUsaha.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/suket',
    name: 'suket',
    component: () => import('../views/persuratanV2/suket.vue'),
    beforeEnter: isLoggedIn,
  },

  // ================================ PERSURATAN ==================================


  // ================================ BUMDES ==================================

  {
    path: '/bumdesReport',
    name: 'bumdesReport',
    component: () => import('../views/website/bumdes/bumdesRepport'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/bumdesKelembagaan',
    name: 'bumdesKelembagaan',
    component: () => import('../views/website/bumdes/bumdesKelembagaan'),
    beforeEnter: isLoggedIn,
  },

  // ================================ BUMDES ==================================


  // ================================ PAMONG DESA ==================================

  {
    path: '/riwayatJabatanLainnya',
    name: 'riwayatJabatanLainnya',
    component: () => import('../views/pamong/riwayatJabatanLainnya.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/riwayatJabatanPerangkat',
    name: 'riwayatJabatanPerangkat',
    component: () => import('../views/pamong/riwayatJabatanPerangkat.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/riwayatKeluarga',
    name: 'riwayatKeluarga',
    component: () => import('../views/pamong/riwayatKeluarga.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/riwayatPendidikanFormal',
    name: 'riwayatPendidikanFormal',
    component: () => import('../views/pamong/riwayatPendidikanFormal.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/riwayatPendidikanNonFormal',
    name: 'riwayatPendidikanNonFormal',
    component: () => import('../views/pamong/riwayatPendidikanNonFormal.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/riwayatPrestasi',
    name: 'riwayatPrestasi',
    component: () => import('../views/pamong/riwayatPrestasi.vue'),
    beforeEnter: isLoggedIn,
  },
  
  


  // ================================ PAMONG DESA ==================================



]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
