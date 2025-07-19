<template>
  <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-2"></div>
                <div class="col-12 col-md-8">
                    <hr class="hrdetilberita" />
                    <div class="text-center">
                        <span class="h_title text-orange">SURAT KETERANGAN LAINNYA</span> <br>
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
                            <div class="row">
                              <div class="col-12 col-md-3" style="padding:0.3%">
                                <q-btn @click="fetchLIB(), modal_add = true" class="full-width" color="primary" icon="attach_email" label="Tambah Usulan" />
                              </div>
                              <div class="col-12 col-md-5" style="padding:0.3%">
                                <q-btn @click="fetchLIB(), modal_download = true" class="full-width" color="light-green-6" icon="save_alt" label="Download Template Surat" />
                              </div>
                            </div>
                          </q-item-label>

                          <q-item v-for="(data, index) in list_data" :key="data.id+index" clickable v-ripple @click="selectData(data), modal_lihat =true">
                            <q-item-section avatar top>
                              <q-avatar icon="file_present" color="blue-6" text-color="white" />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label lines="1">Surat Keterangan Belum Menikah ({{data.nama}})</q-item-label>
                              <q-item-label caption>{{UMUM.tglConvertXY(data.createdAt)}}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="info" :color="UMUM.StatusIndikator(data.status)" />
                            </q-item-section>
                          </q-item>

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
                                        <span class="h_label">Jenis Layanan</span>

                                        <select v-model="form.jenisSuket">
                                          <option v-for="data in LIST_JENIS_SUKET" :key="data.id" :value="data.id">{{data.jenis}}</option>
                                        </select>
                                        
                                      </div>


                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Surat keterangan (PDF)</span>
                                        <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                                          <template v-slot:prepend>
                                            <q-icon name="attach_file" />
                                          </template>
                                        </q-file>
                                      </div>


                                    </div>
                                    <br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 


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
                                        <span class="h_label">Jenis Layanan</span>

                                        <select  v-model="form.jenisSuket">
                                          <option v-for="data in LIST_JENIS_SUKET" :key="data.id" :value="data.id">{{data.jenis}}</option>
                                        </select>
                                        
                                      </div>


                                      <div class="col-12 col-md-12 div_input">
                                        <span class="h_label">Surat keterangan (PDF)</span>
                                        <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
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
                    <q-card class="mdl-lg" style="width: 100%; max-width: 80vw;" >
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
                                    <span style="font-size:11px; font-weight:bold; color:gray">📅 Tgl Post : {{UMUM.tglConvertXY(form.createdAt)}}</span> <br>
                                    <span style="font-size:11px; font-weight:bold; color:gray">✍ Keterangan : {{form.keterangan}}</span> <br>
                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 
                                    <br><br>
                                  </div>

                                </div>

                                <!-- {{$store.state.url.URL_APP+'uploads/'+fileOld}}
                                {{$store.state.url.URL_APP+'uploads/'+extDocxPDf(fileOld)}} -->
                                <div class="row">
                                  <div class="col-12" v-if="form.status == 0 || this.form.status == 2">
                                      <VueDocPreview :value="$store.state.url.URL_APP+'uploads/'+fileOld" type="office" />
                                  </div>

                                  {{ $store.state.url.URL_APP+'uploads/'+extDocxPDf(fileOld) }}

                                  <div class="col-12" v-if="form.status == 1">
                                      <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+extDocxPDf(fileOld)"/>
                                  </div>
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
                                    <q-btn style="margin-left:1%" v-if="UMUM.checkStatus(form.status)" color="green-5" icon="file_download" size="sm" @click="hrefku($store.state.url.URL_APP+'uploads/'+extDocxPDf(fileOld))">
                                      <span >Download</span>
                                    </q-btn>
                                    <!-- <q-btn color="blue" icon="attachment" size="sm" @click="modal_lampiran = true">
                                      <span >Lampiran</span>
                                    </q-btn> -->
                                    <q-btn @click="modal_lihat = false" label="Kembali" color="red-14"  />
                                </q-card-actions>


                          </form>
                    </q-card>
                </q-dialog>
            <!-- ================================= MODAL LIHAT ======================================= -->



            <!-- ================================= MODAL DONWLOAD ======================================= -->
                <q-dialog v-model="modal_download" persistent>
                    <q-card class="mdl-mdx" style="width: 100%; max-width: 80vw;" >
                        <q-card-section class="bg-light-green">
                            <div class="row">
                                <div class="text-center">
                                    <div class="text-h6 h_modalhead text-center">DOWNLOAD TEMPLATE SURAT</div>
                                </div>
                                <div style="pading-left:2px; position : absolute; right:15px">
                                    <a @click="modal_download = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                </div>
                            </div>
                        </q-card-section>

                          <form>
                              <q-card-section class="q-pt-none">

                                <br>
                                <div class="row">
                                  <div class="col-12">
                                    <hr class="hrdetilberita" />
                                    <div class="row">
                                      <div class="col-12 col-md-6"></div>
                                      <div class="col-12 col-md-6">
                                        <q-input outlined v-model="form.nama" :dense="true" placeholder='Cari Jenis Layanan'/>
                                      </div>
                                    </div>

                                    <hr class="hrdetilberita" />
                                    
                                    <div class="tbl_responsive tbx">
                                    <!-- =================================================== KONTENT =========================================================== -->
                                      <table width="100%" class="tbx">
                                        <tr class="h_table_head bg-light-green">
                                          <th width="5%" class="text-center">No</th>
                                          <th width="30%" class="text-center">Jenis Surat</th>
                                          <th width="55%" class="text-center">Deskripsi</th>
                                          <th width="10%" class="text-center">#</th>
                                        </tr>
                                        <tr class="h_table_body" v-for="(data, index) in LIST_JENIS_SUKET" :key="data._id">
                                          <td class="text-center">{{index+1}}.</td>
                                          <td>{{data.jenis}}</td>
                                          <td>{{data.keterangan}}</td>
                                          <td class="text-center">
                                            <q-btn size="sm" @click="downloadFile(data.file)" title="download file" round color="secondary" icon="save_alt" />
                                          </td>
                                        </tr>

                                      </table>

                                    <!-- =================================================== KONTENT =========================================================== -->
                                  </div>
                                     

                                  </div>
                                </div>

                                

                                <div>

                                </div>
    

                              </q-card-section>

                              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                                    <q-btn @click="modal_download = false" label="Kembali" color="red-14"  />
                                </q-card-actions>


                          </form>
                    </q-card>
                </q-dialog>
            <!-- ================================= MODAL DONWLOAD ======================================= -->

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


