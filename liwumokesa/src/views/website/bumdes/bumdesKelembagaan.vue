<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Kelembagaan</div>
            <div class="text-subtitle2">Bumdes</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="checkAdd()" dense flat icon="add" style="width:10%">
                  <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                    Click untuk menambah data
                  </q-tooltip>
              </q-btn>
            </div>

          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      

      <q-card-section>


        <div class="row">
          <div class="col-md-6 col-12 input_kiri " >
            <select :disabled="disable_kec" v-model="form.kecamatan" @change="chageDesa(), cari_data()" class="bg-white"  outlined square :dense="true">
              <option value="">-- Semua Kecamatan --</option>
              <option v-for="data in $store.state.listKecamatan" :key="data.id" :value="data.id">{{data.uraian}}</option>
            </select>
          </div>

          <div class="col-md-6 col-12 input_kanan ">
            <select :disabled="disable_des" v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true">
              <option value="">-- Semua Desa --</option>
              <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
            </select>
          </div>
        </div>

        <!-- <h1>{{form.des_kel}}</h1> -->

        <hr class="hrpagin">

        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-grey-5">
                <th width="5%" class="text-center">No</th>
                <th width="35%">Bumdes</th>
                <th width="50%">Alamat</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class="h_top">{{data.uraian}}</td>
                <td class="h_top">{{data.alamat}}</td>
                <td class="text-center h_top">
                  <q-btn-group>

                    <q-btn-dropdown glossy no-caps size="small" color="orange" label="" dropdown-icon="settings">
                      <q-list>

                        <q-item clickable v-close-popup @click="mdl_lihat = true, selectData(data)">
                          <q-item-section avatar>
                            <q-avatar icon="search" color="blue" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Detile Bumdes</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="mdl_edit = true, selectData(data)">
                          <q-item-section avatar>
                            <q-avatar icon="create" color="orange" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Edit</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="mdl_hapus = true, selectData(data)">
                          <q-item-section avatar>
                            <q-avatar icon="delete_forever" color="negative" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Hapus</q-item-label>
                          </q-item-section>
                        </q-item>

                      </q-list>
                      
                    </q-btn-dropdown>













                  </q-btn-group>
                 

                </td>
              </tr>

            </table>

            
                
 <!-- <textarea id="froala-editor">Initialize the Froala WYSIWYG HTML Editor on a textarea.</textarea> -->
          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin">
        <br>
        

        <div class="flex flex-center">
          <q-pagination
            @click="getView()"
            v-model="page_first"
            :max="page_last"
            :max-pages="4"
            color="orange-14"

            :direction-links="true"
            :boundary-links="true"
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
          >
          </q-pagination>
        </div>




        <br>








      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">

                        <br>
                        <span class="h_lable ">Nama Bumdes</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Alamat</span>
                        <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Nomor Register Pendaftaran</span>
                        <q-input v-model="form.noreg" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Nomor Perdes</span>
                        <q-input v-model="form.no_perdes_pembentukan" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">SOP</span>
                        <q-input v-model="form.sop" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">AD /ART</span>
                        <q-input v-model="form.ad_art" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Status Kepemilikan Kantor Sekretariat</span>
                        <q-input v-model="form.status_kantor" outlined square :dense="true" class="bg-white margin_btn" /> 
                   
                        <hr class="hrpagin">
                        <span class="h_lable ">KONDISI KANTOR SEKRETARIAT</span>
                        <hr class="hrpagin">

                        <span class="h_lable ">Buku Tamu</span>
                        <q-input v-model="form.buku_tamu" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Perabot Kantor</span>
                        <q-input v-model="form.perabot_kantor" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Sarana Penunjang</span>
                        <q-input v-model="form.sarana_penunjang" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <hr class="hrpagin">

                        <span class="h_lable ">Profil Bumdes</span>
                        <q-input v-model="form.profil" outlined square :dense="true" class="bg-white margin_btn" /> 

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                        <q-btn label="Keluar" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH ================================================ -->


            <!-- ================================================= MODAL EDIT ================================================ -->
               <q-dialog v-model="mdl_edit" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Nama Bumdes</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Alamat</span>
                        <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Nomor Register Pendaftaran</span>
                        <q-input v-model="form.noreg" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Nomor Perdes</span>
                        <q-input v-model="form.no_perdes_pembentukan" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">SOP</span>
                        <q-input v-model="form.sop" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">AD /ART</span>
                        <q-input v-model="form.ad_art" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Status Kepemilikan Kantor Sekretariat</span>
                        <q-input v-model="form.status_kantor" outlined square :dense="true" class="bg-white margin_btn" /> 
                   
                        <hr class="hrpagin">
                        <span class="h_lable ">KONDISI KANTOR SEKRETARIAT</span>
                        <hr class="hrpagin">

                        <span class="h_lable ">Buku Tamu</span>
                        <q-input v-model="form.buku_tamu" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Perabot Kantor</span>
                        <q-input v-model="form.perabot_kantor" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <span class="h_lable ">Sarana Penunjang</span>
                        <q-input v-model="form.sarana_penunjang" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <hr class="hrpagin">

                        <span class="h_lable ">Profil Bumdes</span>
                        <q-input v-model="form.profil" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <br>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                      <q-btn @click="emptytData(), mdl_edit = false" label="Keluar" color="negative" />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

            <!-- ================================================= MODAL LIHAT ================================================ -->
               <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-blue">
                    <div class="text-h6 h_modalhead">Detile Data</div>
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
                                <img style="width:100%; height:auto" src="img/i_pegawai.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_usaha = true">
                                <q-tooltip content-class="bg-blue-grey-8" content-style="font-size: 13px">
                                  Data Usaha dan Keuangan
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/i_uang.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_pelatihan = true">
                                <q-tooltip content-class="bg-deep-purple-4" content-style="font-size: 13px">
                                  Data Pelatihan
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/i_pelatihan.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_kendaraan = true">
                                <q-tooltip content-class="bg-grey-7" content-style="font-size: 13px">
                                  Data Kendaraan Operasional
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/i_car.png" alt="">
                              </a>
                            </div>

                            <div class="col-4 col-md-1" style="padding:10px">
                              <a href="javascript:void(0)" @click="mdl_sarana = true">
                                <q-tooltip content-class="bg-cyan-7" content-style="font-size: 13px">
                                  Data Jenis Sarana Produksi yang dimiliki
                                </q-tooltip>
                                <img style="width:100%; height:auto" src="img/i_bangunan.jpg" alt="">
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

            <!-- ================================================ MODAL HAPUS ================================================ -->
                  <q-dialog v-model="mdl_hapus" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeData">
                              <br>
                              <img src="img/alert.png" alt="" width="75"> <br>
                              <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                              <input type="submit" style="position: absolute; left: -9999px"/>
                              <br>
                              <br>

                            <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                            &nbsp;
                            <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup/>

                          </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>

            <!-- ================================================ MODAL HAPUS ================================================ -->





            <!-- ================================================= MODAL PELAKSANA OPERASIONAL ================================================ -->
              <q-dialog v-model="mdl_pelaops" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Pelaksana Operasional</div>
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



          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../../library/umum'
