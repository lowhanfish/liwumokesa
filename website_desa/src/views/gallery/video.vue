<template>
  <div>
    <div class="containerku">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <q-input
                @keyup.enter="cari_data()"
                color="grey-3"
                label-color="orange"
                outlined
                square
                :dense="true"
                v-model="cari_value"
                label="Cari Konten.. "
              >

                <template v-slot:after>
                  <q-btn @click="cari_data()" dense icon="search" />
                </template>
              </q-input>
            </div>
          </div>
          <br />

          <hr class="hrdetilberita" />
          <!-- <hr class="hrtitle"> -->


          <q-dialog v-model="mFoto">
            <q-card style="width: 700px; max-width: 80vw;">
              <div v-if="mFoto">
                <q-img
                  :src="$store.state.url.URL_APP+'uploads/'+fotoObj.file" 
                  spinner-color="primary"
                  spinner-size="82px"
                />
                <div class="bg-black text-center" style="padding: 15px 0px 15px 0px">
                  <span style="color:white;">{{fotoObj.judul}}</span>
                </div>
                <!-- {{fotoObj}} -->
              </div>
            </q-card>
          </q-dialog>
              
         

          <div class="q-pa-md">
            <div class="row">
              <div class="col-6 col-md-6" style="padding:2%" v-for="data in listData" :key="data._key">
                <q-video
                  :ratio="16/9"
                  :src="'https://www.youtube.com/embed/'+data.uraian"
                  />
              </div>

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
        listVisi: [],
        listData: [],
        listKegiatan: [],

        page_limit: 8,
        page_first: 1,
        page_last: 0,
        cari_value: "",

        fotoObj : null,
        fotoIndex : 0,
        mFoto : false,

        UMUM: UMUM
    };
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_GALLERY_VIDEO + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              data_ke: this.page_first,
              page_limit : this.page_limit,
              cari_value: this.cari_value,
              des_kel : this.$store.state.ID_DES_KEL,
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
    getFoto(){
      fetch(this.$store.state.url.URL_CNT_GALLERY_FOTO + "list6", {
          method: "GET",
          headers: {
          "content-type": "application/json",
          }
      })
          .then(res => res.json())
          .then(res_data => {
              this.listFoto = res_data
              console.log(res_data)
             
      });
    },
    selectFoto(index, foto){
      this.fotoIndex = index
    //   console.log(index)
        this.fotoObj = this.listData[this.fotoIndex];
        this.mFoto = true;

    },
    showFoto(){
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


