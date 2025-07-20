<template>
  <div class="about" style="padding: 15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Kegiatan</div>
            <div class="text-subtitle2">Informasi Kegiatan Terbaru</div>
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
                @click="(mdl_add = true), $store.commit('addEditor')"
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
        <div class="row">
          <div class="col-md-6 col-12 input_kiri">
            <select
              :disabled="disable_kec"
              v-model="form.kecamatan"
              @change="chageDesa(), cari_data()"
              class="bg-white"
              outlined
              square
              :dense="true"
            >
              <option value="">-- Semua Kecamatan --</option>
              <option
                v-for="data in $store.state.listKecamatan"
                :key="data.id"
                :value="data.id"
              >
                {{ data.uraian }}
              </option>
            </select>
          </div>

          <div class="col-md-6 col-12 input_kanan">
            <select
              :disabled="disable_des"
              v-model="form.des_kel"
              @change="cari_data()"
              class="bg-white"
              outlined
              square
              :dense="true"
            >
              <option value="">-- Semua Desa --</option>
              <option
                v-for="data in $store.state.listDesKel"
                :key="data.uniqid"
                :value="data.uniqid"
              >
                {{ data.uraian }}
              </option>
            </select>
          </div>
        </div>

        <!-- <h1>{{form.des_kel}}</h1> -->

        <hr class="hrpagin" />

        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
          <table width="100%">
            <tr class="h_table_head bg-grey-5">
              <th width="5%" class="text-center">No</th>
              <th width="10%" class="text-center">Gambar</th>
              <th width="70%" class="text-center">Judul Kegiatan</th>
              <th width="10%"></th>
            </tr>
            <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
              <td class="text-center h_top">{{ indexing(index + 1) }}.</td>
              <td class="h_top">
                <a
                  href="javascript:void(0)"
                  @click="(mdl_lihat_file = true), selectData(data)"
                >
                  <q-img
                    class="hoverImg"
                    :src="$store.state.url.URL_APP + 'uploads/' + data.fileThumb"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </a>
              </td>
              <td class="h_top">
                {{ data.judul }}
                <span class="h_panation">({{ UMUM.tglConvertXY(data.createdAt) }})</span
                ><br />
                <span class="h_lable">By : {{ data.createdBy }}</span>
              </td>
              <td class="text-center h_top">
                <q-btn-group>
                  <q-btn
                    @click="(mdl_lihat = true), selectData(data)"
                    glossy
                    color="blue"
                    icon="search"
                    class="tbl_btn"
                  >
                    <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                      Click untuk melihat Detil Data
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    @click="
                      (mdl_edit = true), selectData(data), $store.commit('addEditor')
                    "
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

          <!-- <textarea id="froala-editor">Initialize the Froala WYSIWYG HTML Editor on a textarea.</textarea> -->
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
          <div class="text-h6 h_modalhead">Simpan Data Capaian Kinerja</div>
        </q-card-section>

        <form @submit.prevent="addData()">
          <q-card-section class="q-pt-none">
            <br />
            <span class="h_lable">Judul Kegiatan</span>
            <q-input
              v-model="form.judul"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <div class="inputbs"></div>
            <span class="h_lable">Sumber Informasi</span>
            <q-input
              v-model="form.sumber"
              outlined
              square
              :dense="true"
              class="bg-white margin_btn"
            />

            <div class="inputbs"></div>
            <span class="h_lable">Uraian Keterangan</span>
            <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
            <textarea id="editor"></textarea>

            <div class="inputbs"></div>
            <span class="h_lable">Deskripsi Berita</span>
            <textarea v-model="form.deskripsi" class="inputbs"></textarea>

            <div class="inputbs"></div>
            <span class="h_lable">Lampiran Foto/File</span>
            <q-file
              outlined
              v-model="form.file"
              square
              :dense="true"
              class="bg-white margin_btn"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <br />
          </q-card-section>

          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
            <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
            <q-btn
              @click="emptytData(), (mdl_add = false)"
              label="Batal"
              color="negative"
            />
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
          <span class="h_lable">Judul Kegiatan</span>
          <q-input
            v-model="form.judul"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />

          <div class="inputbs"></div>
          <span class="h_lable">Sumber Informasi</span>
          <q-input
            v-model="form.sumber"
            outlined
            square
            :dense="true"
            class="bg-white margin_btn"
          />

          <div class="inputbs"></div>
          <span class="h_lable">Uraian Keterangan</span>
          <!-- <froala style="z-index:9999" :tag="'textarea'" :config="$store.state.configFroala" v-model="form.keterangan">Init text</froala> -->
          <textarea id="editor" v-model="form.uraian"></textarea>

          <div class="inputbs"></div>
          <span class="h_lable">Deskripsi Berita</span>
          <textarea v-model="form.deskripsi" class="inputbs"></textarea>

          <div class="inputbs"></div>
          <span class="h_lable">Lampiran Foto/File</span>
          <q-file
            outlined
            v-model="form.file"
            square
            :dense="true"
            class="bg-white margin_btn"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <br />
        </q-card-section>

        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
          <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
          <q-btn
            @click="emptytData(), (mdl_edit = false)"
            label="Batal"
            color="negative"
          />
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

    <!-- ================================================= MODAL LIHAT ================================================ -->
    <q-dialog v-model="mdl_lihat" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-blue-4">
          <div class="text-h6 h_modalhead">Detil Kegiatan</div>
        </q-card-section>

        <form @submit.prevent="addData()">
          <q-card-section class="q-pt-none">
            <br />
            <span class="h_detil1">{{ form.judul }}</span> <br />
            <span class="h_lable">By : {{ form.createdBy }}</span>
            &nbsp;
            <span class="h_panation">({{ UMUM.tglConvert(form.createdAt) }})</span>

            <!-- <span class="h_detil3">({{form.tahun}})</span> -->

            <hr class="hrpagin" />
            <div class="fr-view" v-html="form.uraian"></div>

            <br />
            <span class="h_fotter_title" style="color: grey"
              >Sumber : {{ form.sumber }}</span
            >
            <br />

            <br />
          </q-card-section>

          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
            <q-btn
              @click="emptytData(), (mdl_lihat = false)"
              label="Kembali"
              color="negative"
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL LIHAT ================================================ -->

    <!-- ================================================= MODAL GAMBAR ================================================ -->
    <q-dialog v-model="mdl_lihat_file" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-blue-9">
          <div class="text-h6 h_modalhead">Detil Capaian Kinerja</div>
        </q-card-section>

        <form @submit.prevent="addData()">
          <q-card-section class="q-pt-none">
            <br />

            <q-img
              :src="$store.state.url.URL_APP + 'uploads/' + fileOld"
              spinner-color="primary"
              spinner-size="82px"
            />

            <br />
          </q-card-section>

          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
            <q-btn
              @click="emptytData(), (mdl_lihat_file = false)"
              label="Kembali"
              color="negative"
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL GAMBAR ================================================ -->

    <!-- =================================================== MODAL =========================================================== -->
  </div>
