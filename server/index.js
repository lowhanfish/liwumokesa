const express = require('express');
var db = require('./db/Arango/connections');
const volleyball = require('volleyball');
const cors = require('cors');
var path = require("path");
const http = require ('http')
const fs = require('fs')
// ======================== WA BLASTER =========================
// const SocketIo = require('socket.io');

// ======================== WA BLASTER =========================

require('dotenv').config();


const app = express();


// ======================== WA BLASTER =========================
const serverx = http.createServer(app);
// const middleware_IO = require('./auth/middleware_IO');

// ======================== WA BLASTER =========================



var serveIndex = require('serve-index');

const middleware = require('./auth/middlewares');
const auth = require('./auth');

const dm_wilayah = require('./apiMysql/data_master/wilayah');
const dm_kab_kota = require('./apiMysql/data_master/kab_kota');
const dm_kecamatan = require('./apiMysql/data_master/kecamatan');
const dm_des_kel = require('./apiMysql/data_master/des_kel');


// const mc_fraksi = require('./apiMysql/master_caleg/fraksi');
// const mc_caleg = require('./apiMysql/master_caleg/caleg');



// const reg_register = require('./apiMysql/data_master/reg_register');



app.use(volleyball);

app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}));
app.use(express.json());

app.use(middleware.checkTokenSeetUser);


// 1. sebelumnya tentukan dulu folder staticnya, maksudnya yg dapat diakses oleh publik tanpa terpengaruh route
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// 2. selanjutnya set dulu inisial folder views-nya 
app.set('views', './views')

// 3. setelah itu kita tentukan template engine yg akan kita gunakan
app.set('view engine', 'ejs')




app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello World!ku 🌈✨🦄',
    user : req.user
  });
});





app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/v1/dm_wilayah', middleware.isLoggedIn, dm_wilayah);
app.use('/api/v1/dm_kab_kota', middleware.isLoggedIn, dm_kab_kota);
app.use('/api/v1/dm_kecamatan', middleware.isLoggedIn, dm_kecamatan);
app.use('/api/v1/dm_des_kel', middleware.isLoggedIn, dm_des_kel);


const checkAuth = require('./apiMysql/coba');
app.use('/checkAuth', middleware.isLoggedIn, checkAuth);

const checkAuthx = require('./apiMysql/coba');
app.use('/checkAuthx', checkAuthx);

const menuList = require('./apiMysql/menuList/menuList');
app.use('/api/v1/menuList', middleware.isLoggedIn, menuList);

const levelUsers = require('./apiMysql/menuList/levelUsers');
app.use('/api/v1/levelUsers', middleware.isLoggedIn, levelUsers);

const pengaturan_registrasi = require('./apiMysql/auth/pengaturan_registrasi');
app.use('/api/v1/pengaturan_registrasi', middleware.isLoggedIn, pengaturan_registrasi);


const dashboard = require('./apiMysql/dashboard/dashboard');
app.use('/api/v1/dashboard', middleware.isLoggedIn, dashboard);

