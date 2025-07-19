<template>
  <div class="about " style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-grey-7 text-white">
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="text-h6 h_titleHead">Home</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section class="abuMudaGrad">
        
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="text-h6 h_titleHead">Home</div>
            <div class="text-subtitle2">Dashboard Roda Mensa</div>
          </div>
          <div class="col-12 col-md-4">
          </div>
          <div class="col-12 col-md-4">
            <div class="row">
              <select v-model="form.tahun" @change="cari_data()" class="bg-white"  outlined square :dense="true">
              <option value="">-- Semua Tahun --</option>
              <option v-for="(data, index) in $store.state.tahun" :key="index" :value="data">{{data}}</option>
            </select>
            </div>

          </div>
        </div>




         <div class="row">
         </div>
          <hr class="hrpagin3">


          <div class="row">
            <div class="col-md-6 col-12 input_kiri " >
              <select :disabled="disable_kec" v-model="form.kecamatan" @change="chageDesa(), cari_data()" class="bg-white"  outlined square :dense="true">
                <option value="">-- Semua Kecamatan --</option>
                <option v-for="data in $store.state.listKecamatan" :key="data.id" :value="data.id">{{data.uraian}}</option>
              </select>
            </div>

            <div class="col-md-6 col-12 input_kanan ">
              <select :disabled="disable_des" v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true">
                <option value="">-- Semua Desa --</option>
                <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
              </select>
            </div>
          </div>

         


         <div class="row">
           <div class="col-12 col-md-4 frWidget " v-for="data in listCabup" :key="data._id">
              <div class="shadow-5 text-center bg-grey-8 frWidgetSub">
                <div>
                  <q-img
                    :src="$store.state.url.URL_APP+'uploads/'+data.fileThumb"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                  <hr  class="hrpagin2">
                </div>

                <div class="text-center">
                  <span  class="text-center" style="font-size:120%; font-weight:bold; color:white">PEROLEHAN : 0 Suara</span> <br>
                  <span style="font-size:120%; font-weight:bold; color:white">PERSENTASE : 0 %</span>
                </div> <br>
             </div>
           </div>


         </div>
         <br>






         <div class="col-12 text-center bg-blue-grey-6  padding1-5" style="margin-left:1.5%; margin-right:1.5%;">
          <span class="h_notifikasi">DEMOGRAFI</span>
        </div>
         <div class="row">


           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="Potensi_Wilayah" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="JenisUsaha" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>


               </div>
             </div>
           </div>



         </div>



         <div class="col-12 text-center bg-blue-grey-7  padding1-5" style="margin-left:1.5%; margin-right:1.5%;">
          <span class="h_notifikasi">PENDUDUK</span>
        </div>
         <div class="row">

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="dataPekerjaan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>


               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="dataPendidikan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="dataAgama" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>


           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="dataKeluarga" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>


           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="PiramidaPenduduk" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="StatusSosial" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>





         </div>












         <div class="col-12 text-center bg-yellow-9 padding1-5" style="margin-left:1.5%; margin-right:1.5%;">
          <span class="h_notifikasi">Fasilitas Layanan</span>
        </div>
         <div class="row">

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananPendidikan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>


               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananPemerintahan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananKesehatan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>


           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananUmum" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>


           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananKeagamaan" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="LayananPenunjang" style="width:100%; height:400px;">
                 <div class="text-center"  v-if="cek_load_data">
                   <q-img
                    style="height:350px"
                    src="img/loading.gif"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                 </div>
               </div>
             </div>
           </div>





         </div>







      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->
              <q-dialog v-model="alert" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Input Nama</span>
                        <q-input outlined square :dense="true" class="bg-white margin_btn" /> 

                        <span class="h_lable ">Input Nama</span>
                        <q-select v-model="model" :options="inputSelect" option-value="id" option-label="nama" outlined square :dense="true" class="bg-white margin_btn"/>
                        <!-- <q-input outlined square :dense="true" class="bg-white margin_btn" />  -->

                        <span class="h_lable ">Cari File</span>
                        <q-file outlined v-model="model" square :dense="true" class="bg-white margin_btn">
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn :loading="simpan1" color="primary" @click="simulateProgress(1)" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>


import CHART from '../library/chart'
import WILAYAH from  '../library/getWilayah'
import UMUM from  '../library/umum.js'

