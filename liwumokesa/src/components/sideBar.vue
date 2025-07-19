<template>
  <q-list>
    <!-- <q-img src="https://wallpaperaccess.com/full/1311077.jpg" style="width: 100%"> -->
    <q-img src="img/banner4.png" style="width: 100%">
      <!-- <q-img src="img/card.jpg" style="width: 100%"> -->
      <!-- <q-img src="img/kopx.png" style="width: 100%"> -->
      <div class="absolute-bottom">
        <span style="font-size: 10pt; font-weight: bold">Ver 0.1.6</span>
        <div class="row">
          <!-- <div class="col col-md-2">
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
          </div>-->
          <!-- <div class="col col-md-10" style="padding-left:5%">
                  <span class="h_card_sidebar1">Kiken Sukma Batara</span> <br>
                  <span class="h_card_sidebar2">Administrator</span>
          </div>-->
        </div>
      </div>
    </q-img>

    <!-- ========================================== ADMIN WEBSITE ============================================= -->
    <!-- <q-item-label class="bg-light-green-8" header>
      <span style="color:white">Admin Website</span>
    </q-item-label> -->

    <template v-for="(data1, index1) in $store.state.listMenu">
      <template v-if="data1.group == 'website'">
        <q-item
          v-if="data1.type == 'single'"
          :key="index1"
          clickable
          :to="data1.router"
          exact
        >
          <q-item-section top avatar>
            <q-avatar
              size="32px"
              :color="data1.color"
              :text-color="data1.text_color"
              :style="'color :' + data1.text_color"
              :icon="data1.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="h_sidebar">{{ data1.nama }}</q-item-label>
            <!-- <q-item-label caption lines="2">Dashboard</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-expansion-item
          v-if="data1.type != 'single' && checkLength2(data1.submenu)"
          :content-inset-level="1"
          :key="index1"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                size="32px"
                :icon="data1.icon"
                :color="data1.color"
                :text-color="data1.text_color"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="h_sidebar">{{ data1.nama }}</q-item-label>
              <!-- <q-item-label caption lines="2">Analisa Data</q-item-label> -->
            </q-item-section>
          </template>

          <q-list :content-inset-level="0.5">
            <template v-for="(data2, index2) in data1.submenu">
              <q-item
                v-if="data2.type == 'single'"
                clickable
                :to="data2.router"
                :content-inset-level="0.5"
                :key="index2"
              >
                <q-item-section class="h_sidebar1">{{ data2.nama }}</q-item-section>
              </q-item>

              <q-expansion-item
                v-if="data2.type != 'single' && checkLength(data2.submenu) == true"
                :content-inset-level="0.5"
                :key="index2"
              >
                <template v-slot:header>
                  <q-item-section>
                    <q-item-label class="h_sidebar1">{{ data2.nama }}</q-item-label>
                  </q-item-section>
                </template>

                <q-list :content-inset-level="0.5">
                  <template v-for="(data3, index3) in data2.submenu">
                    <q-item
                      v-if="data3.type == 'single'"
                      clickable
                      :to="data3.router"
                      :content-inset-level="0.5"
                      :key="index3"
                    >
                      <q-item-section class="h_sidebar1">{{ data3.nama }}</q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-expansion-item>
            </template>
          </q-list>
        </q-expansion-item>
      </template>
    </template>

    <!-- ========================================== ADMIN WEBSITE ============================================= -->

    <q-item-label class="bg-yellow-9" header>
      <span style="color: white">Master Data</span>
    </q-item-label>

    <template v-for="(data1, index1) in $store.state.listMenu">
      <template v-if="data1.group == 'aplikasi'">
        <q-item
          v-if="data1.type == 'single'"
          :key="index1"
          clickable
          :to="data1.router"
          exact
        >
          <q-item-section top avatar>
            <q-avatar
              :color="data1.color"
              :text-color="data1.text_color"
              :icon="data1.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="h_sidebar">{{ data1.nama }}</q-item-label>
            <!-- <q-item-label caption lines="2">Dashboard</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-expansion-item
          v-if="data1.type != 'single' && checkLength(data1.submenu)"
          :content-inset-level="1"
          :key="index1"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                :icon="data1.icon"
                :color="data1.color"
                :text-color="data1.text_color"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="h_sidebar">{{ data1.nama }}</q-item-label>
              <!-- <q-item-label caption lines="2">Analisa Data</q-item-label> -->
            </q-item-section>
          </template>

          <q-list :content-inset-level="0.5">
            <template v-for="(data2, index2) in data1.submenu">
              <q-item
                v-if="data2.type == 'single'"
                clickable
                :to="data2.router"
                :content-inset-level="0.5"
                :key="index2"
              >
                <q-item-section class="h_sidebar1">{{ data2.nama }}</q-item-section>
              </q-item>

              <q-expansion-item
                v-if="data2.type != 'single' && checkLength(data2.submenu) == true"
                :content-inset-level="0.5"
                :key="index2"
              >
                <template v-slot:header>
                  <q-item-section>
                    <q-item-label class="h_sidebar1">{{ data2.nama }}</q-item-label>
                  </q-item-section>
                </template>

                <q-list :content-inset-level="0.5">
                  <template v-for="(data3, index3) in data2.submenu">
                    <q-item
                      v-if="data3.type == 'single'"
                      clickable
                      :to="data3.router"
                      :content-inset-level="0.5"
                      :key="index3"
                    >
                      <q-item-section class="h_sidebar1">{{ data3.nama }}</q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-expansion-item>
            </template>
          </q-list>
        </q-expansion-item>
      </template>
    </template>

    <!-- ========================= AMBIL MENU ========================= -->

    <!-- ========================= AMBIL MENU ========================= -->

    <q-item clickable @click="logout" exact>
      <q-item-section top avatar>
        <q-avatar color="red" text-color="white" icon="lock" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="h_sidebar1">Keluar</q-item-label>
        <q-item-label caption lines="2">Logout</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import MENU from "../library/menu";

export default {
  data() {
    return {
      leftDrawerOpen: true,
      // menu : MENU,
    };
  },

  methods: {
    getMENU() {
      MENU.getMenu();
    },

    logout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      this.$router.push("/login");
    },
    checkLength(data) {
      if (data.length <= 0) {
        return false;
      } else {
        return true;
      }
    },

    checkLength2(data) {
      var hidex = false;

      data.forEach((element) => {
        if (element.submenu.length > 0 || element.type == "single") {
          hidex = true;
        }
      });

      return hidex;
    },
  },

  mounted() {
    this.getMENU();
  },
};
</script>