// ================================ ADMIN WEBSITE ===============================
  const adm_capaianKegiatan = require('./apiMysql/website/server/capaian/capaianKegiatan');
  app.use('/api/v1/adm_capaianKegiatan', middleware.isLoggedIn, adm_capaianKegiatan);

  const adm_galleryFoto = require('./apiMysql/website/server/gallery/galleryFoto');
  app.use('/api/v1/adm_galleryFoto', middleware.isLoggedIn, adm_galleryFoto);

  const adm_galleryVideo = require('./apiMysql/website/server/gallery/galleryVideo');
  app.use('/api/v1/adm_galleryVideo', middleware.isLoggedIn, adm_galleryVideo);

  const adm_galleryInfografis = require('./apiMysql/website/server/gallery/galleryInfografis');
  app.use('/api/v1/adm_galleryInfografis', middleware.isLoggedIn, adm_galleryInfografis);

  const adm_carousell = require('./apiMysql/website/server/carousell/carousell');
  app.use('/api/v1/adm_carousell', middleware.isLoggedIn, adm_carousell);

  const adm_kegiatanTerbaru = require('./apiMysql/website/server/kegiatan/kegiatanTerbaru');
  app.use('/api/v1/adm_kegiatanTerbaru', middleware.isLoggedIn, adm_kegiatanTerbaru);

  const adm_profilCamat = require('./apiMysql/website/server/profil/profilCamat');
  app.use('/api/v1/adm_profilCamat', middleware.isLoggedIn, adm_profilCamat);

  const adm_profilPegawai = require('./apiMysql/website/server/profil/profilPegawai');
  app.use('/api/v1/adm_profilPegawai', middleware.isLoggedIn, adm_profilPegawai);

  const adm_programUsulan = require('./apiMysql/website/server/program/programUsulan');
  app.use('/api/v1/adm_programUsulan', middleware.isLoggedIn, adm_programUsulan);

  const adm_misi = require('./apiMysql/website/server/visiMisi/misi');
  app.use('/api/v1/adm_misi', middleware.isLoggedIn, adm_misi);

  const adm_visi = require('./apiMysql/website/server/visiMisi/visi');
  app.use('/api/v1/adm_visi', middleware.isLoggedIn, adm_visi);


  const masterJenisUsaha = require('./apiMysql/data_master/demografi/masterJenisUsaha');
  app.use('/api/v1/masterJenisUsaha', middleware.isLoggedIn, masterJenisUsaha);
  const masterPotensiWilayah = require('./apiMysql/data_master/demografi/masterPotensiWilayah');
  app.use('/api/v1/masterPotensiWilayah', middleware.isLoggedIn, masterPotensiWilayah);

  const masterAgama = require('./apiMysql/data_master/penduduk/masterAgama');
  app.use('/api/v1/masterAgama', middleware.isLoggedIn, masterAgama);
  const masterPekerjaan = require('./apiMysql/data_master/penduduk/masterPekerjaan');
  app.use('/api/v1/masterPekerjaan', middleware.isLoggedIn, masterPekerjaan);
  const masterPendidikan = require('./apiMysql/data_master/penduduk/masterPendidikan');
  app.use('/api/v1/masterPendidikan', middleware.isLoggedIn, masterPendidikan);

  const masterFasilitasKeagamaan = require('./apiMysql/data_master/fasilitas/masterFasilitasKeagamaan');
  app.use('/api/v1/masterFasilitasKeagamaan', middleware.isLoggedIn, masterFasilitasKeagamaan);
  const masterFasilitasKesehatan = require('./apiMysql/data_master/fasilitas/masterFasilitasKesehatan');
  app.use('/api/v1/masterFasilitasKesehatan', middleware.isLoggedIn, masterFasilitasKesehatan);
  const masterFasilitasPemerintahan = require('./apiMysql/data_master/fasilitas/masterFasilitasPemerintahan');
  app.use('/api/v1/masterFasilitasPemerintahan', middleware.isLoggedIn, masterFasilitasPemerintahan);
  const masterFasilitasPendidikan = require('./apiMysql/data_master/fasilitas/masterFasilitasPendidikan');
  app.use('/api/v1/masterFasilitasPendidikan', middleware.isLoggedIn, masterFasilitasPendidikan);
  const masterFasilitasPenunjang = require('./apiMysql/data_master/fasilitas/masterFasilitasPenunjang');
  app.use('/api/v1/masterFasilitasPenunjang', middleware.isLoggedIn, masterFasilitasPenunjang);
  const masterFasilitasUmum = require('./apiMysql/data_master/fasilitas/masterFasilitasUmum');
  app.use('/api/v1/masterFasilitasUmum', middleware.isLoggedIn, masterFasilitasUmum);
  const masterProdukHukum = require('./apiMysql/data_master/dokumen/masterProdukHukum');
  app.use('/api/v1/masterProdukHukum', middleware.isLoggedIn, masterProdukHukum);

  const desa_agama = require('./apiMysql/website/server/pedesaan/penduduk/desa_agama');
  app.use('/api/v1/desa_agama', middleware.isLoggedIn, desa_agama);
  const desa_keluarga = require('./apiMysql/website/server/pedesaan/penduduk/desa_keluarga');
  app.use('/api/v1/desa_keluarga', middleware.isLoggedIn, desa_keluarga);
  const desa_pekerjaan = require('./apiMysql/website/server/pedesaan/penduduk/desa_pekerjaan');
  app.use('/api/v1/desa_pekerjaan', middleware.isLoggedIn, desa_pekerjaan);
  const desa_pendidikan = require('./apiMysql/website/server/pedesaan/penduduk/desa_pendidikan');
  app.use('/api/v1/desa_pendidikan', middleware.isLoggedIn, desa_pendidikan);
  const desa_piramidaPenduduk = require('./apiMysql/website/server/pedesaan/penduduk/desa_piramidaPenduduk');
  app.use('/api/v1/desa_piramidaPenduduk', middleware.isLoggedIn, desa_piramidaPenduduk);
  const desa_statusSosial = require('./apiMysql/website/server/pedesaan/penduduk/desa_statusSosial');
  app.use('/api/v1/desa_statusSosial', middleware.isLoggedIn, desa_statusSosial);

  const desa_batas_luasWilayah = require('./apiMysql/website/server/pedesaan/demografi/desa_batas_luasWilayah');
  app.use('/api/v1/desa_batas_luasWilayah', middleware.isLoggedIn, desa_batas_luasWilayah);
  const desa_jenisUsaha = require('./apiMysql/website/server/pedesaan/demografi/desa_jenisUsaha');
  app.use('/api/v1/desa_jenisUsaha', middleware.isLoggedIn, desa_jenisUsaha);
  const desa_potensiWiayah = require('./apiMysql/website/server/pedesaan/demografi/desa_potensiWiayah');
  app.use('/api/v1/desa_potensiWiayah', middleware.isLoggedIn, desa_potensiWiayah);


  const fasilitasKeagamaan = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasKeagamaan');
  app.use('/api/v1/fasilitasKeagamaan', middleware.isLoggedIn, fasilitasKeagamaan);
  const fasilitasKesehatan = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasKesehatan');
  app.use('/api/v1/fasilitasKesehatan', middleware.isLoggedIn, fasilitasKesehatan);
  const fasilitasPemerintahan = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasPemerintahan');
  app.use('/api/v1/fasilitasPemerintahan', middleware.isLoggedIn, fasilitasPemerintahan);
  const fasilitasPendidikan = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasPendidikan');
  app.use('/api/v1/fasilitasPendidikan', middleware.isLoggedIn, fasilitasPendidikan);
  const fasilitasPenunjang = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasPenunjang');
  app.use('/api/v1/fasilitasPenunjang', middleware.isLoggedIn, fasilitasPenunjang);
  const fasilitasUmum = require('./apiMysql/website/server/pedesaan/fasilitas/fasilitasUmum');
  app.use('/api/v1/fasilitasUmum', middleware.isLoggedIn, fasilitasUmum);

  const desa_dataPegawai = require('./apiMysql/website/server/pedesaan/pegawai/desa_dataPegawai');
  app.use('/api/v1/desa_dataPegawai', middleware.isLoggedIn, desa_dataPegawai);
  

  const masterJenisSuket = require('./apiMysql/data_master/persuratan/masterJenisSuket');
  app.use('/api/v1/masterJenisSuket', middleware.isLoggedIn, masterJenisSuket);
  
  const suket = require('./apiMysql/website/server/persuratan/suket');
  app.use('/api/v1/suket', middleware.isLoggedIn, suket);
  

  const desa_dok_jdih = require('./apiMysql/website/server/dokumen/jdih');
  app.use('/api/v1/desa_dok_jdih', middleware.isLoggedIn, desa_dok_jdih);
  const desa_dok_transparansi = require('./apiMysql/website/server/dokumen/transparansi');
  app.use('/api/v1/desa_dok_transparansi', middleware.isLoggedIn, desa_dok_transparansi);
  const desa_dok_lainnya = require('./apiMysql/website/server/dokumen/lainnya');
  app.use('/api/v1/desa_dok_lainnya', middleware.isLoggedIn, desa_dok_lainnya);
  const desa_dok_dokumenDesa = require('./apiMysql/website/server/dokumen/dokumenDesa');
  app.use('/api/v1/desa_dok_dokumenDesa', middleware.isLoggedIn, desa_dok_dokumenDesa);
  const desa_dok_permintaanDokumen = require('./apiMysql/website/server/dokumen/permintaanDokumen');
  app.use('/api/v1/desa_dok_permintaanDokumen', middleware.isLoggedIn, desa_dok_permintaanDokumen);
  const desa_dok_penyetoranDokumen = require('./apiMysql/website/server/dokumen/penyetoranDokumen');
  app.use('/api/v1/desa_dok_penyetoranDokumen', middleware.isLoggedIn, desa_dok_penyetoranDokumen);
  
  const desa_dok_perpustakaanDigital = require('./apiMysql/website/server/dokumen/perpustakaanDigital');
  app.use('/api/v1/desa_dok_perpustakaanDigital', middleware.isLoggedIn, desa_dok_perpustakaanDigital);
  const desa_dok_perpustakaanDigitalKeg = require('./apiMysql/website/server/dokumen/perpustakaanDigitalKeg');
  app.use('/api/v1/desa_dok_perpustakaanDigitalKeg', middleware.isLoggedIn, desa_dok_perpustakaanDigitalKeg);

  // ================================ KECAMATAN ===============================

  const kecamatan_kecamatan = require('./apiMysql/dashboard/kecamatan');
  app.use('/api/v1/kecamatan_kecamatan', kecamatan_kecamatan);

  const kecamatan_dataPegawai = require('./apiMysql/website/server/kecamatan/pegawai/kecamatan_dataPegawai');
  app.use('/api/v1/kecamatan_dataPegawai', middleware.isLoggedIn, kecamatan_dataPegawai);

  const kecamatan_batas_luasWilayah = require('./apiMysql/website/server/kecamatan/demografi/batas_luasWilayah');
  app.use('/api/v1/kecamatan_batas_luasWilayah', middleware.isLoggedIn, kecamatan_batas_luasWilayah);
  const kecamatan_jenisUsaha = require('./apiMysql/website/server/kecamatan/demografi/jenisUsaha');
  app.use('/api/v1/kecamatan_jenisUsaha', middleware.isLoggedIn, kecamatan_jenisUsaha);
  const kecamatan_potensiWiayah = require('./apiMysql/website/server/kecamatan/demografi/potensiWiayah');
  app.use('/api/v1/kecamatan_potensiWiayah', middleware.isLoggedIn, kecamatan_potensiWiayah);
  // ================================ KECAMATAN ===============================
  

