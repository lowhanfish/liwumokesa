<template>
  <div class="topUP">
    <!-- <q-img src="img/header.png" class="" spinner-color="primary" spinner-size="82px" >
      <div class="row justify-center items-center" style="height:100%; width:100%">
        <div class="text-center">
          <span class="f_carousel1">Website Resmi</span> <br>
          <span class="f_carousel2">{{$store.state.KAT}} {{$store.state.DES_KEL}}</span>
        </div>
      </div>
    </q-img> -->

    <agile
      v-if="carousellx == true"
      :nav-buttons="false"
      :autoplay-speed="5000"
      :speed="2500"
      fade="fade"
      pause-on-hover="pause-on-hover"
      pause-on-dots-hover="pause-on-dots-hover"
      autoplay="autoplay"
    >
      <q-img
        src="img/header.png"
        class="slide"
        spinner-color="primary"
        spinner-size="82px"
      >
        <div class="row justify-center items-center" style="height: 100%; width: 100%">
          <div class="text-center">
            <span class="f_carousel1">Website Resmi</span> <br />
            <span class="f_carousel2"
              >{{ $store.state.KAT }} {{ $store.state.DES_KEL }}</span
            >
          </div>
        </div>
      </q-img>

      <q-img
        v-for="(data, index) in listCarousell"
        :key="data.id + 'eeexx' + index"
        :src="$store.state.url.URL_APP + 'uploads/' + data.file"
        class="slide"
        spinner-color="primary"
        spinner-size="82px"
      >
        <div class="row justify-center items-center" style="height: 100%; width: 100%">
          <!-- <div class="text-center">
              <span class="f_carousel1">Website Resmi</span> <br>
              <span class="f_carousel2">{{$store.state.KAT}} {{$store.state.DES_KEL}}</span>
            </div> -->
        </div>
      </q-img>
    </agile>

    <q-dialog v-model="infografisx">
      <q-card class="mdl-lg-h bg-yellow">
        <div
          @click="disableInfografis()"
          class="text-center bg-black"
          style="
            height: 30px;
            width: 30px;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 9999999;
            border-radius: 20px;
          "
        >
          <a style="font-weight: bold; color: yellow; font-size: 20px">X</a>
        </div>

        <q-carousel
          :autoplay="true"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          infinite
          animated
          v-model="slide_infografis"
          control-color="primary"
          style="height: 100%; width: auto"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          class="bg-white shadow-1 rounded-borders"
        >
          <q-carousel-slide
            v-for="(data, index) in listInfografis"
            :key="data.id + 'ttt' + index"
            :name="index + 1"
            class="column no-wrap flex-center"
          >
            <img
              style="height: 100%; width: auto"
              :src="$store.state.url.URL_APP + 'uploads/' + data.file"
              alt=""
            />
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </q-dialog>

    <!-- =============================== PROFIL =============================== -->
    <div class="content HitamPutihGrad">
      <div class="text-center q-mt-xl q-mb-xl">
        <hr class="hrtitle1" />

        <q-banner inline-actions rounded class="bg-yellow-10 text-black">
          <span class="h_title text-white">MENU</span>
        </q-banner>

        <br />

        <div class="row">
          <!-- <h1>{{$store.state.COBA_HAPUS}}</h1> -->

          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <a href="http://liwumokesa.munabaratkab.go.id/#/">
                <q-icon
                  class="imgHover"
                  name="img:img/logo_app.png"
                  style="font-size: 180px"
                /><br />
              </a>
              <div class="q-mt-sm">
                <label> <b>LIWU-MOKESA</b></label>
              </div>
            </div>
          </div>
          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <q-icon
                class="imgHover"
                @click="routerku('/kelembagaan')"
                name="img:img/lebaga.png"
                style="font-size: 180px"
              /><br />
              <div class="q-mt-sm">
                <label> <b>KELEMBAGAAN</b></label>
              </div>
            </div>
          </div>
          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <q-icon
                class="imgHover"
                name="img:img/data-pegawai.png"
                style="font-size: 180px"
              /><br />
              <div class="q-mt-sm">
                <label> <b>DATA PEGAWAI</b></label>
              </div>
            </div>
          </div>
          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <q-icon
                class="imgHover"
                @click="routerku('/luasWilayah_desa')"
                name="img:img/demografi.png"
                style="font-size: 180px"
              /><br />
              <div class="q-mt-sm">
                <label> <b>DATA DEMOGRAFI</b></label>
              </div>
            </div>
          </div>
          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <q-icon
                class="imgHover"
                @click="routerku('/data_keluarga_desa')"
                name="img:img/masyarakat.png"
                style="font-size: 180px"
              /><br />
              <div class="q-mt-sm">
                <label> <b>DATA PENDUDUK</b></label>
              </div>
            </div>
          </div>
          <div class="text-center col-6 col-md-2 q-mt-xl">
            <div>
              <a href="https://www.perpusnas.go.id/">
                <q-icon
                  class="imgHover"
                  name="img:img/perpusnas.png"
                  style="font-size: 180px"
                /><br />
              </a>
              <div class="q-mt-sm">
                <label> <b>PERPUSTAKAAN DIGITAL</b></label>
              </div>
            </div>
          </div>
        </div>

        <br />
      </div>
    </div>
    <!-- =============================== PROFIL =============================== -->

    <div class="contentBerita HitamWhiteGrad">
      <div class="row">
        <div class="col-6 col-md-6 dataPaddingSrct">
          <q-img
            @click="routeTo('/visi')"
            src="img/VISI MISI.png"
            spinner-color="primary"
            spinner-size="82px"
            class="imgHover"
          />
        </div>

        <div class="col-6 col-md-6 dataPaddingSrct">
          <q-img
            @click="routeTo('/capaian')"
            src="img/CAPAIAN KINERJA.png"
            spinner-color="primary"
            spinner-size="82px"
            class="imgHover"
          />
        </div>
      </div>
    </div>

    <!-- =============================== KEGIATAN =============================== -->
    <div class="contentBerita PutihHitamGrad">
      <div class="text-center">
        <!-- <span class="h_title">Profil Cabup & Cawabup</span> -->
        <hr class="hrtitle1" />

        <q-banner inline-actions rounded class="bg-yellow-10 text-white">
          <span class="h_title">Kegiatan Terbaru</span>
        </q-banner>

        <br />

        <div class="row">
          <div
            class="dataPadding col-12 col-md-4"
            v-for="(data, index) in listKegiatan"
            :key="data._key + 'aaxx' + index"
          >
            <q-card class="my-card" flat bordered>
              <q-img
                :src="$store.state.url.URL_APP + 'uploads/' + data.fileThumb"
                style="height: 200px"
              />

              <q-card-section class="bg-grey-4">
                <div class="text-grey-9 f_captions">
                  <span>
                    <b>{{ data.judul }}.</b>
                  </span>
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn flat color="dark" label="Share" />
                <q-btn
                  @click="pushKegiatan(data.id)"
                  flat
                  color="primary"
                  label="Lihat Selengkapnya"
                />
                <q-space />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <!-- =============================== KEGIATAN =============================== -->

    <!-- =============================== FOTO =============================== -->
    <div class="contentBerita bg-black">
      <div class="text-center">
        <!-- <span class="h_title">Profil Cabup & Cawabup</span> -->
        <hr class="hrtitle1" />

        <q-banner inline-actions rounded class="bg-yellow-10 text-white">
          <span class="h_title">Foto Terbaru</span>
        </q-banner>

        <br />

        <div class="q-pa-md bg-black">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="300px"
            class="bg-grey-1 shadow-2 rounded-borders"
          >
            <q-carousel-slide
              v-for="(data, index) in listFoto"
              :key="data._key + 'bbxx' + index"
              :name="index + 1"
              class="column no-wrap bg-black"
            >
              <div
                class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
              >
                <q-img
                  @click="(mFoto = true), selectFoto(index, 'satu')"
                  class="rounded-borders col-6 full-height"
                  :src="$store.state.url.URL_APP + 'uploads/' + data.foto1.file"
                />
                <q-img
                  @click="(mFoto = true), selectFoto(index, 'dua')"
                  v-if="data.foto2 != null"
                  class="rounded-borders col-6 full-height"
                  :src="$store.state.url.URL_APP + 'uploads/' + data.foto2.file"
                />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>

        <br />
      </div>
    </div>
    <!-- =============================== FOTO =============================== -->

    <!-- =============================== VIDEO =============================== -->
    <div class="contentBerita bg-white">
      <div class="text-center">
        <!-- <span class="h_title">Profil Cabup & Cawabup</span> -->
        <hr class="hrtitle1" />

        <q-banner inline-actions rounded class="bg-yellow-10 text-white">
          <span class="h_title">Video Terbaru</span>
        </q-banner>

        <br />

        <div class="row">
          <div
            class="dataPadding col-6 col-md-3"
            v-for="(data, index) in listVideo"
            :key="data._key + 'cczzz' + index"
          >
            <q-video :src="'https://www.youtube.com/embed/' + data.uraian" />
          </div>
        </div>

        <br /><br /><br /><br />
      </div>
    </div>
    <!-- =============================== VIDEO =============================== -->

    <!-- =============================== MODAL =================================== -->
    <q-dialog v-model="mFoto">
      <q-card style="width: 700px; max-width: 80vw">
        <div v-if="mFoto">
          <q-img
            :src="$store.state.url.URL_APP + 'uploads/' + fotoObj.file"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mVideo">
      <q-card style="width: 700px; max-width: 80vw">
        <div v-if="mFoto">
          <q-img
            :src="$store.state.url.URL_APP + 'uploads/' + fotoObj.file"
            spinner-color="primary"
            spinner-size="82px"
          />
          <div class="bg-black" style="padding: 5%">
            <span style="color: white">{{ fotoObj.judul }}</span>
          </div>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Kembali" v-close-popup />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
    <!-- =============================== MODAL =================================== -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import { VueAgile } from "vue-agile";

