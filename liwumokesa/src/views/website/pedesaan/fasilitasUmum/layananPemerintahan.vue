<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="text-h6 h_titleHead">Fasilitas Layanan Pemerintahan</div>
            <div class="text-subtitle2">Data Desa</div>
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
                <th width="10%" class="text-center">Kode/Id</th>
                <th width="25%" class="">Desa/Kel</th>
                <th width="30%" class="">Uraian</th>
                <th width="20%" class="text-center">Jumlah</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data._key">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data.id}}</td>
                <td>{{data.des_kel_uraian}}</td>
                <td>{{data.masterFasilitasPemerintahan_uraian}}</td>
                <td class="text-center">{{data.jumlah}} Unit</td>
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

                            <table width="100%">
                              <tr class="h_table_head bg-grey-5">
                                <th width="5%" class="text-center">No</th>
                                <th width="10%" class="text-center">Uraian</th>
                                <th width="20%">Jumlah</th>
                              </tr>
                        <template v-for="(data, index) in $store.state.listFasilitasPemerintah">
                              <tr :key="data.id" class="h_table_body">
                                <td class="text-center">{{indexing(index+1)}}.</td>
                                <td>{{data.uraian}}</td>
                                <td class="text-center">
                                  <q-input v-model="data.jumlah" type="text" outlined square :dense="true" />
                                </td>
                              </tr>
                        </template>

                            </table>
                            
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
                        <br>
                        <span class="h_lable ">Jumlah</span>
                        <q-input v-model="form.jumlah" outlined square :dense="true" class="bg-white margin_btn" /> 
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
        masterFasilitasPemerintahan : '',
        des_kel : this.$store.state.ID_DES_KEL,
        jumlah : '',
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
      fetch(this.$store.state.url.URL_ADM_FASILITAS_PEMERINTAHAN + "view", {
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
      // console.log(this.$store.state.listFasilitasPemerintah) 
      this.form.id = uniqid();
      this.form.createdAt = UMUM.NOW();
      fetch(this.$store.state.url.URL_ADM_FASILITAS_PEMERINTAHAN + "addData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
            form : this.form,
            data : this.$store.state.listFasilitasPemerintah
          })
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.getView();
      });


    },


    editData : function(){
      fetch(this.$store.state.url.URL_ADM_FASILITAS_PEMERINTAHAN + "editData", {
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
      fetch(this.$store.state.url.URL_ADM_FASILITAS_PEMERINTAHAN + "removeData", {
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
        this.form.jumlah = data.jumlah;

        this.form.masterFasilitasPemerintahan = data.masterFasilitasPemerintahan;
        this.form.des_kel = data.des_kel;
        this.form.jumlah = data.jumlah;
        this.form.tahun = data.tahun;
        this.form.createdAt = data.createdAt;

    },
    btnAdd(){
      if (this.form.des_kel == '') {
        alert("PILIH DESA TERLEBIH DAHULU")
      } else {
        FETCHING.postFasilitasPemerintahan(this.form.tahun, this.form.des_kel)
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




 