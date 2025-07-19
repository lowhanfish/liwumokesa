<template>
  <div>
    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">A. RENCANA USAHA</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <!-- jenis_usaha : '',
            dokumen_analisa : '',
            omset : '',
            pendapatan : '',
            lokasi : '',
            status : '', -->
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="50%">Jenis Usaha</th>
          <th width="10%" class="text-center">Dokumen Analisa Kelayakan</th>
          <th width="15%">Omset</th>
          <th width="10%">Pendapatan</th>
          <th width="10%" class="text-center">Fasilitas</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_usahaKeuangan" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          <td class="h_top">
            {{data.jenis_usaha}}
            <div>
              <q-icon name="location_on" />
              <i class="f_captions4" style="color:#88B386; font-weight:bold; font-size:9pt">{{data.lokasi}}</i>
            </div>
          </td>
          <td class="h_top text-center">
            <q-btn dense round flat icon="picture_as_pdf" @click="mdl_lihat = true, selectData(data)"/>
          </td>
          <td class="h_top">{{data.omset}}</td>
          <td class="h_top">{{data.pendapatan}}</td>
          <td class="h_top text-center">
            <q-btn dense round flat icon="two_wheeler">
              <q-badge color="red" floating transparent>
                0
              </q-badge>
            </q-btn>
          </td>
        </tr>
      </table>
    </div>


    <br>

    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">B. SUMBER MODAL AWAL / PENYERTAAN MODAL</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <!-- jenis_usaha : '',
            dokumen_analisa : '',
            omset : '',
            pendapatan : '',
            lokasi : '',
            status : '', -->
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="35%">Sumber Dana</th>
          <th width="30%" class="text-center">Jumlah</th>
          <th width="30%" class="text-center">Tahun</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_keuangan_modal" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          
          <td class="h_top">{{data.sumber}}</td>
          <td class="h_top text-center">{{data.jumlah}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
         
        </tr>
      </table>
    </div>


    <br>

    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">C. DOKUMEN LAPORAN PERTANGGUNG JAWABAN KEUANGAN</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <!-- jenis_usaha : '',
            dokumen_analisa : '',
            omset : '',
            pendapatan : '',
            lokasi : '',
            status : '', -->
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="35%">Jenis Dokumen</th>
          <th width="30%" class="text-center">Tahun</th>
          <th width="30%" class="text-center">Dokumen</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_keuangan_laporan" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          
          <td class="h_top">{{data.uraian}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
          <td class="h_top text-center">
            <q-btn dense round flat icon="picture_as_pdf" @click="mdl_lihat_laporan = true, selectData_laporan(data)"/>
          </td>

        </tr>
      </table>
    </div>




    <br>

    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">D. KERJASAMA YANG TELAH DILAKSANAKAN</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="35%">Jenis Kerja-Sama</th>
          <th width="30%" class="text-center">Tahun</th>
          <th width="30%" class="text-center">Dokumen</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_keuangan_kerjaSama" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          
          <td class="h_top">{{data.uraian}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
          <td class="h_top text-center">
            <q-btn dense round flat icon="picture_as_pdf" @click="mdl_lihat_kerjaSama = true, selectData_kerjaSama(data)"/>
          </td>
        </tr>
      </table>
    </div>




    <br>

    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">E. PENDAMPINGAN YANG DITERIMA</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="35%">Lembaga/Institusi</th>
          <th width="30%" class="text-center">Tahun</th>
          <th width="30%" class="text-center">Masa/Waktu Pendampingan</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_keuangan_pendampingan" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          
          <td class="h_top">{{data.lembaga}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
          <td class="h_top text-center">{{data.waktu}}</td>
         
        </tr>
      </table>
    </div>


    <br>

    <hr class="hrpagin">
    <span style="color:gray; font-weight:bold">E. INTENSITAS</span>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="35%">Intensitas Rapat Rutin</th>
          <th width="30%" class="text-center">Jml Serapan Tenaga Kerja</th>
          <th width="30%" class="text-center">Kontribusi BUMDes Terhadap PADes</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_keuangan_intensitas" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          
          <td class="h_top">{{data.rapat}}</td>
          <td class="h_top text-center">{{data.jml_tenaga}}</td>
          <td class="h_top text-center">{{data.kontribusi}}</td>
         
        </tr>
      </table>
    </div>



<!-- =================================================== MODAL RENCANA USAHA =========================================================== -->

    <div>

      <!-- ================================================= MODAL LIHAT ================================================ -->
              <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="bg-blue-4">
                    <div class="text-h6 h_modalhead">Dokumen Analisa Kelayakan Usaha</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                         <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn @click="mdl_lihat = false" label="Kembali" color="negative"  />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
        <!-- ================================================= MODAL LIHAT ================================================ -->

    </div>
<!-- =================================================== MODAL RENCANA USAHA =========================================================== -->


<!-- =================================================== MODAL MODAL AWAL =========================================================== -->
    <div>

    </div>
<!-- =================================================== MODAL MODAL AWAL =========================================================== -->


<!-- =================================================== MODAL LAPORAN PERTANGGUNG JAWABAN =========================================================== -->

    <div>

      <!-- ================================================= MODAL LIHAT LAPORAN PERTANGGUNG JAWABAN ================================================ -->
          <q-dialog v-model="mdl_lihat_laporan" persistent>
            <q-card class="mdl-lg">
              <q-card-section class="bg-blue-4">
                <div class="text-h6 h_modalhead">Dokumen Laporan Pertanggung Jawaban Keuangan</div>
              </q-card-section>

              <form @submit.prevent="addData()">
                <q-card-section class="q-pt-none">
                    <br>
                      <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn @click="mdl_lihat_laporan = false" label="Kembali" color="negative"  />
                </q-card-actions>

              </form>
            </q-card>
          </q-dialog>
        <!-- ================================================= MODAL LIHAT LAPORAN PERTANGGUNG JAWABAN ================================================ -->

    </div>
<!-- =================================================== MODAL LAPORAN PERTANGGUNG JAWABAN =========================================================== -->


<!-- =================================================== MODAL KERJA SAMA =========================================================== -->

    <div>

      <!-- ================================================= MODAL LIHAT KERJA SAMA ================================================ -->
          <q-dialog v-model="mdl_lihat_kerjaSama" persistent>
            <q-card class="mdl-lg">
              <q-card-section class="bg-blue-4">
                <div class="text-h6 h_modalhead">Dokumen kerjaSama Pertanggung Jawaban Keuangan</div>
              </q-card-section>

              <form @submit.prevent="addData()">
                <q-card-section class="q-pt-none">
                    <br>
                      <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn @click="mdl_lihat_kerjaSama = false" label="Kembali" color="negative"  />
                </q-card-actions>

              </form>
            </q-card>
          </q-dialog>
        <!-- ================================================= MODAL LIHAT KERJA SAMA ================================================ -->

    </div>
<!-- =================================================== MODAL KERJA SAMA =========================================================== -->


<!-- =================================================== MODAL PENDAMPINGAN =========================================================== -->
    <div>

    </div>
<!-- =================================================== MODAL PENDAMPINGAN =========================================================== -->


<!-- =================================================== MODAL INTENSITAS =========================================================== -->
    <div>


    </div>
<!-- =================================================== MODAL INTENSITAS =========================================================== -->














  </div>
</template>

<script>

import UMUM from  '../../../library/umum'
import FETCHING from  '../../../library/fetching'
import WILAYAH from  '../../../library/getWilayah'
import uniqid from 'uniqid';

export default {
  props: ["id_bumDes"],
  data() {
    return {

        form : {
            id : '',
            id_bumDes : this.id_bumDes,
            jenis_usaha : '',
            file : null,
            omset : '',
            pendapatan : '',
            lokasi : '',
            status : '',

            createdAt : '',
            des_kel : '',
        },

        modal : {
            id : '',
            id_bumDes : this.id_bumDes,
            sumber : '',
            tahun : '',
            jumlah : '',
            createdAt : '',
            des_kel : '',
        },

        laporan : {
            id : '',
            id_bumDes : this.id_bumDes,
            uraian : '',
            tahun : '',
            file : null,
            createdAt : '',
            des_kel : '',
        },

        kerjaSama : {
            id : '',
            id_bumDes : this.id_bumDes,
            uraian : '',
            tahun : '',
            file : null,
            createdAt : '',
            des_kel : '',
        },


        pendampingan : {
            id : '',
            id_bumDes : this.id_bumDes,
            lembaga : '',
            waktu : '',
            tahun : '',
            createdAt : '',
            des_kel : '',
        },

        intensitas : {
            id : '',
            id_bumDes : this.id_bumDes,
            rapat : '',
            jml_tenaga : '',
            kontribusi : '',
            createdAt : '',
            des_kel : '',
        },


        fileOld : '',


        list_data : [],
        list_pendidikan : [],
        cek_load_data : true,


        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        mdl_lihat : false,


        mdl_add_modal: false,
        mdl_edit_modal: false,
        mdl_hapus_modal : false,

        mdl_add_laporan: false,
        mdl_edit_laporan: false,
        mdl_hapus_laporan : false,
        mdl_lihat_laporan : false,

        mdl_add_kerjaSama: false,
        mdl_edit_kerjaSama: false,
        mdl_hapus_kerjaSama : false,
        mdl_lihat_kerjaSama : false,

        mdl_add_pendampingan: false,
        mdl_edit_pendampingan: false,
        mdl_hapus_pendampingan : false,

        mdl_add_intensitas : false,

        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_usahaKeuangan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.form.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              // console.log(res_data);
              this.$store.state.list_usahaKeuangan = res_data;

      });
    },


    addData : function(number) {

      var formData = new FormData();

        formData.append("id", uniqid());
        formData.append("id_bumDes", this.form.id_bumDes);
        formData.append("jenis_usaha", this.form.jenis_usaha);
        formData.append("omset", this.form.omset);
        formData.append("pendapatan", this.form.pendapatan);
        formData.append("lokasi", this.form.lokasi);
        formData.append("status", this.form.status);

        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.form.file);


        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_usahaKeuangan", {
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
      formData.append("id_bumDes", this.form.id_bumDes);
      formData.append("jenis_usaha", this.form.jenis_usaha);
      formData.append("omset", this.form.omset);
      formData.append("pendapatan", this.form.pendapatan);
      formData.append("lokasi", this.form.lokasi);
      formData.append("status", this.form.status);
      formData.append("createdAt", this.form.createdAt);
      formData.append("file", this.form.file);

      formData.append("fileOld", this.fileOld);


      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_usahaKeuangan", {
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
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_usahaKeuangan", {
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
            this.form.jenis_usaha = data.jenis_usaha;
            this.form.omset = data.omset;
            this.form.pendapatan = data.pendapatan;
            this.form.lokasi = data.lokasi;
            this.form.status= data.status;
            this.form.createdAt = data.createdAt;
            this.fileOld = data.file;

    },


// ======================================= MODAL // =======================================
    getView_modal : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_keuangan_modal", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.form.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.$store.state.list_keuangan_modal = res_data;
      });
    },


    addData_modal : function(number) {
        this.modal.id = uniqid();
        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_keuangan_modal", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.modal)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_modal();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_modal : function(){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_keuangan_modal", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.modal)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_modal();
      });
    },

    removeData_modal : function(E){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_keuangan_modal", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.modal)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_modal();
      });

    },

    selectData_modal : function(data){

            this.modal.id = data.id;
            this.modal.sumber = data.sumber;
            this.modal.tahun = data.tahun;
            this.modal.jumlah= data.jumlah;
            this.modal.createdAt = data.createdAt;
    },

