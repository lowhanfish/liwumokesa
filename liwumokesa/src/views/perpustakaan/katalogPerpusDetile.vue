<template>
  <div>
    <div class="containerku">
      <div class="row">
        <div class="col-12 col-md-8">

          <br />
          <a 
          href="javascript:void(0)" 
          @click="$router.push('/katalogPerpus')"
          class="perpusBack">
            <q-icon name="arrow_back_ios" /> 
            Kembali ke list Katalog
          </a>

          <hr class="hrdetilberita" />
          <!-- <hr class="hrtitle"> -->


          <q-dialog v-model="mFoto">
            <q-card style="width: 700px; max-width: 80vw;">
              <div class="mdlExit">
                <a href="javascript:void(0)" @click="mFoto = false">X</a>
              </div>
              <div v-if="loadData"></div>
              <div v-if="!loadData">
                <q-img
                  :src="$store.state.url.URL_APP+'uploads/'+fotoObj.file" 
                  spinner-color="primary"
                  spinner-size="82px"
                />

                <!-- <q-img
                  :src="fotoObj" 
                  spinner-color="primary"
                  spinner-size="82px"
                /> -->
                <!-- {{fotoObj}} -->
              </div>
            </q-card>
          </q-dialog>
              
         

          <div class="q-pa-md">
            <div class="row">
              <div class="col-12 col-md-6" style="padding:2%">
                <!-- <q-img @click="selectFoto(index)"
                  :src="$store.state.url.URL_APP+'uploads/'+data.fileThumb" 
                  :ratio="16/9"
                  spinner-color="primary"
                  spinner-size="82px"
                /> -->
                <div v-if="loadData"></div>

                <div v-if="!loadData">
                  <q-img @click="selectFoto()"
                    :src="$store.state.url.URL_APP+'uploads/'+fotoObj.fileThumb" 
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </div>
              </div>
              <div class="col-12 col-md-6" style="padding:2%">
                <div v-if="!loadData">
                  <!-- <span class="perpusSubSubTitle"><i>Judul :</i></span> <br> -->
                  <span class="perpusSubTitle">JUDUL BUKU : </span> <br>
                  <span class="perpusTitle">{{fotoObj.judul}}</span> <br>
                  <hr class="hrdetilberita" /> <br>
                  <span class="perpusSubTitle">INFORMASI BUKU</span> <br>
                  <span class="perpusSubSubTitle">Jumlah : <i>Belum dihitung</i></span> <br>
                  <span class="perpusSubSubTitle">Penulis : {{fotoObj.penulis}}</span> <br>
                  <span class="perpusSubSubTitle">Penerbit : {{fotoObj.penerbit}}</span> <br>
                  <span class="perpusSubSubTitle">Tahun : {{fotoObj.thn}}</span> <br>

                  <br>
                  <span class="perpusSubTitle">LOKASI BUKU</span> <br>
                  <span class="perpusSubSubTitle">Rak : {{fotoObj.bilik}}, Blok : {{fotoObj.blok}}</span> <br>

                  <br>
                  <span class="perpusSubTitle">DESKRIPSI BUKU</span> <br>
                  <span class="perpusSubSubTitle" v-html="fotoObj.uraian"></span> <br>

                </div>
              </div>

            </div>


          </div>

          <br />
          <hr class="hrdetilberita" />
          <br />
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
        params : '',
        loadData : true,

        UMUM: UMUM
    };
  },
  methods: {


    getView : function(){
      this.loadData = true;
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_DESA_PERPUSTAKAAN + "ViewOne", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id: this.params,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.fotoObj = res_data
              this.$store.commit("hideLoading");
              console.log(res_data);
              this.loadData = false;
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
      fetch(this.$store.state.url.URL_CNT_DESA_PERPUSTAKAAN + "list6", {
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
    selectFoto(foto){
      this.mFoto =true;
    },
    showFoto(){
    },
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.params = urlParams.get('katalogId')
    this.getView();
  }
};
</script>

<style>
</style>


