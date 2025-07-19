<template>
  <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-2"></div>
                <div class="col-12 col-md-8">
                    <hr class="hrdetilberita" />
                    <div class="text-center">
                        <span class="h_title text-orange">SURAT KETERANGAN TIDAK MAMPU</span> <br>
                    </div>

                    <hr class="hrdetilberita" />

                    <div class="" style="margin-top:12px">
                        <div v-if="$store.state.CHECK_AUTH">
                            <!-- <q-avatar style="padding-left:20px">
                                <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar> -->
                            <q-btn @click="routex('menuSurat')" size="15px" round color="blue-grey-5" icon="arrow_back"/>
                            
                            <span class="f_captions2" style="padding-left:10px">Kembali Ke Menu Persuratan</span>

                        </div>

                    </div>

                    <!-- {{$store.state.CHECK_AUTH}} -->
                    <br>
                    <q-separator />
                    <br>

                    <div class="row">
                        



                      <div class="col-12 col-md-12">
                        <q-list bordered padding class="rounded-borders">
                          <q-item-label header>
                            <q-btn @click="modal_add = true" color="primary" icon="attach_email" label="Tambah Usulan" />
                          </q-item-label>

                          <q-item v-for="data in LIST_DATA" :key="data.data.id" clickable v-ripple @click="selectData(data), modal_lihat =true">
                            <q-item-section avatar top>
                              <q-avatar icon="file_present" color="blue-6" text-color="white" />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label lines="1">Surat Keterangan Tidak Mampu <b>({{data.data.nama}})</b></q-item-label>
                              <q-item-label caption>{{data.data.createdAt}}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="info" :color="UMUM.StatusIndikator(data.data.status)" />
                            </q-item-section>
                          </q-item>

                       

                          <!-- <q-separator spaced /> -->
               
                        </q-list>
                      </div>














                    </div>
                </div>
                <div class="col-12 col-md-2"></div>
                
            </div>
        </div>


            <!-- ================================= MODAL ADD ======================================= -->
                <q-dialog v-model="modal_add" persistent>
                        <q-card class="mdl-md" style="width: 100%; max-width: 80vw;" >
                            <q-card-section class="bg-primary">
                                <div class="row">
                                    <div class="text-center">
                                        <div class="text-h6 h_modalhead text-center">TAMBAH DATA</div>
                                    </div>
                                    <div style="pading-left:2px; position : absolute; right:15px">
                                        <a @click="modal_add = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                    </div>
                                </div>
                            </q-card-section>

                            <form>
                                <q-card-section class="q-pt-none">

 
                                    <br>
                      
                                

                                    <div class="row">
                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Nama Pengusul</span>
                                        <q-input outlined v-model="form.nama" :dense="true" />
                                      </div>


                                      <div class="col-12 col-md-6 div_input div_input_right">
                                        <span class="h_label">Tempat Lahir</span>
                                        <q-input outlined v-model="form.tpt_lahir" :dense="true" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_left">
                                        <span class="h_label">Tgl Lahir</span>
                                        <q-input type="date" outlined v-model="form.tgl_lahir" :dense="true" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_right">
                                        <span class="h_label">Agama</span>
                                        <q-select v-model="form.agama" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="LIST_AGAMA" label="Pilih Agama" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_left">
                                        <span class="h_label">Jenis Kelamin</span>
                                        <q-select v-model="form.jk" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="$store.state.JENIS_KELAMIN" label="Jenis Kelamin" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_right">
                                        <span class="h_label">Status Perkawinan</span>
                                        <q-select v-model="form.status_nikah" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="$store.state.STATUS_SOSIAL" label="Status Perkawinan" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_left">
                                        <span class="h_label">Pekerjaan</span>
                                        <q-select v-model="form.pekerjaan" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="LIST_PEKERJAAN" label="Pekerjaan" />
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Alamat</span>
                                        <q-input outlined v-model="form.alamat" :dense="true" type="textarea"/>
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Lampiran PDF (Jika dipersyaratkan)</span>
                                        <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn" accept="application/pdf">
                                          <template v-slot:prepend>
                                            <q-icon name="attach_file" />
                                          </template>
                                        </q-file>
                                      </div>


                                    </div>
                                    <br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 

                                <!-- <div class="text-center" style="padding-top:2px">
                                    <span style="font-size:9px !important; color:#ADADAD"><b>Belum punya akun ?</b></span>
                                </div> -->


                                <!-- <q-markup-table separator="vertical" flat bordered style="width:100%; margin-top:10px"> </q-markup-table>  -->



                                </q-card-section>

                                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                           
                                    <q-btn @click="addData()" label="Save" color="primary"  />
                                    <q-btn @click="modal_add = false" label="Kembali" color="negative"  />
                                </q-card-actions>


                            </form>
                        </q-card>
                    </q-dialog>

            <!-- ================================= MODAL ADD ======================================= -->


            <!-- ================================= MODAL EDIT ======================================= -->
                <q-dialog v-model="modal_edit" persistent>
                    <q-card class="mdl-md" style="width: 100%; max-width: 80vw;" >
                        <q-card-section class="bg-orange-14">
                            <div class="row">
                                <div class="text-center">
                                    <div class="text-h6 h_modalhead text-center">EDIT DATA</div>
                                </div>
                                <div style="pading-left:2px; position : absolute; right:15px">
                                    <a @click="modal_edit = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                </div>
                            </div>
                        </q-card-section>

                          <form>
                              <q-card-section class="q-pt-none">

                                <br>
                                <div class="row">
                                  <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Nama Pengusul</span>
                                        <q-input outlined v-model="form.nama" :dense="true" />
                                      </div>


                                      <div class="col-12 col-md-6 div_input div_input_right">
                                        <span class="h_label">Tempat Lahir</span>
                                        <q-input outlined v-model="form.tpt_lahir" :dense="true" />
                                      </div>

                                      <div class="col-12 col-md-6 div_input div_input_left">
                                        <span class="h_label">Tgl Lahir</span>
                                        <q-input type="date" outlined v-model="form.tgl_lahir" :dense="true" />
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Agama</span>
                                        <q-select v-model="form.agama" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="LIST_AGAMA" label="Pilih Agama" />
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Jenis Kelamin</span>
                                        <q-select v-model="form.jk" emit-value  map-options option-value="id" option-label="uraian" :dense="true" outlined :options="$store.state.JENIS_KELAMIN" label="Jenis Kelamin" />
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Alamat</span>
                                        <q-input outlined v-model="form.alamat" :dense="true" type="textarea"/>
                                      </div>

                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Lampiran PDF (Jika dipersyaratkan)</span>
                                        <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn" accept="application/pdf">
                                          <template v-slot:prepend>
                                            <q-icon name="attach_file" />
                                          </template>
                                        </q-file>
                                      </div>


                                </div>
                                <br>

                                <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 

                                <br>

                              </q-card-section>

                              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                           
                                    <q-btn @click="editData()" label="Save" color="primary"  />
                                    <q-btn @click="modal_edit = false" label="Kembali" color="negative"  />
                                </q-card-actions>


                          </form>
                    </q-card>
                </q-dialog>
            <!-- ================================= MODAL EDIT ======================================= -->


            <!-- ================================= MODAL LIHAT ======================================= -->
                <q-dialog v-model="modal_lihat" persistent>
                    <q-card class="mdl-mdx" style="width: 100%; max-width: 80vw;" >
                        <q-card-section class="bg-light-blue">
                            <div class="row">
                                <div class="text-center">
                                    <div class="text-h6 h_modalhead text-center">LIHAT DATA</div>
                                </div>
                                <div style="pading-left:2px; position : absolute; right:15px">
                                    <a @click="modal_lihat = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                </div>
                            </div>
                        </q-card-section>

                          <form>
                              <q-card-section class="q-pt-none">

                                <br>
                                <div class="row">
                                  <div class="col-12">
                                    <span style="font-size:12px; font-weight:bold; color:gray">👤 {{form.nama}}</span> <br> 
                                    <span style="font-size:11px; font-weight:bold; color:gray">📅 Tgl Post : {{form.createdAt}}</span> <br>
                                    <span style="font-size:11px; font-weight:bold; color:gray">✍ Keterangan : {{form.keterangan}}</span> <br>
                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 
                                    <br><br>
                                  </div>

                                  <tidakMampu :form="form" :uraian='uraian'/>

                                </div>

                                

                                <div>

                                </div>
    

                              </q-card-section>

                              <q-card-actions class="bg-grey-4 mdl-footer" align="right">



                                  <q-btn style="margin-left:1%" color="red-5" icon="delete" size="sm" @click="removeData()">
                                      <span >Hapus</span>
                                    </q-btn>




                                    <q-btn color="orange" v-if="!UMUM.checkStatus(form.status)" icon="create" size="sm" @click="modal_edit = true, modal_lihat = false">
                                      <span >Edit</span>
                                    </q-btn>
                                    <q-btn style="margin-left:1%" v-if="!UMUM.checkStatus(form.status)" color="red-5" icon="delete" size="sm" @click="removeData()">
                                      <span >Hapus</span>
                                    </q-btn>

                                     <q-btn style="margin-left:1%" v-if="UMUM.checkStatus(form.status)" color="green-5" icon="file_download" size="sm" @click="hrefku($store.state.url.URL_APP+'uploads/'+form.id+'.pdf')">
                                      <span >Download</span>
                                    </q-btn>

                                    <q-btn style="margin-left:1%" v-if="UMUM.checkStatus(form.status)" color="green-5" icon="file_download" size="sm" @click="hrefku($store.state.url.URL_APP+'uploads/'+extDocxPDf(fileOld))">
                                      <span >Download1</span>
                                    </q-btn>

                                    <q-btn color="blue" icon="attachment" size="sm" @click="modal_lampiran = true">
                                      <span >Lampiran</span>
                                    </q-btn>
                                    <q-btn @click="modal_lihat = false" label="Kembali" color="red-14"  />
                                </q-card-actions>


                          </form>
                    </q-card>
                </q-dialog>
            <!-- ================================= MODAL LIHAT ======================================= -->


            <!-- ================================= MODAL LAMPIRAN ======================================= -->
                <q-dialog v-model="modal_lampiran" persistent>
                    <q-card class="mdl-mdx" style="width: 100%; max-width: 80vw;" >
                        <q-card-section class="bg-light-blue">
                            <div class="row">
                                <div class="text-center">
                                    <div class="text-h6 h_modalhead text-center">LAMPIRAN DATA</div>
                                </div>
                                <div style="pading-left:2px; position : absolute; right:15px">
                                    <a @click="modal_lampiran = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                </div>
                            </div>
                        </q-card-section>

                          <form>
                              <q-card-section class="q-pt-none">

                                <br>
                                <div class="row">
                                  <div class="col-12">

                                      {{fileOld}}
                                      <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>

                                  </div>
                                </div>

                                

                                <div>

                                </div>
    

                              </q-card-section>

                              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                                    <q-btn @click="modal_lampiran = false" label="Kembali" color="red-14"  />
                                </q-card-actions>


                          </form>
                    </q-card>
                </q-dialog>
            <!-- ================================= MODAL LAMPIRAN ======================================= -->

    </div>
