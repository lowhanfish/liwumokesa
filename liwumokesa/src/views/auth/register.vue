<template>
  <div class="about" style="padding: 15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Registrasi</div>
            <div class="text-subtitle2">Modul Registrasi</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input
                v-model="cari_value"
                @keyup="cari_data()"
                outlined
                square
                :dense="true"
                class="bg-white"
                style="width: 90%"
              />
              <q-btn
                glossy
                class="bg-light-blue-10"
                @click="mdl_add = true"
                dense
                flat
                icon="add"
                style="width: 10%"
              >
                <q-tooltip
                  content-class="bg-light-blue-10"
                  content-style="font-size: 13px"
                >
                  Click untuk menambah data
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
          <table width="100%">
            <tr class="h_table_head bg-grey-5">
              <th width="5%" class="text-center">No</th>
              <th width="35%" class="text-center">Nama</th>
              <th width="25%">Username</th>
              <th width="25%">Level</th>
              <th width="10%"></th>
            </tr>
            <tr class="h_table_body" v-for="(data, index) in list_data" :key="data._id">
              <td class="text-center">{{ indexing(index + 1) }}.</td>
              <td>{{ data.nama }}</td>
              <td>{{ data.username }}</td>
              <td>{{ data.level_uraian }}</td>
              <td class="text-center">
                <q-btn-group>
                  <q-btn
                    @click="(mdl_edit = true), selectData(data)"
                    glossy
                    color="orange"
                    icon="create"
                    class="tbl_btn"
                  >
                    <q-tooltip
                      content-class="bg-orange-9"
                      content-style="font-size: 13px"
                    >
                      Click untuk mengubah data ini
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    @click="(mdl_hapus = true), selectData(data)"
                    glossy
                    color="negative"
                    icon="delete_forever"
                    class="tbl_btn"
                  >
                    <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                      Click untuk menghapus data ini
                    </q-tooltip>
                  </q-btn>
                </q-btn-group>
              </td>
            </tr>
          </table>

          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin" />
        <br />

        <div class="flex flex-center">
          <q-pagination
            @click="getView()"
            v-model="page_first"
            :max="page_last"
            :max-pages="4"
            color="orange-14"
            :direction-links="true"
            :boundary-links="true"
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
          >
          </q-pagination>
        </div>

        <br />
      </q-card-section>
    </q-card>

    <!-- =================================================== MODAL =========================================================== -->

    <!-- ================================================= MODAL TAMBAH ================================================ -->
    <q-dialog v-model="mdl_add" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-grey-7">
          <div class="text-h6 h_modalhead">Simpan Dataxxx</div>
        </q-card-section>

        <form @submit.prevent="addData()">
          <q-card-section class="q-pt-none">
            <br />

            <div v-if="errorMessage">
              <div class="alertku shadow-2">
                <strong>Warning!</strong> {{ errorMessage }}.
              </div>
              <br />
            </div>

            <span class="h_lable">Nama Lengkap</span>
            <q-input
              v-model="dataku.nama"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <span class="h_lable">Level</span>
            <select v-model="dataku.level" class="inputbs">
              <option v-for="data in list_level" :key="data._id" :value="data._id">
                {{ data.uraian }}
              </option>
            </select>

            <span class="h_lable">Akses Wilayah</span>
            <select
              v-model="dataku.aksesWilayah"
              @change="setAksesWilayah()"
              class="inputbs"
            >
              <option
                v-for="data in $store.state.aksesWilayah"
                :key="data.id"
                :value="data.id"
              >
                [{{ data.id }}] {{ data.uraian }}
              </option>
            </select>

            <div v-if="dataku.aksesWilayah == 0">
              <span class="h_lable">Pilih Desa</span>

              <q-select
                v-model="dataku.des_kel"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="$store.state.listDesKel"
                option-value="uniqid"
                option-label="uraian"
                @filter="filterDesKel"
                emit-value
                map-options
                clearable
                outlined
                square
                :dense="true"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> Tidak ditemukan </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div v-if="dataku.aksesWilayah == 1">
              <span class="h_lable">Pilih Kecamatan</span>
              <select v-model="dataku.kecamatan" class="inputbs">
                <option
                  v-for="data in $store.state.listKecamatan"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.uraian }}
                </option>
              </select>
            </div>

            <span class="h_lable">Username</span>
            <q-input
              v-model="dataku.username"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <span class="h_lable">Email</span>
            <q-input
              v-model="dataku.email"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <span class="h_lable">Hp</span>
            <q-input
              v-model="dataku.hp"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <span class="h_lable">Pasword</span>
            <q-input
              v-model="dataku.password"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <span class="h_lable">Confirm Password</span>
            <q-input
              v-model="dataku.confirmPassword"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />
          </q-card-section>

          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
            <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
            <q-btn label="Batal" color="negative" v-close-popup />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL TAMBAH ================================================ -->

    <!-- ================================================= MODAL EDIT ================================================ -->
    <q-dialog v-model="mdl_edit" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-orange">
          <div class="text-h6 h_modalhead">Edit Data</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <br />

          <div v-if="errorMessage">
            <div class="alertku shadow-2">
              <strong>Warning!</strong> {{ errorMessage }}.
            </div>
            <br />
          </div>

          <span class="h_lable">Nama Lengkap</span>
          <q-input
            v-model="dataku.nama"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />

          <span class="h_lable">Level</span>
          <select v-model="dataku.level" class="inputbs">
            <option v-for="data in list_level" :key="data._id" :value="data._id">
              {{ data.uraian }}
            </option>
          </select>

          <span class="h_lable">Kelas Admin</span>
          <select v-model="dataku.kelasAdmin" class="inputbs">
            <option value="1">Kecamatan</option>
            <option value="2">Desa</option>
          </select>

          <span class="h_lable">Akses Wilayah</span>
          <select
            v-model="dataku.aksesWilayah"
            @change="setAksesWilayah()"
            class="inputbs"
          >
            <option
              v-for="data in $store.state.aksesWilayah"
              :key="data.id"
              :value="data.id"
            >
              [{{ data.id }}] {{ data.uraian }}
            </option>
          </select>

          <div v-if="dataku.aksesWilayah == 0">
            <span class="h_lable">Pilih Desa</span>

            <q-select
              v-model="dataku.des_kel"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="$store.state.listDesKel"
              option-value="uniqid"
              option-label="uraian"
              @filter="filterDesKel"
              emit-value
              map-options
              clearable
              outlined
              square
              :dense="true"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> Tidak ditemukan </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div v-if="dataku.aksesWilayah == 1">
            <span class="h_lable">Pilih Kecamatan</span>
            <select v-model="dataku.kecamatan" class="inputbs">
              <option
                v-for="data in $store.state.listKecamatan"
                :key="data.id"
                :value="data.id"
              >
                {{ data.uraian }}
              </option>
            </select>
          </div>

          <span class="h_lable">Username</span>
          <q-input
            v-model="dataku.username"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />

          <span class="h_lable">Email</span>
          <q-input
            v-model="dataku.email"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />

          <span class="h_lable">Hp</span>
          <q-input
            v-model="dataku.hp"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />
        </q-card-section>

        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
          <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
          <q-btn label="Batal" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL EDIT ================================================ -->

    <!-- ================================================ MODAL HAPUS ================================================ -->
    <q-dialog v-model="mdl_hapus" persistent>
      <q-card class="mdl-sm">
        <q-card-section class="q-pt-none text-center orageGrad">
          <form @submit.prevent="removeData">
            <br />
            <img src="img/alert.png" alt="" width="75" /> <br />
            <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
            <input type="submit" style="position: absolute; left: -9999px" />
            <br />
            <br />

            <q-btn label="Batal" size="sm" color="negative" v-close-popup />
            &nbsp;
            <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup />
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- ================================================ MODAL HAPUS ================================================ -->

    <!-- =================================================== MODAL =========================================================== -->
  </div>