// ======================================= MODAL // =======================================





// ======================================= LAPORAN // =======================================
    getView_laporan : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_keuangan_laporan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.laporan.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              // console.log(res_data);
              this.$store.state.list_keuangan_laporan = res_data;

      });
    },


    addData_laporan : function(number) {
  
        var formData = new FormData();

        formData.append("id", uniqid());
        formData.append("id_bumDes", this.laporan.id_bumDes);
        formData.append("uraian", this.laporan.uraian);
        formData.append("tahun", this.laporan.tahun);


        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.laporan.file);


        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_keuangan_laporan", {
            method: "POST",
            headers: {
                // "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_laporan();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_laporan : function(){

      var formData = new FormData();
      formData.append("id", this.laporan.id);
      formData.append("id_bumDes", this.laporan.id_bumDes);
      formData.append("uraian", this.laporan.uraian);
      formData.append("tahun", this.laporan.tahun);
      formData.append("createdAt", this.laporan.createdAt);
      formData.append("file", this.laporan.file);

      formData.append("fileOld", this.fileOld);


      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_keuangan_laporan", {
          method: "POST",
          headers: {
            // "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: formData
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_laporan();
      });
    },

    removeData_laporan : function(E){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_keuangan_laporan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id : this.laporan.id,
              fileOld : this.fileOld,
          })
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_laporan();
      });

    },

    selectData_laporan : function(data){

            this.laporan.id = data.id;
            this.laporan.uraian = data.uraian;
            this.laporan.tahun = data.tahun;
            this.laporan.createdAt = data.createdAt;
            this.fileOld = data.file;

    },

