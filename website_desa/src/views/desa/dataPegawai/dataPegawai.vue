<template>
    <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-8">
                <!-- <q-btn-group spread>
                    <q-btn @click="changeKategory('Prestasi')" color="amber-8" label="PRESTASI" icon="timeline" />
                    <q-btn @click="changeKategory('Pembangunan')" color="amber-7" label="PEMBANGUNAN " icon="account_balance" />
                </q-btn-group> -->

                <br />

                <div class="row">
                    <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
                    <!-- <select v-model="form.tahun" @change="cari_data()" class="inputbs">
                        <option value>-- Semua Pegawai --</option>
                        <option
                        v-for="(data, index) in Pangkat"
                        :key="index"
                        :value="data"
                        >{{data.Pangkat}}</option>
                    </select> -->
                    </div>

                    <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
                    <!-- <q-input
                        @keyup.enter="cari_data()"
                        color="grey-3"
                        label-color="orange"
                        outlined
                        square
                        :dense="true"
                        v-model="cari_value"
                        label="Cari Nama / NIP.. "
                    > 
                        <template v-slot:after>
                        <q-btn @click="cari_data()" dense class="bg-yellow-9" icon="search" />
                        </template>
                    </q-input> -->
                    </div>
                </div>

                <hr class="hrdetilberita" /> 

                <div class="q-pa-md">

                <q-markup-table separator="vertical" flat bordered style="width:100%">
                    <thead>
                        <tr class="bg-yellow-9 text-white" >
                            <th class="text-center" style="width:10%">No.</th>
                            <th class="text-center">Nama</th>
                            <th class="text-center">Tempat Tanggal Lahir</th>  
                            <th class="text-center">Jabatan</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in list_data" :key="index"> 
                            <td class="text-center">{{indexing(index+1)}}.</td>
                            <td class="text-left"><a class="text-black" href="#" style="text-decoration: none;" @click="mdl_lihat = true, selectData(data)" >{{data.nama}}</a> </td>
                            <td class="text-center">{{data.tpt_lahir}} - {{data.tgl_lahir}}</td> 
                            <td class="text-center">{{data.jabatan}}</td>  
                        </tr> 
                    </tbody>
                </q-markup-table>
