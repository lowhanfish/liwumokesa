<template>
  <div>
    <div class="containerku">
          <a 
          href="javascript:void(0)" 
          @click="$router.push('/kegiatanPerpus')"
          class="perpusBack">
            <q-icon name="arrow_back_ios" /> 
            Kembali ke list Kegiatan
          </a>

          
      <div class="row">
        <div v-if="loadData"  class="col-12 col-md-8">

        </div>
        
        <div v-if="!loadData" class="col-12 col-md-8">
          <hr class="hrdetilberita" />
          <q-card class="my-card">
            <div class="row">
              <div style="padding:2%" class="col-12 col-md-12">
                <div class="text-h6">{{kegiatan.judul}}</div>
                <div class="text-subtitle2">({{kegiatan.createdAt}})</div>
                <hr class="hrdetilberita" />
              </div>
            </div>

            <q-card-section>
              <q-img
                  :src="$store.state.url.URL_APP+'uploads/'+kegiatan.file"
                  :ratio="16/9"
                  spinner-color="primary"
                  spinner-size="82px"
              />
              <hr class="hrdetilberita" /><br>
              <span class="fr-view" v-html="kegiatan.uraian"></span>

              <hr class="hrdetilberita">
              <span style="color : grey; font-weight:bold; font-size:10pt">Share : </span>

              <a :href="'http://www.facebook.com/sharer/sharer.php?u='+$store.state.url.URL_CLIENT+'detilKegiatan?KegiatanperpusId='+kegiatan.id" target="_blank">
                <q-img
                  style="width:30px;"
                  src="img/fb.webp"
                  spinner-color="primary"
                  spinner-size="30px"
                />
              </a>
              &nbsp; &nbsp;
              <a :href="'https://wa.me/?text='+$store.state.url.URL_CLIENT+'detilKegiatan?KegiatanperpusId='+kegiatan.id" target=”_blank”>
                <q-img
                  style="width:30px;"
                  src="img/whatsup.png"
                  spinner-color="primary"
                  spinner-size="30px"
                />
              </a>


            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4 paddingSideMenu">
          <SideContent/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import UMUM from  '../../library/umum'


export default {
  data() {
    return {
      listData: [],
      listKegiatan : [],

      kegiatan : null,
      loadData : true,


      UMUM : UMUM
    };
  },
  methods: {
    getKegiatan(){
      fetch(this.$store.state.url.URL_CNT_KEGIATAN_TERBARU + "list5", {
          method: "GET",
          headers: {
          "content-type": "application/json",
          }
      })
          .then(res => res.json())
          .then(res_data => {
              this.listKegiatan = res_data
              // console.log(res_data);
      });
    },

    getKegiatanOne(){
      this.loadData = true;
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_DESA_PERPUSTAKAAN_KEG + "getOne", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id : this.$route.query.KegiatanperpusId
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.kegiatan = res_data
              console.log(res_data);
              this.loadData = false;
              this.$store.commit("hideLoading");
      });
    },




  },
  mounted() {
    this.getKegiatan();
    this.getKegiatanOne();
  },
};
</script>

<style>
</style>


