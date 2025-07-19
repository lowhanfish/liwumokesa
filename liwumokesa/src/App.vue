<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy bg-amber-14"  v-if="!checkLogin">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />
        <q-toolbar-title>
            {{$store.state.KAT}} {{$store.state.DES_KEL}}
        </q-toolbar-title>
        <div>

          <q-btn
            style="color:white"
            flat
              color="white"
              @click="refreshPage()"
              icon="refresh"
              title="Refresh"

            />


          <q-btn
            style="color:white"
            flat
              color="white"
              @click="$q.fullscreen.toggle()"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              title="Tampilan Penuh"

            />

            <q-btn
            style="color:white"
            flat
              color="white"
              @click="LogOut()"
              icon="lock"
              title="LogOut"

            />

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above content-class="bg-grey-2 shadow-up-4" v-if="!checkLogin">
      <SideBar/>
    </q-drawer>


    <q-page-container>
      <router-view/>
    </q-page-container>

    
  </q-layout>
</template>

<script>


import { AppFullscreen } from 'quasar'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld
  },

  data () {
    return {
      leftDrawerOpen: false,
      text:'',
      dense : true,
    }
  },
  methods: {
    cekToken(){
      fetch(this.$store.state.url.URL_APP + "checkAuth", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          }
      })
          .then(res => res.json())
          .then(res_data => {
              if (res_data.message == 'Tidak ter-Authorisasi') {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
                this.$router.push("/login");
              } 
      });
    },

    refreshPage(){
      location.reload();
    },
    LogOut(){
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      this.$router.push("/login");
    },

  },
  computed: {
      checkLogin() {
          if (this.$route.name === 'login') {
              return true;
          } else {
              return false;
          }
      },
      
  },

  mounted () {
    this.cekToken();
  },
}
</script>

<style>
</style>
