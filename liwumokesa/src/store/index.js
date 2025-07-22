import Vue from 'vue'
import Vuex from 'vuex'

import { Loading, QSpinnerFacebook, } from 'quasar'
import { Notify } from 'quasar'

// var URL = 'http://localhost:5011/';
var URL = 'https://desa.munabarat.go.id/';
// var URL = 'http://192.168.1.8:5011/';
// :8080
// var URL = 'https://serverdesa.konaweselatankab.go.id/';

// 192.168.1.126:8081

// import Menu from '../library/menu'

Vue.use(Vuex)



const store1 = {
  state: {
    APP_NAME : 'Liwu Mokesa',
    KAT : 'Desa', //(Desa, Kelurahan)
    // ID_DES_KEL : 'moramo_utara4',
    ID_DES_KEL : 'konda12',
    KECAMATAN : '',
    DES_KEL : '',
    // menu : Menu.menu,
    coordinat: {
      lat: -4.034694,
      lng: 122.484263
    },
    btn: {
      add: false,
      edit: false,
      remove: false,
    },
    url: {
      URL_APP: URL,
      URL_DASHBOARD: URL + 'api/v1/dashboard/',
      URL_MENU_LIST: URL + 'api/v1/menuList/',
      URL_LEVEL_USERS: URL + 'api/v1/levelUsers/',
      URL_REGISTRASI: URL + 'api/v1/pengaturan_registrasi/',
      URL_DATAMASTER_WILAYAH: URL + 'api/v1/dm_wilayah/',
      URL_DATAMASTER_KAB_KOTA: URL + 'api/v1/dm_kab_kota/',
      URL_DATAMASTER_KECAMATAN: URL + 'api/v1/dm_kecamatan/',
      URL_DATAMASTER_DES_KEL: URL + 'api/v1/dm_des_kel/',

      URL_KECAMATAN_PUBLISH: URL + 'api/v1/kecamatan_kecamatan/',
      URL_ADM_KECAMATAN_BATAS_WILAYAH: URL + 'api/v1/kecamatan_batas_luasWilayah/',
      URL_ADM_KECAMATAN_DATA_PEGAWAI: URL + 'api/v1/kecamatan_dataPegawai/',

      URL_DATAMASTER_AGAMA: URL + 'api/v1/masterAgama/',
      URL_DATAMASTER_PEKERJAAN: URL + 'api/v1/masterPekerjaan/',
      URL_DATAMASTER_PENDIDIKAN: URL + 'api/v1/masterPendidikan/',

      URL_DATAMASTER_JENIS_USAHA: URL + 'api/v1/masterJenisUsaha/',
      URL_DATAMASTER_POTENSI_WILAYAH: URL + 'api/v1/masterPotensiWilayah/',

      URL_DATAMASTER_FASILITAS_KEAGAMAAN: URL + 'api/v1/masterFasilitasKeagamaan/',
      URL_DATAMASTER_FASILITAS_KESEHATAN: URL + 'api/v1/masterFasilitasKesehatan/',
      URL_DATAMASTER_FASILITAS_PEMERINTAHAN: URL + 'api/v1/masterFasilitasPemerintahan/',
      URL_DATAMASTER_FASILITAS_PENDIDIKAN: URL + 'api/v1/masterFasilitasPendidikan/',
      URL_DATAMASTER_FASILITAS_PENUNJANG: URL + 'api/v1/masterFasilitasPenunjang/',
      URL_DATAMASTER_FASILITAS_UMUM: URL + 'api/v1/masterFasilitasUmum/',

      URL_DATAMASTER_PRODUK_HUKUM: URL + 'api/v1/masterProdukHukum/',
     

      URL_ADM_CAPAIAN_KEGIATAN: URL + 'api/v1/adm_capaianKegiatan/',
      URL_ADM_GALLERY_FOTO: URL + 'api/v1/adm_galleryFoto/',
      URL_ADM_GALLERY_VIDEO: URL + 'api/v1/adm_galleryVideo/',
      URL_ADM_GALLERY_INFOGRAFIS: URL + 'api/v1/adm_galleryInfografis/',

      URL_ADM_KEGIATAN_TERBARU: URL + 'api/v1/adm_kegiatanTerbaru/',
      URL_ADM_PROFIL_BUPATI: URL + 'api/v1/adm_profilCamat/',
      URL_ADM_WAKIL_BUPATI: URL + 'api/v1/adm_profilPegawai/',
      URL_ADM_PROGRAM_USULAN: URL + 'api/v1/adm_programUsulan/',
      URL_ADM_MISI: URL + 'api/v1/adm_misi/',
      URL_ADM_VISI: URL + 'api/v1/adm_visi/',
      URL_ADM_CAROUSELL: URL + 'api/v1/adm_carousell/',

      URL_ADM_DESA_AGAMA: URL + 'api/v1/desa_agama/',
      URL_ADM_DESA_KELUARGA: URL + 'api/v1/desa_keluarga/',
      URL_ADM_DESA_PEKERJAAN: URL + 'api/v1/desa_pekerjaan/',
      URL_ADM_DESA_PENDIDIKAN: URL + 'api/v1/desa_pendidikan/',
      URL_ADM_DESA_PIRAMIDA_PENDUDUK: URL + 'api/v1/desa_piramidaPenduduk/',
      URL_ADM_DESA_STATUS_SOSIAL: URL + 'api/v1/desa_statusSosial/',

      URL_ADM_DESA_DOK_JDIH: URL + 'api/v1/desa_dok_jdih/',
      URL_ADM_DESA_DOK_TRANSPARANSI: URL + 'api/v1/desa_dok_transparansi/',
      URL_ADM_DESA_DOK_LAINNYA: URL + 'api/v1/desa_dok_lainnya/',
      URL_ADM_DESA_DOK_DESA: URL + 'api/v1/desa_dok_dokumenDesa/',
      URL_ADM_DESA_DOK_PERMINTAAN: URL + 'api/v1/desa_dok_permintaanDokumen/',
      URL_ADM_DESA_DOK_PENYETORAN: URL + 'api/v1/desa_dok_penyetoranDokumen/',
      URL_ADM_DESA_DOK_PERPUSTAKAAN_DIGITAL: URL + 'api/v1/desa_dok_perpustakaanDigital/',
      URL_ADM_DESA_DOK_PERPUSTAKAAN_DIGITAL_KEGIATAN: URL + 'api/v1/desa_dok_perpustakaanDigitalKeg/',

      URL_ADM_FASILITAS_KEAGAMAAN: URL + 'api/v1/fasilitasKeagamaan/',
      URL_ADM_FASILITAS_KESEHATAN: URL + 'api/v1/fasilitasKesehatan/',
      URL_ADM_FASILITAS_PEMERINTAHAN: URL + 'api/v1/fasilitasPemerintahan/',
      URL_ADM_FASILITAS_PENDIDIKAN: URL + 'api/v1/fasilitasPendidikan/',
      URL_ADM_FASILITAS_PENUNJANG: URL + 'api/v1/fasilitasPenunjang/',
      URL_ADM_FASILITAS_UMUM: URL + 'api/v1/fasilitasUmum/',

      URL_ADM_DESA_BATAS_WILAYAH: URL + 'api/v1/desa_batas_luasWilayah/',
      URL_ADM_DESA_JENIS_USAHA: URL + 'api/v1/desa_jenisUsaha/',
      URL_ADM_DESA_POTENSI_WILAYAH: URL + 'api/v1/desa_potensiWiayah/',

      URL_ADM_DESA_PEGAWAI: URL + 'api/v1/desa_dataPegawai/',


      

      URL_MasterKategori: URL + '/api/v1/dataMasterkategoriAbsen/',

      URL_srv_suketAhliWaris : URL + 'api/v1/srv_suketAhliWaris/',
      URL_srv_suketBelumMenikah : URL + 'api/v1/srv_suketBelumMenikah/',
      URL_srv_suketBerdomisili : URL + 'api/v1/srv_suketBerdomisili/',
      URL_srv_suketPindahDomisili : URL + 'api/v1/srv_suketPindahDomisili/',
      URL_srv_suketTidakBekerja : URL + 'api/v1/srv_suketTidakBekerja/',
      URL_srv_suketTidakMampu : URL + 'api/v1/srv_suketTidakMampu/',
      URL_srv_suketTidakMemilikiRumah : URL + 'api/v1/srv_suketTidakMemilikiRumah/',
      URL_srv_suketUsaha: URL + 'api/v1/srv_suketUsaha/',
      URL_srv_suketLainnya : URL + 'api/v1/srv_suketLainnya/',

      URL_srv_bumdes_kelembagaan : URL + 'api/v1/bumDesa_kelembagaan/',

      URL_srv_ipd_master_dimensi : URL + 'api/v1/ipd_master_dimensi/',
      URL_srv_ipd_master_variabel : URL + 'api/v1/ipd_master_variabel/',
      URL_srv_ipd_master_indikator : URL + 'api/v1/ipd_master_indikator/',

      URL_srv_ipd_ipd : URL + 'api/v1/ipd_ipd/',
      URL_srv_ipd_verifikasiIPD: URL + 'api/v1/ipd_verifikasiIPD/',
      
      URL_srv_masterJenisSuket: URL + 'api/v1/masterJenisSuket/',
      URL_srv_suket: URL + 'api/v1/suket/',



      URL_DATAMASTER_JENIS_PAMONG: URL + 'api/v1/masterJenisPamong/',
      URL_DATAMASTER_JENIS_PAMONG_JABATAN: URL + 'api/v1/masterJenisPamongJabatan/',
      URL_DATAMASTER_KELOMPOK_PAMONG_JABATAN: URL + 'api/v1/masterKelompokPamongJabatan/',

      URL_srv_desa_riwayatPendidikanNonFormal: URL + 'api/v1/desa_riwayatPendidikanNonFormal/',
      URL_srv_desa_riwayatPendidikanFormal: URL + 'api/v1/desa_riwayatPendidikanFormal/',
      URL_srv_desa_riwayatjabatan: URL + 'api/v1/desa_riwayatjabatan/',
      URL_srv_desa_riwayatKeluarga: URL + 'api/v1/desa_riwayatKeluarga/',
      URL_srv_desa_riwayatPrestasi: URL + 'api/v1/desa_riwayatPrestasi/',


    },



    aksesWilayah : [
      {id:0, uraian : 'Satu Desa'},
      {id:1, uraian : 'Satu Kecamatan'},
      {id:2, uraian : 'Satu Kabupaten'},
    ],


    kamio: 'cccccc',
    tahun: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    sumberKOps: ['Hibah', 'Pengadaan BUMDes', 'Lainnya'],

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

    STATUS_KELUARGA : [
      {id : 'Anak', uraian : 'Anak'},
      {id : 'Istri', uraian : 'Istri'},
    ],

    listProv: [],
    listKabKota: [],
    listKec: [],
    listDesKel: [],
    listMenu : [],
    listVisi: [],

    listJenisUsaha : [],
    listPotensiWilayah : [],

    listFasilitasKeagamaan : [],
    listFasilitasKesehatan : [],
    listFasilitasPemerintah : [],
    listFasilitasPendidikan : [],
    listFasilitasPenunjang : [],
    listFasilitasUmum : [],


    listPendidikan : [],
    listAgama : [],
    listPekerjaan : [],
    listKeluarga : [],
    listStatusSosial : [],

    listDimensi : [],
    listVariabel : [],
    listIndikator : [],


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



    cek_load_data: true,

    max_rekrut : 30,
    min_persentase : 39.5,


  },
  mutations: {

    getStorage(state) {
      var get_profile = JSON.parse(localStorage.profile);
      state.unit_kerja = get_profile.profile.unit_kerja;
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
    shoWNotify(state, message, color, icon) {
      Notify.create({
        message: message,
        color: color,
        position: 'top-right',
        icon: icon
      })
    },

    getProv(state) {
      fetch(state.url.URL_DATAMASTER_WILAYAH + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          cari_value: ''
        })
      })
        .then(res => res.json())
        .then(res_data => {
          state.listProv = res_data
        });
    },


    addEditor() {
      setTimeout(() => {


        new FroalaEditor('textarea#editor', {
          placeholderText: 'Mulai menuliskan sesuatu..',
          height: 350,
          zIndex: 8000,
          tabSpaces: 4,
          indentMargin: 10,
          attribution: false,
          imageUpload: true,
          imageDefaultAlign: 'left',
          // imageDefaultDisplay: 'inline-block',
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          imageMaxSize: 5 * 1024 * 1024,
          tableStyles: {
            class1: 'Alternate Rows',
            class2: 'Dashed Borders',
            class3: 'No Border'
          },
          // imageManagerLoadURL: "http://localhost:5010/images/",
          tableColors: [
            '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
            '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
            '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
            '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
          ],
          events: {
            "image.beforeUpload": function (files) {
              var editor = this;
              // console.log('image di pangggil')

              if (files.length) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  var result = e.target.result;
                  editor.image.insert(result, null, null, editor.image.get());
                };
                reader.readAsDataURL(files[0]);
              }
              editor.popups.hideAll();


              // var formData = new FormData();

              // formData.append("file", files[0]);
              // fetch(this.$store.state.url.URL_ADM_CAPAIAN_KEGIATAN + "addFoto", {
              //   method: "POST",
              //   headers: {
              //     // "content-type": "application/json",
              //     authorization: "kikensbatara " + localStorage.token
              //   },
              //   body: formData
              // }).then(res_data => {

              // });












              return false;
            }
          }






        })
      }, 50);

    },



  },
  actions: {
  },
  modules: {
  }
}

const DataStore = new Vuex.Store(store1);
export default DataStore;



