<template>
  <div>
    <hr class="hrpagin">
    <q-btn color="green" icon="add" label="Tambah" @click="mdl_add=true"/>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="20%">Nama</th>
          <th width="25%">Alamat</th>
          <th width="15%" class="text-center">Pendidikan</th>
          <th width="15%">Telp/WA</th>
          <th width="15%">Jml Honor</th>
          <th width="5%">#</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_pelaops" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          <td class="h_top">
            {{data.nama}} <br>
            <i class="f_captions4" style="color:gray; font-weight:bold; font-size:9pt">{{data.jabatan}}</i>
          </td>
          <td class="h_top">{{data.alamat}}</td>
          <td class="h_top text-center">{{data.pendidikan_uraian}}</td>
          <td class="h_top">{{data.no_telp}}</td>
          <td class="h_top">{{data.honor}}</td>
          <td class="h_top">
            <q-btn-group>
                <q-btn-dropdown glossy no-caps size="small" color="green" label="" dropdown-icon="settings">
                  <q-list>
                    <q-item clickable v-close-popup @click="mdl_edit = true, selectData(data)">
                      <q-item-section avatar>
                        <q-avatar icon="create" color="orange" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="mdl_hapus = true, selectData(data)">
                      <q-item-section avatar>
                        <q-avatar icon="delete_forever" color="negative" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Hapus</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list>
                  
                </q-btn-dropdown>
              </q-btn-group>
          </td>
        </tr>
      </table>

    </div>




    <!-- =================================================== MODAL =========================================================== -->
            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-light-green-7">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Jabatan</span>
                        <q-input v-model="form.jabatan" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Nama</span>
                        <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Pendidikan Terahir</span>
                        <select v-model="form.pendidikan_terahir" class="bg-white"  outlined square :dense="true">
                          <option value="">-- Pilih Pendidikan --</option>
                          <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">{{data.uraian}}</option>
                        </select>
                        <span class="h_lable ">No Telp/WA</span>
                        <q-input v-model="form.no_telp" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Jml Honor</span>
                        <q-input v-model="form.honor" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Alamat</span>
                        <textarea id="editor" v-model="form.alamat"></textarea>
                        <br>
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn color="primary" @click="addData()" label="Simpan" />
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
                        <span class="h_lable ">Jabatan</span>
                        <q-input v-model="form.jabatan" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Nama</span>
                        <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Pendidikan Terahir</span>
                        <select v-model="form.pendidikan_terahir" class="bg-white"  outlined square :dense="true">
                          <option value="">-- Pilih Pendidikan --</option>
                          <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">{{data.uraian}}</option>
                        </select>
                        <span class="h_lable ">No Telp/WA</span>
                        <q-input v-model="form.no_telp" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Jml Honor</span>
                        <q-input v-model="form.honor" outlined square :dense="true" class="bg-white margin_btn" />
                        <span class="h_lable ">Alamat</span>
                        <textarea id="editor" v-model="form.alamat"></textarea>
                        <br>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="primary" @click="editData()" label="Simpan" />
                      <q-btn @click="mdl_edit = false" label="Batal" color="negative" />
             
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

import UMUM from  '../../../../library/umum'
import FETCHING from  '../../../../library/fetching'
import WILAYAH from  '../../../../library/getWilayah'
import uniqid from 'uniqid';

export default {
  props: ["id_bumDes"],
  data() {
    return {

        form : {
            id : '',
            id_bumDes : this.id_bumDes,
            nama : '',
            jabatan : '',
            alamat : '',
            pendidikan_terahir : '',
            no_telp : '',
            honor : '',
            createdAt : '',
            des_kel : '',
        },


        list_data : [],
        list_pendidikan : [],
          cek_load_data : true,


        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,

        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){

      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "view_pelaops", {
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
              this.$store.state.list_pelaops = res_data;

      });
    },


    addData : function(number) {
        this.form.id = uniqid();
        this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "addData_pelaops", {
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
      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "editData_pelaops", {
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
      fetch(this.$store.state.url.URL_srv_bumdes_kelembagaan + "removeData_pelaops", {
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
      this.form.id = data.id
      this.form.id_bumDes = data.id_bumDes
      this.form.nama = data.nama
      this.form.jabatan = data.jabatan
      this.form.alamat = data.alamat
      this.form.pendidikan_terahir = data.pendidikan_terahir
      this.form.no_telp = data.no_telp
      this.form.honor = data.honor
      this.form.createdAt = data.createdAt
      this.form.des_kel = data.des_kel
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


        getList : async function(){
          this.list_pendidikan = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_PENDIDIKAN);
          console.log(this.list_pendidikan);
        },




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    this.getList()
    this.getView();

      
  },
}
</script>




 

<style>

</style>