<template>
    <div>
        <br>
        <q-btn color="lime-9" size="sm" icon="add" label="Tambah Data"  @click="mdl_add=true"/>
        <hr class="hrpagin">
        <!-- <h1>{{form.desa_dataPegawai_id}}</h1> -->
        <br>
        <div class="tbl_responsive">
            <table width="100%">
                <tr class="h_table_head bg-grey-5">
                    <th width="5%" class="text-center">No</th>
                    <th width="45%" class="">Nama</th>
                    <th width="45%" class="">TTL</th>
                    <th width="5%" class=""></th>
                </tr>
                <tr class="h_table_body"  v-for="(data, index) in list_data" :key="data.id">
                    <td class="text-center h_top">{{indexing(index+1)}}.</td>
                    <td class=" h_top">
                        {{data.uraian}}
                        <div class="h_nip">(Tahun {{ data.thn }})</div>
                    </td>
                    <td class=" h_top">{{data.penyelenggara}}</td>
                    <td class=" h_top">
                        <q-btn-group>
                            <q-btn @click="mdl_lihat = true, selectData(data), $store.commit('addEditor')" glossy color="blue-9" icon="search" class="tbl_btn">
                                <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                                    Click untuk melihat detile data ini
                                </q-tooltip>  
                            </q-btn>
                            <q-btn @click="mdl_edit = true, selectData(data), $store.commit('addEditor')" glossy color="orange" icon="create" class="tbl_btn">
                                <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                    Click untuk mengubah data ini
                                </q-tooltip>  
                            </q-btn>
                            <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                    Click untuk menghapus data ini
                                </q-tooltip>
                            </q-btn>
                        </q-btn-group>
                    </td>
                </tr>
    
            </table>

        </div>


        <hr class="hrpagin">
        <br>
        

        <div class="flex flex-center">
          <q-pagination
            @click="getView()"
            v-model="page_first"
            :max="page_last"
            :max-pages="4"
            color="lime-8"

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










            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-lime-7">
                    <div class="h_modalhead">Tambah Data</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_add=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                      <br>

                        <div class="row">


                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Uraian Kegiatan</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Penyelenggara</span>
                                <q-input v-model="form.penyelenggara" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-6 col-md-6" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Tahun Pelaksanaan</span>
                                <q-input v-model="form.thn" outlined square :dense="true" class="bg-white margin_btn" type="number"/> 
                            </div>


                            <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Nomor Sertifikat/Piagam sejenis</span>
                                <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" type="text"/> 
                            </div>

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.ket" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>

                            

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Lampiran Sertifikat/Piagam sejenis (PDF)</span>
                                <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                                </q-file>
                            </div>

                        </div>

               
                        
                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                        <q-btn @click="emptytData(), mdl_add = false" label="Batal" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH ================================================ -->


            <!-- ================================================= MODAL EDIT ================================================ -->
               <q-dialog v-model="mdl_edit" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="h_modalhead">Edit Data</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_edit=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <br>
                        <div class="row">
                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Uraian Kegiatan</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Penyelenggara</span>
                                <q-input v-model="form.penyelenggara" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-6 col-md-6" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Tahun Pelaksanaan</span>
                                <q-input v-model="form.thn" outlined square :dense="true" class="bg-white margin_btn" type="number"/> 
                            </div>


                            <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Nomor Sertifikat/Piagam sejenis</span>
                                <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" type="text"/> 
                            </div>

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.ket" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>

                            

                            <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                                <span class="h_lable ">Lampiran Sertifikat/Piagam sejenis (PDF)</span>
                                <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                                </q-file>
                            </div>

                           
                        </div>
                     
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                      <q-btn @click="emptytData(), mdl_edit = false" label="Batal" color="negative" />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

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

            <!-- ================================================= MODAL LIHAT ================================================ -->
              <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-blue-3">
                    <div class="h_modalhead">Detile Data</div>
                    <div class="div_exit_modal">
                      <a @click="mdl_lihat=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                    </div>
                  </q-card-section>



                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                      <br>

                      <div class="tbl_responsive">
                          <table width="100%">
                            <tr class="h_table_head bg-grey-5">
                              <th width="5%" class="text-center">No</th>
                              <th width="30%" class="text-center">Uraian</th>
                              <th width="30%" class="text-center">Ket</th>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">1.</td>
                              <td class=" h_top">Uraian Kegiatan</td>
                              <td class=" h_top">{{form.uraian}}.</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">2.</td>
                              <td class=" h_top">Penyelenggara</td>
                              <td class=" h_top">{{form.penyelenggara}}</td>
                            </tr>
                            <tr class="h_table_body">
                              <td class="text-center h_top">3.</td>
                              <td class=" h_top">Tahun Pelaksanaan</td>
                              <td class=" h_top">{{form.thn}}, {{form.tgl_lahir}}</td>
                            </tr>

                            <tr class="h_table_body">
                              <td class="text-center h_top">4.</td>
                              <td class=" h_top">Keterangan</td>
                              <td class=" h_top">{{form.ket}}, {{form.tgl_lahir}}</td>
                            </tr>
                            
  
                            <tr class="h_table_body">
                              <td class="text-center h_top">5.</td>
                              <td class=" h_top">No Lampiran File  Akta/Buku nikah (PDF)</td>
                              <td class=" h_top">{{form.no}}.</td>
                            </tr>
  
                          </table>

                      </div>

                        <hr class="hrpagin">

                        <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>

                        <hr class="hrpagin">

                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn @click="emptytData(), mdl_lihat = false" label="Kembali" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT ================================================ -->

    </div>
