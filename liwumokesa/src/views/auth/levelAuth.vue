<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Level Otentikasi</div>
            <div class="text-subtitle2">Modul Otentikasi</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="getMenu(), mdl_add = true" dense flat icon="add" style="width:10%">
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
                <th width="75%">Level</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data._key">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data._id}}</td>
                <td>{{data.uraian}}</td>
                <td class="text-center">
                  <q-btn-group>
                    <q-btn @click="mdl_view = true, selectData(data)" glossy color="primary" icon="search" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk melihat data ini
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
                        <span class="h_lable ">Nama Level</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <ul>
                            <li v-for="data in list_menu" :key="data._id">
                                <span class="h_menu">{{data.nama}}</span>
                                
                                <div v-if="data.type == 'single'">
                                    <q-checkbox v-model="data.view" label="Lihat" color="cyan" />
                                    <q-checkbox v-model="data.add" label="Tambah" color="teal" />
                                    <q-checkbox v-model="data.edit" label="Edit" color="orange"/>
                                    <q-checkbox v-model="data.remove" label="Hapus" color="red"/>
                                </div>

                                <ul>
                                    <li v-for="data1 in data.submenu" :key="data1._id">
                                        {{data1.nama}}
                                        <div v-if="data1.type == 'single'">
                                            <q-checkbox v-model="data1.view" label="Lihat" color="cyan" />
                                            <q-checkbox v-model="data1.add" label="Tambah" color="teal" />
                                            <q-checkbox v-model="data1.edit" label="Edit" color="orange"/>
                                            <q-checkbox v-model="data1.remove" label="Hapus" color="red"/>
                                        </div>
                                        <ul>
                                            <li v-for="data2 in data1.submenu" :key="data2._id">
                                                {{data2.nama}}
                                                <div v-if="data2.type == 'single'">
                                                    <q-checkbox v-model="data2.view" label="Lihat" color="cyan" />
                                                    <q-checkbox v-model="data2.add" label="Tambah" color="teal" />
                                                    <q-checkbox v-model="data2.edit" label="Edit" color="orange"/>
                                                    <q-checkbox v-model="data2.remove" label="Hapus" color="red"/>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <hr class="hrpagin">
                            </li>
                        </ul>

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
                        <span class="h_lable ">Nama Level</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 

                        <ul>
                            <li v-for="data in list_menu" :key="data._id">
                                <span class="h_menu">{{data.nama}}</span>
                                
                                <div v-if="data.type == 'single'">
                                    <q-checkbox v-model="data.view" label="Lihat" color="cyan" />
                                    <q-checkbox v-model="data.add" label="Tambah" color="teal" />
                                    <q-checkbox v-model="data.edit" label="Edit" color="orange"/>
                                    <q-checkbox v-model="data.remove" label="Hapus" color="red"/>
                                </div>

                                <ul>
                                    <li v-for="data1 in data.submenu" :key="data1._id">
                                        {{data1.nama}}
                                        <div v-if="data1.type == 'single'">
                                            <q-checkbox v-model="data1.view" label="Lihat" color="cyan" />
                                            <q-checkbox v-model="data1.add" label="Tambah" color="teal" />
                                            <q-checkbox v-model="data1.edit" label="Edit" color="orange"/>
                                            <q-checkbox v-model="data1.remove" label="Hapus" color="red"/>
                                        </div>
                                        <ul>
                                            <li v-for="data2 in data1.submenu" :key="data2._id">
                                                {{data2.nama}}
                                                <div v-if="data2.type == 'single'">
                                                    <q-checkbox v-model="data2.view" label="Lihat" color="cyan" />
                                                    <q-checkbox v-model="data2.add" label="Tambah" color="teal" />
                                                    <q-checkbox v-model="data2.edit" label="Edit" color="orange"/>
                                                    <q-checkbox v-model="data2.remove" label="Hapus" color="red"/>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <hr class="hrpagin">
                            </li>
                        </ul>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

            <!-- ================================================= MODAL VIEW ================================================ -->
               <q-dialog v-model="mdl_view" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-light-blue">
                    <div class="text-h6 h_modalhead">Detil Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <br>
                    <span class="h_lable ">Nama Level</span>
                    <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" disabled/> 

                    <ul>
                        <li v-for="data in list_menu" :key="data._id">
                            <span class="h_menu">{{data.nama}}</span>
                            
                            <div v-if="data.type == 'single'">
                                <q-checkbox v-model="data.view" label="Lihat" color="cyan"  disable/>
                                <q-checkbox v-model="data.add" label="Tambah" color="teal"  disable/>
                                <q-checkbox v-model="data.edit" label="Edit" color="orange" disable/>
                                <q-checkbox v-model="data.remove" label="Hapus" color="red" disable/>
                            </div>

                            <ul>
                                <li v-for="data1 in data.submenu" :key="data1._id">
                                    {{data1.nama}}
                                    <div v-if="data1.type == 'single'">
                                        <q-checkbox v-model="data1.view" label="Lihat" color="cyan"  disable/>
                                        <q-checkbox v-model="data1.add" label="Tambah" color="teal" disable />
                                        <q-checkbox v-model="data1.edit" label="Edit" color="orange" disable/>
                                        <q-checkbox v-model="data1.remove" label="Hapus" color="red" disable/>
                                    </div>
                                    <ul>
                                        <li v-for="data2 in data1.submenu" :key="data2._id">
                                            {{data2.nama}}
                                            <div v-if="data2.type == 'single'">
                                                <q-checkbox v-model="data2.view" label="Lihat" color="cyan" disable />
                                                <q-checkbox v-model="data2.add" label="Tambah" color="teal"  disable/>
                                                <q-checkbox v-model="data2.edit" label="Edit" color="orange" disable/>
                                                <q-checkbox v-model="data2.remove" label="Hapus" color="red" disable/>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <hr class="hrpagin">
                        </li>
                    </ul>

                        
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL VIEW ================================================ -->

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

