<template>
  <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-2"></div>
                <div class="col-12 col-md-8">
                    <hr class="hrdetilberita" />
                    <div class="text-center">
                        <span class="h_title text-orange">LAYANAN PERSURATAN</span> <br>
                    </div>

                    <hr class="hrdetilberita" />

                    <div class="" style="margin-top:12px">
                        <div v-if="$store.state.CHECK_AUTH">
                            <!-- <q-avatar style="padding-left:20px">
                                <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar> -->
                            <q-btn @click="logOut()" size="15px" round color="red" icon="lock"/>
                            
                            <span class="f_captions2" style="padding-left:10px">{{$store.state.userx.nama}}</span>

                        </div>

                        <div v-if="!$store.state.CHECK_AUTH">
                            <q-btn color="primary" icon="login" @click="modalLogin = true">
                                <span style="margin-left:10px">Login / Registrasi</span>
                            </q-btn>

                        </div>

                    </div>

                    <!-- {{$store.state.CHECK_AUTH}} -->
                    <br>
                    <q-separator />
                    <br>

                    <div class="row">
                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketTidakMampu')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/tidak_mampu.png"></q-img>
                                </div>
                            </a>
                        </div>

                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketBelumMenikah')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/belum_menikah.png"></q-img>
                                </div>
                            </a>
                        </div>

                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketBerdomisili')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/domisili.png"></q-img>
                                </div>
                            </a>
                        </div>

                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketUsaha')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/usaha.png"></q-img>
                                </div>
                            </a>
                        </div>
                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketTidakMemilikiRumah')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/tidak_memiliki_rumah.png"></q-img>
                                </div>
                            </a>
                        </div>
                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketTidakBekerja')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/belum_bekerja.png"></q-img>
                                </div>
                            </a>
                        </div>

                        <div class="col-6 col-md-3" style="padding:10px">
                            <!-- <a href="javascript:void(0)" @click="routex('suketAhliWaris')"> -->
                            <a href="javascript:void(0)" @click="openModal()">
                                <div style="padding:20px">
                                    <q-img src="img/suket/ahli_waris.png"></q-img>
                                </div>
                            </a>
                        </div>

                        

                        <div class="col-6 col-md-3" style="padding:10px">
                            <a href="javascript:void(0)" @click="routex('suketLainnya')">
                                <div style="padding:20px">
                                    <q-img src="img/suket/lainnya.png"></q-img>
                                </div>
                            </a>
                        </div>

                        

                        
                    </div>
                </div>
                <div class="col-12 col-md-2"></div>
                
            </div>
        </div>


            <!-- ================================= MODAL LOGIN ======================================= -->
                <q-dialog v-model="modalLogin" persistent>
                        <q-card class="mdl-sm1" style="width: 100%; max-width: 80vw;" >
                            <q-card-section class="bg-teal-5">
                                <div class="row">
                                    <div class="text-center">
                                        <div class="text-h6 h_modalhead text-center">LOGIN</div>
                                    </div>
                                    <div style="pading-left:2px; position : absolute; right:15px">
                                        <a @click="modalLogin = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                    </div>
                                </div>
                            </q-card-section>

                            <form>
                                <q-card-section class="q-pt-none">

 
                                    <br><br>

                      
                                    <transition name="fade">
                                        <!-- <h1>{{loading}}</h1> -->
                                        <div v-if="loading" class="text-center">
                                            <img src="img/loading.gif" style="width:20%" alt="">
                                        </div>
                                    </transition>

                                    <div class="row">


                                        <div class="col-12 col-md-12">
                                            <q-input
                                            color="grey-3"
                                            label-color="orange"
                                            outlined
                                            square
                                            :dense="true"
                                            v-model="user.username"
                                            label="Username"
                                            >

                                            </q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                            type="password"
                                            color="grey-3"
                                            label-color="orange"
                                            outlined
                                            square
                                            :dense="true"
                                            v-model="user.password"
                                            label="Password"
                                            >

                                            </q-input>
                                        </div>



                                    </div>
                                    <br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 

                                <!-- <div class="text-center" style="padding-top:2px">
                                    <span style="font-size:9px !important; color:#ADADAD"><b>Belum punya akun ?</b></span>
                                </div> -->


                                <q-btn class="full-width" @click="btn_login()" label="Login" color="teal-5" style="margin-top:10px" />
                                <q-markup-table separator="vertical" flat bordered style="width:100%; margin-top:10px"> </q-markup-table> 
                                <q-btn class="full-width" size="sm" @click="modalRegis = true" label="Registrasi" color="orange-14"  />



                                <!-- <q-markup-table separator="vertical" flat bordered style="width:100%; margin-top:10px"> </q-markup-table>  -->


                               
                                <!-- <q-btn class="full-width" @click="modalLogin = false" label="Batal" color="red-10" style="margin-top:10px" /> -->

                                <br><br><br>

                                </q-card-section>


                            </form>
                        </q-card>
                    </q-dialog>

            <!-- ================================= MODAL LOGIN ======================================= -->


            <!-- ================================= MODAL REGIS ======================================= -->
                <q-dialog v-model="modalRegis" persistent>
                        <q-card class="mdl-sm1" style="width: 100%; max-width: 80vw;" >
                            <q-card-section class="bg-orange-14">
                                <div class="row">
                                    <div class="text-center">
                                        <div class="text-h6 h_modalhead text-center">REGISTRASI</div>
                                    </div>
                                    <div style="pading-left:2px; position : absolute; right:15px">
                                        <a @click="modalRegis = false" href="JavaScript:void(0)" class="hideHref" style="color:white; font-style:bold; font-size:16">X</a>
                                    </div>
                                </div>
                            </q-card-section>

                            <form>
                                <q-card-section class="q-pt-none">

 
                                    <br>
                                    <div v-if="errorMessage">
                                        <div  class="alertku shadow-2">
                                            <strong>Warning!</strong> {{ errorMessage }}.

                                        </div>
                                    </div>
                                    
                                    
                                    <br>

                                    <div class="row">


                                        <div class="col-12 col-md-12">
                                            <q-input
                                            color="grey-3"
                                            label-color="orange"
                                            outlined
                                            square
                                            :dense="true"
                                            v-model="register.nama"
                                            label="Nama Lengkap"
                                            >
                                            </q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.nik"
                                                label="NIK"
                                            ></q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.email"
                                                label="Email"
                                            ></q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.hp"
                                                label="HP"
                                            ></q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.username"
                                                label="Username"
                                            ></q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                type="password"
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.password"
                                                label="Password"
                                            ></q-input>
                                        </div>

                                        <div class="col-12 col-md-12" style="padding-top:20px">
                                            <q-input
                                                type="password"
                                                color="grey-3"
                                                label-color="orange"
                                                outlined
                                                square
                                                :dense="true"
                                                v-model="register.confirmPassword"
                                                label="Confirm Password"
                                            ></q-input>
                                        </div>



                                    </div>
                                    <br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> </q-markup-table> 


                                    <q-btn class="full-width" size="md" @click="registrasi()" label="Registrasi" color="orange-14"  />

                                    <q-markup-table separator="vertical" flat bordered style="width:100%; margin-top:10px"> </q-markup-table> 

                                    <q-btn class="full-width" @click="modalRegis = false" label="Kembali" color="red-9" style="margin-top:10px" />

                                    <br><br><br>

                                </q-card-section>


                            </form>
                        </q-card>
                    </q-dialog>

            <!-- ================================= MODAL REGIS ======================================= -->




    </div>
