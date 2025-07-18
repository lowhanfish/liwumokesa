Database = require('arangojs').Database;
require('dotenv').config();

db = new Database(process.env.HOST_DB);
db.useDatabase(process.env.NAME_DB);
db.useBasicAuth(process.env.USER_DB, process.env.PASS_DB); // SERVER 


db.listCollections().then(function(res) {
    console.log("TERKONEKSI DENGAN DATABASE SIMPATI DESA");

    buatCollections('users');
    buatCollections('menu_list');
    buatCollections('levelUsers');
    buatCollections('wilayah');
    buatCollections('kab_kota');
    buatCollections('kecamatan');
    buatCollections('des_kel');


    buatCollections('masterAgama');
    buatCollections('masterPekerjaan');
    buatCollections('masterPendidikan');

    buatCollections('masterJenisUsaha');
    buatCollections('masterPotensiWilayah');

    buatCollections('masterFasilitasKeagamaan');
    buatCollections('masterFasilitasKesehatan');
    buatCollections('masterFasilitasPemerintahan');
    buatCollections('masterFasilitasPendidikan');
    buatCollections('masterFasilitasPenunjang');
    buatCollections('masterFasilitasUmum');

    buatCollections('masterProdukHukum');

    buatCollections('capaianKegiatan');
    buatCollections('galleryFoto');
    buatCollections('galleryVideo');
    buatCollections('infografis');
    buatCollections('kegiatanTerbaru');
    buatCollections('profilCamat');
    buatCollections('profilPegawai');
    buatCollections('programUsulan');
    buatCollections('misi');
    buatCollections('popup');
    buatCollections('visi');

    buatCollections('carousell');

    buatCollections('desa_agama');
    buatCollections('desa_keluarga');
    buatCollections('desa_pekerjaan');
    buatCollections('desa_pendidikan');
    buatCollections('desa_piramidaPenduduk');
    buatCollections('desa_statusSosial');
    
    buatCollections('desa_batas_luasWilayah');
    buatCollections('desa_jenisUsaha');
    buatCollections('desa_potensiWiayah');
    
    buatCollections('desa_fasilitasAgama');
    buatCollections('desa_fasilitasKesehatan');
    buatCollections('desa_fasilitasPemerintahan');
    buatCollections('desa_fasilitasPendidikan');
    buatCollections('desa_fasilitasPenunjang');
    buatCollections('desa_fasilitasUmum');
    
    buatCollections('desa_sejarah');
    buatCollections('desa_dataPegawai');
    buatCollections('desa_tupoksi');

    buatCollections('desa_dok_jdih');
    buatCollections('desa_dok_lainnya');
    buatCollections('desa_dok_transparansi');
    buatCollections('desa_dok_perpustakaan_digital');
    buatCollections('desa_dok_perpustakaan_kegiatan');

    buatCollections('desa_dok_dokumenDesa');
    buatCollections('desa_dok_permintaanDokumen');
    buatCollections('desa_dok_dokumenDesa_file');
    buatCollections('desa_dok_permintaanDokumen_file');
    buatCollections('desa_dok_permintaanDokumen_desa');
    
    buatCollections('kecamatan_agama');
    buatCollections('kecamatan_keluarga');
    buatCollections('kecamatan_pekerjaan');
    buatCollections('kecamatan_pendidikan');
    buatCollections('kecamatan_piramidaPenduduk');
    buatCollections('kecamatan_statusSosial');

    buatCollections('kecamatan_batas_luasWilayah');
    buatCollections('kecamatan_jenisUsaha');
    buatCollections('kecamatan_potensiWiayah');

    buatCollections('kecamatan_dataPegawai');

    buatCollections('suketAhliWaris');
    buatCollections('suketTidakBekerja');
    buatCollections('suketBelumMenikah');
    buatCollections('suketBerdomisili');
    buatCollections('suketPindahDomisili');
    buatCollections('suketTidakMampu');
    buatCollections('suketTidakMemilikiRumah');
    buatCollections('suketUsaha');
    buatCollections('suketLainnya');

    buatCollections('masterJenisSuket');
    buatCollections('suket');


    // ========= matabumdes =========

    buatCollections('m_kelembagaan_bumdes');
    buatCollections('m_pelaksana_operasi');
    buatCollections('m_usaha_dan_keuangan');
    buatCollections('m_pelatihan');
    buatCollections('m_kendaraan_operasional');
    buatCollections('suketUsaha');
    buatCollections('m_jenis_sarana_produksi');

    buatCollections('m_adm_keuangan');
    buatCollections('m_adm_keuangan_modal');
    buatCollections('m_adm_keuangan_adm');
    buatCollections('m_adm_keuangan_kerjaSama');
    buatCollections('m_adm_keuangan_pendampingan');
    buatCollections('m_adm_keuangan_intensitas');

    buatCollections('m_ipd_dimensi');
    buatCollections('m_ipd_variabel');
    buatCollections('m_ipd_indikator');
    buatCollections('m_ipd_indikator_pertanyaan');

    
    buatCollections('ipd_indikator_jawaban');
    buatCollections('ipd_indikator_pertanyaan_jawaban');


     // ========= matabumdes =========

     buatCollections('masterJenisPamong');
     buatCollections('masterJenisPamongJabatan');
     buatCollections('masterkelompokPamongJabatan');

    // ========= pamong=========
    buatCollections('pamong_riwayat_riwayatJabatanLainnya');
    buatCollections('pamong_riwayat_riwayatJabatanPerangkat');
    buatCollections('pamong_riwayat_riwayatKeluarga');
    buatCollections('pamong_riwayat_riwayatPendidikanFormal');
    buatCollections('pamong_riwayat_riwayatPendidikanNonFormal');
    buatCollections('pamong_riwayat_riwayatPrestasi');


    // ========= pamong=========



}, function(err) {
    console.log("GAGAL TERKONEKSI DENGAN DATABASE SIMPATI DESA")
});



function buatCollections(namaCollections) {
    var collection = db.collection(namaCollections);
    collection.create().then(
        () => console.log('Collections "'+namaCollections+'" berhasil dibuat'),
        err => console.error('Collections "'+namaCollections+'" gagal dibuat atau sdh dibuat sebelumnya')
    );
}







module.exports = db;