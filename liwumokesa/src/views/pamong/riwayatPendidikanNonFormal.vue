<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-light-green-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Riwayat Pendidikan Non Formal</div>
            <div class="text-subtitle2">Pamong Desa</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true, $store.commit('addEditor')" dense flat icon="add" style="width:10%">
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
        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-grey-5">
                <th width="5%" class="text-center">No</th>
                <th width="30%" class="text-center">Nama</th>
                <th width="20%" class="text-center">NIP</th>
                <th width="30%" class="text-center">Jabatan</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class=" h_top">{{data.nama}}.</td>
                <td class="text-center h_top">{{data.nip}}.</td>
                <td class=" h_top">{{data.jabatan}}.</td>
                <td class="text-center h_top">
                  <q-btn-group>
                    <q-btn  @click="mdl_lihat = true, selectData(data)" glossy color="blue" icon="search" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat Detil Data
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
                  <q-card-section class="bg-light-green-7">
                    <div class="text-h6 h_modalhead">Tambah Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                      <br>

                        <div class="row">
                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Nama</span>
                            <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Jabatan</span>
                            <q-input v-model="form.jabatan" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tempat Lahir</span>
                            <q-input v-model="form.tpt_lahir" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tanggal Lahir</span>
                            <q-input v-model="form.tgl_lahir" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Pendidikan</span>
                            <select v-model="form.pendidikan" class="bg-white"  outlined square :dense="true">
                              <option value="">-- Pilih Pendidikan --</option>
                              <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">{{data.uraian}}</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Agama</span>
                            <select v-model="form.agama" class="bg-white"  outlined square :dense="true">
                              <option value="">-- Pilih Agama --</option>
                              <option v-for="data in list_agama" :key="data.id" :value="data.id">{{data.uraian}}</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Penandatangan Layanan</span>
                            <select v-model="form.penandatangan" class="bg-white"  outlined square :dense="true">
                              <option :value="true">[1]. PenandaTangan</option>
                              <option :value="false">[2]. Bukan PenandaTangan</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Lampiran Foto/File</span>
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
                    <div class="text-h6 h_modalhead">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <br>
                        <div class="row">
                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Nama</span>
                            <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Jabatan</span>
                            <q-input v-model="form.jabatan" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tempat Lahir</span>
                            <q-input v-model="form.tpt_lahir" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Tanggal Lahir</span>
                            <q-input v-model="form.tgl_lahir" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Pendidikan</span>
                            <select v-model="form.pendidikan" class="bg-white"  outlined square :dense="true">
                              <option value="">-- Pilih Pendidikan --</option>
                              <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">{{data.uraian}}</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-6" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Agama</span>
                            <select v-model="form.agama" class="bg-white"  outlined square :dense="true">
                              <option value="">-- Pilih Agama --</option>
                              <option v-for="data in list_agama" :key="data.id" :value="data.id">{{data.uraian}}</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Penandatangan Layanan</span>
                            <select v-model="form.penandatangan" class="bg-white"  outlined square :dense="true">
                              <option value="true">[1]. PenandaTangan</option>
                              <option value="false">[2]. Bukan PenandaTangan</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Lampiran Foto/File</span>
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
                <q-card class="mdl-md">
                  <q-card-section class="bg-blue-4">
                    <div class="text-h6 h_modalhead">Detil Detil Pegawai</div>
                  </q-card-section>


                  

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                         <hr class="hrpagin">
                        <div class="text-center">
                          <q-img
                            class="hoverImg"
                            :src="$store.state.url.URL_APP+'uploads/'+fileOld"
                            style="width:250px"
                            spinner-color="primary"
                            spinner-size="82px"
                          />
                        </div>
                         <hr class="hrpagin">
                        <table width="100%">
                          <tr class="h_table_head bg-grey-5">
                            <th width="5%" class="text-center">No</th>
                            <th width="30%" class="text-center">Nama</th>
                            <th width="30%" class="text-center">Nama</th>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">1.</td>
                            <td class=" h_top">Nama</td>
                            <td class=" h_top">{{form.nama}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">2.</td>
                            <td class=" h_top">Jabatan</td>
                            <td class=" h_top">{{form.jabatan}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">3.</td>
                            <td class=" h_top">Tempat/Tgl Lahir</td>
                            <td class=" h_top">{{form.tpt_lahir}} / {{UMUM.tglConvertX(form.tgl_lahir)}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">4.</td>
                            <td class=" h_top">Pendidikan</td>
                            <td class=" h_top">{{uraian.pendidikan_uraian}}.</td>
                          </tr>
                          <tr class="h_table_body">
                            <td class="text-center h_top">5.</td>
                            <td class=" h_top">Agama</td>
                            <td class=" h_top">{{uraian.agama_uraian}}.</td>
                          </tr>

                        </table>
                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn @click="emptytData(), mdl_lihat = false" label="Kembali" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT ================================================ -->

            <!-- ================================================= MODAL GAMBAR ================================================ -->
              <q-dialog v-model="mdl_lihat_file" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-blue-9">
                    <div class="text-h6 h_modalhead">Detil Capaian Kinerja</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        
                        <q-img
                            :src="$store.state.url.URL_APP+'uploads/'+fileOld"
                            spinner-color="primary"
                            spinner-size="82px"
                          />


                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn @click="emptytData(), mdl_lihat_file = false" label="Kembali" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL GAMBAR ================================================ -->




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../library/umum'
import FETCHING from  '../../library/fetching'
import uniqid from 'uniqid';

export default {
  data() {
    return {

        form : {
            id : '',
            nama : '',
            jabatan : '',
            tpt_lahir : '',
            tgl_lahir : '',
            pendidikan : '',
            agama : '',
            penandatangan : true,
            createdAt : '',
            createdBy : '',
            file : null,
            des_kel : '',
        },
        uraian : {
          agama_uraian : '',
          pendidikan_uraian : ''
        },

        fileOld : '',




        list_data : [],
        list_pendidikan : [],
        list_agama : [],
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
      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "view", {
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
              this.list_data = res_data.data;
              this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },


    addData : function(number) {

        // console.log(this.form)
        var formData = new FormData();

        formData.append("id", uniqid());
        formData.append("nama", this.form.nama);
        formData.append("jabatan", this.form.jabatan);
        formData.append("tpt_lahir", this.form.tpt_lahir);
        formData.append("tgl_lahir", this.form.tgl_lahir);
        formData.append("pendidikan", this.form.pendidikan);
        formData.append("des_kel", this.form.des_kel);
        formData.append("agama", this.form.agama);
        formData.append("penandatangan", this.form.penandatangan);
        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.form.file);



        console.log(this.form);


        fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "addData", {
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
        formData.append("nama", this.form.nama);
        formData.append("jabatan", this.form.jabatan);
        formData.append("tpt_lahir", this.form.tpt_lahir);
        formData.append("tgl_lahir", this.form.tgl_lahir);
        formData.append("pendidikan", this.form.pendidikan);
        formData.append("agama", this.form.agama);
        formData.append("penandatangan", this.form.penandatangan);
        formData.append("createdAt", this.form.createdAt);
        formData.append("file", this.form.file);

        formData.append("fileOld", this.fileOld);


      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "editData", {
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
      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "removeData", {
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
            this.form.nama= data.nama;
            this.form.jabatan= data.jabatan;
            this.form.tpt_lahir= data.tpt_lahir;
            this.form.tgl_lahir= data.tgl_lahir;
            this.form.pendidikan= data.pendidikan;
            this.form.agama= data.agama;
            this.form.penandatangan = data.penandatangan;
            this.form.createdAt = data.createdAt;
            this.form.createdBy = data.createdBy;
            this.form.des_kel = data.des_kel;
            // this.form.file = data.file;

            this.uraian.agama_uraian = data.agama_uraian
            this.uraian.pendidikan_uraian = data.pendidikan_uraian

            this.fileOld = data.file;

            console.log(data.file)

            console.log(this.form)
    },

    getList : async function(){
      this.list_pendidikan = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_PENDIDIKAN);
      this.list_agama = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_AGAMA)
    },

    emptytData : function(data){

            this.form.id = '';
            this.form.uraian = '';
            this.form.judul = '';
            this.form.createdAt = '';
            this.form.createdBy ='';
            this.form.file = null;

            this.fileOld ='';

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







  },

  mounted () {
        // new FroalaEditor('textarea#froala-editor')

      var profilex = JSON.parse(localStorage.profile)
      var profile = profilex.profile
      this.$store.state.ID_DES_KEL = profile.des_kel


      this.form.des_kel = profile.des_kel


        this.getList();
        this.getView();
  },
}
</script>


<style>



</style>





 