</template>

<script>



import Joi from "joi";
const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(6).max(13).required(),
    password: Joi.string().min(6).required(),
});












export default {
    data() {
        return {
            key: '',
            user : {
                username : "",
                password : ""
            },

            register : {
                username : "",
                password : "",
                confirmPassword : '',
                nama : '',
                nik : '',
                email : "",
                hp : "",
                level : 'levelUsers/20288912'
            },

            errorMessage: '',

            modalLogin : false,
            modalRegis : false,
            loading : false,
        }
    },

    methods: {
        openModal() {
            this.notify("Upss..!! 😅", 'Mohon maaf layanan belum kami aktifkan', 'warning')
        },

        routex : function(routeName){
            if (this.$store.state.CHECK_AUTH) {
                this.$router.push('/'+routeName);
            } else {
                this.modalLogin = true
            }
        },
        registrasi: function() {
            
            this.errorMessage = "";
            if (this.validUser()) {
                // Jika user sdh valid lakukan pengiriman data ke server
                const body = {
                    username: this.register.username,
                    password: this.register.password
                };
                this.signingUp = true;
                fetch(this.$store.state.url.URL_CNT_REGISTRASI+'signup', {
                    method: "POST",
                    body: JSON.stringify(this.register),
                    headers: {
                        "content-type": "application/json",
                        authorization: "kikensbatara " + localStorage.token
                    }
                }).then((response) => {
                    this.signingUp = false;
                    if (response.ok) {
                        this.notify("SUKSES", 'Berhasil menambahkan akun pengguna', 'success')
                        this.getView();
                        // this.$router.push('/login');
                        // return response.json();
                    }
                    else{
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });

                    }
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.signingUp = false;
                        this.errorMessage = error.message;
                    }, 1000);
                });

            }else{
            console.log("tidak valid");

            }

        },



        btn_login : function(){

                        this.errorMessage = '';
            if(this.validUserLogin()){
            // this.$q.notify("hi");
            // this.$store.commit("shoWNotify", 'Kiken', 'primary', 'timer');
            const body = {
                username : this.user.username,
                password : this.user.password
            }

            this.loading = true;

            fetch(this.$store.state.url.URL_APP + "auth/login", {
                method : 'POST',
                headers : {
                'content-type' : 'application/json',
                },
                body : JSON.stringify(body),
            }).then((response) => {
                
                console.log(response);
                
                    if (response.ok) {
                        return response.json();
                        this.loading = true;
                    }

                    return response.json().then(error => {
                        throw new Error(error.message);
                        this.loading = true;
                    });
                })
                .then((result) => {
                console.log("=============================");
                // console.log(result);
                // menyimpan token yang tergenerate dari server
                localStorage.token = result.token;
                localStorage.profile = JSON.stringify(result.profile);


                var profilex = result.profile
                var profile3 = profilex.profile
                this.$store.state.userx.nama = profile3.nama;
                this.$store.state.userx.email = profile3.email;
                this.$store.state.userx.hp = profile3.hp

                // console.log(profilez.des_kel)
                // this.$store.state.ID_DES_KEL = profilez.des_kel



                setTimeout(() => {
                    // this.$store.commit("hideLoading")
                    // this.$router.push('/');
                    // location.reload();
                    this.notify("SUKSES", 'Login Sukses 😁', 'success')
                    this.$store.state.CHECK_AUTH = true
                    this.loading = false;
                    this.modalLogin = false;
                }, 500);
                })
                .catch(error => {
                setTimeout(() => {
                    // this.$store.commit("hideLoading")
                    // this.errorMessage = error.message;
                    this.notify("Gagal.. 😰", error.message, 'error')
                    this.loading = false;
                }, 500);
                });;
            }

            // this.loading = !this.loading

        },

        logOut :function(){
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            this.$store.state.CHECK_AUTH = false;
            this.$store.state.userx.nama = '';
            this.$store.state.userx.email = '';
            this.$store.state.userx.hp = ''
        },

        validUser : function(){
            if (this.register.password !== this.register.confirmPassword) {
                this.errorMessage = "Password dan Confirm Password harus sama. !";
                return false;
            }
            // Memulai proses validasi melalui skema Joi yang sebelumnya dibuat
            // req.body merupakan data yang di kirim oleh client dan schema merupakan skema joi yg di buat sebelumnya
            const body = {
                username: this.register.username,
                password: this.register.password
            };
            const result = Joi.validate(body, schema);

            if (result.error === null) {
                return true;
            }
            if (result.error.message.includes("username")) {
                // jika pesan error yang dihasilkan mengandung char "username" maka
                this.errorMessage = "Username tidak valid (Min : 6 dan Max : 14 Karakter)";
            } else {
                this.errorMessage = "Password tidak valid (Min : 6 Karakter)";
                //   console.log(result.error);

            }
            return false;
        },

        validUserLogin: function(){
            const result = Joi.validate(this.user, schema);
            if (result.error === null) {
            return true;
            }
            if (result.error.message.includes("username")) {
                this.errorMessage = "Username tidak valid";
                this.notify("Gagal.. 😰", this.errorMessage, 'error')
            } else {
                this.errorMessage = "Password tidak valid";
                this.notify("Gagal.. 😰", this.errorMessage, 'error')
            }
            return false;
        },


        notify(sukses, notif, icon){
            Swal.fire(
            sukses,
            notif,
            icon,

            )
        }













    },

    mounted () {
        if (localStorage.token) {
            this.$store.state.CHECK_AUTH = true
            
        } else {
            this.$store.state.CHECK_AUTH = false
            
        }
    },

}
</script>

<style>

.swal2-container {
  z-index: 10000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>