// ================================ ADMIN WEBSITE ===============================


// ================================ CLIENT WEBSITE ==============================
  const cnt_capaianKegiatan = require('./apiMysql/website/client/capaian/capaianKegiatan');
  app.use('/api/v1/cnt_capaianKegiatan', cnt_capaianKegiatan);

  const cnt_galleryFoto = require('./apiMysql/website/client/gallery/galleryFoto');
  app.use('/api/v1/cnt_galleryFoto', cnt_galleryFoto);


  const cnt_galleryInfografis = require('./apiMysql/website/client/gallery/galleryInfografis');
  app.use('/api/v1/cnt_galleryInfografis', cnt_galleryInfografis);


  const cnt_galleryVideo = require('./apiMysql/website/client/gallery/galleryVideo');
  app.use('/api/v1/cnt_galleryVideo', cnt_galleryVideo);

  const cnt_kegiatanTerbaru = require('./apiMysql/website/client/kegiatan/kegiatanTerbaru');
  app.use('/api/v1/cnt_kegiatanTerbaru', cnt_kegiatanTerbaru);


  const cnt_carousell = require('./apiMysql/website/client/carousell/carousell');
  app.use('/api/v1/cnt_carousell', cnt_carousell);

  const cnt_profilBupati = require('./apiMysql/website/client/profil/profilBupati');
  app.use('/api/v1/cnt_profilBupati', cnt_profilBupati);

  const cnt_profilWakilBupati = require('./apiMysql/website/client/profil/profilWakilBupati');
  app.use('/api/v1/cnt_profilWakilBupati', cnt_profilWakilBupati);

  const cnt_programUsulan = require('./apiMysql/website/client/program/programUsulan');
  app.use('/api/v1/cnt_programUsulan', cnt_programUsulan);

  const cnt_misi = require('./apiMysql/website/client/visiMisi/misi');
  app.use('/api/v1/cnt_misi', cnt_misi);

  const cnt_visi = require('./apiMysql/website/client/visiMisi/visi');
  app.use('/api/v1/cnt_visi', cnt_visi);

  const cnt_bumdes = require('./apiMysql/website/client/bumdes/bumdes');
  app.use('/api/v1/cnt_bumdes', cnt_bumdes);


  // ============================ DESA

  const cnt_wilayah = require('./apiMysql/website/client/dataMaster/wilayah');
  const cnt_kab_kota = require('./apiMysql/website/client/dataMaster/kab_kota');
  const cnt_kecamatan = require('./apiMysql/website/client/dataMaster/kecamatan');
  const cnt_des_kel = require('./apiMysql/website/client/dataMaster/des_kel');
  app.use('/api/v1/cnt_wilayah',   cnt_wilayah);
  app.use('/api/v1/cnt_kab_kota',  cnt_kab_kota);
  app.use('/api/v1/cnt_kecamatan', cnt_kecamatan);
  app.use('/api/v1/cnt_des_kel',   cnt_des_kel);

  const cnt_desa_batas_luasWilayah = require('./apiMysql/website/client/pedesaan/demografi/desa_batas_luasWilayah');
  app.use('/api/v1/cnt_desa_batas_luasWilayah', cnt_desa_batas_luasWilayah);
  const cnt_desa_potensiWiayah = require('./apiMysql/website/client/pedesaan/demografi/desa_potensiWiayah');
  app.use('/api/v1/cnt_desa_potensiWiayah', cnt_desa_potensiWiayah);
  const cnt_desa_jenisUsaha = require('./apiMysql/website/client/pedesaan/demografi/desa_jenisUsaha');
  app.use('/api/v1/cnt_desa_jenis_usaha', cnt_desa_jenisUsaha);

  const cnt_desa_dataPendidikan = require('./apiMysql/website/client/pedesaan/penduduk/desa_pendidikan');
  app.use('/api/v1/cnt_desa_data_pendidikan', cnt_desa_dataPendidikan);
  const cnt_desa_dataPekerjaan = require('./apiMysql/website/client/pedesaan/penduduk/desa_pekerjaan');
  app.use('/api/v1/cnt_desa_data_pekerjaan', cnt_desa_dataPekerjaan);
  const cnt_desa_dataAgama = require('./apiMysql/website/client/pedesaan/penduduk/desa_agama');
  app.use('/api/v1/cnt_desa_data_agama', cnt_desa_dataAgama);
  const cnt_desa_dataKeluarga = require('./apiMysql/website/client/pedesaan/penduduk/desa_keluarga');
  app.use('/api/v1/cnt_desa_data_keluarga', cnt_desa_dataKeluarga);
  const cnt_desa_dataPiramid_penduduk = require('./apiMysql/website/client/pedesaan/penduduk/desa_piramidaPenduduk');
  app.use('/api/v1/cnt_desa_data_piramid_penduduk', cnt_desa_dataPiramid_penduduk);
  const cnt_desa_dataStatus_sosial = require('./apiMysql/website/client/pedesaan/penduduk/desa_statusSosial');
  app.use('/api/v1/cnt_desa_data_status_sosial', cnt_desa_dataStatus_sosial);


  const cnt_desa_fasilitasKeagamaan = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasKeagamaan');
  app.use('/api/v1/cnt_desa_fasilitasKeagamaan',  cnt_desa_fasilitasKeagamaan);
  const cnt_desa_fasilitasKesehatan = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasKesehatan');
  app.use('/api/v1/cnt_desa_fasilitasKesehatan',  cnt_desa_fasilitasKesehatan);
  const cnt_desa_fasilitasPemerintahan = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasPemerintahan');
  app.use('/api/v1/cnt_desa_fasilitasPemerintahan',  cnt_desa_fasilitasPemerintahan);
  const cnt_desa_fasilitasPendidikan = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasPendidikan');
  app.use('/api/v1/cnt_desa_fasilitasPendidikan',  cnt_desa_fasilitasPendidikan);
  const cnt_desa_fasilitasPenunjang = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasPenunjang');
  app.use('/api/v1/cnt_desa_fasilitasPenunjang',  cnt_desa_fasilitasPenunjang);
  const cnt_desa_fasilitasUmum = require('./apiMysql/website/client/pedesaan/fasilitas/fasilitasUmum');
  app.use('/api/v1/cnt_desa_fasilitasUmum',  cnt_desa_fasilitasUmum);

  // const cnt_desa_data_pegawai = require('./apiMysql/website/client/pedesaan/pegawai/desa_dataPegawai');
  // app.use('/api/v1/cnt_desa_dataPegawai',  cnt_desa_data_pegawai);

  const cnt_desa_dataPegawai = require('./apiMysql/website/server/pedesaan/pegawai/desa_dataPegawai');
  app.use('/api/v1/cnt_desa_dataPegawai', cnt_desa_dataPegawai);


  const cnt_desa_transparansi = require('./apiMysql/website/client/dokumen/transparansi');
  app.use('/api/v1/cnt_desa_transparansi',  cnt_desa_transparansi);
  const cnt_desa_produkHukum = require('./apiMysql/website/client/dokumen/produkHukum');
  app.use('/api/v1/cnt_desa_produkHukum',  cnt_desa_produkHukum);
  const cnt_desa_lainnya = require('./apiMysql/website/client/dokumen/lainnya');
  app.use('/api/v1/cnt_desa_lainnya',  cnt_desa_lainnya);

  const cnt_desa_perpustakaanDigital = require('./apiMysql/website/client/perpustakaan/perpustakaanDigital');
  app.use('/api/v1/cnt_desa_perpustakaanDigital',  cnt_desa_perpustakaanDigital);
  const cnt_desa_perpustakaanDigitalKeg = require('./apiMysql/website/client/perpustakaan/perpustakaanDigitalKeg');
  app.use('/api/v1/cnt_desa_perpustakaanDigitalKeg',  cnt_desa_perpustakaanDigitalKeg);

  const cnt_desa_kelembagaan = require('./apiMysql/website/client/kelembagaan/kelembagaan');
  app.use('/api/v1/cnt_desa_kelembagaan',  cnt_desa_kelembagaan);





  // ============================ DESA

  // ============================ KECAMATAN
  const cnt_kecamatan_kecamatan = require('./apiMysql/dashboard/kecamatan');
  app.use('/api/v1/cnt_kecamatan_kecamatan', cnt_kecamatan_kecamatan);

  const cnt_kecamatan_batas_luasWilayah = require('./apiMysql/website/client/kecamatan/demografi/batas_luasWilayah');
  app.use('/api/v1/cnt_kecamatan_luasWilayah',  cnt_kecamatan_batas_luasWilayah);
  const cnt_kecamatan_dashboard = require('./apiMysql/dashboard/dashboard');
  app.use('/api/v1/cnt_kecamatan_dashboard',  cnt_kecamatan_dashboard);
 

  // ============================ KECAMATAN


  const cnt_registrasi = require('./apiMysql/website/client/auth/registrasi');
  app.use('/api/v1/cnt_registrasi',  cnt_registrasi);