</template>

<script>



import Joi from "joi";
const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(6).max(13).required(),
    password: Joi.string().min(6).required(),
});






import UMUM from "../../library/umum";
import FETCHING from "../../library/fetching";
import uniqid from 'uniqid';




export default {
    data() {
        return {
            key: '',
            modal_add : false,
            modal_edit : false,
            modal_lihat : false,
            modal_lampiran : false,

            form : {
              nama : '',
              tpt_lahir : '',
              tgl_lahir : '',
              jk : '',
              agama : '',
              status_nikah : '',
              pekerjaan : '',
              alamat : '',
              des_kel : '',
              no : '',
              file : null,
              createdAt : '',
              editedAt : '',
              status : 0,
              agenda : false,
              keterangan : 'Masih dalam proses pemeriksaan',
              penandatangan : '',
            },

            uraian : {
              agama_uraian : '',
              pekerjaan_uraian : '',
            },

            fileOld : '',

            UMUM : UMUM,
            FETCHING : FETCHING,
            LIST_AGAMA : [],
            LIST_PEKERJAAN : [],
            LIST_DATA : [],

        }
    },

    methods: {
        openModal() {
            this.notify("Upss..!! 😅", 'Mohon maaf layanan belum kami aktifkan', 'warning')
        },
        hrefku(data){
          window.open(
            data,
            '_blank' // <- This is what makes it open in a new window.
          );
        },

        routex : function(routeName){
                this.$router.push('/'+routeName);
        },


        getView : function(){
          this.$store.commit("shoWLoading");
          fetch(this.$store.state.url.URL_srv_suketTidakMampu + "view", {
              method: "POST",
              headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({
                  des_kel : this.form.des_kel
              })
          })
              .then(res => res.json())
              .then(res_data => {
                  this.list_data = res_data.data;
                  this.page_last = res_data.jmlData;
                  this.$store.commit("hideLoading");

                  this.LIST_DATA = res_data
                  console.log(res_data);
          });
        },


        addData : function(number) {

            this.form.createdAt = UMUM.NOW()

            // console.log(this.form)
            var formData = new FormData();

            formData.append("form", JSON.stringify(this.form));
            formData.append("file", this.form.file);


            fetch(this.$store.state.url.URL_srv_suketTidakMampu + "addData", {
                method: "POST",
                headers: {
                    // "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.notify("SUKSES", 'Anda berhasil mengajukan permohonan 😁', 'success')
                this.getView();
            });

            // console.log(document.getElementById("editor").value)
        },


        editData : function(){

          var formData = new FormData();


            this.form.editedAt = UMUM.NOW()
            formData.append("form", JSON.stringify(this.form));
            formData.append("file", this.form.file);
            formData.append("fileOld", this.fileOld);


          fetch(this.$store.state.url.URL_srv_suketTidakMampu + "editData", {
              method: "POST",
              headers: {
                // "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
              },
              body: formData
          }).then(res_data => {
              this.notify("SUKSES", 'Anda berhasil mengubah permohonan 😁', 'success')
              this.getView();
          });
        },

        removeData : async function(E){

          const confirm = await UMUM.NoticeRemoveData()
          if (confirm) {

            fetch(this.$store.state.url.URL_srv_suketTidakMampu + "removeData", {
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
                this.notify("SUKSES", 'Anda berhasil menghapus permohonan 😁', 'success')
                this.getView();
            });
          } 



        },
        selectData : function(data){


                this.form.id = data.data.id;
                this.form.nama= data.data.nama;
                this.form.tpt_lahir= data.data.tpt_lahir;
                this.form.tgl_lahir= data.data.tgl_lahir;
                this.form.jk= data.data.jk;
                this.form.agama= data.data.agama;
                this.form.status_nikah= data.data.status_nikah;
                this.form.pekerjaan= data.data.pekerjaan;
                this.form.alamat= data.data.alamat;
                this.form.createdAt= data.data.createdAt;
                this.form.editedAt = data.data.editedAt;
                this.form.status= data.data.status;
                this.form.no= data.data.no;
                this.form.keterangan= data.data.keterangan;

                this.form.penandatangan = data.pegawai.nama;

                this.fileOld = data.data.file;
                

                this.uraian.agama_uraian = data.agama.uraian
                this.uraian.pekerjaan_uraian = data.pekerjaan.uraian

                // console.log(data.file)

                // console.log(this.form)
        },

        logOut :function(){
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            this.$store.state.CHECK_AUTH = false;
            this.$store.state.userx.nama = '';
            this.$store.state.userx.email = '';
            this.$store.state.userx.hp = ''
        },


        notify(sukses, notif, icon){
            Swal.fire(
            sukses,
            notif,
            icon,

            )
        },



        fetchLIB : async function(){
          this.LIST_AGAMA = await FETCHING.postDataPublishAuth(this.$store.state.url.URL_MASTER_AGAMA, 'list', {id : ''})
          this.LIST_PEKERJAAN = await FETCHING.postDataPublishAuth(this.$store.state.url.URL_MASTER_PEKERJAAN, 'list', {id : ''})

          // console.log(this.LIST_PEKERJAAN)
        },

        downloadFile : function (filex){
          var linkx = this.$store.state.url.URL_APP;
          // console.log(this.$store.state.URL_APP)
          window.open( linkx+"uploads/"+filex, "_blank");
        },


        extDocxPDf : function(data){
          const text =  data.split('.')

          return text[0]+'_generate.pdf'
        }

    },

    mounted () {
      this.fetchLIB();
      this.form.des_kel = this.$store.state.ID_DES_KEL;

      this.getView();
    },

}
</script>

<style>

.swal2-container {
  z-index: 10000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>