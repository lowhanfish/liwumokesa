<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Profil Pegawai</div>
            <div class="text-subtitle2">Profil</div>
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
                <th width="85%" class="text-center">Judul</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class="h_top">{{data.judul}}</td>
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
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Simpan Dataxxx</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Judul</span>
                        <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <br>
                        <span class="h_lable ">Keterangan</span>
                         <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                         <textarea id="editor" v-model="form.keterangan"></textarea>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
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
                        <span class="h_lable ">Judul</span>
                        <q-input v-model="form.judul" outlined square :dense="true" class="bg-white margin_btn" /> 
                        <br>
                        <span class="h_lable ">Keterangan</span>
                        <textarea id="editor" v-model="form.keterangan"></textarea>
                         <!-- <froala v-if="mdl_edit" style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
                         

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
                    <div class="text-h6 h_modalhead">Detil {{form.judul}}</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_detil1">{{form.judul}}</span> <br>
                        <!-- <span class="h_lable">By : {{form.createdBy}}</span>
                        &nbsp;
                        <span class="h_panation">({{UMUM.tglConvert(form.createdAt)}})</span> -->
                   
                        <!-- <span class="h_detil3">({{form.tahun}})</span> -->
                        
                        <hr class="hrpagin">
                        <div class="fr-view" v-html="form.keterangan"></div>


                        <br>
                         <!-- <span class="h_fotter_title" style="color:grey">Sumber : {{form.sumber}}</span> <br> -->


                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn @click="emptytData(), mdl_lihat = false" label="Kembali" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT ================================================ -->




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../../library/umum'
import uniqid from 'uniqid';

export default {
  data() {
    return {

        form : {
            id : '',
            judul : '',
            keterangan: '',
            createdAt : '',
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
        btn_add: false,

        UMUM : UMUM,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_ADM_WAKIL_BUPATI + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
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
        this.form.keterangan = document.getElementById("editor").value;
        console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_ADM_WAKIL_BUPATI + "addData", {
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
        this.form.keterangan = document.getElementById("editor").value;
      fetch(this.$store.state.url.URL_ADM_WAKIL_BUPATI + "editData", {
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
      fetch(this.$store.state.url.URL_ADM_WAKIL_BUPATI + "removeData", {
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
        this.form = {
            id : data.id,
            judul : data.judul,
            keterangan: data.keterangan,
            createdAt : data.createdAt,
        };

        

    },

    emptytData : function(data){
        this.form = {
            id : '',
            judul : '',
            keterangan: null,
            createdAt : '',
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




    // ====================================== PAGINATE ====================================







  },

  mounted () {
        // new FroalaEditor('textarea#froala-editor')
        this.getView();

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




 