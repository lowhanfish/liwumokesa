<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="bg-grey-7 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">Penyetoran Dokumen</div>
              <div class="text-subtitle2">Dokumen</div>
            </div>
            <div class="col-12 col-md-2"></div>
            <div class="col-12 col-md-4">
              <div class="row">
                <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:100%"/>
                <!-- <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true, $store.commit('addEditor')" dense flat icon="add" style="width:10%">
                    <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                      Click untuk menambah data
                    </q-tooltip>
                </q-btn> -->
              </div>
  
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark inset />
  
        <q-card-section>
          <div class="row">
            <div class="col-md-4 col-12 input_kiri " >
              <select :disabled="disable_kec" v-model="form.kecamatan" @change="chageDesa(), cari_data()" class="bg-white"  outlined square :dense="true">
                <option value="">-- Semua Kecamatan --</option>
                <option v-for="data in $store.state.listKecamatan" :key="data.id" :value="data.id">{{data.uraian}}</option>
              </select>
            </div>

            <div class="col-md-4 col-12 " >
              <select :disabled="disable_kec" v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true">
                <option value="">-- Semua Desa --</option>
                <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
              </select>
            </div>
  
            <div class="col-md-4 col-12 input_kanan ">
              <select :disabled="disable_des" v-model="form.tahun" @change="cari_data()" class="bg-white"  outlined square :dense="true">
                <option value="">-- Semua Tahun Direktory --</option>
                <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
              </select>
            </div>
          </div>
  
          <!-- <h1>{{form.des_kel}}</h1> -->
  
          <hr class="hrpagin">
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
            <div class="row">
                <div class="col-md-6 col-12 listDok flexing" v-for="(data, index) in list_data" :key="index">
                    <div class="row listDokRow" >
                        <div class="col-md-2 col-2 listDok text-center">
                            <a @click="selectData(data), mdl_lihat_file=true, getView_file()" href="javascript:void(0);" class="h_clear1">
                                <q-img style="width: 70%;" src="img/folder.png" spinner-color="yellow"/>
                            </a>
                        </div>
                        <div class="col-md-10 col-10 listDok">
                            <a @click="selectData(data), mdl_lihat_file=true, getView_file()" href="javascript:void(0);" class="h_listDok1 h_clear1">{{data.judul}} <span class="h_listDok3">({{data.jml_file}} File)</span></a>
                            <div class="h_listDok2">Desa {{data.des_kel_uraian}} ({{data.tahun}})</div>
                            <div class="h_listDok3"><q-icon name="person" /> CreatedBy : {{data.createdBy_uraian}} <q-icon name="event" /> {{convert_tgl(data.createdAt)}}</div>
                        </div>
                        <div class="listDok_setting">
                            <!-- <a @click="selectData(data), mdl_setting=true" class="h_clear1" href="javascript:void(0);" style="">
                                <q-icon style="color:#818181; font-size: 18px;" name="settings" />
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
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
                      <div class="text-h6 h_modalhead">Tambah Direktori</div>
                        <div class="div_exit_modal">
                            <a @click="mdl_add=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                        </div>
                    </q-card-section>
  
                    <form @submit.prevent="addData()">
                      <q-card-section class="q-pt-none">
                          <br>
                          <span class="h_lable ">Judul Direktori</span>
                          <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 

                          <span class="h_lable ">Tahun Direktori</span>
                          <q-input type="number" v-model="form.tahun" outlined square :dense="true" class="bg-white margin_btn" /> 
  
                           <div class="inputbs"></div>
                          <span class="h_lable ">Keterangan Direktory</span>
                           <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                           <textarea v-model="form.uraian"></textarea>
                          
                          
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
                        <div class="text-h6 h_modalhead">Edit Direktori</div>
                        <div class="div_exit_modal">
                            <a @click="mdl_edit=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                        </div>
                    </q-card-section>
  
                    <q-card-section class="q-pt-none">
                          <br>
                          <br>
                          <span class="h_lable ">Judul Direktori</span>
                          <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 

                          <span class="h_lable ">Tahun Direktori</span>
                          <q-input type="number" v-model="form.tahun" outlined square :dense="true" class="bg-white margin_btn" /> 
  
                           <div class="inputbs"></div>
                          <span class="h_lable ">Keterangan Direktory</span>
                           <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                           <textarea v-model="form.uraian"></textarea>
                          
                          
                           <br>
                          <br>
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
                            <span class="h_notifikasi">Dengan menghapus direktori ini maka semua file di dalamnya ikut terhapus</span> <br>
                            <span class="h_notifikasi">APAKAH ANDA YAKIN??</span>
                            <input type="submit" style="position: absolute; left: -9999px"/>
                            <br> <br>
                            <br>

                          <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                          &nbsp;
                          <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup/>

                        </form>
                    </q-card-section>
                  </q-card>
                </q-dialog>
  
              <!-- ================================================ MODAL HAPUS ================================================ -->
               

              <!-- ================================================= MODAL SETTING ================================================ -->
              <q-dialog v-model="mdl_setting">
                  <q-card class="mdl-sm">

                      
                      
                      <q-card-section class="q-pt-none">
                            <div class="div_exit_modal" style="margin-top:-12px">
                                    <a @click="mdl_setting=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                            </div>
                            <br>
                          
                   
                            <q-btn @click="mdl_edit=true" class="full-width" color="orange" size="sm" icon="edite" label="Edit" style="margin-top: 15px;"/>
                            <q-btn @click="mdl_hapus=true" class="full-width" color="red" size="sm" icon="clear" label="Remove" style="margin-top: 10px;"/>

  
                           <br>
  
                      </q-card-section>
  
  
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL SETTING ================================================ -->









              <!-- ================================================= MODAL FILE ================================================ -->
              <q-dialog v-model="mdl_lihat_file" persistent>
                  <q-card class="mdl-lg">
                    <q-card-section class="bg-blue-4">
                      <div class="text-h6 h_modalhead">List File</div>
                      <div class="div_exit_modal">
                            <a @click="mdl_lihat_file=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                        </div>
                    </q-card-section>
  

                      <q-card-section class="q-pt-none">
                          <br>

                          <q-btn @click="mdl_add_file=true" size="sm" color="primary" icon="add" label="TAMBAH DATA" />
                          <hr class="hrpagin">
                            <div class="row">
                                <div class="col-md-6 col-12 listDok flexing" v-for="(data, index) in list_data_file" :key="index">
                                    <div class="row listDokRow" >
                                        <div class="col-md-2 col-2 listDok text-center">
                                            <a @click="selectData_file(data), mdl_lihat_file_file=true" href="javascript:void(0);" class="h_clear1">
                                                <q-img
                                                style="width: 70%;"
                                                :src="'img/filetype/'+UMUM.imageFileType(data.file_type)"
                                                spinner-color="yellow"
                                                />
                                            </a>
                                        </div>
                                        <div class="col-md-10 col-10 listDok">
                                            <a @click="selectData_file(data), mdl_lihat_file_file=true" href="javascript:void(0);" class="h_listDok1 h_clear1">{{data.judul}}</a>
                                            <div class="h_listDok2">{{data.uraian}}</div>
                                            <div class="h_listDok3"><q-icon name="person" /> CreatedBy : {{data.createdBy}} <q-icon name="event" /> {{convert_tgl(data.createdAt)}}</div>
                                        </div>

                                        <div class="listDok_setting">
                                            <a @click="selectData_file(data), mdl_setting_file=true" class="h_clear1" href="javascript:void(0);" style="">
                                                <q-icon style="color:#818181; font-size: 18px;" name="settings" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
  
                      </q-card-section>
  
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn @click="emptytData(), mdl_lihat_file = false" label="Kembali" color="negative"  />
                      </q-card-actions>

                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL FILE ================================================ -->


              <!-- ================================================= MODAL SETTING FILE ================================================ -->
              <q-dialog v-model="mdl_setting_file">
                  <q-card class="mdl-sm">

                      
                      
                      <q-card-section class="q-pt-none">
                            <div class="div_exit_modal" style="margin-top:-12px">
                                    <a @click="mdl_setting_file=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                            </div>
                            <br>
                          
                   
                            <q-btn @click="mdl_edit_file=true" class="full-width" color="orange" size="sm" icon="edite" label="Edit" style="margin-top: 15px;"/>
                            <q-btn @click="mdl_hapus_file=true" class="full-width" color="red" size="sm" icon="clear" label="Remove" style="margin-top: 10px;"/>

  
                           <br>
  
                      </q-card-section>
  
  
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL SETTING FILE ================================================ -->


              <!-- ================================================= MODAL TAMBAH FILE ================================================ -->
              <q-dialog v-model="mdl_add_file" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="bg-grey-7">
                      <div class="text-h6 h_modalhead">Tambah File</div>
                        <div class="div_exit_modal">
                            <a @click="mdl_add_file=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                        </div>
                    </q-card-section>
  
                    <form @submit.prevent="addData_file()">
                      <q-card-section class="q-pt-none">
                          <br>
                          <span class="h_lable ">Judul File</span>
                          <q-input v-model="file.judul" outlined square :dense="true" class="bg-white margin_btn" /> 

                          <span class="h_lable ">Tahun File</span>
                          <q-input type="number" v-model="file.tahun" outlined square :dense="true" class="bg-white margin_btn" /> 
  
                           <div class="inputbs"></div>
                          <span class="h_lable ">Keterangan File</span>
                           <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                           <textarea v-model="file.uraian"></textarea>


                           <div class="inputbs"></div>
                            <span class="h_lable ">File (PDF, PNG, JPEG, AVI, MP4, WORD, EXCEL)</span>
                            <q-file outlined v-model="file.file" square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          
                          
                           <br>
  
                      </q-card-section>
  
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn :loading="btn_add_file" color="primary" @click="addData_file()" label="Simpan" />
                          <q-btn @click="emptytData(), mdl_add_file = false" label="Batal" color="negative"  />
                      </q-card-actions>
  
                    </form>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL TAMBAH FILE ================================================ -->
  
  
              <!-- ================================================= MODAL EDIT FILE ================================================ -->
                 <q-dialog v-model="mdl_edit_file" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="bg-orange">
                        <div class="text-h6 h_modalhead">Edit File</div>
                        <div class="div_exit_modal">
                            <a @click="mdl_edit_file=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                        </div>
                    </q-card-section>
  
                    <q-card-section class="q-pt-none">
                          <br>
                          <span class="h_lable ">Judul File</span>
                          <q-input v-model="file.judul" outlined square :dense="true" class="bg-white margin_btn" /> 

                          <span class="h_lable ">Tahun File</span>
                          <q-input type="number" v-model="file.tahun" outlined square :dense="true" class="bg-white margin_btn" /> 
  
                           <div class="inputbs"></div>
                          <span class="h_lable ">Keterangan File</span>
                           <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                           <textarea v-model="file.uraian"></textarea>

                           <div class="inputbs"></div>
                           <span class="h_lable ">File (PDF, PNG, JPEG, AVI, MP4, WORD, EXCEL)</span>
                          <q-file outlined v-model="file.file" square :dense="true" class="bg-white margin_btn">
                            <template v-slot:prepend>
                              <q-icon name="attach_file" />
                            </template>
                          </q-file>
                          
                          
                           <br>
                          <br>
                    </q-card-section>
  
                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      
                        <q-btn :loading="btn_add_file" color="primary" @click="editData_file()" label="Simpan" />
                        <q-btn @click="emptytData(), mdl_edit_file = false" label="Batal" color="negative" />
               
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL EDIT FILE ================================================ -->
  
              <!-- ================================================ MODAL HAPUS FILE ================================================ -->
                <q-dialog v-model="mdl_hapus_file" persistent>
                  <q-card class="mdl-sm ">
                    <q-card-section class="q-pt-none text-center orageGrad">
                        <form @submit.prevent="removeData_file">
                            <br>
                            <img src="img/alert.png" alt="" width="75"> <br>
                            <span class="h_notifikasi">Data yang dihapus tidak dapat dikembalikan lagi..!</span> <br>
                            <span class="h_notifikasi">APAKAH ANDA YAKIN??</span>
                            <input type="submit" style="position: absolute; left: -9999px"/>
                            <br> <br>
                            <br>

                          <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                          &nbsp;
                          <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup/>

                        </form>
                    </q-card-section>
                  </q-card>
                </q-dialog>
  
              <!-- ================================================ MODAL HAPUS FILE ================================================ -->



              <!-- ================================================= MODAL LAMPIRAN ================================================ -->
              <q-dialog v-model="mdl_lihat_file_file" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="bg-blue-9">
                      <div class="text-h6 h_modalhead">Detile Lampiran</div>
                      <div class="div_exit_modal">
                          <a @click="mdl_lihat_file_file=false" class="h_clear1 h_exit" href="javascript:void(0);" style="">X</a>
                      </div>
                    </q-card-section>
  
                    <form @submit.prevent="addData()">
                      <q-card-section class="q-pt-none">
                          
                          <br>
                          <span class="h_detil1">{{file.judul}}</span> <br>
                          <span class="h_lable">By : {{file.createdBy}}</span>
                          &nbsp;
                          <span class="h_panation">({{UMUM.tglConvert(file.createdAt)}})</span>
                    
                          <!-- <span class="h_detil3">({{form.tahun}})</span> -->
                          
                          <hr class="hrpagin">
                          <div class="fr-view" v-html="file.uraian"></div>

                          <br>

                          <fileView :fileOld="fileOld" :file_type="file.file_type"/>
  
                           <br>
  
                      </q-card-section>
  
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn @click="emptytData(), mdl_lihat_file_file = false" label="Kembali" color="negative"  />
                      </q-card-actions>
  
                    </form>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL LAMPIRAN ================================================ -->
  
  
  
  
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
              judul : '',
              uraian : '',
              tahun : '',
              des_kel : '',
              kecamatan : '',
              kelasFile : 'DOKUMEN DESA',
              createdAt : '',
              createdBy : '',
          },


          file : {
            id : '',
            judul : '',
            uraian : '',
            tahun : '',
            des_kel : '',
            kecamatan : '',
            createdAt : '',
            createdBy : '',
            file : null,
            file_type : '',
        },
  
          fileOld : '',


          
          
          
          
          list_data : [],
          page_limit : 10,
          page_first: 1,
          page_last: 0,
          cari_value: "",
          cek_load_data : true,


          list_data_file : [],
          
          
          mdl_add: false,
          mdl_edit: false,
          mdl_hapus : false,
          mdl_setting : false,
          btn_add: false,
          
          btn_add_file: false,
          
          
          
          mdl_add_file: false,
          mdl_edit_file: false,
          mdl_hapus_file : false,
          mdl_setting_file : false,
          mdl_lihat_file: false,
          mdl_lihat_file_file: false,
          
          UMUM : UMUM,

          disable_kec : false,
          disable_des : false,
      }
    },
    methods: {
  
  
        getView : function(){
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "view", {
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
                    // console.log(res_data);
            });
        },
    

        addData : function(number) {
        // console.log(this.$store.state.listJenisUsaha) 
            this.form.id = uniqid();
            this.form.createdAt = UMUM.NOW();
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "addData", {
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
        },


        editData : function(){
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "editData", {
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
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "removeData", {
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
                this.form.id = data.id;
                this.form.judul = data.judul;
                this.form.uraian = data.uraian;
                this.form.tahun = data.tahun;
                // this.form.des_kel = data.des_kel;
                // this.form.kecamatan = data.kecamatan;
                this.form.createdAt = data.createdAt;
                this.form.createdBy = data.createdBy;
        },
  
        emptytData : function(data){

        },

        // ====================================== FILE ====================================

        getView_file : function(){
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "view_file", {
                method: "POST",
                headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    desa_dok_permintaanDokumen_id : this.form.id,
                    des_kel : this.form.des_kel,
                })
            })
                .then(res => res.json())
                .then(res_data => {
                    this.list_data_file = res_data;
                    this.$store.commit("hideLoading");
                    console.log(res_data);
            });
        },
    

        addData_file : function(number) {
          var formData = new FormData();

          formData.append("id", uniqid());
          formData.append("desa_dok_permintaanDokumen_id", this.form.id);
          formData.append("judul", this.file.judul);
          formData.append("uraian", this.file.uraian);
          formData.append("des_kel", this.form.des_kel);
          formData.append("createdAt", UMUM.NOW());
          formData.append("file", this.file.file);


          fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "addData_file", {
              method: "POST",
              headers: {
                  // "content-type": "application/json",
                  authorization: "kikensbatara " + localStorage.token
              },
              body: formData
          }).then(res_data => {
              this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
              this.getView_file();
          });
        },


        editData_file : function(){
          var formData = new FormData();

          formData.append("id", this.file.id);
          formData.append("judul", this.file.judul);
          formData.append("uraian", this.file.uraian);
          formData.append("tahun", this.file.tahun);
          formData.append("createdAt", this.file.createdAt);
          formData.append("file", this.file.file);

          formData.append("fileOld", this.fileOld);


          fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "editData_file", {
            method: "POST",
            headers: {
              // "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
          }).then(res_data => {
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
            this.getView_file();
          });
        },

        removeData_file : function(E){
            fetch(this.$store.state.url.URL_ADM_DESA_DOK_PENYETORAN + "removeData_file", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.file)
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView_file();
            });

        },

        selectData_file : function(data){

                this.file.id = data.id;
                this.file.judul = data.judul;
                this.file.uraian = data.uraian;
                this.file.tahun = data.tahun;
                this.file.file_type = data.file_type;
                this.file.des_kel = data.des_kel;
                this.file.kecamatan = data.kecamatan;
                this.file.createdAt = data.createdAt;
                this.file.createdBy = data.createdBy;
                this.fileOld = data.file;
        },

        // ====================================== FILE ====================================
  
  
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
            this.form.tahun = UMUM.getTahun();
            WILAYAH.getListKecamatan();

            var profilex = JSON.parse(localStorage.profile)
            var profile = profilex.profile
            this.$store.state.ID_DES_KEL = profile.des_kel


            this.form.des_kel = profile.des_kel
            this.filterSelect(profile)
    
            this.getView();
    },
  }
  </script>
  
  
  
  
   