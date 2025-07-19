<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Menu List</div>
            <div class="text-subtitle2">Modul Data Master</div>
            
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                  <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                    Click untuk menambah Menu
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
            <q-list bordered class="rounded-borders">
                <template v-for="data in list_data">
                    <q-expansion-item
                        :key="data._id"
                        expand-separator
                        :icon="data.icon"
                        :label="data.nama +' ('+data.index+')'"
                        :caption="data.group"
                    >
                        <q-card>
                            <q-card-section>
                                <table style="width:100%">
                                    <tr>
                                        <th  style="width:40%" class="">Variable</th>
                                        <th  style="width:60%" class="">Value</th>
                                    </tr>

                                    <tr>
                                        <td>Menu Nested</td>
                                        <td>{{data.type}}</td>
                                    </tr>
                                    <tr v-if="data.type == 'single'">
                                        <td>Router Path</td>
                                        <td>{{data.router}}</td>
                                    </tr>
                                    <tr>
                                        <td>Warna Huruf</td>
                                        <td :style="'color :'+data.text_color"><b>{{data.text_color}}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Font Icon</td>
                                        <td>
                                            <!-- <q-icon :name="data.icon" :style="'font-size: 32px; color:'+data.icon_color" /> -->
                                            <q-avatar size="md" :color="data.color"  :icon="data.icon" :style="'color:'+data.icon_color"  />
                                        </td>
                                    </tr>
                                </table>
                                <hr class="hrpagin">
                                <q-btn-group>
                                    <q-btn  v-if="data.type == 'double'" @click="mdl_add1 = true, selectData(data)" glossy color="blue" icon="add" class="tbl_btn">
                                        <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                            Click untuk Menambah Sub-Menu dari Menu {{data.nama}}
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
                                        <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                            Click untuk mengubah Menu {{data.nama}}
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn" v-if="cekLength(data)">
                                        <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                            Click untuk menghapus Menu {{data.nama}}
                                        </q-tooltip>
                                    </q-btn>
                                </q-btn-group>
                                <hr class="hrpagin">


                                <template v-if="data.type == 'double'">
                                  <q-expansion-item
                                      expand-separator
                                      :icon="data.icon"
                                      :label="data1.nama"
                                      style="background:#e7e7e7"
                                      v-for="data1 in data.submenu"
                                      :key="data1._id"
                                  >
                                      <q-card>
                                          <q-card-section>
                                              <table style="width:100%">
                                                  <tr>
                                                      <th  style="width:40%" class="">Variable</th>
                                                      <th  style="width:60%" class="">Value</th>
                                                  </tr>

                                                  <tr>
                                                      <td>Menu Nested</td>
                                                      <td>{{data1.type}}</td>
                                                  </tr>
                                                  <tr v-if="data1.type == 'single'">
                                                      <td>Router Path</td>
                                                      <td>{{data1.router}}</td>
                                                  </tr>
                                              </table>
                                              <hr class="hrpagin">
                                              <q-btn-group>
                                                  <q-btn  v-if="data1.type == 'double'" @click="mdl_add2 = true, selectData1(data1)" glossy color="blue" icon="add" class="tbl_btn">
                                                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                                          Click untuk Menambah Sub-Sub-Menu dari Menu {{data1.nama}}
                                                      </q-tooltip>
                                                  </q-btn>
                                                  <q-btn @click="mdl_edit1 = true, selectData1(data1)" glossy color="orange" icon="create" class="tbl_btn">
                                                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                                          Click untuk mengubah Sub-Menu {{data1.nama}}
                                                      </q-tooltip>
                                                  </q-btn>
                                                  <q-btn @click="mdl_hapus = true, selectData(data1)" glossy color="negative" icon="delete_forever" class="tbl_btn" v-if="cekLength(data1)">
                                                      <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                                          Click untuk menghapus Sub-Menu {{data1.nama}}
                                                      </q-tooltip>
                                                  </q-btn>
                                              </q-btn-group>
                                              <hr class="hrpagin">



                                              <q-expansion-item
                                                  expand-separator
                                                  :icon="data.icon"
                                                  :label="data2.nama"
                                                  style="background:#e7e7e7"
                                                  v-for="data2 in data1.submenu"
                                                  :key="data2._id"
                                              >
                                                  <q-card>
                                                      <q-card-section>
                                                          <table style="width:100%">
                                                              <tr>
                                                                  <th  style="width:40%" class="">Variable</th>
                                                                  <th  style="width:60%" class="">Value</th>
                                                              </tr>

                                                              <tr>
                                                                  <td>Menu Nested</td>
                                                                  <td>{{data2.type}}</td>
                                                              </tr>
                                                              <tr v-if="data2.type == 'single'">
                                                                  <td>Router Path</td>
                                                                  <td>{{data2.router}}</td>
                                                              </tr>
                                                          </table>
                                                          <hr class="hrpagin">
                                                          <q-btn-group>
                                                              <q-btn @click="mdl_edit2 = true, selectData2(data2)" glossy color="orange" icon="create" class="tbl_btn">
                                                                  <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                                                      Click untuk mengubah Sub-Sub-Menu {{data2.nama}}
                                                                  </q-tooltip>
                                                              </q-btn>
                                                              <q-btn @click="mdl_hapus2 = true, selectData2(data2)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                                                  <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                                                      Click untuk menghapus Sub-Sub-Menu {{data2.nama}}
                                                                  </q-tooltip>
                                                              </q-btn>
                                                          </q-btn-group>
                                                          <hr class="hrpagin">
                                                          
                                                      </q-card-section>
                                                  </q-card>
                                              </q-expansion-item>





                                              
                                          </q-card-section>
                                      </q-card>
                                  </q-expansion-item>

                                </template>




                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                        
                    
                </template>    

            
            </q-list>














          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin">
        <br>
        








      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Simpan Data menu</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                      
                        <br>
                        <span class="h_lable ">Kelompok</span>
                        <select v-model="form.group" class="inputbs">
                          <option value="aplikasi">Admin</option>
                          <option value="website">Website</option>
                        </select>

                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="form.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                            <span class="h_lable ">Index</span>
                            <q-input v-model="form.index" outlined square :dense="true" class="bg-white margin_btn inputbs" type="number"/>

                        <div  v-if="form.type == 'single'">
                            <span class="h_lable ">Router Path</span>
                            <q-input v-model="form.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                        </div>
                            <span class="h_lable ">Nama Menu</span>
                            <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                            <span class="h_lable ">Warna Huruf</span>
                            <q-input v-model="form.text_color" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                            <span class="h_lable ">Font Icon</span> / <a href="https://material.io/resources/icons/" target="_blank" >Referensi</a>
                            <q-input v-model="form.icon" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                            
                            <span class="h_lable ">Warna Icon</span>
                            <q-input v-model="form.icon_color" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                            <span class="h_lable ">Warna</span>
                            <q-input v-model="form.color" outlined square :dense="true" class="bg-white margin_btn inputbs" />

                        

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData(form)" label="Simpan" />
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
                        <span class="h_lable ">Kelompok</span>
                        <select v-model="form.group" class="inputbs">
                          <option value="aplikasi">Admin</option>
                          <option value="website">Website</option>
                        </select>

                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="form.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                            <span class="h_lable ">Index</span>
                            <q-input v-model="form.index" outlined square :dense="true" class="bg-white margin_btn inputbs" type="number"/>

                          <div  v-if="form.type == 'single'">
                              <span class="h_lable ">Router Path</span>
                              <q-input v-model="form.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                          </div>
                          <span class="h_lable ">Nama Menu</span>
                          <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                          <span class="h_lable ">Warna Huruf</span>
                          <q-input v-model="form.text_color" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                          <span class="h_lable ">Font Icon</span>
                          <q-input v-model="form.icon" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                          <span class="h_lable ">Warna Icon</span>
                          <q-input v-model="form.icon_color" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                          <span class="h_lable ">Warna</span>
                          <q-input v-model="form.color" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                      
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      <q-btn :loading="btn_add" color="primary" @click="editData(form)" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

            <!-- ================================================ MODAL HAPUS ================================================ -->
                  <q-dialog v-model="mdl_hapus" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeData(form)">
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

            <!-- ================================================= MODAL TAMBAH1 ================================================ -->
              <q-dialog v-model="mdl_add1" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Simpan Data menu</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="subform.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                        <div  v-if="subform.type == 'single'">
                            <span class="h_lable ">Router Path</span>
                            <q-input v-model="subform.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                        </div>
                        <span class="h_lable ">Nama Menu</span>
                        <q-input v-model="subform.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData(subform)" label="Simpan" />
                        <q-btn label="Batal" color="negative" @click="mdl_add1 = false" />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH1 ================================================ -->


            <!-- ================================================= MODAL EDIT1 ================================================ -->
               <q-dialog v-model="mdl_edit1" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                      <br>
                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="subform.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                        <div  v-if="subform.type == 'single'">
                            <span class="h_lable ">Router Path</span>
                            <q-input v-model="subform.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                        </div>
                        <span class="h_lable ">Nama Menu</span>
                        <q-input v-model="subform.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />

                      
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      <q-btn :loading="btn_add1" color="primary" @click="editData(subform)" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT1 ================================================ -->

            <!-- ================================================ MODAL HAPUS1 ================================================ -->
                  <q-dialog v-model="mdl_hapus1" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeData(subform)">
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

            <!-- ================================================ MODAL HAPUS1 ================================================ -->

            <!-- ================================================= MODAL TAMBAH2 ================================================ -->
              <q-dialog v-model="mdl_add2" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-grey-7">
                    <div class="text-h6 h_modalhead">Simpan Data menu</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="subsubform.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                        <div  v-if="subsubform.type == 'single'">
                            <span class="h_lable ">Router Path</span>
                            <q-input v-model="subsubform.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                        </div>
                        <span class="h_lable ">Nama Menu</span>
                        <q-input v-model="subsubform.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData(subsubform)" label="Simpan" />
                        <q-btn label="Batal" color="negative" @click="mdl_add2 = false" />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH2 ================================================ -->


            <!-- ================================================= MODAL EDIT2 ================================================ -->
               <q-dialog v-model="mdl_edit2" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                      <br>
                        <span class="h_lable ">Menu Nested</span>
                        <select v-model="subsubform.type" class="inputbs">
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>

                        <!-- <q-checkbox v-model="form.path" label="Berfungsi sebagai Router?" /> -->

                        <hr class="hrpagin">

                        <div  v-if="subsubform.type == 'single'">
                            <span class="h_lable ">Router Path</span>
                            <q-input v-model="subsubform.router" outlined square :dense="true" class="bg-white margin_btn inputbs" /> 
                        </div>
                        <span class="h_lable ">Nama Menu</span>
                        <q-input v-model="subsubform.nama" outlined square :dense="true" class="bg-white margin_btn inputbs" />

                      
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      <q-btn :loading="btn_add1" color="primary" @click="editData(subsubform)" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT2 ================================================ -->

            <!-- ================================================ MODAL HAPUS2 ================================================ -->
                  <q-dialog v-model="mdl_hapus2" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeData(subsubform)">
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

            <!-- ================================================ MODAL HAPUS2 ================================================ -->




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../library/umum'


