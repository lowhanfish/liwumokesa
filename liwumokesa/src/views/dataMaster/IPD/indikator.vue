<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-orange-4 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Master Indikator</div>
            <div class="text-subtitle2">Master IPD</div>
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

        <hr class="hrpagin">

        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-grey-5">
                <th width="5%" class="">No</th>
                <th width="30%" class="">Uraian</th>
                <th width="20%">Variable/Dimensi</th>
                <th width="35%">Keterangan Skor</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class="h_top">{{data.uraian}}</td>
                <td class="h_top">
                    {{data.uraian_variabel}}
                    <div class="h_nip">{{data.uraian_dimensi}}</div>
                </td>
                <td v-html="data.keterangan"></td>
                <td class="text-center h_top">
                  <q-btn-group>
                    <q-btn @click="mdl_view_pertanyaan = true, selectData(data)" glossy :color="UMUM.checkLengthIndikator(data.jml_pertanyaan)" :label="data.jml_pertanyaan" class="tbl_btn">
                      <q-tooltip :content-class="'bg-'+UMUM.checkLengthIndikator(data.jml_pertanyaan)" content-style="font-size: 13px">
                        Click untuk menambah pertanyaan
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
                  <q-card-section class="bg-orange-4">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Variabel</span>
                            <select v-model="form.m_ipd_variabel" class="bg-white margin_btn"  outlined square :dense="true">
                                <option v-for="(data,i) in this.$store.state.listVariabel" :key="data.id" :value="data.id">[{{i+1}}] {{data.uraian}}</option>
                            </select>
                            </div>

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Uraian Indikator</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Keterangan</span>
                            <textarea id="editor" v-model="form.keterangan"></textarea>
                            </div>

                        </div>
                        <br>

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
                        <div class="row">

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Variabel</span>
                            <select v-model="form.m_ipd_variabel" class="bg-white margin_btn"  outlined square :dense="true">
                                <option v-for="(data,i) in this.$store.state.listVariabel" :key="data.id" :value="data.id">[{{i+1}}] {{data.uraian}}</option>
                            </select>
                            </div>

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Uraian Indikator</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>

                            <div class="col-md-12 col-12">
                            <span class="h_lable">Keterangan</span>
                            <textarea id="editor" v-model="form.keterangan"></textarea>
                            </div>

                        </div>
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






            <!-- ================================================= MODAL LIHAT PERTANYAAN ================================================ -->
              <q-dialog v-model="mdl_view_pertanyaan" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-green-7">
                    <div class="text-h6 h_modalhead">List Pertanyaan</div>
                  </q-card-section>
                    <q-card-section class="q-pt-none">
                        <br>
                        <hr class="hrpagin">
                        <button style="" @click="mdl_add_pertanyaan = true">➕ Tambah Pertanyaan</button> 
                        <hr class="hrpagin">

                        <div class="tbl_responsive">
                          <table width="100%">
                            <tr class="h_table_head bg-grey-5">
                              <th width="5%" class="">No</th>
                              <th width="85%" class="">Uraian Pertanyaan</th>
                              <th width="10%"></th>
                            </tr>
                            <tr class="h_table_body" v-for="(data, j) in list_data_pertanyaan" :key="data.id">

                              <td class="text-center h_top">{{j+1}}.</td>
                              <td class="h_top">{{data.uraian}}</td>
                              <td class="text-center h_top">
                                <q-btn-group>
                                  <q-btn @click="mdl_edit_pertanyaan = true, selectData_pertanyaan(data)" glossy color="orange" icon="create" class="tbl_btn">
                                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                      Click untuk mengubah data ini
                                    </q-tooltip>  
                                  </q-btn>
                                  <q-btn @click="mdl_hapus_pertanyaan = true, selectData_pertanyaan(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                    <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                      Click untuk menghapus data ini
                                    </q-tooltip>
                                  </q-btn>
                                </q-btn-group>
                              

                              </td>
                            </tr>

                          </table>

                        </div>


                        

                        

                        <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Kembali" color="negative" @click="getView()" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT PERTANYAAN ================================================ -->

            <!-- ================================================= MODAL TAMBAH PERTANYAAN ================================================ -->
              <q-dialog v-model="mdl_add_pertanyaan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-light-blue-7">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData_pertanyaan()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                            <div class="col-md-12 col-12">
                              <span class="h_lable">Uraian Pertanyaan</span>
                              <q-input v-model="pertanyaan.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>

                        </div>
                        <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn color="primary" @click="addData_pertanyaan()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH PERTANYAAN ================================================ -->


            <!-- ================================================= MODAL EDIT PERTANYAAN ================================================ -->
               <q-dialog v-model="mdl_edit_pertanyaan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                            <div class="col-md-12 col-12">
                              <span class="h_lable">Uraian Pertanyaan</span>
                              <q-input v-model="pertanyaan.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>

                        </div>
                        <br>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="primary" @click="editData_pertanyaan()" label="Simpan" />
                      <q-btn @click="mdl_edit_pertanyaan = false" label="Batal" color="negative" />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT PERTANYAAN ================================================ -->

            <!-- ================================================ MODAL HAPUS PERTANYAAN ================================================ -->
                  <q-dialog v-model="mdl_hapus_pertanyaan" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeData_pertanyaan">
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

            <!-- ================================================ MODAL HAPUS PERTANYAAN ================================================ -->


          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../../library/umum'
