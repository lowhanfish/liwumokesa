import { Loading, QSpinnerFacebook, } from 'quasar'
import { Notify } from 'quasar'

import Vue from 'vue'
import Vuex from 'vuex'
import Menu from '../router/menu'



Vue.use(Vuex)




// var URL = 'http://localhost:5011/';
var URL = 'https://serverdesa.konaweselatankab.go.id/';

var URL_CLIENT = 'https://desa.konaweselatankab.go.id/';
// var URL_CLIENT = 'http://localhost:8080';


export default new Vuex.Store({
  state: {
    menu : Menu.menu,
    KAT : 'Desa', //(Desa, Kelurahan)
    DES_KEL : '-',
    // ID_DES_KEL : 'lainea2',
    // ID_DES_KEL : 'moramo_utara4',


    url: {
      APP_NAME : 'Liwu Mokesa',
      URL_CLIENT : URL_CLIENT,
      URL_APP: URL,

      URL_CNT_CAPAIAN_KEGIATAN: URL + 'api/v1/cnt_capaianKegiatan/',
      URL_CNT_GALLERY_FOTO: URL + 'api/v1/cnt_galleryFoto/',
      URL_CNT_GALLERY_VIDEO: URL + 'api/v1/cnt_galleryVideo/',
      URL_CNT_GALLERY_INFOGRAFIS: URL + 'api/v1/cnt_galleryInfografis/',
      URL_CNT_KEGIATAN_TERBARU: URL + 'api/v1/cnt_kegiatanTerbaru/',
      URL_CNT_PROFIL_BUPATI: URL + 'api/v1/cnt_profilBupati/',
      URL_CNT_WAKIL_BUPATI: URL + 'api/v1/cnt_profilWakilBupati/',
      URL_CNT_PROGRAM_USULAN: URL + 'api/v1/cnt_programUsulan/',
      URL_CNT_MISI: URL + 'api/v1/cnt_misi/',
      URL_CNT_VISI: URL + 'api/v1/cnt_visi/',
      URL_CNT_BUMDES: URL + 'api/v1/cnt_bumdes/',

      URL_CNT_DESA_KELEMBAGAAN: URL + 'api/v1/cnt_desa_kelembagaan/',



      URL_CNT_CAROUSELL: URL + 'api/v1/cnt_carousell/',

      URL_CNT_WILAYAH: URL + 'api/v1/cnt_wilayah/',
      URL_CNT_KAB_KOTA: URL + 'api/v1/cnt_kab_kota/',
      URL_CNT_KECAMATAN: URL + 'api/v1/cnt_kecamatan/',
      URL_CNT_DES_KEL: URL + 'api/v1/cnt_des_kel/',
      
      
      URL_CNT_DESA_BATAS_LUAS_WILAYAH: URL + 'api/v1/cnt_desa_batas_luasWilayah/',
      URL_CNT_DESA_POTENSI_WILAYAH: URL + 'api/v1/cnt_desa_potensiWiayah/',
      URL_CNT_DESA_JENIS_USAHA: URL + 'api/v1/cnt_desa_jenis_usaha/',

      URL_CNT_DESA_DATA_PENDIDIKAN: URL + 'api/v1/cnt_desa_data_pendidikan/',
      URL_CNT_DESA_DATA_PEKERJAAN: URL + 'api/v1/cnt_desa_data_pekerjaan/',
      URL_CNT_DESA_DATA_AGAMA: URL + 'api/v1/cnt_desa_data_agama/',
      URL_CNT_DESA_DATA_KELUARGA: URL + 'api/v1/cnt_desa_data_keluarga/',
      URL_CNT_DESA_DATA_PIRAMID_PENDUDUK: URL + 'api/v1/cnt_desa_data_piramid_penduduk/',
      URL_CNT_DESA_DATA_STATUS_SOSIAL: URL + 'api/v1/cnt_desa_data_status_sosial/',

      URL_CNT_DESA_FASILITAS_KEAGAMAAN: URL + 'api/v1/cnt_desa_fasilitasKeagamaan/',
      URL_CNT_DESA_FASILITAS_KESEHATAN: URL + 'api/v1/cnt_desa_fasilitasKesehatan/',
      URL_CNT_DESA_FASILITAS_PEMERINTAHAN: URL + 'api/v1/cnt_desa_fasilitasPemerintahan/',
      URL_CNT_DESA_FASILITAS_PENDIDIKAN: URL + 'api/v1/cnt_desa_fasilitasPendidikan/',
      URL_CNT_DESA_FASILITAS_PENUNJANG: URL + 'api/v1/cnt_desa_fasilitasPenunjang/',
      URL_CNT_DESA_FASILITAS_UMUM: URL + 'api/v1/cnt_desa_fasilitasUmum/',

      URL_CNT_DESA_DATA_PEGAWAI: URL + 'api/v1/cnt_desa_dataPegawai/',

      URL_CNT_DESA_DOK_TRANSPARANSI: URL + 'api/v1/cnt_desa_transparansi/',
      URL_CNT_DESA_DOK_PRODUK_HUKUM: URL + 'api/v1/cnt_desa_produkHukum/',
      URL_CNT_DESA_DOK_LAINNYA: URL + 'api/v1/cnt_desa_lainnya/',

      URL_CNT_DESA_PERPUSTAKAAN: URL + 'api/v1/cnt_desa_perpustakaanDigital/',
      URL_CNT_DESA_PERPUSTAKAAN_KEG: URL + 'api/v1/cnt_desa_perpustakaanDigitalKeg/',

      URL_CNT_KECAMATAN_KECAMATAN     : URL + 'api/v1/cnt_kecamatan_kecamatan/', 
      URL_CNT_KECAMATAN_LUAS_WILAYAH  : URL + 'api/v1/cnt_kecamatan_luasWilayah/', 

      URL_CNT_KECAMATAN_DASHBOARD  : URL + 'api/v1/cnt_kecamatan_dashboard/', 

      URL_CNT_REGISTRASI: URL + 'api/v1/cnt_registrasi/',


      URL_MASTER_AGAMA: URL + 'api/v1/masterAgama/',
      URL_MASTER_PEKERJAAN: URL + 'api/v1/masterPekerjaan/',

      URL_srv_suketAhliWaris : URL + 'api/v1/srv_suketAhliWaris/',
      URL_srv_suketBelumMenikah : URL + 'api/v1/srv_suketBelumMenikah/',
      URL_srv_suketBerdomisili : URL + 'api/v1/srv_suketBerdomisili/',
      URL_srv_suketPindahDomisili : URL + 'api/v1/srv_suketPindahDomisili/',
      URL_srv_suketTidakBekerja : URL + 'api/v1/srv_suketTidakBekerja/',
      URL_srv_suketTidakMampu : URL + 'api/v1/srv_suketTidakMampu/',
      URL_srv_suketTidakMemilikiRumah : URL + 'api/v1/srv_suketTidakMemilikiRumah/',
      URL_srv_suketUsaha: URL + 'api/v1/srv_suketUsaha/',
      URL_srv_suketLainnya: URL + 'api/v1/srv_suketLainnya/',
      
      URL_srv_masterJenisSuket: URL + 'api/v1/masterJenisSuket/',
      URL_srv_suket: URL + 'api/v1/suket/',

// cnt_kecamatan_batas_luasWilayah
// cnt_kecamatan_jenisUsaha
// cnt_kecamatan_potensiWilayah

      URL_MasterKategori: URL + '/api/v1/dataMasterkategoriAbsen/',



      
    },
    kegiatan : {
      id: "",
      judul: "",
      uraian: "",
      sumber: "",
      deskripsi: "",
      createdAt: "",
      createdBy: "",
      file: null,
      fileThumb: null
    },
    tahun: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],

    JENIS_KELAMIN : [
      {id : 'L', uraian : 'Laki-Laki'},
      {id : 'P', uraian : 'Perempuan'}
    ],

    STATUS_SOSIAL : [
      {id : 'K', uraian : 'Kawin'},
      {id : 'BK', uraian : 'Belum Kawin'},
      {id : 'J', uraian : 'Janda'},
      {id : 'D', uraian : 'Duda'}
    ],

    STATUS_TPT_USAHA : [
      {id : 'MS', uraian : 'Milik Sendiri'},
      {id : 'K', uraian : 'Kontrak'},
      {id : 'S', uraian : 'Sewa'},
      {id : 'L', uraian : 'Lainnya'}
    ],

    userx : {
      nama : '',
      email : '',
      hp : '',
    },
    
    page_first_perpus: 1,
    page_last_perpus: 0,
    COBA_HAPUS : 'xxxxxxx',

    CHECK_AUTH : true,



    list_pelaops : [],
    list_usaha : [],
    list_pelatihan : [],
    list_kendaraan : [],
    list_sarana : [],
    list_usahaKeuangan : [],
    list_keuangan_modal : [],
    list_keuangan_laporan : [],
    list_keuangan_kerjaSama : [],
    list_keuangan_pendampingan : [],
    list_keuangan_intensitas : [],


    VISITOR : 0,


  },
  mutations: {
    getOne(state) {

      const spinner = typeof QSpinnerFacebook !== 'undefined'
        ? QSpinnerFacebook // Non-UMD, imported above
        : Quasar.components.QSpinnerFacebook // eslint-disable-line


      Loading.show({
        spinner,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
      })



      fetch(state.url.URL_CNT_KEGIATAN_TERBARU + "getOne", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          id : state.kegiatan.id
        })
      })
        .then(res => res.json())
        .then(res_data => {
          Loading.hide()
          state.kegiatan = {
            id: res_data.id,
            judul: res_data.judul,
            uraian: res_data.uraian,
            sumber: res_data.sumber,
            deskripsi: res_data.deskripsi,
            createdAt: res_data.createdAt,
            createdBy: res_data.createdBy,
            file: res_data.file,
            fileThumb: res_data.fileThumb
          };
        });
    },

    shoWLoading() {
      const spinner = typeof QSpinnerFacebook !== 'undefined'
        ? QSpinnerFacebook // Non-UMD, imported above
        : Quasar.components.QSpinnerFacebook // eslint-disable-line


      Loading.show({
        spinner,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
      })
    },
    hideLoading() {
      Loading.hide()
    },
  },
  actions: {
  },
  modules: {
  }
})