export default {
  data() {
    return {
      alert: false,
      simpan1: false,
      model :'',
      inputSelect : [
        {id : '1', nama : 'kiken', alamat : 'beringin'},
        {id : '2',nama : 'Alung', alamat : 'Anawai'},
      ],
      date : '',
      listCabup : [],

      bar  : {
        jml_dpt : 0,
        jml_relawan : 0,
        jml_dukungan : 0,
      },
      cek_load_data : true,

      form : {
        tahun : '',
        des_kel : '',
        kecamatan : '',
        lev_kec : true,
      },

      disable_kec : false,
      disable_des : false,
    }
  },
  methods: {


  


    Potensi_Wilayah : async function(){
      var body = this.form
      var dataArray = await CHART.postData('PotensiWilayah', body);
      // console.log(dataArray)
      CHART.BarChart('Potensi_Wilayah', 'Potensi Wilayah', 'Data Potensi Wilayah', dataArray.uraian, dataArray.jumlah)
    },

    JenisUsaha : async function(){
      var body = this.form
      var dataArray = await CHART.postData('JenisUsaha', body);
      // console.log(dataArray)
      CHART.chartPie('JenisUsaha', 'Jenis Usaha (Org/%)', dataArray)
    },


    dataPendidikan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('Pendidikan', body);
      // console.log(dataArray)
      CHART.BarChart('dataPendidikan', 'Data Pendidikan', 'Data Potensi Wilayah', dataArray.uraian, dataArray.jumlah)
    },

    dataPekerjaan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('Pekerjaan', body);
      // console.log(dataArray)
      CHART.chartPie('dataPekerjaan', 'Data Pekerjaan (Org/%)', dataArray)
    },

    dataAgama: async function(){
      var body = this.form
      var dataArray = await CHART.postData('Agama', body);
      // console.log(dataArray)
      CHART.chartPie3D('dataAgama', 'Agama (Org/%)', dataArray)
    },

    dataKeluarga : async function(){
      var body = this.form
      var dataArray = await CHART.postData('Keluarga', body);
      // console.log(dataArray)
      CHART.chartPie('dataKeluarga', 'Data Keluarga (Org/%)', dataArray)
    },

    PiramidaPenduduk : async function(){
      var body = this.form
      var dataArray = await CHART.postData('PiramidaPenduduk', body);
      // console.log(dataArray)
      CHART.BarChart('PiramidaPenduduk', 'Potensi  Piramida Penduduk', 'Usia/Org', dataArray.uraian, dataArray.jumlah)
    },

    StatusSosial: async function(){
      var body = this.form
      var dataArray = await CHART.postData('StatusSosial', body);
      // console.log(dataArray)
      CHART.chartPie3D('StatusSosial', 'Status Sosial (Org/%)', dataArray)
    },



    LayananPendidikan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananPendidikan', body);
      // console.log(dataArray)
      CHART.chartPie('LayananPendidikan', 'Data Fasilitas Pendidikan (Unit/%)', dataArray)
    },
    LayananPemerintahan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananPemerintahan', body);
      // console.log(dataArray)
      CHART.chartPie('LayananPemerintahan', 'Data Fasilitas Pemerintahan (Unit/%)', dataArray)
    },
    LayananKesehatan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananKesehatan', body);
      // console.log(dataArray)
      CHART.chartPie('LayananKesehatan', 'Data Fasilitas Kesehatan (Unit/%)', dataArray)
    },
    LayananUmum : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananUmum', body);
      // console.log(dataArray)
      CHART.chartPie('LayananUmum', 'Data Fasilitas Umum (Unit/%)', dataArray)
    },
    LayananKeagamaan : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananKeagamaan', body);
      // console.log(dataArray)
      CHART.chartPie('LayananKeagamaan', 'Data Fasilitas Keagamaan (Unit/%)', dataArray)
    },
    LayananPenunjang : async function(){
      var body = this.form
      var dataArray = await CHART.postData('LayananPenunjang', body);
      // console.log(dataArray)
      CHART.chartPie('LayananPenunjang', 'Data Fasilitas Penunjang (Org/%)', dataArray)
    },



    cari_data(){
      this.Potensi_Wilayah();
      this.JenisUsaha();
      this.dataPendidikan();
      this.dataPekerjaan();
      this.dataAgama();
      this.dataKeluarga();
      this.PiramidaPenduduk();
      this.StatusSosial();

      this.LayananPendidikan();
      this.LayananPemerintahan();
      this.LayananKesehatan();
      this.LayananUmum();
      this.LayananKeagamaan();
      this.LayananPenunjang();
    },




    

    async button(){
      await setTimeout(() => {
        console.log('ini query pembacaannya')
      }, 2000);
      // console.log('telASO')
    },

    pembulatan(n){
      return n.toFixed(2);
    },


    chageDesa(){
      this.form.des_kel = ''
      if (this.form.kecamatan == '' || this.form.kecamatan == undefined || this.form.kecamatan == null) {
        WILAYAH.postDesKelAutocomplete();
      } else {
        WILAYAH.postDesKelAutocomplete(this.form.kecamatan);
        
      }
    },


    filterSelect : function(profile){
      if (profile.aksesWilayah == 0) {
        WILAYAH.getListDesKelFull();
        this.form.des_kel = profile.des_kel
        this.disable_des = true
        this.disable_kec = true
      } else if (profile.aksesWilayah == 1) {
        this.form.kecamatan = profile.kecamatan
        WILAYAH.postDesKel(profile.kecamatan)
        this.disable_kec = true
        this.disable_des = false

      } else if (profile.aksesWilayah == 2) {
        WILAYAH.getListDesKelFull();
        this.disable_kec = false
        this.disable_des = false
      }
    },







  },

  mounted () {
    // this.getBarRelawan();
    // this.getBarDukungan();
    // this.getCabup();
    // this.getBar();
    // this.Potensi_Wilayah();
    // this.JenisUsaha();
    // this.button();
    this.form.tahun = UMUM.getTahun();
    WILAYAH.getListKecamatan();
    


    var profilex = JSON.parse(localStorage.profile)
    var profile = profilex.profile
    this.$store.state.ID_DES_KEL = profile.des_kel

    this.filterSelect(profile)

    
    this.cari_data();

    // console.log(this.$store.state.ID_DES_KEL)


  },
}
</script>