import WILAYAH from  '../../../library/getWilayah'
import FETCHING from  '../../../library/fetching'
import uniqid from 'uniqid';

export default {
  data() {
    return {

        form : {
            id : '',
            m_ipd_variabel : '',
            uraian : '',
            keterangan: '',
            createdAt : '',
            des_kel : '',
            kecamatan : '',
        },


        pertanyaan : {
            id : '',
            m_ipd_indikator : '',
            uraian : '',
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
        btn_add: false,

        list_data_pertanyaan : [],

        mdl_view_pertanyaan: false,
        mdl_add_pertanyaan: false,
        mdl_edit_pertanyaan: false,
        mdl_hapus_pertanyaan : false,



        disable_kec : false,
        disable_des : false,

        UMUM : UMUM,
        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "view", {
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
              console.log(res_data);
      });
    },


    addData : function(number) {
        this.form.id = uniqid();
        this.form.keterangan = document.getElementById("editor").value;
        console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "addData", {
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
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "editData", {
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
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "removeData", {
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
            this.form.m_ipd_variabel = data.m_ipd_variabel;
            this.form.uraian = data.uraian;
            this.form.keterangan= data.keterangan;
            this.form.createdAt = data.createdAt;


            this.pertanyaan.m_ipd_indikator = data.id
            this.getView_pertanyaan();
    },

    emptytData : function(data){
             this.form.id = '';
            this.form.m_ipd_variabel = '';
            this.form.uraian = '';
            this.form.keterangan= null;
            this.form.createdAt = '';
    },






    getView_pertanyaan : function(){
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "view_pertanyaan", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              m_ipd_indikator: this.pertanyaan.m_ipd_indikator,
              tahun : 2022,

          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data_pertanyaan = res_data;
              // console.log(res_data);
      });
    },


    addData_pertanyaan : function(number) {
        this.pertanyaan.id = uniqid();
        this.pertanyaan.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "addData_pertanyaan", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.pertanyaan)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_pertanyaan();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_pertanyaan : function(){
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "editData_pertanyaan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.pertanyaan)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_pertanyaan();
      });
    },

    removeData_pertanyaan : function(E){
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "removeData_pertanyaan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.pertanyaan)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_pertanyaan();
      });

    },
    selectData_pertanyaan : function(data){

            this.pertanyaan.id = data.id;
            this.pertanyaan.m_ipd_indikator = data.m_ipd_indikator;
            this.pertanyaan.uraian = data.uraian;
            this.pertanyaan.createdAt = data.createdAt;
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

            const body = {desa : ''};
            this.$store.state.listVariabel  = await FETCHING.FETCH_POST(this.$store.state.url.URL_srv_ipd_master_variabel + "list", body)


        },


    // ====================================== PAGINATE ====================================







  },

  mounted () {

    this.tunggu()
    this.getView();
 
  },
}
</script>




 