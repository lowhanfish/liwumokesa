<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Usulan Lokasi Absen</div>
            <div class="text-subtitle2">Verikasi Lokasi</div>
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
        <div class="tbl_responsive">

          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head bg-blue-2">
                <th width="5%" class="text-center">No</th>
                <th width="20%">Nama/NIP</th>
                <th width="25%">Instansi</th>
                <th width="28%">Uraian/Kategori</th>
                <th width="12%"></th>
              </tr>
              <tr >
                <td class="text-center">1.</td>
                <td>
                  Kiken Sukma Batara S.Si.,MT <br/>
                  <span class="h_nip">192.168.1.1</span>
                  
                  </td>
                <td>Dinas Komunikasi Informatika dan Persandian</td>
                <td>
                  xxxxx <br/>
                  <span class="h_nip">(zzzzzz)</span>
                  
                  </td>
                <td class="text-center">
                  <q-btn-group>
                    <q-btn glossy color="blue" icon="place" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat Maps
                      </q-tooltip>
                    </q-btn>
                    <q-btn glossy color="light-green-8" icon="chat" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat Percakapan
                      </q-tooltip>
                    </q-btn>
                    <q-btn glossy color="orange" icon="create" class="tbl_btn">
                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                        Click untuk mengubah data ini
                      </q-tooltip>
                    </q-btn>
                    <q-btn glossy color="negative" icon="delete_forever" class="tbl_btn">
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
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Kategori Lokasi</span>

                            <select v-model="form.jeniskategorilokasi" class="inputbs">
                              <option >xxxxx</option>
                            </select>

                            <span class="h_lable ">Uraian Lokasi</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" placeholder="ex : Kantor Dinas Komunikasi Informatika dan Persandian"/> 

                            <span class="h_lable ">Radius</span>
                            <q-input v-model="form.rad" type="number" outlined square :dense="true" class="bg-white margin_btn" placeholder="Radius dalam satuan Meter (Ex : 2.5)"/>

                          </div>


                          <div class="col-6 col-md-6 frame_cari">
                            <span class="h_lable ">Latitude</span>
                            <q-input v-model="form.lat" outlined square :dense="true" class="bg-white margin_btn" />
                            <q-btn @click="mdl_maps_tambah = true" color="primary" size="sm" icon="map" label="Maps"/>
                            &nbsp;&nbsp;&nbsp;
                            <q-btn color="orange" size="sm" icon="place" label="Coordinate"/>
                            &nbsp;&nbsp;&nbsp;
                            <q-btn color="red" size="sm" icon="clear" label="Clear"/>
                          </div>
                          <div class="col-6 col-md-6 frame_cari">
                            <span class="h_lable ">Longitude</span>
                            <q-input v-model="form.lng" outlined square :dense="true" class="bg-white margin_btn" />
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <br>
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>


                            <span class="h_lable ">Lampiran File</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
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
                        <br>
                        <div class="row">

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
export default {
  data() {
    return {
      

      form : {
        id : '',
        uraian : '',
        jeniskategorilokasi : '',
        lat : '',
        lng : '',
        rad : 100,
        keterangan : '',
        file : null,
        file_old : '',
        unit_kerja : '',
      },
     
      list_data : [],


      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data : true,


      mdl_add: false,
      mdl_edit: false,
      mdl_hapus : false,
      mdl_chat : false,
      mdl_maps : false,
      btn_add: false,
      mdl_maps_tambah : false,
      mdl_img : false,
    }
  },
  methods: {


    getView : function(){
      // this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_APP + "view", {
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
              // this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },


    addData : function(number) {
     
     

      fetch(this.$store.state.url.URL_APP + "Add", {
          method: "POST",
          headers: {
            // "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.form)
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.getView();
      });
      // console.log(this.form.jeniskategorilokasi)
    },


    editData : function(){
      fetch(this.$store.state.url.URL_APP + "editData", {
          method: "POST",
          headers: {
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.form)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

    removeData : function(E){
      fetch(this.$store.state.url.URL_APP + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({id : this.form.id, file : this.form.file})
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },
    selectData : function(data){

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

        indicatorColor : function(data){
          if (data == 0) {
            return {
              bg : `bg-orange-2`,
              status : false
            }  
          }
          else if(data == 1){
            return {
              bg : `bg-blue-1`,
              status : false
            }
          }
          else if (data == 2){
            return {
              bg : `bg-red-2`,
              status : true
            }
          }

        }


    // ====================================== PAGINATE ====================================







  },

  mounted () {

    // this.$store.commit("listJeniskategorilokasi");
    // this.$store.commit("getStorage");

  },
}
</script>




