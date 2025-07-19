<template>
  <div>
    <div class="containerku">
      <div class="row">
        <div class="col-12 col-md-8">
          <q-card class="my-card">
            <div class="row">
              <div style="padding:2%" class="col-12 col-md-12">
                <div class="text-h6">{{$store.state.kegiatan.judul}}</div>
                <div class="text-subtitle2">({{$store.state.kegiatan.createdAt}})</div>
                <hr class="hrdetilberita" />
              </div>
            </div>

            <q-card-section>
              <q-img
                  :src="$store.state.url.URL_APP+'uploads/'+$store.state.kegiatan.file"
                  :ratio="16/9"
                  spinner-color="primary"
                  spinner-size="82px"
              />
              <hr class="hrdetilberita" /><br>
              <span class="fr-view" v-html="$store.state.kegiatan.uraian"></span>

              <hr class="hrdetilberita">
              <span style="color : grey; font-weight:bold; font-size:10pt">Share : </span>

              <a :href="'http://www.facebook.com/sharer/sharer.php?u='+$store.state.url.URL_CLIENT+'detilKegiatan?id='+$store.state.kegiatan.id" target="_blank">
                <q-img
                  style="width:30px;"
                  src="img/fb.webp"
                  spinner-color="primary"
                  spinner-size="30px"
                />
              </a>
              &nbsp; &nbsp;
              <a :href="'https://wa.me/?text='+$store.state.url.URL_CLIENT+'detilKegiatan?id?id='+$store.state.kegiatan.id" target=”_blank”>
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



  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id;
    this.$store.commit('getOne')
    this.getKegiatan();
  },
};
</script>

<style>
</style>


