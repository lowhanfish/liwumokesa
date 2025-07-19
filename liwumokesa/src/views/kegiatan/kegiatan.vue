<template>
  <div>
    <div class="containerku">
      <!-- <h1>{{$store.state.COBA_HAPUS}}</h1> -->
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6">
              <q-input
                color="grey-3"
                label-color="orange"
                outlined
                square
                :dense="true"
                v-model="cari_value"
                @keyup.enter="cari_data()"
                label="Cari Kegiatan.. "
              >
                <!-- <template v-slot:append>
                  <q-icon name="search" color="orange" />
                </template> -->
                <template v-slot:after>
                  <q-btn @click="cari_data()" dense icon="search" />
                </template>
              </q-input>
            </div>
          </div>
          <br />

          <hr class="hrdetilberita" />
          <!-- <hr class="hrtitle"> -->

          <q-list bordered>
            <template v-for="data in listKegiatan">
              <div :key="data._key">
                <q-item clickable v-ripple @click="pushKegiatan(data.id)">
                  <q-item-section thumbnail style="padding-left:1%">
                    <img :src="$store.state.url.URL_APP+'uploads/'+data.fileThumb" />
                  </q-item-section>
                  <q-item-section>
                    <span class="f_captions1">{{data.judul}}</span>
                    <span class="f_captions3">
                      <q-icon
                          size="xs"
                          name="date_range"
                        />

                      {{data.createdAt}}
                      
                      </span>
                  </q-item-section>
                </q-item>
                <q-separator />
              </div>
            </template>
          </q-list>

          <br>
          <hr class="hrdetilberita" />
          <br>
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
            >
            </q-pagination>
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
      listData: [],
      listKegiatan: [],

      page_limit: 8,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      UMUM: UMUM
    };
  },
  methods: {
    getView: function() {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_KEGIATAN_TERBARU + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value
        })
      })
        .then(res => res.json())
        .then(res_data => {
          this.listKegiatan = res_data.data;
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


