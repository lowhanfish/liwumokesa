<template>
  <div>
      <q-card class="my-card">
    <q-card-section>
      <hr class="hrdetilberita" />
      <div class="text-h6">5 Aktifitas Terbaru</div>
      <div class="text-subtitle2">Lihat Aktifitas Terbaru</div>
      <hr class="hrdetilberita" />
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="data in listKegiatan"
          :key="data.id"
          @click="pushKegiatan(data.id)"
        >
          <q-item-section>
            <q-item-label>{{data.judul}}</q-item-label>
            <q-item-label caption>{{data.createdAt}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <br />
      <hr class="hrdetilberita" />
      <div class="text-h6">Galerry Foto Terbaru</div>
      <div class="text-subtitle2">Lihat Foto Terbaru</div>
      <hr class="hrdetilberita" />

      <div class="row">
        <div class="col-6 col-md-6" style="padding:2%" v-for="(data, index) in listFoto" :key="data._key">
          <q-img @click="selectFoto(index)"
            :src="$store.state.url.URL_APP+'uploads/'+data.fileThumb" 
            :ratio="16/9"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>

      </div>

      <br />
      <hr class="hrdetilberita" />
      <div class="text-h6">Galerry Video Terbaru</div>
      <div class="text-subtitle2">Lihat Video Terbaru</div>
      <hr class="hrdetilberita" />

      <div class="row">
        <div class="col-6 col-md-6" style="padding:2%" v-for="data in listVideo" :key="data._key">
          <!-- <q-video :src="'https://www.youtube.com/embed/'+datax.uraian"/> -->
        <!-- {{datax.uraian}} -->
        <q-video
          :ratio="16/9"
          :src="'https://www.youtube.com/embed/'+data.uraian"
          />

        </div>
      </div>
    </q-card-section>


    
  </q-card>
  <q-dialog v-model="mFoto">
      <q-card style="width: 700px; max-width: 80vw;">
        <div v-if="mFoto">
          <q-img
            :src="$store.state.url.URL_APP+'uploads/'+fotoObj.file" 
            spinner-color="primary"
            spinner-size="82px"
          />
          <!-- {{fotoObj}} -->
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import UMUM from "../library/umum";

export default {
  data() {
    return {
        listData: [],
        listKegiatan: [],
        listFoto : [],
        listVideo : [],
        fotoObj : null,
        fotoIndex : 0,
        mFoto : false,
        UMUM: UMUM,
    };
  },
  methods: {
    getKegiatan() {
      fetch(this.$store.state.url.URL_CNT_KEGIATAN_TERBARU + "list5", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            des_kel: this.$store.state.ID_DES_KEL,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          this.listKegiatan = res_data;
          // console.log(res_data);
        });
    },
    getFoto(){
      fetch(this.$store.state.url.URL_CNT_GALLERY_FOTO + "list6", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
              des_kel: this.$store.state.ID_DES_KEL,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.listFoto = res_data
              // console.log(res_data)
             
      });
    },

    getVideo(){
      fetch(this.$store.state.url.URL_CNT_GALLERY_VIDEO + "list4", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
              des_kel: this.$store.state.ID_DES_KEL,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.listVideo = res_data
              // console.log(res_data)
             
      });
    },


    selectFoto(index, foto){
      this.fotoIndex = index
    //   console.log(index)
        this.fotoObj = this.listFoto[this.fotoIndex];
        this.mFoto = true;

    },
    showFoto(){
    },
    pushKegiatan: function(id) {
      this.$store.state.kegiatan.id = id;
      this.$store.commit("getOne");
      this.$router.push("/detilKegiatan?id=" + id);
    },
  },
  mounted() {
    this.getKegiatan();
    this.getFoto();
    this.getVideo();
  }
};
</script>

<style>
</style>