// ================================ CLIENT WEBSITE ==============================

// ================================ SURAT KETERANGAN BACKEND ==============================
const srv_suketAhliWaris = require('./apiMysql/website/server/suratKeterangan/suketAhliWaris');
app.use('/api/v1/srv_suketAhliWaris', middleware.isLoggedIn,  srv_suketAhliWaris);
const srv_suketBelumMenikah = require('./apiMysql/website/server/suratKeterangan/suketBelumMenikah');
app.use('/api/v1/srv_suketBelumMenikah', middleware.isLoggedIn,  srv_suketBelumMenikah);
const srv_suketBerdomisili = require('./apiMysql/website/server/suratKeterangan/suketBerdomisili');
app.use('/api/v1/srv_suketBerdomisili', middleware.isLoggedIn,  srv_suketBerdomisili);
const srv_suketPindahDomisili = require('./apiMysql/website/server/suratKeterangan/suketPindahDomisili');
app.use('/api/v1/srv_suketPindahDomisili', middleware.isLoggedIn,  srv_suketPindahDomisili);
const srv_suketTidakBekerja = require('./apiMysql/website/server/suratKeterangan/suketTidakBekerja');
app.use('/api/v1/srv_suketTidakBekerja', middleware.isLoggedIn,  srv_suketTidakBekerja);
const srv_suketTidakMampu = require('./apiMysql/website/server/suratKeterangan/suketTidakMampu');
app.use('/api/v1/srv_suketTidakMampu', middleware.isLoggedIn,  srv_suketTidakMampu);
const srv_suketTidakMemilikiRumah = require('./apiMysql/website/server/suratKeterangan/suketTidakMemilikiRumah');
app.use('/api/v1/srv_suketTidakMemilikiRumah', middleware.isLoggedIn,  srv_suketTidakMemilikiRumah);
const srv_suketUsaha = require('./apiMysql/website/server/suratKeterangan/suketUsaha');
app.use('/api/v1/srv_suketUsaha', middleware.isLoggedIn, srv_suketUsaha);
const srv_suketLainnya = require('./apiMysql/website/server/suratKeterangan/suketLainnya');
app.use('/api/v1/srv_suketLainnya', middleware.isLoggedIn,  srv_suketLainnya);
// ================================ SURAT KETERANGAN BACKEND ==============================