export default {
  name: "Home",
  components: {
    HelloWorld,
    agile: VueAgile,
  },
  data() {
    return {
      ukuran: "col-sm",

      slide_infografis: 1,
      slide: 1,
      slideCarausel: 1,

      listKegiatan: [],
      listFoto: [],
      listVideo: [],
      listInfografis: [],
      fotoIndex: 0,
      fotoObj: null,

      listCarousell: [],
      carousellx: false,

      infografisx: false,
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",

      mVideo: false,
      mFoto: false,
    };
  },

  methods: {
    getKegiatan() {
      fetch(this.$store.state.url.URL_CNT_KEGIATAN_TERBARU + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.listKegiatan = res_data;
          // console.log(res_data);
        });
    },

    getFoto() {
      fetch(this.$store.state.url.URL_CNT_GALLERY_FOTO + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          // this.listFoto = res_data

          var data = res_data;
          var arr1 = [];
          var arr2 = [];

          for (let i = 0; i < data.length; i++) {
            var count = data.length / 2;
            if (i < count) {
              arr1.push(data[i]);
            } else {
              arr2.push(data[i]);
            }
          }

          var datax = [];
          for (let i = 0; i < arr1.length; i++) {
            if (arr2[i] == undefined) {
              arr2[i] = null;
            }
            datax.push({
              foto1: arr1[i],
              foto2: arr2[i],
            });
          }

          // console.log('AAAAAAAA');
          // console.log(res_data)
          // console.log('AAAAAAAA');
          this.listFoto = datax;
        });
    },

    getCarousell() {
      fetch(this.$store.state.url.URL_CNT_CAROUSELL + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          console.log(res_data);
          this.listCarousell = res_data;
          this.carousellx = true;
        });
    },

    getInfografis() {
      fetch(this.$store.state.url.URL_CNT_GALLERY_INFOGRAFIS + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          // console.log('BBBBBBBBBBBBBBBBBB');
          console.log(res_data);
          // console.log('BBBBBBBBBBBBBBBBBB');

          this.listInfografis = res_data;

          if (res_data.length <= 0) {
            this.infografisx = false;
          } else {
            this.infografisx = true;
          }
        });
    },

    getVideo() {
      fetch(this.$store.state.url.URL_CNT_GALLERY_VIDEO + "list4", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.listVideo = res_data;
          // console.log(res_data);
        });
    },

    pushKegiatan: function (id) {
      this.$router.push("/detilKegiatan?id=" + id);
    },

    routeTo: function (route) {
      this.$router.push(route);
    },

    selectFoto(index, foto) {
      this.fotoIndex = index;
      console.log(index);
      if (foto == "satu") {
        // console.log(this.listFoto[this.fotoIndex].foto1)
        this.fotoObj = this.listFoto[this.fotoIndex].foto1;
      } else {
        this.fotoObj = this.listFoto[this.fotoIndex].foto2;
      }
    },

    routerku(route) {
      this.$router.push(route);
    },

    disableInfografis: function () {
      this.infografisx = false;
    },
  },

  mounted() {
    this.getInfografis();
    this.getCarousell();
    this.getKegiatan();
    this.getFoto();
    this.getVideo();
  },
};
</script>

<style>
.agile__dots {
  bottom: 10px;
  flex-direction: column;
  right: 30px;
  position: absolute;
}
.agile__dot {
  margin: 5px 0;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #b4b4b4;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #000000;
}

.slide {
  display: block;
  /* height: 500px; */
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
}
</style>
