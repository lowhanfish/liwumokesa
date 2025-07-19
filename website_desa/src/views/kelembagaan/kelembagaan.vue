<template>
    <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-8">
                <!-- <q-btn-group spread>
                    <q-btn @click="changeKategory('Prestasi')" color="amber-8" label="PRESTASI" icon="timeline" />
                    <q-btn @click="changeKategory('Pembangunan')" color="amber-7" label="PEMBANGUNAN " icon="account_balance" />
                </q-btn-group> -->

                <br />

                <div class="row">
                    <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
                      <span class="h_title_dok">Kelembagaan</span>

                    </div>

                    <div class="col-12 col-md-6" style="padding : 0% 0% 2% 1%">
                        <q-input
                          @keyup.enter="cari_data()"
                          color="grey-3"
                          label-color="orange"
                          outlined
                          square
                          :dense="true"
                          v-model="cari_value"
                          label="Cari Dokumen.. "
                        >
                          <!-- <template v-slot:append>
                            <q-icon name="search" color="orange" />
                          </template>-->
                          <template v-slot:after>
                            <q-btn @click="cari_data()" dense icon="search" />
                          </template>
                        </q-input>
                    </div>
                </div>
                <hr class="hrdetilberita" /> 

                <div class="q-pa-md">

                  <div class="tbl_responsive">
                    <table bordered style="width:100%">
                        <thead>
                            <tr class="bg-yellow-9 text-white" >
                                <th class="text-center" style="width:5%">No.</th>
                                <th class="text-center" style="width:40%">Uraian</th>
                                <th class="text-center" style="width:40%">Keterangan</th>
                                <th class="text-center" style="width:15%">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in listData" :key="index"> 
                                <td class="text-center h_top">{{indexing(index+1)}}.</td>
                                <td class="text-left h_top">{{data.uraian}}  </td>
                                <td class="text-left">{{data.keterangan}}</td>
                                <td class="text-center h_top">
                                  <q-btn class="bg-amber-9" style="color:white" @click="mdl_lihat = true, selectData(data)" title="Lihat Dokumen">
                                    <q-icon color="white" size="md" name="account_circle"/>


                                  </q-btn>
                                </td> 
                            </tr> 
                        </tbody>
                    </table>
                  </div>



                </div>

                <br />
                <hr class="hrdetilberita" />
                <br />
                <div class="flex flex-center">
                    <q-pagination
                    @click="getView()"
                    v-model="page_first"
                    :max="page_last"
                    :max-pages="4"
                    color="grey-14"
                    :direction-links="true"
                    :boundary-links="true"
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    ></q-pagination>
                </div>




                <!-- ================================================= MODAL LIHAT ================================================ -->
                <!-- style="width: 700px; max-width: 80vw;" -->
                    <q-dialog v-model="mdl_lihat" persistent>
                      <q-card class="mdl-lg">
                        <q-card-section class="bg-blue-4">
                          <div class="text-h6 h_modalhead">Detil Capaian Kinerja</div>
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
                <div class="col-12 col-md-4 paddingSideMenu">
                <SideContent />
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import UMUM from "../../library/umum";

export default {
  data() {
    return {
      form : {
          id : '',
          judul : '',
          uraian : '',
          des_kel : this.$store.state.ID_DES_KEL,
          createdAt : '',
          createdBy : '',
          file : null,
      },

      fileOld : '',

      listData: [],
      listKegiatan: [],

      page_limit: 10,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      mdl_lihat : false,

      UMUM: UMUM
    };
  },
  methods: {
    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_DESA_KELEMBAGAAN + "view", {
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
              this.listData = res_data;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },
    selectData : function(data){
            this.form.id = data.id;
            this.form.judul= data.judul;
            this.form.uraian = data.uraian;
            this.form.createdAt = data.createdAt;
            this.form.createdBy = data.createdBy;
            // this.form.file = data.file;

            this.fileOld = data.file;

            console.log(data.file)
        




    },

    pushKegiatan: function(id) {
      this.$router.push("/detilKegiatan?id=" + id);
    },

    cari_data: function() {
      this.page_first = 1;
      this.getView();
    },
    indexing : function(index){
        var idx = ((this.page_first-1)*this.page_limit)+index
        return idx
    },
    keWebsite(website){
      window.open(website, '_blank').focus();
    }
  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id;
    // this.$store.commit('getOne')
    this.getView();
  }
};
</script>

<style>
</style>