// ================================ BUMDES ==============================

const bumDesa_kelembagaan = require('./apiMysql/website/server/bumDes/kelembagaan');
app.use('/api/v1/bumDesa_kelembagaan',  bumDesa_kelembagaan);

// ================================ BUMDES ==============================


// ================================ IPD ==============================

const ipd_master_dimensi = require('./apiMysql/data_master/IPD/master_dimensi');
app.use('/api/v1/ipd_master_dimensi',  ipd_master_dimensi);
const ipd_master_variabel = require('./apiMysql/data_master/IPD/master_variabel');
app.use('/api/v1/ipd_master_variabel',  ipd_master_variabel);
const ipd_master_indikator = require('./apiMysql/data_master/IPD/master_indikator');
app.use('/api/v1/ipd_master_indikator',  ipd_master_indikator);




const ipd_ipd = require('./apiMysql/website/server/IPD/ipd');
app.use('/api/v1/ipd_ipd',  ipd_ipd);
const ipd_verifikasiIPD = require('./apiMysql/website/server/IPD/verifikasiIPD');
app.use('/api/v1/ipd_verifikasiIPD',  ipd_verifikasiIPD);

// ================================ IPD ==============================



// ================================ SURAT KETERANGAN CETAK ==============================
const cnt_suketAhliWaris = require('./apiMysql/website/client/suratKeterangan/suketAhliWaris');
app.use('/cnt_suketAhliWaris',  cnt_suketAhliWaris);
const cnt_suketBelumMenikah = require('./apiMysql/website/client/suratKeterangan/suketBelumMenikah');
app.use('/cnt_suketBelumMenikah',  cnt_suketBelumMenikah);
const cnt_suketBerdomisili = require('./apiMysql/website/client/suratKeterangan/suketBerdomisili');
app.use('/cnt_suketBerdomisili',  cnt_suketBerdomisili);
const cnt_suketPindahDomisili = require('./apiMysql/website/client/suratKeterangan/suketPindahDomisili');
app.use('/cnt_suketPindahDomisili',  cnt_suketPindahDomisili);
const cnt_suketTidakBekerja = require('./apiMysql/website/client/suratKeterangan/suketTidakBekerja');
app.use('/cnt_suketTidakBekerja',  cnt_suketTidakBekerja);
const cnt_suketTidakMampu = require('./apiMysql/website/client/suratKeterangan/suketTidakMampu');
app.use('/cnt_suketTidakMampu',  cnt_suketTidakMampu);
const cnt_suketTidakMemilikiRumah = require('./apiMysql/website/client/suratKeterangan/suketTidakMemilikiRumah');
app.use('/cnt_suketTidakMemilikiRumah',  cnt_suketTidakMemilikiRumah);
const cnt_suketUsaha = require('./apiMysql/website/client/suratKeterangan/suketUsaha');
app.use('/cnt_suketUsaha',  cnt_suketUsaha);
// ================================ SURAT KETERANGAN CETAK ==============================



