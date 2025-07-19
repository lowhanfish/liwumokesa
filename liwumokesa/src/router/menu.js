// import {store1} from '../store/index'

var DataStore = require('../store');
var store = DataStore.default

// const fetchPOST =  () =>{
//     return 'store.state.url.URL_APP'
// }

const menu = [
    {
      router : '/',
      nama : 'Home',
      type : 'single',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'home',
      color : 'orange',
    },
    {
      router : '/kegiatan',
      nama : 'Kegiatan',
      type : 'single',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'art_track',
      color : 'orange',
    },
    // {
    //   router : '/',
    //   nama : 'Profil',
    //   type : 'multi',
    //   icon_color : 'white',
    //   text_color : '#676767',
    //   icon : 'supervisor_account',
    //   color : 'orange',
    //   submenu : [
    //     {
    //       router : '/profilBup',
    //       nama : 'Profil Calon Bupati',
    //       type : 'single'
    //     },
    //     {
    //       router : '/profilCawabup',
    //       nama : 'Profil Calon Wakil Bupati',
    //       type : 'single'
    //     }
    //   ]
    // },
    // {
    //   router : '/',
    //   nama : 'Visi/Misi',
    //   type : 'multi',
    //   icon_color : 'white',
    //   text_color : '#676767',
    //   icon : 'extension',
    //   color : 'orange',
    //   submenu : [
    //     {
    //       router : '/visi',
    //       nama : 'Visi',
    //       type : 'single'
    //     },
    //     {
    //       router : '/misi',
    //       nama : 'Misi',
    //       type : 'single'
    //     }
    //   ]
    // },

    // ============================================= TAMBAHAN ======================================
    // luasWilayah
  // =============================================== KECAMATAN =====================================
    // {
    //   router : '/',
    //   nama : 'Kecamatan',
    //   type : 'multi',
    //   icon_color : 'white',
    //   text_color : '#676767',
    //   icon : 'supervisor_account',
    //   color : 'orange',
    //   submenu : [
    //     {
    //       router : '/dataPegawai',
    //       nama : 'Data Pegawai',
    //       type : 'single'
    //     },
    //     {
    //       router : '/luasWilayah',
    //       nama : 'LuasWilayah',
    //       type : 'single'
    //     },
    //     {
    //       router : '/potensiWilayah',
    //       nama : 'Potensi Wilayah',
    //       type : 'single'
    //     },
    //     {
    //       router : '/jenisUsaha',
    //       nama : 'Jenis Usaha',
    //       type : 'single'
    //     },

    //     // Data Penduduk
    //     {
    //       router : '/data_pendidikan',
    //       nama : 'Data Pendidikan',
    //       type : 'single'
    //     },
    //     {
    //       router : '/data_pekerjaan',
    //       nama : 'Data Pekerjaan',
    //       type : 'single'
    //     },
    //     {
    //       router : '/data_agama',
    //       nama : 'Data Agama',
    //       type : 'single'
    //     },
    //     {
    //       router : '/data_keluarga',
    //       nama : 'Data Keluarga',
    //       type : 'single'
    //     },
    //     {
    //       router : '/data_piramidaPenduduk',
    //       nama : 'Data Piramida Penduduk',
    //       type : 'single'
    //     },
    //     {
    //       router : '/data_statusSosial',
    //       nama : 'Data Status Sosial',
    //       type : 'single'
    //     },
    //     // Data Fasilitas Umum
    //     {
    //       router : '/layananPendidikan',
    //       nama : 'Layanan Pendidikan',
    //       type : 'single'
    //     }, 
    //     {
    //       router : '/layananPemerintahan',
    //       nama : 'Layanan Pemerintahan',
    //       type : 'single'
    //     }, 
    //     {
    //       router : '/layananKesehatan',
    //       nama : 'Layanan Kesehatan',
    //       type : 'single'
    //     }, 
    //     {
    //       router : '/layananUmum',
    //       nama : 'Layanan Umum',
    //       type : 'single'
    //     }, 
    //     {
    //       router : '/layananKeagamaan',
    //       nama : 'Layanan Keagamaan',
    //       type : 'single'
    //     }, 
    //     {
    //       router : '/saranaPenunjang',
    //       nama : 'Layanan Penunjang',
    //       type : 'single'
    //     }, 
    //   ]
    // },
  // =============================================== KECAMATAN =====================================
  // =============================================== DESA =====================================
  {
    router : '/',
    nama : 'Profil',
    type : 'multi',
    icon_color : 'white',
    text_color : '#676767',
    icon : 'supervisor_account',
    color : 'orange',
    submenu : [
      {
        router : '/dataPegawai_desa',
        nama : 'Sejarah',
        type : 'single'
      },
      {
        router : '/visi',
        nama : 'Visi-Misi',
        type : 'single'
      },
      {
        router : '/programUsulan',
        nama : 'Program Kerja',
        type : 'single'
      },
      {
        router : '/capaian',
        nama : 'Capaian/Prestasi',
        type : 'single'
      },
      {
        router : '/dataPegawai',
        nama : 'Tupoksi',
        type : 'single'
      },
      {
        router : '/dataPegawai',
        nama : 'Data Pegawai',
        type : 'single'
      },

    
    ]
  },
  {
    router : '/',
    nama : 'Demografi',
    type : 'multi',
    icon_color : 'white',
    text_color : '#676767',
    icon : 'supervisor_account',
    color : 'orange',
    submenu : [
      
      {
        router : '/luasWilayah_desa',
        nama : 'LuasWilayah',
        type : 'single'
      },
      {
        router : '/potensiWilayah_desa',
        nama : 'Potensi Wilayah',
        type : 'single'
      },
      {
        router : '/jenisUsaha_desa',
        nama : 'Jenis Usaha',
        type : 'single'
      },
      {
        router : '/data_pendidikan_desa',
        nama : 'Data Pendidikan',
        type : 'single'
      },
      {
        router : '/data_pekerjaan_desa',
        nama : 'Data Pekerjaan',
        type : 'single'
      },
      {
        router : '/data_agama_desa',
        nama : 'Data Agama',
        type : 'single'
      },
      {
        router : '/data_keluarga_desa',
        nama : 'Data Keluarga',
        type : 'single'
      },
      {
        router : '/data_piramidaPenduduk_desa',
        nama : 'Data Piramida Penduduk',
        type : 'single'
      },
      {
        router : '/data_statusSosial_desa',
        nama : 'Data Status Sosial',
        type : 'single'
      },
    ]
  },
  {
    router : '/',
    nama : 'Fasilitas Layanan',
    type : 'multi',
    icon_color : 'white',
    text_color : '#676767',
    icon : 'supervisor_account',
    color : 'orange',
    submenu : [
      
      {
        router : '/layananPendidikan_desa',
        nama : 'Layanan Pendidikan',
        type : 'single'
      }, 
      {
        router : '/layananPemerintahan_desa',
        nama : 'Layanan Pemerintahan',
        type : 'single'
      }, 
      {
        router : '/layananKesehatan_desa',
        nama : 'Layanan Kesehatan',
        type : 'single'
      }, 
      {
        router : '/layananUmum_desa',
        nama : 'Layanan Umum',
        type : 'single'
      }, 
      {
        router : '/layananKeagamaan_desa',
        nama : 'Layanan Keagamaan',
        type : 'single'
      }, 
      {
        router : '/saranaPenunjang_desa',
        nama : 'Layanan Penunjang',
        type : 'single'
      }, 
    ]
  },

// =============================================== DESA =====================================

 
 
    // ============================================= TAMBAHAN ======================================

    {
      router : '/',
      nama : 'Dokumen',
      type : 'multi',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'insert_photo',
      color : 'orange',
      submenu : [
        {
          router : '/dok_produkHukum',
          nama : 'Produk Hukum',
          type : 'single'
        },
        {
          router : '/dok_transparansi',
          nama : 'Transparansi',
          type : 'single'
        },
        {
          router : '/dok_lainnya',
          nama : 'Lainnya',
          type : 'single'
        },
      ]
    },
    {
      router : '/',
      nama : 'Perpustakaan',
      type : 'multi',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'insert_photo',
      color : 'orange',
      submenu : [
        {
          router : '/kegiatanPerpus',
          nama : 'Kegiatan',
          type : 'single'
        },
        {
          router : '/katalogPerpus',
          nama : 'Katalog',
          type : 'single'
        }
      ]
    },

    {
      router : '/',
      nama : 'Gellery',
      type : 'multi',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'insert_photo',
      color : 'orange',
      submenu : [
        {
          router : '/foto',
          nama : 'Foto',
          type : 'single'
        },
        {
          router : '/video',
          nama : 'Video',
          type : 'single'
        }
      ]
    },
  ];



module.exports = {
    menu: menu,


}