<template>
  <div class>
    <q-header elevated class="gradHijaukk">
      <q-toolbar class="bg-grey-9">
        <q-btn
          v-if="checker"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title style="padding: 10px">
          <div class="text-left row">
            <div class="text-center" style="padding-top: 0.1%">
              <q-img
                src="img/logo_app.png"
                spinner-color="primary"
                spinner-size="90px"
                style="width: 45px; margin-top: 5px"
              />
            </div>
            <div>
              <span style="padding: 10px; font-size: 22px; text-transform: uppercase"
                ><b>{{ $store.state.KAT }} {{ $store.state.DES_KEL }}</b>
              </span>
              <br />
              <div style="margin-top: -15px">
                <span style="padding-left: 5%; font-size: 14px"
                  >KEC. {{ $store.state.KECAMATAN }}</span
                >
              </div>
            </div>
          </div>
        </q-toolbar-title>
        <!-- <q-toolbar-title style="padding:10px"><b>SIDAKCAMAT</b></q-toolbar-title>  -->

        <div v-if="!checker">
          <ul class="ulNav">
            <template v-for="(data, index) in $store.state.menu">
              <li class="liNav" v-if="data.type == 'single'" :key="'menu' + index">
                <router-link :to="data.router">{{ data.nama }}</router-link>
              </li>

              <li class="liNav" v-if="data.type == 'multi'" :key="'menu' + index">
                <a href="javascript:void(0)">
                  <b>{{ data.nama }} <q-icon name="expand_more" /></b>
                  <q-menu transition-show="jump-down" transition-hide="jump-up">
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        v-for="(data1, index1) in data.submenu"
                        :key="index + 'submenu' + index1"
                        :to="data1.router"
                      >
                        <q-item-section>
                          {{ data1.nama }}
                          <!-- <h1>hsdfkhkshdj</h1> -->
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </a>
              </li>
            </template>
          </ul>

          <!-- <br />
          Width: {{ window.width }} px
          <br />
          Height: {{ window.height }} px-->
        </div>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-if="checker" v-model="leftDrawerOpen" content-class="bg-grey-3">
      <!-- <q-img
        src="https://placeimg.com/500/300/nature"
        :ratio="16/9"
        spinner-color="primary"
        spinner-size="82px"
      /> -->
      <div class="text-right shadow-2 bg-yellow-10" style="padding: 5px 20px 5px 0px">
        <div @click="leftDrawerOpen = false">
          <b style="color: black">
            <q-icon
              name="keyboard_arrow_left"
              class="text-white"
              style="font-size: 35px"
            />
            &nbsp;
            <span class="text-white" style="font-size: 10pt">TUTUP</span>
          </b>
        </div>
      </div>
      <q-list class="rounded-borders">
        <template v-for="(data, index) in $store.state.menu">
          <q-item
            clickable
            :to="data.router"
            exact
            v-if="data.type == 'single'"
            :key="'menu' + index"
          >
            <q-item-section top avatar>
              <q-avatar
                :color="data.color"
                :text-color="data.icon_color"
                :icon="data.icon"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="h_menu_drawer" :style="'color :' + data.text_color">{{
                data.nama
              }}</q-item-label>
              <!-- <q-item-label caption lines="2">Dashboard</q-item-label> -->
            </q-item-section>
          </q-item>

          <q-expansion-item
            :content-inset-level="1"
            v-if="data.type == 'multi'"
            :key="'menu' + index"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  :icon="data.icon"
                  :color="data.color"
                  :text-color="data.icon_color"
                />
              </q-item-section>
              <q-item-section class="h_menu_drawer" :style="'color :' + data.text_color">
                {{ data.nama }}
              </q-item-section>
            </template>

            <q-list :content-inset-level="0.5">
              <q-item
                v-for="(data1, index1) in data.submenu"
                :key="index + 'submenu' + index1"
                clickable
                :to="data1.router"
                :content-inset-level="0.5"
              >
                <q-item-section
                  class="h_menu_drawer1"
                  :style="'color :' + data.text_color"
                  >- {{ data1.nama }}</q-item-section
                >
              </q-item>
            </q-list>
          </q-expansion-item>
        </template>
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
export default {
  name: "LayoutDefault",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      window: {
        width: 0,
        height: 0,
      },
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
  computed: {
    checker() {
      // this.window.width = window.innerWidth;
      // this.window.height = window.innerHeight;

      if (parseInt(this.window.width) < 1097) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.ulNav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.liNav {
  float: left;
}

.liNav a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.liNav a:hover {
  background-color: rgba(255, 255, 255, 0.259);
}
</style>