// ================================ PAMONG DESA ==============================


  // ============================= ADMIN ==================================
  const masterJenisPamong = require('./apiMysql/data_master/pamong/masterJenisPamong');
  app.use('/api/v1/masterJenisPamong', middleware.isLoggedIn, masterJenisPamong);
  const masterJenisPamongJabatan = require('./apiMysql/data_master/pamong/masterJenisPamongJabatan');
  app.use('/api/v1/masterJenisPamongJabatan', middleware.isLoggedIn, masterJenisPamongJabatan);
  const masterKelompokPamongJabatan = require('./apiMysql/data_master/pamong/masterKelompokPamongJabatan');
  app.use('/api/v1/masterKelompokPamongJabatan', middleware.isLoggedIn, masterKelompokPamongJabatan);


  const desa_riwayatPendidikanNonFormal = require('./apiMysql/website/server/pedesaan/pegawai/desa_riwayatPendidikanNonFormal');
  app.use('/api/v1/desa_riwayatPendidikanNonFormal', middleware.isLoggedIn, desa_riwayatPendidikanNonFormal);
  const desa_riwayatPendidikanFormal = require('./apiMysql/website/server/pedesaan/pegawai/desa_riwayatPendidikanFormal');
  app.use('/api/v1/desa_riwayatPendidikanFormal', middleware.isLoggedIn, desa_riwayatPendidikanFormal);
  const desa_riwayatjabatan = require('./apiMysql/website/server/pedesaan/pegawai/desa_riwayatjabatan');
  app.use('/api/v1/desa_riwayatjabatan', middleware.isLoggedIn, desa_riwayatjabatan);
  const desa_riwayatKeluarga = require('./apiMysql/website/server/pedesaan/pegawai/desa_riwayatKeluarga');
  app.use('/api/v1/desa_riwayatKeluarga', middleware.isLoggedIn, desa_riwayatKeluarga);
  const desa_riwayatPrestasi = require('./apiMysql/website/server/pedesaan/pegawai/desa_riwayatPrestasi');
  app.use('/api/v1/desa_riwayatPrestasi', middleware.isLoggedIn, desa_riwayatPrestasi);

  // ============================= ADMIN ==================================


  // ============================= CLIENT ==================================

  // ============================= CLIENT ==================================

