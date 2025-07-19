<template>
  <div>
    <div class="containerku">
      <div class="row">
        <div class="col-12 col-md-8">
          <q-btn-group spread>
            <q-btn @click="changeKategory('Prestasi')" color="amber-8" label="PRESTASI" icon="timeline" />
            <q-btn @click="changeKategory('Pembangunan')" color="amber-7" label="PEMBANGUNAN " icon="account_balance" />
          </q-btn-group>

          <br />

          <div class="row">
            <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
              <select v-model="form.tahun" @change="cari_data()" class="inputbs">
                <option value>-- Semua Tahun --</option>
                <option
                  v-for="(data, index) in $store.state.tahun"
                  :key="index"
                  :value="data"
                >{{data}}</option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
              <q-input
                @keyup.enter="cari_data()"
                color="grey-3"
                label-color="orange"
                outlined
                square
                :dense="true"
                v-model="cari_value"
                label="Cari Program.. "
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
          <!-- <hr class="hrtitle"> -->

          <div class="q-pa-md">

            <q-list bordered class="rounded-borders">
              <q-list bordered>
                <template v-for="data in listData">

                  <div :key="data._key" class="row" style="padding-top:5px">
                    <!-- <q-item clickable v-ripple>
                      
                    </q-item> -->
                    <div  class="col-12 col-md-3" style="padding : 10px">
                      <q-img
                         @click="mdl_lihat = true, selectData(data)"
                        class="imgList"
                        :src="$store.state.url.URL_APP+'uploads/'+data.fileThumb"
                        :ratio="16/9"
                        spinner-color="primary"
                        spinner-size="82px"
                      />
                    </div>
                    <div class="col-12 col-md-9" style="padding : 10px 10px 10px 10px">
                      <a href="JavaScript:Void(0)" class="a_polos" @click="mdl_lihat = true, selectData(data)">
                        <span class="f_captions1">{{data.uraian}}</span> <br>
                        <span class="f_captions2">Tahun : {{data.tahun}}</span> <br>
                        <span class="f_captions3">Kategori : {{data.kategori}}</span> 
                      </a>
                    </div>
                    <q-separator />
                  </div>

                </template>
              </q-list>
            </q-list>


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
              <q-dialog v-model="mdl_lihat" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-blue-4">
                    <div class="text-h6 h_modalhead">Detil Capaian Kinerja</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">

                        <q-img
                            :src="$store.state.url.URL_APP+'uploads/'+form.file"
                            spinner-color="primary"
                            spinner-size="82px"
                          />
                        <hr class="hrdetilberita" />
                        <span class="h_detil1">{{form.uraian}}</span> <br>
                        <span class="h_detil2">{{form.kategori}}</span> &nbsp;
                        <span class="h_detil3">({{form.tahun}})</span>
                        
                        <hr class="hrdetilberita" />
                        <div class="fr-view" v-html="form.keterangan"></div>


                         <br>

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
      form: {
        id: "",
        uraian: "",
        tahun: "",
        keterangan: "",
        kategori: "",
        createdAt: "",
        file: null
      },
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
    getView: function() {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_CAPAIAN_KEGIATAN + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value,
          tahun: this.form.tahun,
          kategori: this.form.kategori,
          des_kel: this.$store.state.ID_DES_KEL,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          this.listData = res_data.data;
          this.page_last = res_data.jmlData;
          this.$store.commit("hideLoading");
          console.log(res_data);
        });
    },
    selectData : function(data){
            this.form.id = data.id;
            this.form.uraian = data.uraian;
            this.form.keterangan= data.keterangan;
            this.form.kategori = data.kategori;
            this.form.createdAt = data.createdAt;
            this.form.tahun = data.tahun;
            this.form.file = data.file;
        

    },

    cari_data: function() {
      this.page_first = 1;
      this.getView();
    },
    indexing: function(index) {
      var idx = (this.page_first - 1) * this.page_limit + index;
      return idx;
    },
    changeKategory(data){
      console.log(data)
      this.form.kategori = data
      this.getView()
    },
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