</template>

<script>
import WILAYAH from "../../library/getWilayah";
import CHART from "../../library/chart";
import FETCHING from "../../library/fetching";

import Joi from "joi";
const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]*$/)
    .min(3)
    .max(13)
    .required(),
  password: Joi.string().min(6).required(),
});
import UMUM from "../../library/umum.js";

export default {
  data() {
    return {
      form: {
        id: "",
        uraian: "",
        createdAt: "",
      },

      dataku: {
        id: "",
        level: "",
        aksesWilayah: 0,
        des_kel: "",
        kecamatan: "",
        kelasAdmin: "",
        nama: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        hp: "",
      },
      list_data: [],
      list_des_kel: [],
      list_level: [],

      errorMessage: "",

      page_limit: 8,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data: true,

      mdl_add: false,
      mdl_edit: false,
      mdl_hapus: false,
      btn_add: false,
    };
  },
  methods: {
    getView: function () {
      // console.log("TELASOOOOOOOOOOOOOOOOOOO")

      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_REGISTRASI + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value,
        }),
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.list_data = res_data.data;
          this.page_last = res_data.jmlData;
          this.$store.commit("hideLoading");
          // console.log(res_data);
        });
    },

    addData: function () {
      this.setAksesWilayah();
      this.errorMessage = "";
      if (this.validUser()) {
        // Jika user sdh valid lakukan pengiriman data ke server
        const body = {
          username: this.dataku.username,
          password: this.dataku.password,
        };
        this.signingUp = true;
        fetch(this.$store.state.url.URL_REGISTRASI + "signup", {
          method: "POST",
          body: JSON.stringify(this.dataku),
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token,
          },
        })
          .then((response) => {
            this.signingUp = false;
            if (response.ok) {
              this.Notify("Sukses Menambah Data", "primary", "check_circle_outline");
              this.getView();
              // this.$router.push('/login');
              // return response.json();
            } else {
              return response.json().then((error) => {
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
      } else {
        console.log("tidak valid");
      }
    },

    editData: function () {
      this.setAksesWilayah();

      fetch(this.$store.state.url.URL_REGISTRASI + "editData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          id: this.dataku.id,
          level: this.dataku.level,
          kelasAdmin: this.dataku.kelasAdmin,
          nama: this.dataku.nama,
          username: this.dataku.username,
          email: this.dataku.email,
          hp: this.dataku.hp,

          des_kel: this.dataku.des_kel,
          kecamatan: this.dataku.kecamatan,
          aksesWilayah: this.dataku.aksesWilayah,
        }),
      }).then((res_data) => {
        this.Notify("Sukses Merubah Data", "warning", "check_circle_outline");
        this.getView();
      });
    },

    removeData: function (idnya) {
      fetch(this.$store.state.url.URL_REGISTRASI + "removeData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          id: idnya,
        }),
      }).then((res_data) => {
        this.getView();
        this.Notify("Sukses Merubah Data", "warning", "check_circle_outline");
      });
    },

    getLevel: function () {
      fetch(this.$store.state.url.URL_LEVEL_USERS + "list", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((res_data) => {
          this.list_level = res_data;
          // this.$store.commit("hideLoading");
          // console.log(res_data);
        });
    },

    validUser: function () {
      if (this.dataku.password !== this.dataku.confirmPassword) {
        this.errorMessage = "Password dan Confirm Password harus sama. !";
        return false;
      }
      // Memulai proses validasi melalui skema Joi yang sebelumnya dibuat
      // req.body merupakan data yang di kirim oleh client dan schema merupakan skema joi yg di buat sebelumnya
      const body = {
        username: this.dataku.username,
        password: this.dataku.password,
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

    selectData: function (data) {
      this.dataku.id = data.id;
      this.dataku.nama = data.nama;
      this.dataku.level = data.level;
      this.dataku.kelasAdmin = data.kelasAdmin;
      this.dataku.username = data.username;
      this.dataku.email = data.email;
      this.dataku.hp = data.hp;

      this.dataku.des_kel = data.des_kel;
      this.dataku.kecamatan = data.kecamatan;
      this.dataku.aksesWilayah = data.aksesWilayah;
    },

    filterDesKel: function (val, update, abort) {
      // console.log(val);
      update(() => {
        if (val === "") {
        } else {
          WILAYAH.postDesKelAutocomplete(val);
        }
      });
    },

    setAksesWilayah: function () {
      if (this.dataku.aksesWilayah == 0) {
        console.log("AKSES DESA DI SET");
        this.dataku.kecamatan = null;
      } else if (this.dataku.aksesWilayah == 1) {
        console.log("AKSES KECAMATAN DI SET");
        this.dataku.des_kel = null;
      } else if (this.dataku.aksesWilayah == 2) {
        console.log("AKSES KABUPATEN DI SET");
        this.dataku.kecamatan = null;
        this.dataku.des_kel = null;
      }
    },

    // ====================================== PAGINATE ====================================
    Notify: function (message, positive, icon) {
      this.$q.notify({
        message: message,
        color: positive,
        icon: icon,
        position: "top",
        timeout: 500,
      });
    },

    cari_data: function () {
      this.page_first = 1;
      this.getView();
    },

    indexing: function (index) {
      var idx = (this.page_first - 1) * this.page_limit + index;
      return idx;
    },

    // ====================================== PAGINATE ====================================
  },

  mounted() {
    this.getView();
    this.getLevel();
    WILAYAH.postDesKelAutocomplete("");
    WILAYAH.getListKecamatan();
  },
};
</script>
