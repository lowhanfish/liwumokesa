<template>
  <div class="bgku">
        <!-- <div class="text-center divLogin">
          <span class="h_header">" Selamat Datang "</span> <br>
          <span class="h_header">" di APLIKASI SIDAKCAMAT MATAUSU "</span>
        </div> -->
        <br><br> <br><br><br><br>
    <div class="row items-center">
      <div class="col-12 col-md-4"></div>
      <div class="col-12 col-md-4" style="padding-left:6%; padding-right:6%">
        
        <!-- <q-card class="my-card bgku">
            <br>
            <q-img src="img/LOGO.png" />
          <q-card-section>
            <hr />
            <br>
            <form>
              <q-input outlined square :dense="true" class="bg-white" placeholder="Username">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <br />

              <q-input
                outlined
                square
                :dense="true"
                class="bg-white"
                placeholder="Password"
                type="password"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
              <br />

              <q-btn push class="full-width" color="primary" icon-right="send" label="LOGIN" to="/" />
            </form>
            <br>
            <hr>
            
          </q-card-section>
          <div class="transAbu">
              <span class="h_fotter_title">Copyright : Diskominfo & DKPSDM Kab. Konawe Selatan</span>
          </div>
        </q-card> -->

        <div class="putihTrans2 formLogin shadow-5" style="margin-top:25%">
          <br>
            <!-- <q-img src="img/kop2.png" /> -->
            <q-img src="img/kopxx.png" />
            <hr />
            <br>



            <div v-if="errorMessage">
              <div  class="alertku shadow-2">
                <strong>Warning!</strong> {{ errorMessage }}.

              </div>
              <br>
            </div>

            <form @submit.prevent="btn_login()">
              <q-input v-model="user.username" outlined square :dense="true" class="bg-white" placeholder="Username">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <br />

              <q-input
                 v-model="user.password"
                outlined
                square
                :dense="true"
                class="bg-white"
                placeholder="Password"
                type="password"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
              <br />

              <q-btn type="submit" push class="full-width" color="yellow-9" icon-right="send" label="LOGIN" />
            </form>
            <br>
            <hr>
            <div class="transAbu">
              <span class="h_fotter_title">Copyright : DiskominfoSandi (2022)</span>
            </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>










<script>

// const ADD_URL = URL_APP + "api/v1/rincian_obyek/";

  import Joi from "joi";
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required(),
    password: Joi.string().min(6).required(),
  });

  import { Notify  } from 'quasar'

  export default {
    name: "monev_login",
    data : function(){
      return {

          errorMessage: '',
          user : {
            username : "",
            password : ""
          },

          url : {
            LOGIN_URL : this.$store.state.url.URL_APP + "auth/login",

          }
      }
    },
    watch: {
      user: {
          handler() {
              this.errorMessage = "";
          },
          deep: true
      }
    },
    methods: {
      // go_register : function(){
      //   alert(App.data().sesseee);
      //   this.displayed = 'block';
      // },
      btn_login : function(){

        

        this.errorMessage = '';
        if(this.validUser()){
          this.$store.commit("shoWLoading");
          // this.$q.notify("hi");

          // this.$store.commit("shoWNotify", 'Kiken', 'primary', 'timer');
          const body = {
            username : this.user.username,
            password : this.user.password
          }
          fetch(this.url.LOGIN_URL, {
            method : 'POST',
            headers : {
              'content-type' : 'application/json',
            },
            body : JSON.stringify(body),
          }).then((response) => {
            
            console.log(response);
            
                if (response.ok) {
                    return response.json();
                    this.$store.commit("shoWLoading");
                }

                return response.json().then(error => {
                    throw new Error(error.message);
                    this.$store.commit("shoWLoading");
                });
            })
            .then((result) => {
              console.log("=============================");
              console.log(result);
              // menyimpan token yang tergenerate dari server
              localStorage.token = result.token;
              localStorage.profile = JSON.stringify(result.profile);


              var profilex = result.profile
              var profilez = profilex.profile
              console.log(profilez.des_kel)
              this.$store.state.ID_DES_KEL = profilez.des_kel



              setTimeout(() => {
                this.$store.commit("hideLoading")
                this.$router.push('/');
                // location.reload();
              }, 1000);
            })
            .catch(error => {
              setTimeout(() => {
                this.$store.commit("hideLoading")
                this.errorMessage = error.message;
              }, 1000);
            });;
        }



      },
      validUser: function(){
        const result = Joi.validate(this.user, schema);
        if (result.error === null) {
          return true;
        }
        if (result.error.message.includes("username")) {
          this.errorMessage = "Username tidak valid";
        } else {
          this.errorMessage = "Username tidak valid2";
        }
        return false;
      },
    },
    mounted : function(){

      
      

    },
  };
</script>