<!-- agama: "01"
agama_uraian: "Islam"
createdAt: "2020-11-24 16:12:9"
createdBy: "kikensbatara"
file: "1606209129303.png"
fileThumb: "thumbnail1606209129303.png"
id: "1khvrg01s"
jabatan: "Karo"
nama: "ABCD"
nip: null
pangkat_gol: null
pendidikan: "3"
pendidikan_uraian: "SMA"
tgl_lahir: "1996-09-08"
tpt_lahir: "Raha" -->


                    <!-- <q-list bordered class="rounded-borders">
                    <q-list bordered>
                        <template v-for="data in listData">

                            <div :key="data._key" class="row" style="padding-top:5px">
                               
                                <div  class="col-12 col-md-3" style="padding : 10px">
                                <q-img
                                    @click="mdl_lihat = true, selectData(data)"
                                    class="imgList"
                                    src="img/user.jpg"
                                    :ratio="4/3"
                                    spinner-color="primary"
                                    spinner-size="82px"
                                />
                                </div>
                                <div class="col-12 col-md-9" style="padding : 10px 10px 10px 10px">
                                <a href="JavaScript:Void(0)" class="a_polos" @click="mdl_lihat = true, selectData(data)">
                                    <span class="f_captions1">Nama :</span> <br>
                                    <span class="f_captions2">NIP : 080808080808</span> <br>
                                    <span class="f_captions3">Jabatan : Kepala Dinas </span> 
                                </a>
                                </div>
                                <q-separator />
                            </div>

                        </template>
                    </q-list>
                    </q-list> -->


                </div>

                <br />
                <hr class="hrdetilberita" />
                <br />
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
                    ></q-pagination>
                </div>




                <!-- ================================================= MODAL LIHAT ================================================ -->
                    <q-dialog v-model="mdl_lihat" persistent>
                        <q-card class="mdl-md">
                        <q-card-section class="bg-yellow-9">
                            <div class="text-h6 h_modalhead text-center">Detil Pegawai</div>
                        </q-card-section>

                        <form @submit.prevent="addData()">
                            
                            <q-card-section class="q-pt-none">

 
                                <div class="q-mt-md q-mb-md text-center">
                                    <q-img
                                    class="hoverImg"
                                    :src="$store.state.url.URL_APP+'uploads/'+form.file"
                                    style="width:250px"
                                    spinner-color="primary"
                                    spinner-size="82px" />
                                </div>
 

                                <q-markup-table separator="vertical" flat bordered style="width:100%"> 
                  
                                    <tr> 
                                        <td class="text-left" style="width:30%">Nama</td>
                                        <td class="text-left" style="width:70%">{{form.nama}} </td>  
                                    </tr>
                                    <tr> 
                                        <td class="text-left" style="width:30%">Tempat, Tanggal Lahir</td>
                                        <td class="text-left" style="width:70%">{{form.tpt_lahir}} {{form.tgl_lahir}} </td>  
                                    </tr>
                                    <tr> 
                                        <td class="text-left" style="width:30%">Jabatan</td>
                                        <td class="text-left" style="width:70%">{{form.jabatan}} </td>  
                                    </tr> 

                                </q-markup-table>  

                                <br>

                            </q-card-section>

                            <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                                <q-btn @click="mdl_lihat = false" label="Kembali" color="negative"  />
                            </q-card-actions>

                        </form>
                        </q-card>
                    </q-dialog>
                    <!-- ================================================= MODAL LIHAT ================================================ -->









                </div>
                <div class="col-12 col-md-4 paddingSideMenu">
                <SideContent />
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import UMUM from "../../../library/umum";

export default {
  data() {
    return {
      Pangkat:[{Pangkat:'Pangkat/Golongan 1'},{Pangkat:'Pangkat/Golongan 2'}],
      form: {
        id: "",
        agama:'',
        agama_uraian:'',
        createdAt:'',
        createdBy:'',
        file:'',
        fileThumb:'',
        id:'',
        jabatan:'',
        nama:'',
        nip:'',
        pangkat_gol:'',
        pendidikan:'',
        pendidikan_uraian:'',
        tgl_lahir:'',
        tpt_lahir:'',
      },
      list_data: [],
      listKegiatan: [],

      page_limit: 10,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      mdl_lihat : false,

      UMUM: UMUM
    };
  },
  methods: {
    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_DESA_DATA_PEGAWAI + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
        //   authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              data_ke: this.page_first,
              page_limit : this.page_limit,
              cari_value: this.cari_value
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data = res_data.data;
              this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },
    selectData : function(data){
            this.form.id = data.id;
 
            this.form.agama = data.agama
            this.form.agama_uraian = data.agama_uraian
            this.form.createdAt = data.createdAt
            this.form.createdBy = data.createdBy
            this.form.file = data.file
            this.form.fileThumb = data.fileThumb
            this.form.id = data.id
            this.form.jabatan = data.jabatan
            this.form.nama = data.nama
            this.form.nip = data.nip
            this.form.pangkat_gol = data.pangkat_gol
            this.form.pendidikan = data.pendidikan
            this.form.pendidikan_uraian = data.pendidikan_uraian
            this.form.tgl_lahir = data.tgl_lahir
            this.form.tpt_lahir = data.tpt_lahir
    },

    cari_data: function() {
      this.page_first = 1;
      this.getView();
    },
    indexing: function(index) {
      var idx = (this.page_first - 1) * this.page_limit + index;
      return idx;
    },
    changeKategory(data){
      console.log(data)
      this.form.kategori = data
      this.getView()
    },
  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id;
    // this.$store.commit('getOne')
    this.cari_data();
  }
};
</script>