</template>

<script>

import UMUM from  '../../library/umum'
import FETCHING from  '../../library/fetching'
import WILAYAH from  '../../library/getWilayah'
import uniqid from 'uniqid';

export default {
  props: ["desaDataPegawaiId"],
  data() {
    return {

        form : {
            id : '',
            desa_dataPegawai_id : this.desaDataPegawaiId,
            uraian : '',
            penyelenggara : '',
            thn : '',
            ket : '',
            no : '',
            createdAt : '',
            createdBy : '',
            file : null,
        },

        fileOld : '',




        list_data : [],
        list_status : [],
        page_limit : 8,
        page_first: 1,
        page_last: 0,
        cari_value: "",
        cek_load_data : true,


        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        mdl_lihat: false,
        mdl_lihat_file: false,
        btn_add: false,

        UMUM : UMUM,
        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_desa_riwayatPrestasi + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              desaDataPegawaiId : this.desaDataPegawaiId,
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
              console.log(res_data);
      });
    },


    addData : function(number) {


        var formData = new FormData();
        formData.append("id", uniqid());
        formData.append("desa_dataPegawai_id", this.form.desa_dataPegawai_id);
        formData.append("uraian", this.form.uraian);
        formData.append("penyelenggara", this.form.penyelenggara);
        formData.append("thn", this.form.thn);
        formData.append("ket", this.form.ket);
        formData.append("no", this.form.no);
        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.form.file);


        
        fetch(this.$store.state.url.URL_srv_desa_riwayatPrestasi + "addData", {
            method: "POST",
            headers: {
                // "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData : function(){

      var formData = new FormData();
        formData.append("id", this.form.id);
        formData.append("desa_dataPegawai_id", this.form.desa_dataPegawai_id);
        formData.append("uraian", this.form.uraian);
        formData.append("penyelenggara", this.form.penyelenggara);
        formData.append("thn", this.form.thn);
        formData.append("ket", this.form.ket);
        formData.append("no", this.form.no);
        formData.append("file", this.form.file);
        formData.append("fileOld", this.fileOld);
      fetch(this.$store.state.url.URL_srv_desa_riwayatPrestasi + "editData", {
          method: "POST",
          headers: {
            // "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: formData
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

    removeData : function(E){
      fetch(this.$store.state.url.URL_srv_desa_riwayatPrestasi + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id : this.form.id,
              fileOld : this.fileOld,

          })
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },
    selectData : function(data){

        this.form.id = data.id;
        this.form.desa_dataPegawai_id= data.desa_dataPegawai_id;
        // status_keluarga
        this.form.uraian= data.uraian;
        this.form.penyelenggara= data.penyelenggara;
        this.form.thn= data.thn;
        this.form.ket= data.ket;

        this.form.no= data.no;
        this.form.createdAt = data.createdAt;
        this.form.createdBy = data.createdBy;
        // this.form.file = data.file;
        this.fileOld = data.file;
        // console.log(data.file)
        

    },

    emptytData : function(data){

    },



    getList : async function(){
      this.list_pendidikan = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_PENDIDIKAN);


      console.log(this.list_pendidikan);

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

        convert_tgl: function(dateString) {
            var date = new Date(dateString);
            var getBulan = date.getMonth() + 1; var bulan = '';
            if (getBulan == '1') {bulan = 'Jan'} 
            else if(getBulan == '2') {bulan = 'Feb'}
            else if(getBulan == '3') {bulan = 'Mar'}
            else if(getBulan == '4') {bulan = 'Apr'}
            else if(getBulan == '5') {bulan = 'Mei'}
            else if(getBulan == '6') {bulan = 'Jun'}
            else if(getBulan == '7') {bulan = 'Jul'}
            else if(getBulan == '8') {bulan = 'Agt'}
            else if(getBulan == '9') {bulan = 'Sep'}
            else if(getBulan == '10') {bulan = 'Okt'}
            else if(getBulan == '11') {bulan = 'Nov'}
            else if(getBulan == '12') {bulan = 'Des'}

            return date.getDate() + " " + bulan + " " + date.getFullYear();
            // return bulan+ " " + date.getDate() + ". " + date.getFullYear();
        },




    // ====================================== PAGINATE ====================================

    chageDesa(){
      this.form.des_kel = ''
      if (this.form.kecamatan == '' || this.form.kecamatan == undefined || this.form.kecamatan == null) {
        WILAYAH.postDesKelAutocomplete();
      } else {
        WILAYAH.postDesKelAutocomplete(this.form.kecamatan);
      }
    },

    filterSelect : function(profile){
      if (profile.aksesWilayah == 0) {
        WILAYAH.getListDesKelFull();
        this.form.des_kel = profile.des_kel
        this.$store.state.ID_DES_KEL = profile.des_kel
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







  },

  mounted () {
        // new FroalaEditor('textarea#froala-editor')
        var profilex = JSON.parse(localStorage.profile)
        var profile = profilex.profile
        this.filterSelect(profile)


        this.getList();
        this.getView();
  },
}
</script>




 