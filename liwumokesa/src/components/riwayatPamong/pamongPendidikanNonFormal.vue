<template>
    <div>
        <br>
        <q-btn color="purple-3" size="sm" icon="add" label="Tambah Data"  @click="mdl_add=true"/>
        <hr class="hrpagin">
        <!-- <h1>{{form.desa_dataPegawai_id}}</h1> -->
        <br>
        <table width="100%">
            <tr class="h_table_head bg-grey-5">
                <th width="5%" class="text-center">No</th>
                <th width="30%" class="">Pendidikan</th>
                <th width="35%" class="">Penyelenggara</th>
                <th width="25%" class=" text-center">Pelaksanaan</th>
                <th width="5%" class=""></th>
            </tr>
            <tr class="h_table_body"  v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class=" h_top">{{data.judul}}</td>
                <td class=" h_top">{{data.penyelenggara}}</td>
                <td class=" h_top text-center">{{UMUM.tglConvertX(data.tgl_mulai)}} - {{UMUM.tglConvertX(data.tgl_selesai)}}</td>
                <td class=" h_top">
                    <q-btn-group>
                        <q-btn @click="mdl_lihat = true, selectData(data), $store.commit('addEditor')" glossy color="blue-9" icon="search" class="tbl_btn">
                            <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                                Click untuk mengubah data ini
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


        <hr class="hrpagin">
        <br>
        

        <div class="flex flex-center">
          <q-pagination
            @click="getView()"
            v-model="page_first"
            :max="page_last"
            :max-pages="4"
            color="purple-11"

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
                  <q-card-section class="bg-purple-3">
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
                            <span class="h_lable ">Nama Pendidikan</span>
                            <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Penyelenggara Pendidikan</span>
                            <q-input v-model="form.penyelenggara" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tgl Mulai Pelaksanaan</span>
                            <q-input v-model="form.tgl_mulai" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tgl Selesai Pelaksanaan</span>
                            <q-input v-model="form.tgl_selesai" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tempat Pendidikan</span>
                            <select v-model="form.tpt_pendidikan" class="bg-white"  outlined square :dense="true">
                              <option value="Dalam Negeri">-- Dalam Negeri --</option>
                              <option value="Luar Negeri">-- Luar Negeri --</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Nomor Sertifikat/Ijazah</span>
                            <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" type="text"/> 
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Lampiran File Sertifikat/Ijazah (PDF)</span>
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
                            <span class="h_lable ">Nama Pendidikan</span>
                            <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Penyelenggara Pendidikan</span>
                            <q-input v-model="form.penyelenggara" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tgl Mulai Pelaksanaan</span>
                            <q-input v-model="form.tgl_mulai" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tgl Selesai Pelaksanaan</span>
                            <q-input v-model="form.tgl_selesai" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tempat Pendidikan</span>
                            <select v-model="form.tpt_pendidikan" class="bg-white"  outlined square :dense="true">
                              <option value="Dalam Negeri">-- Dalam Negeri --</option>
                              <option value="Luar Negeri">-- Luar Negeri --</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Nomor Sertifikat/Ijazah</span>
                            <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" type="text"/> 
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Lampiran File Sertifikat/Ijazah (PDF)</span>
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
                        <table width="100%">
                          <tr class="h_table_head bg-grey-5">
                            <th width="5%" class="text-center">No</th>
                            <th width="30%" class="text-center">Uraian</th>
                            <th width="30%" class="text-center">Ket</th>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">1.</td>
                            <td class=" h_top">Nama Pelatihan/Pendidikan</td>
                            <td class=" h_top">{{form.judul}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">2.</td>
                            <td class=" h_top">Penyelenggara</td>
                            <td class=" h_top">{{form.penyelenggara}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">3.</td>
                            <td class=" h_top">Tgl Pelaksanaan</td>
                            <td class=" h_top">{{UMUM.tglConvertX(form.tgl_mulai)}} - {{UMUM.tglConvertX(form.tgl_selesai)}}</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">4.</td>
                            <td class=" h_top">Tempat Pelaksanaan</td>
                            <td class=" h_top">{{form.tpt_pendidikan}}.</td>
                          </tr>

                          <tr class="h_table_body">
                            <td class="text-center h_top">5.</td>
                            <td class=" h_top">No Ijazah/Sertifikat</td>
                            <td class=" h_top">{{form.no}}.</td>
                          </tr>

                        </table>

                        <hr class="hrpagin">

                        <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>

                        

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
import WILAYAH from  '../../library/getWilayah'
import uniqid from 'uniqid';

export default {
  props: ["desaDataPegawaiId"],
  data() {
    return {

        form : {
            id : '',
            desa_dataPegawai_id : this.desaDataPegawaiId,
            judul : '',
            penyelenggara : '',
            tgl_mulai : '',
            tgl_selesai : '',
            tpt_pendidikan : '',
            no : '',
            createdAt : '',
            createdBy : '',
            file : null,
        },

        fileOld : '',




        list_data : [],
        list_pendidikan : [],
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
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_desa_riwayatPendidikanNonFormal + "view", {
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
              // console.log(res_data);
      });
    },


    addData : function(number) {


        var formData = new FormData();

        formData.append("id", uniqid());
        formData.append("judul", this.form.judul);
        formData.append("desa_dataPegawai_id", this.form.desa_dataPegawai_id);
        formData.append("penyelenggara", this.form.penyelenggara);
        formData.append("tgl_mulai", this.form.tgl_mulai);
        formData.append("tgl_selesai", this.form.tgl_selesai);
        formData.append("tpt_pendidikan", this.form.tpt_pendidikan);
        formData.append("no", this.form.no);
        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.form.file);


        
        fetch(this.$store.state.url.URL_srv_desa_riwayatPendidikanNonFormal + "addData", {
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
        formData.append("judul", this.form.judul);
        formData.append("desa_dataPegawai_id", this.form.desa_dataPegawai_id);
        formData.append("penyelenggara", this.form.penyelenggara);
        formData.append("tgl_mulai", this.form.tgl_mulai);
        formData.append("tgl_selesai", this.form.tgl_selesai);
        formData.append("tpt_pendidikan", this.form.tpt_pendidikan);
        formData.append("no", this.form.no);
        formData.append("file", this.form.file);

        formData.append("fileOld", this.fileOld);


      fetch(this.$store.state.url.URL_srv_desa_riwayatPendidikanNonFormal + "editData", {
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
      fetch(this.$store.state.url.URL_srv_desa_riwayatPendidikanNonFormal + "removeData", {
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
        this.form.judul= data.judul;
        this.form.penyelenggara= data.penyelenggara;
        this.form.tgl_mulai= data.tgl_mulai;
        this.form.tgl_selesai= data.tgl_selesai;
        this.form.tpt_pendidikan= data.tpt_pendidikan;
        this.form.no= data.no;
        this.form.createdAt = data.createdAt;
        this.form.createdBy = data.createdBy;
        // this.form.file = data.file;
        this.fileOld = data.file;
        // console.log(data.file)
        

    },

    emptytData : function(data){

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

        this.getView();
  },
}
</script>




 