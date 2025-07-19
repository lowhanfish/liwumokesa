import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


var DataStore = require('../store');
var store = DataStore.default



Vue.use(VueRouter)





// function loggedInRedirectDashboard(to, from, next) {
//   if (localStorage.token) {
//     next('/menuSurat');
//   } else {
//     next();
//   }
// }

async function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    var data = await GetId();
    next();
  } else {
    next('/menuSurat');
  }
}












async function GetId(){
  return new Promise((res, rej)=>{
    
    var url = location.host;
    // console.log(url)

    
    fetch(store.state.url.URL_CNT_DES_KEL + "getDesaByURL", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: url
      })
    })
      .then(res => res.json())
      .then(res_data => {

        console.log(res_data)
        
        // console.log("CCCCCCCCCCCCCCCCC")
        
        if (res_data.length <= 0) {
          
        } else {
          const data = res_data[0]
          store.state.DES_KEL = data.desa;
          store.state.ID_DES_KEL = data.id_desa;
          store.state.KECAMATAN = data.kecamatan;
          store.state.VISITOR = data.visitor;

          // console.log("EAAAAAAAAAAAAAAAAAAAAAAAAAA")
          // console.log(store.state.DES_KEL)
          res("AAAAAAAAAAAAA")
        }
        
    });



  })
}


async function mainGetId(to, from, next) {
   var data = await GetId();
  // console.log(data)
  next();
}


