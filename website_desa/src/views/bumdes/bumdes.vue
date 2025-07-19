<template>
    <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-8">
                <!-- <q-btn-group spread>
                    <q-btn @click="changeKategory('Prestasi')" color="amber-8" label="PRESTASI" icon="timeline" />
                    <q-btn @click="changeKategory('Pembangunan')" color="amber-7" label="PEMBANGUNAN " icon="account_balance" />
                </q-btn-group> -->

                <br />

                <div class="row">
                    <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
                      <span class="h_title_dok">Badan Usaha Milik Desa</span>

                    </div>

                    <div class="col-12 col-md-6" style="padding : 0% 0% 2% 1%">
                        <q-input
                          @keyup.enter="cari_data()"
                          color="grey-3"
                          label-color="orange"
                          outlined
                          square
                          :dense="true"
                          v-model="cari_value"
                          label="Cari BUMDes.. "
                        >
                          <!-- <template v-slot:append>
                            <q-icon name="search" color="orange" />
                          </template>-->
                          <template v-slot:after>
                            <q-btn @click="cari_data()" dense icon="search" />
                          </template>
                        </q-input>
                    </div>
                </div>
                <hr class="hrdetilberita" /> 

                <div class="q-pa-md">

                  <div class="tbl_responsive">
                    <table bordered style="width:100%">
                        <thead>
                            <tr class="bg-yellow-9 text-white" >
                                <th class="text-center" style="width:5%">No.</th>
                                <th class="text-center" style="width:40%">Nama BUMDes</th>
                                <th class="text-center" style="width:40%">Alamat</th>
                                <th class="text-center" style="width:15%">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in listData" :key="index"> 
                                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                                <td class="text-left h_top">{{data.uraian}}  </td>
                                <td class="text-left h_top">{{data.alamat}}</td>
                                <td class="text-center h_top">
                                  <q-btn class="bg-amber-9" style="color:white" @click="mdl_lihat = true, selectData(data)" title="Lihat Dokumen">
                                    <q-icon color="white" size="md" name="description"/>


                                  </q-btn>
                                </td> 
                            </tr> 
                        </tbody>
                    </table>
                  </div>



                </div>

                <br />
                <hr class="hrdetilberita" />
                <br />
                <div class="flex flex-center">
                    <q-pagination
                    @click="getView()"
                    v-model="page_first"
                    :max="page_last"
                    :max-pages="4"
                    color="grey-14"
                    :direction-links="true"
                    :boundary-links="true"
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    ></q-pagination>
                </div>




                <!-- ================================================= MODAL LIHAT ================================================ -->
               <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-blue">
                    <div class="text-h6 h_modalhead">Detile Data</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_lihat=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <hr class="hrpagin">

                          <div class="row">
                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_pelaops = true">
                                <q-tooltip content-class="bg-red-5" content-style="font-size: 13px">
                                  Data Pelaksana Operasional
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/bumdes/i_pegawai.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_usaha = true">
                                <q-tooltip content-class="bg-blue-grey-8" content-style="font-size: 13px">
                                  Data Usaha dan Keuangan
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/bumdes/i_uang.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_pelatihan = true">
                                <q-tooltip content-class="bg-deep-purple-4" content-style="font-size: 13px">
                                  Data Pelatihan
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/bumdes/i_pelatihan.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_kendaraan = true">
                                <q-tooltip content-class="bg-grey-7" content-style="font-size: 13px">
                                  Data Kendaraan Operasional
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/bumdes/i_car.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_sarana = true">
                                <q-tooltip content-class="bg-cyan-7" content-style="font-size: 13px">
                                  Data Jenis Sarana Produksi yang dimiliki
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/bumdes/i_bangunan.jpg" alt="">
                              </a>
                            </div>


                          </div>
                        <hr class="hrpagin">

                        <br>

                        <div class="tbl_responsive">
                          <table width="100%">
                            <tr class="h_table_head bg-grey-5">
                              <th width="5%" class="text-center">No</th>
                              <th width="45%">Bumdes</th>
                              <th width="50%">Alamat</th>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">1.</td>
                              <td class="h_top">Nama Bumdes</td>
                              <td class="h_top">{{form.uraian}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">2.</td>
                              <td class="h_top">Alamat</td>
                              <td class="h_top">{{form.alamat}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">3.</td>
                              <td class="h_top">Nomor Register Pendaftaran</td>
                              <td class="h_top">{{form.noreg}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">4.</td>
                              <td class="h_top">Nomor Perdes Pembentukan, Susunan dan Pengguna</td>
                              <td class="h_top">{{form.no_perdes_pembentukan}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">5.</td>
                              <td class="h_top">SOP</td>
                              <td class="h_top">{{form.sop}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">6.</td>
                              <td class="h_top">AD/ART</td>
                              <td class="h_top">{{form.ad_art}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">7.</td>
                              <td class="h_top">Status Kepemilikan Kantor/Sekretariat</td>
                              <td class="h_top">{{form.status_kantor}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">8.</td>
                              <td class="h_top" colspan="2">Kondisi Kantor</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top"></td>
                              <td class="h_top">Buku Tamu, Surat Masuk dan Keluar</td>
                              <td class="h_top">{{form.buku_tamu}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top"></td>
                              <td class="h_top">Perabot Kantor</td>
                              <td class="h_top">{{form.perabot_kantor}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top"></td>
                              <td class="h_top">Saranan Penunjang/Kendaraan Operasional</td>
                              <td class="h_top">{{form.sarana_penunjang}}</td>
                            </tr>

                            <tr class="h_table_body">
                              <td class="text-center h_top">9.</td>
                              <td class="h_top">Profil BUMDesa</td>
                              <td class="h_top">{{form.profil}}</td>
                            </tr>
                          
                          </table>

                        </div>

                        
                        <br>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn @click=" mdl_lihat = false" label="Keluar" color="negative" />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT ================================================ -->

                <!-- ================================================= MODAL PELAKSANA OPERASIONAL ================================================ -->
              <q-dialog v-model="mdl_pelaops" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Pelaksana Operasional</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_pelaops=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>
                    <q-card-section class="q-pt-none">

                        <br>
                        <pelaksanaOperasional :id_bumDes="form.id"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL PELAKSANA OPERASIONAL ================================================ -->

            <!-- ================================================= MODAL DATA USAHA DAN KEUANGAN ================================================ -->
              <q-dialog v-model="mdl_usaha" persistent>
                <q-card class="mdl-lgx">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Data Usahan dan Keuangan</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_usaha=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>
                    <q-card-section class="q-pt-none">

                        <br>
                        <usahaKeuangan :id_bumDes="form.id"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL DATA USAHA DAN KEUANGAN ================================================ -->

            <!-- ================================================= MODAL DATA PELATIHAN ================================================ -->
              <q-dialog v-model="mdl_pelatihan" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Data Pelatihan</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_pelatihan=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>
                    <q-card-section class="q-pt-none">

                        <br>
                        <pelatihan :id_bumDes="form.id"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL DATA PELATIHAN ================================================ -->


            <!-- ================================================= MODAL DATA KENDARAAN OPERASIONAL ================================================ -->
              <q-dialog v-model="mdl_kendaraan" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Data Kendaraan Operasional</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_kendaraan=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>

                    <q-card-section class="q-pt-none">

                        <br>
                        <kendaraanOperasional :id_bumDes="form.id"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL DATA KENDARAAN OPERASIONAL ================================================ -->
            
            <!-- ================================================= MODAL DATA SARANA PRODUKSI ================================================ -->
              <q-dialog v-model="mdl_sarana" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Data Sarana Produksi</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_sarana=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>

                    <q-card-section class="q-pt-none">

                        <br>
                        <sarProd :id_bumDes="form.id"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL DATA SARANA PRODUKSI ================================================ -->










                </div>
                <div class="col-12 col-md-4 paddingSideMenu">
                <SideContent />
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import UMUM from "../../library/umum";

export default {
  data() {
    return {
      form : {
            id : '',
            uraian : '',
            alamat : '',
            noreg : '',
            no_perdes_pembentukan : '',
            sop : '',
            ad_art : '',
            status_kantor : '',
            buku_tamu : '',
            perabot_kantor : '',
            sarana_penunjang : '',
            profil: '',
            createdAt : '',
            des_kel : this.$store.state.ID_DES_KEL,
            kecamatan : '',
        },

      fileOld : '',

      listData: [],
      listKegiatan: [],

      page_limit: 10,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      mdl_lihat : false,
      mdl_pelaops : false,
      mdl_usaha : false,
      mdl_pelatihan : false,
      mdl_kendaraan : false,
      mdl_sarana : false,

      UMUM: UMUM
    };
  },
  methods: {

    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_bumdes", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              data_ke: this.page_first,
              page_limit : this.page_limit,
              cari_value: this.cari_value,
              des_kel : this.form.des_kel
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.listData = res_data.data;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },

    selectData : function(data){

      this.form.id = data.id
      this.form.uraian = data.uraian
      this.form.alamat = data.alamat
      this.form.noreg = data.noreg
      this.form.no_perdes_pembentukan = data.no_perdes_pembentukan
      this.form.sop = data.sop
      this.form.ad_art = data.ad_art
      this.form.status_kantor = data.status_kantor
      this.form.buku_tamu = data.buku_tamu
      this.form.perabot_kantor = data.perabot_kantor
      this.form.sarana_penunjang = data.sarana_penunjang
      this.form.profil= data.profil
      this.form.createdAt = data.createdAt
      this.form.des_kel = data.des_kel

    },

    pushKegiatan: function(id) {
      this.$router.push("/detilKegiatan?id=" + id);
    },

    cari_data: function() {
      this.page_first = 1;
      this.getView();
    },
    indexing : function(index){
        var idx = ((this.page_first-1)*this.page_limit)+index
        return idx
    },
    keWebsite(website){
      window.open(website, '_blank').focus();
    }
  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id;
    // this.$store.commit('getOne')
    this.getView();
  }
};
</script>

<style>
</style>


