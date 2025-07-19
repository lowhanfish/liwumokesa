<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="text-h6 h_titleHead">Data Piramida Penduduk</div>
            <div class="text-subtitle2">Data Kecamatan</div>
          </div>
          <div class="col-12 col-md-4">
            <select v-model="form.tahun" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%">
              <option value="">-- Semua Tahun --</option>
              <option v-for="(data, index) in $store.state.tahun" :key="index" :value="data">{{data}}</option>
            </select>
          </div>
          <div class="col-12 col-md-4">
            <div class="row">
              <select v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%" disabled>
                <option value="">-- Semua Desa --</option>
                <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
              </select>
              <q-btn glossy class="bg-light-blue-10" @click="btnAdd()" dense flat icon="add" style="width:10%">
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
                <th width="12%" class="">Desa/Kel</th>
                <th width="10%" class="text-center">Tahun</th>
                <th width="7%" class="text-center">0-6</th>
                <th width="7%" class="text-center">7-12</th>
                <th width="7%" class="text-center">13-19</th>
                <th width="7%" class="text-center">20-27</th>
                <th width="7%" class="text-center">28-35</th>
                <th width="7%" class="text-center">36-42</th>
                <th width="7%" class="text-center">43-50</th>
                <th width="7%" class="text-center">50-60</th>
                <th width="7%" class="text-center">>60</th>
                <th width="10%"></th>
              </tr>


              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data._key">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td><b>{{data.des_kel_uraian}}</b></td>
                <td class="text-center"><b>{{data.tahun}}</b></td>
                <td class="text-center">{{data.u0_6}}</td>
                <td class="text-center">{{data.u7_12}}</td>
                <td class="text-center">{{data.u13_19}}</td>
                <td class="text-center">{{data.u20_27}}</td>
                <td class="text-center">{{data.u28_35}}</td>
                <td class="text-center">{{data.u36_42}}</td>
                <td class="text-center">{{data.u43_50}}</td>
                <td class="text-center">{{data.u50_60}}</td>
                <td class="text-center">{{data.u60_keatas}}</td>

                <td class="text-center">
                  <q-btn-group>
                    <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
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
                          <div >

                         

                            <div class="row">
                              <div class="col-12 col-md-6" style="padding:1%">
                                  <span class="h_lable ">Usia 0 - 6 Tahun</span>
                                  <q-input v-model="form.u0_6" outlined square :dense="true" class="bg-white margin_btn" type="number"/>
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 7 - 12 Tahun</span>
                                <q-input v-model="form.u7_12" outlined square :dense="true" class="bg-white margin_btn" type="number" /> 
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 13 - 19 Tahun</span>
                                <q-input v-model="form.u13_19" outlined square :dense="true" class="bg-white margin_btn" type="number" /> 
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 20 - 27 Tahun</span>
                                <q-input v-model="form.u20_27" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 28 - 35 Tahun</span>
                                <q-input v-model="form.u28_35" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 36 - 42 Tahun</span>
                                <q-input v-model="form.u36_42" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 43 - 50 Tahun</span>
                                <q-input v-model="form.u43_50" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 50 - 60 Tahun</span>
                                <q-input v-model="form.u50_60" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>

                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 60 Tahun Ke-atas</span>
                                <q-input v-model="form.u60_keatas" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                             
                            </div>



                   
                        
                        
                        
                            
                          </div>

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
                        <div class="row">
                              <div class="col-12 col-md-6" style="padding:1%">
                                  <span class="h_lable ">Usia 0 - 6 Tahun</span>
                                  <q-input v-model="form.u0_6" outlined square :dense="true" class="bg-white margin_btn" type="number"/>
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 7 - 12 Tahun</span>
                                <q-input v-model="form.u7_12" outlined square :dense="true" class="bg-white margin_btn" type="number" /> 
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 13 - 19 Tahun</span>
                                <q-input v-model="form.u13_19" outlined square :dense="true" class="bg-white margin_btn" type="number" /> 
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 20 - 27 Tahun</span>
                                <q-input v-model="form.u20_27" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 28 - 35 Tahun</span>
                                <q-input v-model="form.u28_35" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 36 - 42 Tahun</span>
                                <q-input v-model="form.u36_42" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 43 - 50 Tahun</span>
                                <q-input v-model="form.u43_50" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 50 - 60 Tahun</span>
                                <q-input v-model="form.u50_60" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>

                              <div class="col-12 col-md-6" style="padding:1%">
                                <span class="h_lable ">Usia 60 Tahun Ke-atas</span>
                                <q-input v-model="form.u60_keatas" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                              </div>
                             
                            </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
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




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../../../library/umum.js'
import WILAYAH from  '../../../../library/getWilayah'
import FETCHING from  '../../../../library/fetching'
import uniqid from 'uniqid';


export default {
  data() {
    return {

      form : {
        id : '',
        u0_6 : 0,
        u7_12 : 0,
        u13_19 : 0,
        u20_27 : 0,
        u28_35 : 0,
        u36_42 : 0,
        u43_50 : 0,
        u50_60 : 0,
        u60_keatas : 0,
        des_kel : this.$store.state.ID_DES_KEL,
        tahun : '',
        createdAt : '',
      },
     
      list_data : [],

      page_limit : 14,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data : true,


      mdl_add: false,
      mdl_edit: false,
      mdl_hapus : false,
      btn_add: false,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_ADM_DESA_PIRAMIDA_PENDUDUK + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              data_ke: this.page_first,
              page_limit : this.page_limit,
              tahun: this.form.tahun,
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
      // console.log(this.$store.state.listPekerjaan) 
      this.form.id = uniqid();
      this.form.createdAt = UMUM.NOW();
      fetch(this.$store.state.url.URL_ADM_DESA_PIRAMIDA_PENDUDUK + "addData", {
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
      fetch(this.$store.state.url.URL_ADM_DESA_PIRAMIDA_PENDUDUK + "editData", {
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
      fetch(this.$store.state.url.URL_ADM_DESA_PIRAMIDA_PENDUDUK + "removeData", {
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
        this.form.u0_6 = data.u0_6;
        this.form.u7_12 = data.u7_12;
        this.form.u13_19 = data.u13_19;
        this.form.u20_27 = data.u20_27;
        this.form.u28_35 = data.u28_35;
        this.form.u36_42 = data.u36_42;
        this.form.u43_50 = data.u43_50;
        this.form.u50_60 = data.u50_60;
        this.form.u60_keatas = data.u60_keatas;

        this.form.des_kel = data.des_kel;
        this.form.tahun = data.tahun;
        this.form.createdAt = data.createdAt;


       
     

    },
    btnAdd(){
      if (this.form.des_kel == '') {
        alert("PILIH DESA TERLEBIH DAHULU")
      } else {
        FETCHING.postPekerjaan(this.form.tahun, this.form.des_kel)
        this.mdl_add = true
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


        // fetching : async function(){
        //   var ss = await FETCHING.getJenisUsaha();
        //   console.log(ss)
        // }




    // ====================================== PAGINATE ====================================







  },

  mounted () {

    var profilex = JSON.parse(localStorage.profile)
      var profile = profilex.profile
      this.$store.state.ID_DES_KEL = profile.des_kel
      this.form.des_kel = profile.des_kel

      
    this.form.tahun = UMUM.getTahun();
    WILAYAH.getListDesKelFull();
    this.getView();
    // FETCHING.getJenisUsaha();


    
  },
}
</script>




 