async function checkLogin(to, from, next) {
  // var data = await GetId();
  if (localStorage.token) {
    // store.state.CHECK_AUTH = true
    next();
  } else {
    store.state.CHECK_AUTH = false
    next('/menuSurat');
  }

}



  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: mainGetId,
  },
  {
    path: '/capaian',
    name: 'capaian',
    component: () => import('../views/capaian/capaian.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/foto',
    name: 'foto',
    component: () => import('../views/gallery/foto.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/gallery/video.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/profilBup',
    name: 'profilBup',
    component: () => import('../views/profile/profilBup.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/profilCawabup',
    name: 'profilCabup',
    component: () => import('../views/profile/profilCabup.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/programUsulan',
    name: 'programUsulan',
    component: () => import('../views/program/programUsulan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/misi',
    name: 'misi',
    component: () => import('../views/visiMisi/misi.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/visi',
    name: 'visi',
    component: () => import('../views/visiMisi/visi.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/kegiatan',
    name: 'kegiatan',
    component: () => import('../views/kegiatan/kegiatan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/detilKegiatan',
    name: 'detilKegiatan',
    component: () => import('../views/kegiatan/detilKegiatan.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/kelembagaan',
    name: 'kelembagaan',
    component: () => import('../views/kelembagaan/kelembagaan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/bumdes',
    name: 'bumdes',
    component: () => import('../views/bumdes/bumdes.vue'),
    beforeEnter: mainGetId,
  },
  
  
  
  // ================================
  {
    path: '/dataPegawai',
    name: 'dataPegawai',
    component: () => import('../views/dataPegawai/dataPegawai.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/luasWilayah',
    name: 'luasWilayah',
    component: () => import('../views/dataDemografi/luasWilayah.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/potensiWilayah',
    name: 'potensiWilayah',
    component: () => import('../views/dataDemografi/potensiWilayah.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/jenisUsaha',
    name: 'jenisUsaha',
    component: () => import('../views/dataDemografi/jenisUsaha.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/data_pendidikan',
    name: 'data_pendidikan',
    component: () => import('../views/dataPenduduk/data_pendidikan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_pekerjaan',
    name: 'data_pekerjaan',
    component: () => import('../views/dataPenduduk/data_pekerjaan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_agama',
    name: 'data_agama',
    component: () => import('../views/dataPenduduk/data_agama.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_keluarga',
    name: 'data_keluarga',
    component: () => import('../views/dataPenduduk/data_keluarga.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_piramidaPenduduk',
    name: 'data_piramidaPenduduk',
    component: () => import('../views/dataPenduduk/data_piramidaPenduduk.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_statusSosial',
    name: 'data_statusSosial',
    component: () => import('../views/dataPenduduk/data_statusSosial.vue'),
    beforeEnter: mainGetId,
  }, 


  {
    path: '/layananPendidikan',
    name: 'layananPendidikan',
    component: () => import('../views/dataFasilitasUmum/layananPendidikan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananPemerintahan',
    name: 'layananPemerintahan',
    component: () => import('../views/dataFasilitasUmum/layananPemerintahan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananKesehatan',
    name: 'layananKesehatan',
    component: () => import('../views/dataFasilitasUmum/layananKesehatan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananUmum',
    name: 'layananUmum',
    component: () => import('../views/dataFasilitasUmum/layananUmum.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananKeagamaan',
    name: 'layananKeagamaan',
    component: () => import('../views/dataFasilitasUmum/layananKeagamaan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/saranaPenunjang',
    name: 'saranaPenunjang',
    component: () => import('../views/dataFasilitasUmum/saranaPenunjang.vue'),
    beforeEnter: mainGetId,
  },
  
  // ================================

  // ================================ DESA
{
    path: '/dataPegawai_desa',
    name: 'dataPegawai_desa',
    component: () => import('../views/desa/dataPegawai/dataPegawai.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/luasWilayah_desa',
    name: 'luasWilayah_desa',
    component: () => import('../views/desa/dataDemografi/luasWilayah.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/potensiWilayah_desa',
    name: 'potensiWilayah_desa',
    component: () => import('../views/desa/dataDemografi/potensiWilayah.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/jenisUsaha_desa',
    name: 'jenisUsaha_desa',
    component: () => import('../views/desa/dataDemografi/jenisUsaha.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/data_pendidikan_desa',
    name: 'data_pendidikan_desa',
    component: () => import('../views/desa/dataPenduduk/data_pendidikan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_pekerjaan_desa',
    name: 'data_pekerjaan_desa',
    component: () => import('../views/desa/dataPenduduk/data_pekerjaan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_agama_desa',
    name: 'data_agama_desa',
    component: () => import('../views/desa/dataPenduduk/data_agama.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_keluarga_desa',
    name: 'data_keluarga_desa',
    component: () => import('../views/desa/dataPenduduk/data_keluarga.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_piramidaPenduduk_desa',
    name: 'data_piramidaPenduduk_desa',
    component: () => import('../views/desa/dataPenduduk/data_piramidaPenduduk.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/data_statusSosial_desa',
    name: 'data_statusSosial_desa',
    component: () => import('../views/desa/dataPenduduk/data_statusSosial.vue'),
    beforeEnter: mainGetId,
  }, 


  {
    path: '/layananPendidikan_desa',
    name: 'layananPendidikan_desa',
    component: () => import('../views/desa/dataFasilitasUmum/layananPendidikan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananPemerintahan_desa',
    name: 'layananPemerintahan_desa',
    component: () => import('../views/desa/dataFasilitasUmum/layananPemerintahan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananKesehatan_desa',
    name: 'layananKesehatan_desa',
    component: () => import('../views/desa/dataFasilitasUmum/layananKesehatan.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananUmum_desa',
    name: 'layananUmum_desa',
    component: () => import('../views/desa/dataFasilitasUmum/layananUmum.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/layananKeagamaan_desa',
    name: 'layananKeagamaan_desa',
    component: () => import('../views/desa/dataFasilitasUmum/layananKeagamaan.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/saranaPenunjang_desa',
    name: 'saranaPenunjang_desa',
    component: () => import('../views/desa/dataFasilitasUmum/saranaPenunjang.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/katalogPerpus',
    name: 'katalogPerpus',
    component: () => import('../views/perpustakaan/katalogPerpus.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/katalogPerpusDetile',
    name: 'katalogPerpusDetile',
    component: () => import('../views/perpustakaan/katalogPerpusDetile.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/kegiatanPerpus',
    name: 'kegiatanPerpus',
    component: () => import('../views/perpustakaan/kegiatanPerpus.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/kegiatanPerpusDetile',
    name: 'kegiatanPerpusDetile',
    component: () => import('../views/perpustakaan/kegiatanPerpusDetile.vue'),
    beforeEnter: mainGetId,
  },


  // ================================ DESA

  {
    path: '/dok_transparansi',
    name: 'dok_transparansi',
    component: () => import('../views/dokumen/transparansi.vue'),
    beforeEnter: mainGetId,
  },
  {
    path: '/dok_produkHukum',
    name: 'dok_produkHukum',
    component: () => import('../views/dokumen/produkHukum.vue'),
    beforeEnter: mainGetId,
  },
 
  {
    path: '/dok_lainnya',
    name: 'dok_lainnya',
    component: () => import('../views/dokumen/lainnya.vue'),
    beforeEnter: mainGetId,
  },










  // ================================ SURAT
  {
    path: '/menuSurat',
    name: 'menuSurat',
    component: () => import('../views/suratKeterangan/menuSurat.vue'),
    beforeEnter: mainGetId,
  },

  {
    path: '/suketAhliWaris',
    name: 'suketAhliWaris',
    component: () => import('../views/suratKeterangan/suketAhliWaris.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/suketBelumMenikah',
    name: 'suketBelumMenikah',
    component: () => import('../views/suratKeterangan/suketBelumMenikah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketBerdomisili',
    name: 'suketBerdomisili',
    component: () => import('../views/suratKeterangan/suketBerdomisili.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketPindahDomisili',
    name: 'suketPindahDomisili',
    component: () => import('../views/suratKeterangan/suketPindahDomisili.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakBekerja',
    name: 'suketTidakBekerja',
    component: () => import('../views/suratKeterangan/suketTidakBekerja.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakMampu',
    name: 'suketTidakMampu',
    component: () => import('../views/suratKeterangan/suketTidakMampu.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketTidakMemilikiRumah',
    name: 'suketTidakMemilikiRumah',
    component: () => import('../views/suratKeterangan/suketTidakMemilikiRumah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketUsaha',
    name: 'suketUsaha',
    component: () => import('../views/suratKeterangan/suketUsaha.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/suketLainnya',
    name: 'suketLainnya',
    component: () => import('../views/suratKeterangan/suketLainnya.vue'),
    beforeEnter: isLoggedIn,
  },



  // ================================ SURAT
 
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