// ================================ PAMONG DESA ==============================





function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use('/images', express.static(__dirname + '/uploads'), serveIndex(__dirname + '/uploads'));


console.log(__dirname + 'uploads')




// ======================== WA BLASTER =========================


// const { Client } = require('whatsapp-web.js');
// // const qrcode = require('qrcode-terminal');
// const qrcode = require('qrcode');

// const io = SocketIo(serverx);
// io.use(middleware_IO.socketer);

// const fs = require('fs');

// const SESSION_FILE_PATH = './whatsapp-session.json';
// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionCfg = require(SESSION_FILE_PATH);
// }


// const client = new Client(
//   { 
//     puppeteer: { 
//       ignoreDefaultArgs: ['--disable-extensions'],
//       args: ['--no-sandbox'],
//       headless: true 
//     }, 
//     session: sessionCfg 
//   }
// );


// client.on('authenticated', (session) => {
//   console.log('AUTHENTICATED', session);
//   sessionCfg=session;
//   fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
//       if (err) {
//           console.error(err);
//       }
//   });
// });



// client.on('message', msg => {
//     if (msg.body == 'ping') {
//         msg.reply('apa telaso');
//     } else if (msg.body == 'iksan' || msg.body == 'Iksan'){
//       msg.reply('monyet');
//     }else if (msg.body == '!ping'){
//       msg.reply('iksan');
//     }else if (msg.body == 'indra' || msg.body == 'Indra'){
//       msg.reply('kambing sipit');
//     }else if (msg.body == 'kambing' || msg.body == 'kambing sipit'){
//       msg.reply('indra');
//     }else if (msg.body == 'Dayat' || msg.body == 'dayat'){
//       msg.reply('bucin');
//     }else if (msg.body == 'bucin'){
//       msg.reply('dayat');
//     }else if (msg.body == 'galau'){
//       msg.reply('riswan');
//     }else if (msg.body == 'riswan' || msg.body == 'rizwan'){
//       msg.reply('galau');
//     }else if (msg.body == 'kiken'){
//       msg.reply('tamvan');
//     }else if (msg.body == 'tamvan' || msg.body == 'tampan' || msg.body == 'ganteng'|| msg.body == 'cakep'){
//       msg.reply('kiken');
//     }else if (msg.body == 'maman'){
//       msg.reply('kontol');
//     }
//     else if (msg.body == 'telaso' || msg.body == 'anabule' || msg.body == 'kontol' || msg.body == 'tailaso'){
//       msg.reply('maman');
//     }
// });





