<template>
  <q-layout view="lHh Lpr lFf">
    <navBar />

    <q-footer reveal elevated class="bg-grey-9" style="margin-top: 40%">
      <div class="text-center" style="padding-top: 5px; padding-bottom: 15px">
        <span class="h_footer1 text-white">WEBSITE {{ $store.state.DES_KEL }}</span>
        <br />
        <!-- <span class="h_footer2">Call Center : 0853-9666-6577 (Tandu)</span> <br> -->
        <a href="https://web.facebook.com/" style="padding-right: 10px" target="_blank">
          <q-avatar>
            <q-icon
              name="fab fa-facebook-square"
              class="text-yellow-10"
              style="font-size: 32px"
            />
          </q-avatar>
        </a>

        <a href="https://wa.me/ /?text=AssalamuAlaikum Lanjutkan,, " target="_blank">
          <q-avatar>
            <q-icon
              name="fab fa-whatsapp-square"
              class="text-yellow-10"
              style="font-size: 32px"
            />
          </q-avatar>
        </a>

        <a href="https://www.instagram.com/" style="padding-left: 10px" target="_blank">
          <q-avatar>
            <q-icon
              name="fab fa-instagram-square"
              class="text-yellow-10"
              style="font-size: 32px"
            />
          </q-avatar>
        </a>

        <br />
        <span class="h_footer1 text-white">Pengunjung : {{ $store.state.VISITOR }}</span>
        <br />
      </div>
    </q-footer>

    <q-page-container>
      <!-- <div class="bg-red topUP">
        <h1>OKEEE</h1>
      </div> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    HelloWorld,
  },

  data() {
    return {
      leftDrawerOpen: false,
      window: {
        width: 0,
        height: 0,
      },
    };
  },

  methods: {
    cekToken() {
      fetch(this.$store.state.url.URL_APP + "checkAuth", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((res_data) => {
          if (res_data.message == "Tidak ter-Authorisasi") {
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            this.$store.state.CHECK_AUTH = false;
          } else {
            var profile1 = localStorage.profile;
            var profile2 = JSON.parse(profile1);
            var profile3 = profile2.profile;

            this.$store.state.userx.nama = profile3.nama;
            this.$store.state.userx.email = profile3.email;
            this.$store.state.userx.hp = profile3.hp;

            console.log(profile3.nama);
            return false;
          }
        });
    },
  },

  mounted() {
    this.cekToken();
  },
};
</script>