import VueDocPreview from 'vue-doc-preview'

export default {
  components: {
    VueDocPreview,
  },
    data() {
        return {
            key: '',
            modal_add : false,
            modal_edit : false,
            modal_lihat : false,
            modal_lampiran : false,
            modal_download : false,

            form : {
              jenisSuket : '',
              nama : '',
              alamat : '',
              des_kel : '',
              no : '',
              email : '',
              file : null,
              createdAt : '',
              editedAt : '',
              status : 0,
              agenda : false,
              keterangan : 'Masih dalam proses pemeriksaan',
            },

            uraian : {
              agama_uraian : '',
            },

            fileOld : '',

            UMUM : UMUM,
            FETCHING : FETCHING,
            LIST_AGAMA : [],
            list_data : [],
            LIST_DATA : [],
            LIST_JENIS_SUKET : [],

        }
    },

    methods: {
        openModal() {
            this.notify("Upss..!! 😅", 'Mohon maaf layanan belum kami aktifkan', 'warning')
        },

        routex : function(routeName){
                this.$router.push('/'+routeName);
        },

        hrefku(data){
          window.open(
            data,
            '_blank' // <- This is what makes it open in a new window.
          );
        },



        getView : function(){
          this.$store.commit("shoWLoading");
          fetch(this.$store.state.url.URL_srv_suketLainnya + "view", {
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
                  this.list_data = res_data;
                  // this.page_last = res_data.jmlData;
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


            fetch(this.$store.state.url.URL_srv_suketLainnya + "addData", {
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


          console.log(this.form.file);


            this.form.editedAt = UMUM.NOW()
            formData.append("form", JSON.stringify(this.form));
            formData.append("file", this.form.file);
            formData.append("fileOld", this.fileOld);


          fetch(this.$store.state.url.URL_srv_suketLainnya + "editData", {
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

            fetch(this.$store.state.url.URL_srv_suketLainnya + "removeData", {
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

          console.log(data);
          this.form.id = data.id;

          this.form.jenisSuket = data.jenisSuket;
          this.form.nama= data.nama;
          this.form.createdAt= data.createdAt;
          this.form.editedAt = data.editedAt;
          this.form.status= data.status;
          this.form.no= data.no;
          this.form.keterangan= data.keterangan;
          this.fileOld = data.file;



          this.fetchLIB();
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
          // this.LIST_AGAMA = await FETCHING.postDataPublishAuth(this.$store.state.url.URL_MASTER_AGAMA, 'list', {id : ''})
          this.LIST_JENIS_SUKET = await FETCHING.getDataPublishAuth (this.$store.state.url.URL_srv_masterJenisSuket, 'list')
          console.log(this.LIST_JENIS_SUKET)
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
      // this.fetchLIB();
      this.form.des_kel = this.$store.state.ID_DES_KEL;

      var profilex = JSON.parse(localStorage.profile)
      var profile = profilex.profile
      this.form.nama = profile.nama
      this.form.email = profile.email


      // console.log(this.form.email)

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