// io.on("connection", socket => {

//   socket.emit('message', 0);

//   client.on('qr', (qr) => {
//       console.log('QR RECEIVED', qr);
//       qrcode.toDataURL(qr, (err, url) => {
//         socket.emit('qr', url)
//         socket.emit('message', 2);
//         console.log("tidak terkonesi")
//       })
//       // qrcode.generate(qr);
//   });


//   client.on('ready', () => {
//     socket.emit('message', 1)
//     console.log('WhatsApp Blaster Sudah Siap digunakan');
//   });
//   // checkReadyWA(socket, 2);


//   socket.on("assu", fetchedData => {
//     // console.log(socket.handshake.query.token)
//     console.log(fetchedData);
//     console.log("object")
//     if (fs.existsSync(SESSION_FILE_PATH)) {
//       socket.emit('message', 1)
//     }
//   })

// });



// app.post('/AddWhatsapp', (req, res) => {
//   // console.log(req.body);


//     var query = ``;

//     var number = '6282349018600'
//     var message = req.body.uraian;


//   client.sendMessage(number+'@c.us', message).then(response => {
//     console.log(response)
//     res.send("ok")
//   })
// });



// client.initialize();

// ======================== WA BLASTER =========================

app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5011;
const server = serverx.listen(port, () => {
  console.log('Listening on port', port);
});