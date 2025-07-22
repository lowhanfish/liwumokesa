<template>
  <div class="about" style="padding: 15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="h_titleHead">Data Pegawai</div>
            <div class="text-subtitle2">Data Desa</div>
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
        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
          <table width="100%">
            <tr class="h_table_head bg-grey-5">
              <th width="5%" class="text-center">No</th>
              <th width="30%" class="">Nama</th>
              <th width="20%" class="">Jenis/Kelompok Pamong</th>
              <th width="30%" class="">Jabatan</th>
              <th width="10%"></th>
            </tr>
            <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
              <td class="text-center h_top">{{ indexing(index + 1) }}.</td>
              <td class="h_top">
                {{ data.nama }}.
                <p>{{ data.penandatangan }}</p>
              </td>
              <td class="h_top">{{ data.masterKelompokPamong_uraian }}.</td>
              <td class="h_top">{{ data.masterJenisPamongJabatan_uraian }}.</td>
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
          <div class="h_modalhead">Tambah Data</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_add = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>

        <form @submit.prevent="addData()">
          <q-card-section class="q-pt-none">
            <br />

            <div class="row">
              <!-- <div class="col-12 col-md-12" style="padding-left:1%; padding-right:1%">
                            <span class="h_lable ">Jenis Pamong</span>
                            <select v-model="form.masterJenisPamong" class="bg-white"  outlined square :dense="true">
                              <option value="">-- Pilih Jenis Pamong --</option>
                              <option v-for="data in list_JenisPamong" :key="data.id" :value="data.id">[{{data.id}}] - {{data.uraian}}</option>
                            </select>
                          </div> -->

              <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Nama</span>
                <q-input
                  v-model="form.nama"
                  outlined
                  square
                  :dense="true"
                  class="bg-white margin_btn"
                />
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Kelompok/Lembaga Pamong</span>
                <select
                  v-model="form.masterkelompokPamongJabatan"
                  class="bg-white"
                  outlined
                  square
                  :dense="true"
                  @change="getList()"
                >
                  <option value="">-- Pilih Kelompok Pamong --</option>
                  <option
                    v-for="data in list_KelompokPamongJabatan"
                    :key="data.id"
                    :value="data.id"
                  >
                    - {{ data.uraian }} -
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Pilih Jabatan</span>
                <q-select
                  v-model="form.masterJenisPamongJabatan"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="list_JenisPamongJabatan"
                  option-value="id"
                  option-label="labelGabungan"
                  @filter="postList"
                  emit-value
                  map-options
                  clearable
                  outlined
                  square
                  :dense="true"
                  style="max-width: 100%; width: 100%"
                >
                  <template v-slot:selected="scope">
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          class="text-wrap"
                          style="
                            white-space: normal !important;
                            word-break: break-word !important;
                          "
                        >
                          <div>{{ scope.opt.uraian }}</div>
                          <small class="text-caption">{{ scope.opt.keterangan }}</small>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> Tidak ditemukan </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Tempat Lahir</span>
                <q-input
                  v-model="form.tpt_lahir"
                  outlined
                  square
                  :dense="true"
                  class="bg-white margin_btn"
                />
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Tanggal Lahir</span>
                <q-input
                  v-model="form.tgl_lahir"
                  outlined
                  square
                  :dense="true"
                  class="bg-white margin_btn"
                  type="date"
                />
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Pendidikan</span>
                <select
                  v-model="form.pendidikan"
                  class="bg-white"
                  outlined
                  square
                  :dense="true"
                >
                  <option value="">-- Pilih Pendidikan --</option>
                  <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">
                    {{ data.uraian }}
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Agama</span>
                <select
                  v-model="form.agama"
                  class="bg-white"
                  outlined
                  square
                  :dense="true"
                >
                  <option value="">-- Pilih Agama --</option>
                  <option v-for="data in list_agama" :key="data.id" :value="data.id">
                    {{ data.uraian }}
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
                <span class="h_lable">Penandatangan Layanan</span>
                <select
                  v-model="form.penandatangan"
                  class="bg-white"
                  outlined
                  square
                  :dense="true"
                >
                  <option :value="true">[1]. PenandaTangan</option>
                  <option :value="false">[2]. Bukan PenandaTangan</option>
                </select>
              </div>

              <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
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
              </div>
            </div>

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
          <div class="h_modalhead">Edit Data</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_edit = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <br />
          <div class="row">
            <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Nama</span>
              <q-input
                v-model="form.nama"
                outlined
                square
                :dense="true"
                class="bg-white margin_btn"
              />
            </div>

            <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Kelompok/Lembaga Pamong</span>
              <select
                v-model="form.masterkelompokPamongJabatan"
                class="bg-white"
                outlined
                square
                :dense="true"
                @change="getList()"
              >
                <option value="">-- Pilih Kelompok Pamong --</option>
                <option
                  v-for="data in list_KelompokPamongJabatan"
                  :key="data.id"
                  :value="data.id"
                >
                  - {{ data.uraian }} -
                </option>
              </select>
            </div>

            <div
              class="col-12 col-md-6"
              style="padding-left: 1%; padding-right: 1%"
              v-if="(loadJabatan = true)"
            >
              <span class="h_lable">Pilih Jabatan</span>
              <q-select
                v-model="form.masterJenisPamongJabatan"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="list_JenisPamongJabatan"
                option-value="id"
                option-label="labelGabungan"
                @filter="postList"
                emit-value
                map-options
                clearable
                outlined
                square
                :dense="true"
              >
                <template v-slot:selected="scope">
                  <q-item>
                    <q-item-section>
                      <q-item-label
                        class="text-wrap"
                        style="
                          white-space: normal !important;
                          word-break: break-word !important;
                        "
                      >
                        <div>{{ scope.opt.uraian }}</div>
                        <small class="text-caption">{{ scope.opt.keterangan }}</small>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> Tidak ditemukan </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Tempat Lahir</span>
              <q-input
                v-model="form.tpt_lahir"
                outlined
                square
                :dense="true"
                class="bg-white margin_btn"
              />
            </div>

            <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Tanggal Lahir</span>
              <q-input
                v-model="form.tgl_lahir"
                outlined
                square
                :dense="true"
                class="bg-white margin_btn"
                type="date"
              />
            </div>

            <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Pendidikan</span>
              <select
                v-model="form.pendidikan"
                class="bg-white"
                outlined
                square
                :dense="true"
              >
                <option value="">-- Pilih Pendidikan --</option>
                <option v-for="data in list_pendidikan" :key="data.id" :value="data.id">
                  {{ data.uraian }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Agama</span>
              <select v-model="form.agama" class="bg-white" outlined square :dense="true">
                <option value="">-- Pilih Agama --</option>
                <option v-for="data in list_agama" :key="data.id" :value="data.id">
                  {{ data.uraian }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
              <span class="h_lable">Penandatangan Layanan</span>
              <select
                v-model="form.penandatangan"
                class="bg-white"
                outlined
                square
                :dense="true"
              >
                <option value="true">[1]. PenandaTangan</option>
                <option value="false">[2]. Bukan PenandaTangan</option>
              </select>
            </div>

            <div class="col-12 col-md-12" style="padding-left: 1%; padding-right: 1%">
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
            </div>
          </div>
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
          <div class="h_modalhead">Detil Riwayat Perangkat</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_lihat = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>

        <div class="div_row" style="vertical-align: top">
          <div
            class="div_col text-center div_top"
            @click="mdl_pendidikanNonFormal = true"
          >
            <img
              class="hoverImg"
              style="width: 100%; height: auto"
              src="img/i_pendNonFormal.png"
              alt=""
            />
            <span class="h_label_icon">Pendidikan Non Formal</span>
          </div>
          <div class="div_col text-center div_top" @click="mdl_pendidikanFormal = true">
            <img
              class="hoverImg"
              style="width: 100%; height: auto"
              src="img/i_pendFormal.png"
              alt=""
            />
            <span class="h_label_icon">Pendidikan Formal</span>
          </div>
          <div class="div_col text-center div_top" @click="mdl_keluarga = true">
            <img
              class="hoverImg"
              style="width: 100%; height: auto"
              src="img/i_keluarga.png"
              alt=""
            />
            <span class="h_label_icon">Keluarga</span>
          </div>
          <div class="div_col text-center div_top" @click="mdl_prestasi = true">
            <img
              class="hoverImg"
              style="width: 100%; height: auto"
              src="img/i_prestasi.png"
              alt=""
            />
            <span class="h_label_icon">Prestasi</span>
          </div>
          <div class="div_col text-center div_top" @click="mdl_jabatan_perangkat = true">
            <img
              class="hoverImg"
              style="width: 100%; height: auto"
              src="img/i_pegawai.png"
              alt=""
            />
            <span class="h_label_icon">Jabatan Perangkat</span>
          </div>
        </div>

        <q-card-section class="q-pt-none">
          <hr class="hrpagin" />
          <div class="text-center">
            <q-img
              class="hoverImg"
              :src="$store.state.url.URL_APP + 'uploads/' + fileOld"
              style="width: 250px"
              spinner-color="primary"
              spinner-size="82px"
            />
          </div>
          <hr class="hrpagin" />
          <table width="100%">
            <tr class="h_table_head bg-grey-5">
              <th width="5%" class="text-center">No</th>
              <th width="30%" class="text-center">Nama</th>
              <th width="30%" class="text-center">Ket</th>
            </tr>
            <tr class="h_table_body">
              <td class="text-center h_top">1.</td>
              <td class="h_top">Nama</td>
              <td class="h_top">{{ form.nama }}.</td>
            </tr>
            <tr class="h_table_body">
              <td class="text-center h_top">2.</td>
              <td class="h_top">Jenis Jabatan</td>
              <td class="h_top">{{ form.masterJenisPamong_uraian }}.</td>
            </tr>

            <tr class="h_table_body">
              <td class="text-center h_top">2.</td>
              <td class="h_top">Kelompok Jabatan</td>
              <td class="h_top">{{ form.masterKelompokPamong_uraian }}.</td>
            </tr>

            <tr class="h_table_body">
              <td class="text-center h_top">2.</td>
              <td class="h_top">Jabatan</td>
              <td class="h_top">{{ form.masterJenisPamongJabatan_uraian }}.</td>
            </tr>
            <tr class="h_table_body">
              <td class="text-center h_top">3.</td>
              <td class="h_top">Tempat/Tgl Lahir</td>
              <td class="h_top">
                {{ form.tpt_lahir }} / {{ UMUM.tglConvertX(form.tgl_lahir) }}.
              </td>
            </tr>
            <tr class="h_table_body">
              <td class="text-center h_top">4.</td>
              <td class="h_top">Pendidikan</td>
              <td class="h_top">{{ uraian.pendidikan_uraian }}.</td>
            </tr>
            <tr class="h_table_body">
              <td class="text-center h_top">5.</td>
              <td class="h_top">Agama</td>
              <td class="h_top">{{ uraian.agama_uraian }}.</td>
            </tr>
          </table>
          <br />
        </q-card-section>

        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
          <q-btn
            @click="emptytData(), (mdl_lihat = false)"
            label="Kembali"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL LIHAT ================================================ -->

    <!-- ================================================= MODAL GAMBAR ================================================ -->
    <q-dialog v-model="mdl_lihat_file" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-blue-9">
          <div class="h_modalhead">Detil Capaian Kinerja</div>
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

    <!-- ================================================= MODAL RIWAYAT PENDIDIKAN NON FORMAL ================================================ -->
    <q-dialog v-model="mdl_pendidikanNonFormal" persistent>
      <q-card class="mdl-lg">
        <q-card-section class="bg-purple-3">
          <div class="h_modalhead">List Riwayat Pendidikan Non Formal</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_pendidikanNonFormal = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <pamongPendidikanNonFormal :desaDataPegawaiId="this.form.id" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL RIWAYAT PENDIDIKAN NON FORMAL ================================================ -->

    <!-- ================================================= MODAL RIWAYAT PENDIDIKAN FORMAL ================================================ -->
    <q-dialog v-model="mdl_pendidikanFormal" persistent>
      <q-card class="mdl-lg">
        <q-card-section class="bg-red-4">
          <div class="h_modalhead">List Riwayat Pendidikan Formal</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_pendidikanFormal = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <pamongPendidikanFormal :desaDataPegawaiId="this.form.id" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL RIWAYAT PENDIDIKAN FORMAL ================================================ -->

    <!-- ================================================= MODAL RIWAYAT KELUARGA ================================================ -->
    <q-dialog v-model="mdl_keluarga" persistent>
      <q-card class="mdl-md">
        <q-card-section class="bg-deep-orange-4">
          <div class="h_modalhead">List Riwayat Keluarga</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_keluarga = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <pamongKeluarga />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL RIWAYAT KELUARGA ================================================ -->

    <!-- ================================================= MODAL RIWAYAT PRESTASI ================================================ -->
    <q-dialog v-model="mdl_prestasi" persistent>
      <q-card class="mdl-lg">
        <q-card-section class="bg-lime-7">
          <div class="h_modalhead">List Riwayat Prestasi</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_prestasi = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <pamongPrestasi />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL RIWAYAT PRESTASI ================================================ -->

    <!-- ================================================= MODAL RIWAYAT JABATAN PERANGKAT ================================================ -->
    <q-dialog v-model="mdl_jabatan_perangkat" persistent>
      <q-card class="mdl-lg">
        <q-card-section class="bg-red-3">
          <div class="h_modalhead">List Riwayat Jabatan Perangkat</div>
          <div class="div_exit_modal">
            <a
              @click="mdl_jabatan_perangkat = false"
              class="h_clear1 h_exit"
              href="javascript:void(0);"
              style=""
              >X</a
            >
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <pamongJabatan />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ================================================= MODAL RIWAYAT JABATAN PERANGKAT ================================================ -->

    <!-- =================================================== MODAL =========================================================== -->
  </div>
</template>

<script>
import UMUM from "../../../../library/umum";
import FETCHING from "../../../../library/fetching";
import uniqid from "uniqid";

export default {
  data() {
    return {
      form: {
        id: "",
        nama: "",
        jabatan: "",
        tpt_lahir: "",
        tgl_lahir: "",
        pendidikan: "",
        agama: "",
        penandatangan: true,
        masterJenisPamong: "",
        masterJenisPamongJabatan: "",
        masterkelompokPamongJabatan: "",

        masterJenisPamong_uraian: "",
        masterJenisPamongJabatan_uraian: "",
        masterKelompokPamong_uraian: "",

        createdAt: "",
        createdBy: "",
        file: null,
        des_kel: "",
      },
      uraian: {
        agama_uraian: "",
        pendidikan_uraian: "",
      },

      fileOld: "",

      list_data: [],
      list_pendidikan: [],
      list_agama: [],
      list_JenisPamong: [],
      list_JenisPamongJabatan: [],
      list_KelompokPamongJabatan: [],
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

      mdl_pendidikanNonFormal: false,
      mdl_pendidikanFormal: false,
      mdl_keluarga: false,
      mdl_prestasi: false,
      mdl_jabatan_perangkat: false,

      loadJabatan: false,

      UMUM: UMUM,
    };
  },
  methods: {
    getView: function () {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "view", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token,
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          page_limit: this.page_limit,
          cari_value: this.cari_value,
          des_kel: this.form.des_kel,
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
      // console.log(this.form)
      var formData = new FormData();

      formData.append("id", uniqid());
      formData.append("nama", this.form.nama);
      formData.append("jabatan", this.form.jabatan);
      formData.append("tpt_lahir", this.form.tpt_lahir);
      formData.append("tgl_lahir", this.form.tgl_lahir);
      formData.append("pendidikan", this.form.pendidikan);
      formData.append("des_kel", this.form.des_kel);
      formData.append("agama", this.form.agama);
      formData.append("masterJenisPamongJabatan", this.form.masterJenisPamongJabatan);
      formData.append("penandatangan", this.form.penandatangan);
      formData.append("createdAt", UMUM.NOW());
      formData.append("file", this.form.file);

      // console.log(this.form);

      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "addData", {
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
      formData.append("nama", this.form.nama);
      formData.append("jabatan", this.form.jabatan);
      formData.append("tpt_lahir", this.form.tpt_lahir);
      formData.append("tgl_lahir", this.form.tgl_lahir);
      formData.append("pendidikan", this.form.pendidikan);
      formData.append("agama", this.form.agama);
      formData.append("masterJenisPamongJabatan", this.form.masterJenisPamongJabatan);
      formData.append("penandatangan", this.form.penandatangan);
      formData.append("createdAt", this.form.createdAt);
      formData.append("file", this.form.file);

      formData.append("fileOld", this.fileOld);

      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "editData", {
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
      fetch(this.$store.state.url.URL_ADM_DESA_PEGAWAI + "removeData", {
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

    selectData: async function (data) {
      this.loadJabatan = false;

      this.form.id = data.id;
      this.form.nama = data.nama;
      this.form.jabatan = data.jabatan;
      this.form.tpt_lahir = data.tpt_lahir;
      this.form.tgl_lahir = data.tgl_lahir;
      this.form.pendidikan = data.pendidikan;
      this.form.agama = data.agama;
      this.form.penandatangan = data.penandatangan;
      this.form.createdAt = data.createdAt;
      this.form.createdBy = data.createdBy;
      this.form.des_kel = data.des_kel;
      this.form.masterJenisPamongJabatan = data.masterJenisPamongJabatan;
      this.form.masterkelompokPamongJabatan = data.masterkelompokPamongJabatan;
      this.form.masterKelompokPamong_uraian = data.masterKelompokPamong_uraian;
      // this.form.file = data.file;
      this.form.masterJenisPamong_uraian = data.masterJenisPamong_uraian;
      this.form.masterJenisPamongJabatan_uraian = data.masterJenisPamongJabatan_uraian;

      this.uraian.agama_uraian = data.agama_uraian;
      this.uraian.pendidikan_uraian = data.pendidikan_uraian;

      this.fileOld = data.file;

      const body = { id: data.masterJenisPamongJabatan, uraian: "" };
      this.list_JenisPamongJabatan = await FETCHING.FETCH_POST(
        this.$store.state.url.URL_DATAMASTER_JENIS_PAMONG_JABATAN + "list",
        body
      );
      // console.log(data.file)
      this.loadJabatan = true;

      // console.log(data);

      // console.log(this.form)
    },

    getList: async function () {
      this.list_pendidikan = await FETCHING.FETCH_GET(
        this.$store.state.url.URL_DATAMASTER_PENDIDIKAN
      );
      this.list_agama = await FETCHING.FETCH_GET(
        this.$store.state.url.URL_DATAMASTER_AGAMA
      );
      // this.list_JenisPamong = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_JENIS_PAMONG)

      const body = {
        uraian: "",
        masterkelompokPamongJabatan: this.form.masterkelompokPamongJabatan,
      };
      // this.list_JenisPamongJabatan = await FETCHING.FETCH_POST(this.$store.state.url.URL_DATAMASTER_JENIS_PAMONG_JABATAN+'list', body)

      const result = await FETCHING.FETCH_POST(
        this.$store.state.url.URL_DATAMASTER_JENIS_PAMONG_JABATAN + "list",
        body
      );

      this.list_JenisPamongJabatan = result.map((item) => ({
        ...item,
        labelGabungan: ` ${item.uraian} | ${item.keterangan}`,
      }));
    },

    getList2: async function () {
      this.getList();

      var bodyx = {
        uraian: "",
        masterJenisPamong: "",
      };
      this.list_KelompokPamongJabatan = await FETCHING.FETCH_POST(
        this.$store.state.url.URL_DATAMASTER_KELOMPOK_PAMONG_JABATAN + "list_master",
        bodyx
      );
      // console.log(this.list_KelompokPamongJabatan);
      // console.log(this.list_JenisPamong);
    },

    postList: function (val, update, abort) {
      update(async () => {
        if (val === "") {
        } else {
          const body = { uraian: val };

          const result = await FETCHING.FETCH_POST(
            this.$store.state.url.URL_DATAMASTER_JENIS_PAMONG_JABATAN + "list",
            body
          );

          this.list_JenisPamongJabatan = result.map((item) => ({
            ...item,
            labelGabungan: ` ${item.uraian} | ${item.keterangan}`,
          }));
        }
      });
    },

    emptytData: function (data) {},

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
  },

  mounted() {
    // new FroalaEditor('textarea#froala-editor')

    var profilex = JSON.parse(localStorage.profile);
    var profile = profilex.profile;
    this.$store.state.ID_DES_KEL = profile.des_kel;

    this.form.des_kel = profile.des_kel;

    this.getList2();
    // this.postList('');
    this.getView();
  },
};
</script>
<<<<<<< HEAD =======

<style scoped>
q-menu q-position-engine scroll {
  z-index: 9999 !important;
}
</style>
>>>>>>> origin/jarot