// ======================================= LAPORAN // =======================================




// ======================================= KERJASAMA // =======================================
    getView_kerjaSama : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_keuangan_kerjaSama", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.kerjaSama.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              // console.log(res_data);
              this.$store.state.list_keuangan_kerjaSama = res_data;

      });
    },


    addData_kerjaSama : function(number) {
  
        var formData = new FormData();

        formData.append("id", uniqid());
        formData.append("id_bumDes", this.kerjaSama.id_bumDes);
        formData.append("uraian", this.kerjaSama.uraian);
        formData.append("tahun", this.kerjaSama.tahun);


        formData.append("createdAt", UMUM.NOW());
        formData.append("file", this.kerjaSama.file);


        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_keuangan_kerjaSama", {
            method: "POST",
            headers: {
                // "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_kerjaSama();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_kerjaSama : function(){

      var formData = new FormData();
      formData.append("id", this.kerjaSama.id);
      formData.append("id_bumDes", this.kerjaSama.id_bumDes);
      formData.append("uraian", this.kerjaSama.uraian);
      formData.append("tahun", this.kerjaSama.tahun);
      formData.append("createdAt", this.kerjaSama.createdAt);
      formData.append("file", this.kerjaSama.file);

      formData.append("fileOld", this.fileOld);


      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_keuangan_kerjaSama", {
          method: "POST",
          headers: {
            // "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: formData
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_kerjaSama();
      });
    },

    removeData_kerjaSama : function(E){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_keuangan_kerjaSama", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id : this.kerjaSama.id,
              fileOld : this.fileOld,
          })
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_kerjaSama();
      });

    },

    selectData_kerjaSama : function(data){

            this.kerjaSama.id = data.id;
            this.kerjaSama.uraian = data.uraian;
            this.kerjaSama.tahun = data.tahun;
            this.kerjaSama.createdAt = data.createdAt;
            this.fileOld = data.file;

    },