</template>

<script>
import UMUM from "../../../library/umum";
import WILAYAH from "../../../library/getWilayah";
import uniqid from "uniqid";

export default {
  data() {
    return {
      form: {
        id: "",
        judul: "",
        uraian: "",
        sumber: "",
        deskripsi: "",
        createdAt: "",
        createdBy: "",
        file: null,
        des_kel: "",
        kecamatan: "",
      },

      fileOld: "",

      list_data: [],
      page_limit: 8,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data: true,

      mdl_add: false,
      mdl_edit: false,
      mdl_hapus: false,
      mdl_lihat: false,
      mdl_lihat_file: false,
      btn_add: false,

      UMUM: UMUM,
    };
  },
  methods: {
    getView: function () {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_ADM_KEGIATAN_TERBARU + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          kecamatan: this.form.kecamatan,
          des_kel: this.form.des_kel,
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
          console.log(res_data);
        });
    },

    addData: function (number) {
      var formData = new FormData();

      formData.append("id", uniqid());
      formData.append("judul", this.form.judul);
      formData.append("uraian", document.getElementById("editor").value);
      formData.append("sumber", this.form.sumber);
      formData.append("deskripsi", this.form.deskripsi);
      formData.append("des_kel", this.form.des_kel);
      formData.append("createdAt", UMUM.NOW());
      formData.append("file", this.form.file);

      fetch(this.$store.state.url.URL_ADM_KEGIATAN_TERBARU + "addData", {
        method: "POST",
        headers: {
          // "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: formData,
      }).then((res_data) => {
        this.Notify("Sukses Menambah Data", "primary", "check_circle_outline");
        this.getView();
      });

      // console.log(document.getElementById("editor").value)
    },

    editData: function () {
      var formData = new FormData();

      formData.append("id", this.form.id);
      formData.append("judul", this.form.judul);
      formData.append("uraian", document.getElementById("editor").value);
      formData.append("sumber", this.form.sumber);
      formData.append("deskripsi", this.form.deskripsi);
      formData.append("createdAt", this.form.createdAt);
      formData.append("file", this.form.file);

      formData.append("fileOld", this.fileOld);

      this.form.keterangan = document.getElementById("editor").value;
      fetch(this.$store.state.url.URL_ADM_KEGIATAN_TERBARU + "editData", {
        method: "POST",
        headers: {
          // "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: formData,
      }).then((res_data) => {
        this.Notify("Sukses Merubah Data", "warning", "check_circle_outline");
        this.getView();
      });
    },

    removeData: function (E) {
      fetch(this.$store.state.url.URL_ADM_KEGIATAN_TERBARU + "removeData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          id: this.form.id,
          fileOld: this.fileOld,
        }),
      }).then((res_data) => {
        this.Notify("Sukses Menghapus Data", "negative", "check_circle_outline");
        this.getView();
      });
    },
    selectData: function (data) {
      this.form.id = data.id;
      this.form.judul = data.judul;
      this.form.uraian = data.uraian;
      this.form.deskripsi = data.deskripsi;
      this.form.sumber = data.sumber;
      this.form.createdAt = data.createdAt;
      this.form.createdBy = data.createdBy;
      // this.form.file = data.file;

      this.fileOld = data.file;

      console.log(data.file);
    },

    emptytData: function (data) {
      this.form.id = "";
      this.form.uraian = "";
      this.form.judul = "";
      this.form.sumber = "";
      this.form.deskripsi = "";
      this.form.createdAt = "";
      this.form.createdBy = "";
      this.form.file = null;

      this.fileOld = "";
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

    convert_tgl: function (dateString) {
      var date = new Date(dateString);
      var getBulan = date.getMonth() + 1;
      var bulan = "";
      if (getBulan == "1") {
        bulan = "Jan";
      } else if (getBulan == "2") {
        bulan = "Feb";
      } else if (getBulan == "3") {
        bulan = "Mar";
      } else if (getBulan == "4") {
        bulan = "Apr";
      } else if (getBulan == "5") {
        bulan = "Mei";
      } else if (getBulan == "6") {
        bulan = "Jun";
      } else if (getBulan == "7") {
        bulan = "Jul";
      } else if (getBulan == "8") {
        bulan = "Agt";
      } else if (getBulan == "9") {
        bulan = "Sep";
      } else if (getBulan == "10") {
        bulan = "Okt";
      } else if (getBulan == "11") {
        bulan = "Nov";
      } else if (getBulan == "12") {
        bulan = "Des";
      }

      return date.getDate() + " " + bulan + " " + date.getFullYear();
      // return bulan+ " " + date.getDate() + ". " + date.getFullYear();
    },

    // ====================================== PAGINATE ====================================

    chageDesa() {
      this.form.des_kel = "";
      if (
        this.form.kecamatan == "" ||
        this.form.kecamatan == undefined ||
        this.form.kecamatan == null
      ) {
        WILAYAH.postDesKelAutocomplete();
      } else {
        WILAYAH.postDesKelAutocomplete(this.form.kecamatan);
      }
    },

    filterSelect: function (profile) {
      if (profile.aksesWilayah == 0) {
        WILAYAH.getListDesKelFull();
        this.form.des_kel = profile.des_kel;
        this.$store.state.ID_DES_KEL = profile.des_kel;
        this.disable_des = true;
        this.disable_kec = true;
      } else if (profile.aksesWilayah == 1) {
        this.form.kecamatan = profile.kecamatan;
        WILAYAH.postDesKel(profile.kecamatan);
        this.disable_kec = true;
        this.disable_des = false;
      } else if (profile.aksesWilayah == 2) {
        WILAYAH.getListDesKelFull();
        this.disable_kec = false;
        this.disable_des = false;
      }
    },
  },

  mounted() {
    var profilex = JSON.parse(localStorage.profile);
    var profile = profilex.profile;

    this.filterSelect(profile);

    // new FroalaEditor('textarea#froala-editor')
    this.getView();
  },
};
</script>
