<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Suket Berdomisili</div>
            <div class="text-subtitle2">Modul Persuratan</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="mdl_reject = true" dense flat icon="add" style="width:10%" disabled>
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
                <th width="25%" class="">Pengusul</th>
                <th width="30%">Alamat</th>
                <th width="20%" class="text-center">Tgl Usulan</th>
                <th width="10%"></th>
              </tr>
              <tr  :class="'h_table_body '+UMUM.StatusIndikator(data.data.status)" v-for="(data, index) in list_data" :key="data._key">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="">{{data.data.nama}}</td>
                <td>{{data.data.alamat}}</td>
                <td class="text-center">20 Nov 2022</td>
                <td class="text-center">
                  <q-btn-group>
                    <q-btn @click="selectData(data), modal_lihat = true" glossy color="blue" icon="search" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat data ini
                      </q-tooltip>
                    </q-btn>
                    <q-btn @click="mdl_approve = true, selectData(data)" glossy color="green" icon="check" class="tbl_btn">
                      <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                        Click untuk menyetujui data ini
                      </q-tooltip>
                    </q-btn>
                    <q-btn @click="mdl_reject = true, selectData(data)" glossy color="negative" icon="clear" class="tbl_btn">
                      <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                        Click untuk mengembalikan data ini
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


            <!-- ================================================= MODAL APPROVE ================================================ -->
              <q-dialog v-model="mdl_approve" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Persetujuan Permohonan</div>
                  </q-card-section>

                  <form @submit.prevent="approveData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Nomor Surat</span>
                        <q-input outlined v-model="form.no"  :dense="true"/>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="light-green-8" @click="approveData()" label="Setujui" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL APPROVE ================================================ -->


            <!-- ================================================= MODAL REJECT ================================================ -->
               <q-dialog v-model="mdl_reject" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-red">
                    <div class="text-h6 h_modalhead">Kembalikan Permohonan</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Alasan Pengembalian</span>
                        <q-input outlined v-model="form.keterangan" :dense="true" type="textarea"/>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="btn_add" color="orange-10" @click="rejectData()" label="Kembalikan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL REJECT ================================================ -->


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
                                    <!-- <span style="font-size:12px; font-weight:bold; color:gray">👤 DAENG LALA</span> <br>  -->
                                    <span style="font-size:11px; font-weight:bold; color:gray">📅 Tgl Post : {{form.createdAt}}</span> <br>
                                    <span style="font-size:11px; font-weight:bold; color:gray">✍ Keterangan : {{form.keterangan}}</span> <br>
                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 
                                    <br><br>
                                  </div>

                                  <domisili :form="form" :uraian='uraian'/>

                                </div>

                                

                                <div>

                                </div>
    

                              </q-card-section>

                              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
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





          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../library/umum.js'


export default {
  data() {
    return {

      form : {
        nama : '',
        tpt_lahir : '',
        tgl_lahir : '',
        jk : '',
        agama : '',
        alamat : '',
        des_kel : '',
        no : '',
        file : null,
        createdAt : '',
        editedAt : '',
        status : 0,
        keterangan : 'Masih dalam proses pemeriksaan',
        penandatangan : '',
      },

      uraian : {
        agama_uraian : '',
      },


      
      fileOld: '',
      list_data : [],

      page_limit : 8,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data : true,


      mdl_reject: false,
      mdl_approve : false,
      modal_lihat : false,
      modal_lampiran : false,


      btn_add: false,

      UMUM : UMUM,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_srv_suketBerdomisili + "viewMaster", {
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


    approveData : function(number) {

      // console.log(this.form.no)

      if (this.form.no == '' || this.form.no == ' '|| this.form.no == null || this.form.no == undefined) {

        alert("Mohon Isi Nomor Surat Terlebih dahulu")
      } else {

        this.form.editedAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_suketBerdomisili + "verifikasi", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              id : this.form.id,
              no : this.form.no,
              status : 1,
              keterangan : 'Permohan telah disetujui',
              fileOld : this.fileOld,
              editedAt :  UMUM.NOW(),
              agenda : true,
            })
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });

      }


    },


    rejectData : function(){
      if (this.form.keterangan == '' || this.form.keterangan == ' '|| this.form.keterangan == null || this.form.keterangan == undefined) {
        alert("Mohon Isi Keterangan Pengembalian Terlebih dahulu")
      } else {
        this.form.editedAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_suketBerdomisili + "verifikasi", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              id : this.form.id,
              no : this.form.no,
              status : 2,
              keterangan : this.form.keterangan,
              fileOld : this.fileOld,
              editedAt :  UMUM.NOW(),
              agenda : false,
            })
        }).then(res_data => {
            this.Notify('Sukses Mengembalikan Data', 'red', 'check_circle_outline');
            this.getView();
        });

      }
    },

    removeData : function(E){
      fetch(this.$store.state.url.URL_srv_suketBerdomisili + "removeData", {
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
        this.form.id = data.data.id;
        this.form.nama= data.data.nama;
        this.form.tpt_lahir= data.data.tpt_lahir;
        this.form.tgl_lahir= data.data.tgl_lahir;
        this.form.jk= data.data.jk;
        this.form.agama= data.data.agama;
        this.form.alamat= data.data.alamat;
        this.form.createdAt= data.data.createdAt;
        this.form.editedAt = data.data.editedAt;
        this.form.status= data.data.status;
        this.form.no= data.data.no;
        this.form.keterangan= data.data.keterangan;
        this.fileOld = data.data.file;

        this.uraian.agama_uraian = data.agama.uraian

        this.form.penandatangan = data.pegawai.nama;



        this.$store.state.DES_KEL = data.desa.uraian
        this.$store.state.KECAMATAN = data.kecamatan.uraian


        console.log(data)
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
        }




    // ====================================== PAGINATE ====================================







  },

  mounted () {

    var profilex = JSON.parse(localStorage.profile)
    var profile = profilex.profile
    this.$store.state.ID_DES_KEL = profile.des_kel
    this.form.des_kel = profile.des_kel



    this.getView();
  },
}
</script>




 