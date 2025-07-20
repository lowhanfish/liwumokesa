<template>
  <div>
    <div class="containerku">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <!-- <q-input
                @keyup.enter="cari_data()"
                color="grey-3"
                label-color="orange"
                outlined
                square
                :dense="true"
                v-model="cari_value"
                label="Cari Program.. "
              >

                <template v-slot:after>
                  <q-btn @click="cari_data()" dense icon="search" />
                </template>
              </q-input> -->
            </div>
          </div>
          <br />

          <hr class="hrdetilberita" />
          <!-- <hr class="hrtitle"> -->

          <div class="text-center">
            <span class="h_title text-orange">Visi :</span> <br />
            <div v-for="data in listVisi" :key="data._key">
              <span class="h_title text-orange">"{{ data.judul }}"</span> <br />
              <br />
            </div>
          </div>

          <hr class="hrdetilberita" />

          <div class="q-pa-md">
            <span class="f_captions2">Misi : </span>
            <br /><br />
            <q-list bordered class="rounded-borders">
              <div v-for="(data, index) in listData" :key="data._key">
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar label="1" color="primary" text-color="white">{{
                        indexing(index + 1)
                      }}</q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <span class="h_ListJudulBerita">{{ data.judul }}</span>
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section class="bg-grey-3">
                      <span class="h_ListKeteranganBerita" v-html="data.keterangan">
                      </span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />
              </div>
            </q-list>
          </div>

          <br />
          <hr class="hrdetilberita" />
          <br />
          <div class="flex flex-center">
            <q-pagination
              @click="getViewMisi()"
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

      page_limit: 10,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      UMUM: UMUM,
    };
  },
  methods: {
    getViewVisi: function () {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_VISI + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value,
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.listVisi = res_data.data;
          //   this.page_last = res_data.jmlData;
          //   this.$store.commit("hideLoading");
          //   console.log(res_data);
        });
    },

    getViewMisi: function () {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_MISI + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value,
          des_kel: this.$store.state.ID_DES_KEL,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.listData = res_data.data;
          this.page_last = res_data.jmlData;
          this.$store.commit("hideLoading");
          console.log(res_data);
        });
    },

    pushKegiatan: function (id) {
      this.$router.push("/detilKegiatan?id=" + id);
    },

    cari_data: function () {
      this.page_first = 1;
      this.getViewMisi();
    },
    indexing: function (index) {
      var idx = (this.page_first - 1) * this.page_limit + index;
      return idx;
    },
  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id;
    // this.$store.commit('getOne')
    this.getViewVisi();
    this.getViewMisi();
  },
};
</script>

<style></style>