// ======================================= KERJASAMA // =======================================



// ======================================= PENDAMPINGAN // =======================================
    getView_pendampingan : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_keuangan_pendampingan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.form.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.$store.state.list_keuangan_pendampingan = res_data;
      });
    },


    addData_pendampingan : function(number) {
        this.modal.id = uniqid();
        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_keuangan_pendampingan", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.pendampingan)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_pendampingan();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_pendampingan : function(){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_keuangan_pendampingan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.pendampingan)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_pendampingan();
      });
    },

    removeData_pendampingan : function(E){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_keuangan_pendampingan", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.pendampingan)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_pendampingan();
      });

    },

    selectData_pendampingan : function(data){

            this.pendampingan.id = data.id;
            this.pendampingan.lembaga = data.lembaga;
            this.pendampingan.waktu = data.waktu;
            this.pendampingan.tahun = data.tahun;
            this.pendampingan.createdAt = data.createdAt;
    },

// ======================================= PENDAMPINGAN // =======================================



// ======================================= INTENSITAS // =======================================
    getView_intensitas : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_keuangan_intensitas", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.form.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.$store.state.list_keuangan_intensitas = res_data;
      });
    },


    addData_intensitas : function(number) {
        this.modal.id = uniqid();
        // console.log(this.form.id)
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_CNT_BUMDES + "addData_keuangan_intensitas", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.intensitas)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView_intensitas();
        });

        // console.log(document.getElementById("editor").value)
    },


    editData_intensitas : function(){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "editData_keuangan_intensitas", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.intensitas)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView_intensitas();
      });
    },

    removeData_intensitas : function(E){
      fetch(this.$store.state.url.URL_CNT_BUMDES + "removeData_keuangan_intensitas", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.intensitas)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView_intensitas();
      });

    },

    selectData_intensitas : function(data){

            this.intensitas.id = data.id;
            this.intensitas.rapat = data.rapat;
            this.pendampingan.jml_tenaga = data.jml_tenaga;
            this.intensitas.kontribusi = data.kontribusi;
            this.intensitas.createdAt = data.createdAt;
    },

// ======================================= INTENSITAS // =======================================







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


        getList : async function(){
          this.list_pendidikan = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_PENDIDIKAN);
        },




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    // this.FETCHING.postPendidikan()
    this.getView();
    this.getView_modal();
    this.getView_laporan();
    this.getView_kerjaSama();
    this.getView_intensitas();

      
  },
}
</script>




 

<style>

</style>