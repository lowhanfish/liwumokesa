<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-orange-4 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Questioner IPD</div>
            <div class="text-subtitle2">IPD</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <!-- <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/> -->


              <select v-model="form.tahun" @change="cari_data()" style="width:90%">
                <option v-for="(data, index) in $store.state.tahun" :key="index" :value="data">{{data}}</option>
              </select>



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

        <div class="row">
          <div class="col-md-6 col-12 input_kiri " >
            <select :disabled="disable_kec" v-model="form.kecamatan" @change="chageDesa(), cari_data()" class="bg-white"  outlined square :dense="true">
              <option value="">-- Semua Kecamatan --</option>
              <option v-for="data in $store.state.listKecamatan" :key="data.id" :value="data.id">{{data.uraian}}</option>
            </select>
          </div>

          <div class="col-md-6 col-12 input_kanan ">
            <select :disabled="disable_des" v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true">
              <option value="">-- Semua Desa --</option>
              <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
            </select>
          </div>
        </div>

        <!-- <h1>{{form.des_kel}}</h1> -->

        <hr class="hrpagin">

        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-grey-5">
                <th width="5%" class="">No</th>
                <th width="35%">Variable/Dimensi</th>
                <th width="35%" class="">Uraian</th>
                <th width="10%" class="text-center">Skor</th>
                <th width="10%" class="text-center">Status</th>
                <th width="5%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                <td class="h_top">
                    {{data.uraian_variabel}}
                    <div class="h_nip">{{data.uraian_dimensi}}</div>
                </td>
                <td class="h_top">{{data.uraian}}</td>
                <td class="h_top text-center">{{data.score}}</td>
                <td class="h_top text-center">

                  <a class="h_clear" href="javascript:void(0)">
                    <q-icon style="font-size:16pt" :color="UMUM.checkStatus2(data.status).color" :name="UMUM.checkStatus2(data.status).icon" />
                  </a>
                  
                </td>
                <td class="text-center h_top">
                  <q-btn  @click="checkData(data)" glossy :color="UMUM.checkLengthIndikator(data.score)" icon="book" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk mengisi questioner
                      </q-tooltip>
                    </q-btn>
                </td>
              </tr>

            </table>

            
                
 <!-- <textarea id="froala-editor">Initialize the Froala WYSIWYG HTML Editor on a textarea.</textarea> -->
          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin">
        <br>
        



        <br>








      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL LIHAT ================================================ -->
              <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-blue-4">
                    <div class="text-h6 h_modalhead">Detil {{form.judul}}</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <hr class="hrpagin">
                        <span class="h_detil1">{{form.uraian}}</span> <br>
                        <hr class="hrpagin">
                        
                        <div class="tbl_responsive">
                          <table width="100%">
                            <tr class="h_table_head bg-grey-5">
                              <th width="5%" class="">No</th>
                              <th width="75%" class="">Uraian Pertanyaan</th>
                              <th width="20%"></th>
                            </tr>
                            <tr class="h_table_body" v-for="(data, j) in list_data_pertanyaan" :key="data.id">

                              <td class="text-center h_top">{{j+1}}.</td>
                              <td class="h_top">{{data.uraian}}</td>
                              <td class="text-center h_top">
                                <input v-model="data.jawaban" type="text">
                              

                              </td>
                            </tr>

                          </table>

                        </div>

                        <hr class="hrpagin">
                        
                        
                        <div class="tbl_responsive">
                          <table width="100%">
                            <tr class="h_table_body">
                              <td width="80%" class="h_top text-right"><b>SCORE</b></td>
                              <td width="20%" class="text-center h_top">
                                <input v-model="form.score" type="number">
                              </td>
                            </tr>

                          </table>

                        </div>

                        <hr class="hrpagin">


                        <div class="fr-view" style="font-size:9pt !important; color : #A2A2A2" v-html="form.keterangan"></div>



                        <br>
                         <!-- <span class="h_fotter_title" style="color:grey">Sumber : {{form.sumber}}</span> <br> -->


                         <br>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData_pertanyaan()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
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
import WILAYAH from  '../../../library/getWilayah'
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
            status : 0,
            score : '',
            tahun : '',
        },

        pertanyaan : {
            id : '',
            m_ipd_indikator : '',
            uraian : '',
            createdAt : '',

        },







        list_data : [],
        list_data_pertanyaan : [],
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


        disable_kec : false,
        disable_des : false,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_ipd_master_indikator + "list_indikator", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              kecamatan : this.form.kecamatan,
              des_kel : this.form.des_kel,
              tahun : this.form.tahun,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data = res_data;
              console.log(res_data);
              this.$store.commit("hideLoading");
      });
    },


    



    selectData : function(data){

            this.form.id = data.id;
            this.form.m_ipd_variabel = data.m_ipd_variabel;
            this.form.uraian = data.uraian;
            this.form.score = data.score;
            this.form.status = data.status;
            this.form.keterangan= data.keterangan;
            this.form.createdAt = data.createdAt;
            this.pertanyaan.m_ipd_indikator = data.id
            this.getView_pertanyaan();
    },

    emptytData : function(data){
             this.form.id = '';
            this.form.m_ipd_variabel = '';
            this.form.uraian = '';
            this.form.score = '';
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
              des_kel : this.form.des_kel,
              tahun : this.form.tahun,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data_pertanyaan = res_data;
              console.log(res_data);
      });
    },



    addData_pertanyaan : function(number) {
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_ipd_ipd + "addData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              pertanyaan : this.list_data_pertanyaan
            })
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });

        // console.log(document.getElementById("editor").value)
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

        checkData : function(data){
          if (this.form.des_kel == null || this.form.des_kel == undefined || this.form.des_kel == '') {
            alert ("MOHON PILIH DESA TERLEBIH DAHULU")
          } else {
            this.selectData(data)
            this.mdl_lihat = true;
          }
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



    tunggu : async function(){
          await WILAYAH.getListKecamatan();
          await WILAYAH.getListDesKelFull();

          if (profile.des_kel == null || profile.des_kel == undefined || profile.des_kel == '') {
            console.log(this.$store.state.listDesKel[0].uniqid)
            this.form.des_kel = this.$store.state.listDesKel[0].uniqid
          } else {
            this.form.des_kel = profile.des_kel
          }
        },









        filterSelect : function(profile){
          if (profile.aksesWilayah == 0) {
            WILAYAH.getListDesKelFull();
            this.form.des_kel = profile.des_kel
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

        this.form.tahun = UMUM.getTahun();

        WILAYAH.getListKecamatan();


        var profilex = JSON.parse(localStorage.profile)
        var profile = profilex.profile
        this.$store.state.ID_DES_KEL = profile.des_kel
      
   
        this.filterSelect(profile)



        this.getView();


      
  },
}
</script>




 