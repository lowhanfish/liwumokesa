<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-light-green text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">WhatsApp Informasi</div>
            <div class="text-subtitle2">WhatsApp Blaster</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true" dense flat icon="add" style="width:10%">
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


  <!-- <button @click="Connecting()">Koneksi</button> -->
  <div class="text-center">
    <span v-if="connectStat =='0'">Menunggu koneksi dengan WhatsApp Suara-2020 ...</span>
    <span v-if="connectStat =='2'">Tidak koneksi dengan WhatsApp Suara-2020, Silahkan lakukan Scanning Barcode</span>
    <span v-if="connectStat =='1'">WhatsApp Blaster Suara-2020 Siap Digunakan</span>
    
      <div>
          <q-img
                class="qrcode"
                    v-if="connectStat =='2'"
                :src="imgku"
                spinner-color="primary"
                spinner-size="82px"
            />
      </div>
      <br>
  </div>
          

        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-green-2">
                <th width="5%" class="text-center">No</th>
                <th width="20%">Nama Relawan</th>
                <th width="25%">Kecamatan</th>
                <th width="25%">Desa-Kelurahan</th>
                <th width="5%">Status</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body">
                <td class="text-center">1.</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td class="text-center">
                  <q-btn-group>
                    <q-btn @click="mdl_edit = true, selectData(data)" glossy color="blue" icon="place" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat Maps
                      </q-tooltip>
                    </q-btn>
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
        <div class="text-center">
          <q-btn @click="btn_prev" glossy color="orange" icon="skip_previous" class="paginate_btn" />
            <span class="h_panation">&nbsp; {{page_first}} - {{page_last}} &nbsp;</span>
          <q-btn @click="btn_next" glossy color="orange" icon="skip_next" class="paginate_btn" />
        </div>
        <br>
      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Dataxxx</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <q-checkbox v-model="form.user" label="User" />
                        <q-checkbox v-model="form.relawan" label="Relawan" />
                        <q-checkbox v-model="form.dukungan" label="Dukungan" />
                        <br>

                        <hr class="hrpagin">

                        <span class="h_lable ">Uraian WA</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <span class="h_lable ">Keterangan</span>
                        <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>

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

import io from "socket.io-client";



export default {
  data() {
    return {
        connectStat : 0,
        imgku : '',

        form : {
            id : '',
            user : false,
            relawan : false,
            dukungan : false,
            uraian : '',
            keterangan : '',
        },
        
        list_data : [],

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

        Connecting(val) {
            // var socket = io.connect("http://localhost:5010");

            const socket = io.connect('http://localhost:5010', {
              query: {token :localStorage.token}
            });

            socket.emit('assu', 'WATAAA')

            socket.on("ready", fetchedData => {
                console.log(fetchedData)
                // this.imgku = fetchedData
            })

            socket.on("message", fetchedData => {
                console.log(fetchedData)
                this.connectStat = fetchedData
            })
            socket.on("qr", fetchedData => {
                console.log(fetchedData)
                this.imgku = fetchedData
            })
        },

        getView : function(){
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_MasterKategori + "view", {
                method: "POST",
                headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value
                })
            })
                .then(res => res.json())
                .then(res_data => {
                    this.list_data = res_data.data;
                    this.page_last = res_data.jml_data;
                    this.$store.commit("hideLoading");
                    console.log(res_data);
            });
        },


        addData : function(number) {
            fetch(this.$store.state.url.URL_APP + "AddWhatsapp", {
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
            fetch(this.$store.state.url.URL_MasterKategori + "editData", {
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
            fetch(this.$store.state.url.URL_MasterKategori + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({id : this.form.id})
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },
        selectData : function(data){
            this.form.id = data.id;
            this.form.uraian = data.uraian;
            this.form.keterangan = data.keterangan;
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
            btn_prev : function(){
                this.cek_load_data = true;
                if(this.page_first>1){
                    this.page_first--
                }else{
                    this.page_first = 1;
                }
                this.getView();
            },

            btn_next : function(){
                if(this.page_first >= this.page_last){
                    this.page_first == this.page_last
                }else{
                    this.page_first++;
                }
                this.getView();
            },

            cari_data : function(){
                this.page_first = 1;
                this.getView();
            },


        // ====================================== PAGINATE ====================================







},

  mounted () {
    // this.getView();
    this.Connecting();
  },
}
</script>




 