import WILAYAH from  '../../../library/getWilayah'
import uniqid from 'uniqid';

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
            des_kel : '',
            kecamatan : '',
        },


        pelops : {
            id : '',
            id_bumDes : '',
            nama : '',
            alamat : '',
            pendidikan_terahir : '',
            no_telp : '',
            honor : '',
            createdAt : '',
            des_kel : '',
        },

        list_data : [],
        page_limit : 8,
        page_first: 1,
        page_last: 0,
        cari_value: "",
        cek_load_data : true,

        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        mdl_lihat : false,

        mdl_pelaops : false,
        mdl_usaha : false,
        mdl_pelatihan : false,
        mdl_kendaraan : false,
        mdl_sarana : false,



        btn_add: false,

        disable_kec : false,
        disable_des : false,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              kecamatan : this.form.kecamatan,
              des_kel : this.form.des_kel,
              data_ke: this.page_first,
              page_limit : this.page_limit,
              cari_value: this.cari_value
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data = res_data.data;
              this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
            //   console.log(res_data);
      });
    },

    addData : function(number) {
        this.form.id = uniqid();
        // this.form.keterangan = document.getElementById("editor").value;
        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "addData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });

        // console.log(document.getElementById("editor").value)
    },

    editData : function(){
        // this.form.keterangan = document.getElementById("editor").value;
      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.form)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

    removeData : function(E){
      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.form)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
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

    emptytData : function(data){
 
            this.form.id = '';
            this.form.uraian = '';
            this.form.keterangan= null;
            this.form.createdAt = '';
    },

    checkAdd : function(){
      if (this.form.des_kel == null || this.form.des_kel == '' || this.form.des_kel == undefined) {
        alert ("MOHON PILIH DESA/KELURAHAN TERLEBIH DAHULU..!!")
      } else {
        this.mdl_add = true; 
        this.$store.commit('addEditor');
      }
    },

    chageDesa(){
      this.form.des_kel = ''
      if (this.form.kecamatan == '' || this.form.kecamatan == undefined || this.form.kecamatan == null) {
        WILAYAH.postDesKelAutocomplete();
      } else {
        WILAYAH.postDesKelAutocomplete(this.form.kecamatan);
        
      }
    },

    // ====================================== PAGINATE ====================================
        Notify : function(message, positive, icon){
          this.$q.notify({
            message: message,
            color: positive,
            icon: icon,
            position : 'top',
            timeout: 500,
          })
        },

        cari_data : function(){
            this.page_first = 1;
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        tunggu : async function(){
          await WILAYAH.getListKecamatan();
          await WILAYAH.getListDesKelFull();

          if (profile.des_kel == null || profile.des_kel == undefined || profile.des_kel == '') {
            console.log(this.$store.state.listDesKel[0].uniqid)
            this.form.des_kel = this.$store.state.listDesKel[0].uniqid
          } else {
            this.form.des_kel = profile.des_kel
          }
        },

        filterSelect : function(profile){
          if (profile.aksesWilayah == 0) {
            WILAYAH.getListDesKelFull();
            this.form.des_kel = profile.des_kel
            this.disable_des = true
            this.disable_kec = true
          } else if (profile.aksesWilayah == 1) {
            this.form.kecamatan = profile.kecamatan
            WILAYAH.postDesKel(profile.kecamatan)
            this.disable_kec = true
            this.disable_des = false

          } else if (profile.aksesWilayah == 2) {
            WILAYAH.getListDesKelFull();
            this.disable_kec = false
            this.disable_des = false
          }
        },

    // ====================================== PAGINATE ====================================

  },

  mounted () {

    this.form.tahun = UMUM.getTahun();
    WILAYAH.getListKecamatan();
    
    var profilex = JSON.parse(localStorage.profile)
    var profile = profilex.profile
    this.$store.state.ID_DES_KEL = profile.des_kel
  
    // this.tunggu();
   
    this.filterSelect(profile)
    // console.log(this.form.des_kel)

    this.getView();

    new FroalaEditor('textarea#froala-editor')
        // tinymce.init({
        //   selector: 'textarea',
        //   plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
        //   toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
        //   toolbar_mode: 'floating',
        //   tinycomments_mode: 'embedded',
        //   tinycomments_author: 'Author name',
        // });
  },
}
</script>




 