export default {
  data() {
    return {

        form : {
            group : '',
            router : '/',
            nama : '',
            type : 'single',
            icon_color : 'white',
            text_color : '#dfdfdf',
            icon : 'home',
            color : 'light-green-7',
            kategori : 'menu',
            path : false,
            index : ''
        },

        subform : {
            menu : '',
            router : '/',
            nama : '',
            type : 'single',
            kategori : 'submenu',
            path : false
        },

        subsubform : {
            menu : '',
            router : '/',
            nama : '',
            type : 'single',
            kategori : 'subsubmenu',
            path : false
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

        mdl_add1: false,
        mdl_edit1: false,
        mdl_hapus1 : false,
        btn_add1: false,

        mdl_add2: false,
        mdl_edit2: false,
        mdl_hapus2 : false,
        btn_add2: false,
    }
  },
  methods: {


    getView : function(){
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
              this.list_data = res_data;
            //   this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },


    addData : function(data) {
        if (this.form.type == 'single') {
            this.form.path = true;
        } else {
            this.form.path = false;
        }
        this.form.createdAt = UMUM.NOW();
        fetch(this.$store.state.url.URL_MENU_LIST + "addData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });

        // console.log(this.form)


    },


    editData : function(data){
      fetch(this.$store.state.url.URL_MENU_LIST + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(data)
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

    removeData : function(data){
      fetch(this.$store.state.url.URL_MENU_LIST + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(data)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },
    selectData : function(data){
        this.form = data;
        this.subform.menu = data._id;
    },
    selectData1 : function(data){
        this.subform = data;
        this.subsubform.menu = data._id;
    },

    selectData2 : function(data){
        this.subsubform = data;
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

        cekLength : function(data){
           if (data.submenu.length <= 0  ) {
             return true
           } else {
             return false
           }
        }




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    this.getView();
  },
}
</script>




 