import UMUM from  '../../library/umum.js'


export default {
  data() {
    return {

      form : {
        _id : '',
        uraian : '',
        menu : [],
        createdAt : '',
      },
     orange : true,

      list_data : [],
      list_menu : [],

      page_limit : 8,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data : true,

      mdl_view: false,
      mdl_add: false,
      mdl_edit: false,
      mdl_hapus : false,
      btn_add: false,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_LEVEL_USERS + "view", {
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
              this.list_data = res_data;
              // this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
              // console.log(res_data);
      });
    },


    addData : function(number) {
          var data =  UMUM.filterAddEditRemove(this.list_menu)

          this.form.createdAt = UMUM.NOW()
          fetch(this.$store.state.url.URL_LEVEL_USERS + "addData", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({
                
                uraian : this.form.uraian,
                createdAt : this.form.createdAt,
                menu : data
              })
          }).then(res_data => {
              this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
              this.getView();
          });

        // console.log(this.list_menu)

            console.log(data)


    },


    editData : function(){
      var data =  UMUM.filterAddEditRemove(this.list_menu)
      fetch(this.$store.state.url.URL_LEVEL_USERS + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
                _id : this.form._id,
                uraian : this.form.uraian,
                createdAt : this.form.createdAt,
                menu : data
              })
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

    removeData : function(E){
      fetch(this.$store.state.url.URL_LEVEL_USERS + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({_id : this.form._id})
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },


    selectData : function(data){
      console.log(data)
        this.form = {
          _id : data._id,
          uraian : data.uraian,
          menu : data.menu,
          createdAt : data.createdAt,
        };

        this.getMenu();
    },
    

    getMenu : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_MENU_LIST + "view", {
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
              UMUM.setFalseAddEditRemove(res_data, this.form.menu)
              this.list_menu = res_data;
              
            //   this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
              console.log(this.list_menu);
      });
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
    this.getView();
    // this.getMenu();





    const res_data1 = [
      { name: 'Swimming', ages: [6, 7, 8], maxCap: 10 },
      { name: 'Skating', ages: [8, 9, 10], maxCap: 20 },
      { name: 'Open Gym', ages: [10, 11, 12], maxCap: 30 }
    ];
    
    const ageAppropriate1 = res_data1.filter(element => (element.name == 'Skating'));

    console.log(ageAppropriate1.length)







  },
}
</script>




 