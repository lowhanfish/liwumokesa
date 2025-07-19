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
                     <select v-model="form.tahun" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%">
                        <option value="">-- Semua Tahun --</option>
                        <option v-for="(data, index) in $store.state.tahun" :key="index" :value="data">{{data}}</option>
                    </select>
                    </div>

                    <div class="col-12 col-md-6" style="padding : 0% 1% 2% 1%">
                         <select v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%" disabled>
                            <option value="">-- Semua Desa --</option>
                            <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
                        </select>
                    </div>
                </div>

                <hr class="hrdetilberita" /> 
                <div id="Potensi_Wilayah" style="width:100%; height:400px;">
                    <div class="text-center"  v-if="cek_load_data">
                        <h6>Load Data ...</h6>
                    </div>
                </div>

                <div class="q-pa-md"> 

                <q-markup-table separator="vertical" flat bordered style="width:100%">
                    <thead>
                        <tr class="bg-yellow-9 text-white">
                            <th class="text-center" style="width:10%">No.</th>
                            <th class="text-center">Wilayah</th>
                            <th class="text-center">Kepala Keluarga</th>
                            <th class="text-center">Pria</th>
                            <th class="text-center">Wanita</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in list_data" :key="index">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                            <td class="text-left">{{data.des_kel_uraian}} </td> 
                            <td class="text-center"> {{data.kk}} KK </td> 
                            <td class="text-center"> {{data.pria}} Orang </td> 
                            <td class="text-center"> {{data.wanita}} Orang</td> 
                        </tr>
 
                    </tbody>
                </q-markup-table>


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
                <!-- style="width: 700px; max-width: 80vw;" -->
                    <q-dialog v-model="mdl_lihat" persistent>
                        <q-card class="mdl-md" style="width: 100%; max-width: 80vw;" >
                            <q-card-section class="bg-yellow-9">
                                <div class="text-h6 h_modalhead text-center">Detil Data</div>
                            </q-card-section>

                            <form @submit.prevent="addData()">
                                <q-card-section class="q-pt-none">

                                    <!-- <q-img
                                        src="img/user.jpg"
                                        spinner-color="primary"
                                        spinner-size="82px"
                                    /> -->

 
                                    <br><br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> 
                                        <tr class="bg-teal-4"> 
                                            <td class="text-left" style="width:100%" colspan="2">Perdagangan / Industri</td> 
                                        </tr> 
                                        <tr>
                                            <td class="text-left" style="width:30%">Perdagangan / Industri</td>
                                            <td class="text-left" style="width:70%">PT JAYA BAYA </td>  
                                        </tr>
                                        <tr> 
                                            <td class="text-left" style="width:30%">Orang</td>
                                            <td class="text-left" style="width:70%">200 Orang</td>  
                                        </tr> 

                                        <tr class="bg-teal-4"> 
                                            <td class="text-left" style="width:100%" colspan="2">DATA Perdagangan / Industri</td> 
                                        </tr>

                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Alamat</td>
                                            <td class="text-left" style="width:70%">Jl. ABcDE </td>  
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Tipe Usaha</td>
                                            <td class="text-left" style="width:70%">Industri </td>  
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
import UMUM         from "../../../library/umum"        ;
import WILAYAH      from "../../../library/getWilayah"  ;
import CHART        from '../../../library/chart';

export default {
  data() {
    return {
      form : {
        id : '',
        kk : '',
        des_kel : this.$store.state.ID_DES_KEL,
        pria : '',
        wanita : '',
        tahun : '2020',
        createdAt : '',
      },
     
      list_data : [],
      listKegiatan: [],

      page_limit: 10,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      mdl_lihat : false,
      cek_load_data : true,

      UMUM: UMUM
    };
  },
  methods: {
    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_CNT_DESA_DATA_KELUARGA + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
        //   authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              data_ke: this.page_first,
              page_limit : this.page_limit,
              tahun: this.form.tahun,
              des_kel : this.form.des_kel
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_data = res_data.data;
              this.page_last = res_data.jmlData;
              this.$store.commit("hideLoading");
            //   console.log(res_data);
      });
    }, 

    dataKeluarga : async function(){
      var body = this.form
      var dataArray = await CHART.postData(this.$store.state.url.URL_CNT_DESA_DATA_KELUARGA, 'char_data_keluarga', body);
      console.log(dataArray)
      CHART.BarChart('Potensi_Wilayah', 'Data Penduduk', 'Data Penduduk/keluarga', dataArray.uraian, dataArray.jumlah, '')  
    },

    // ====================================== PAGINATE ====================================
        Notify : function(message, positive, icon){
          this.$q.notify({
            message: message,
            color: positive,
            icon: icon,
            position : 'top',
            timeout: 500,
          })
        },

        cari_data : function(){
            this.page_first = 1;
            this.dataKeluarga();
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },


        // fetching : async function(){
        //   var ss = await FETCHING.getJenisUsaha();
        //   console.log(ss)
        // }




    // ====================================== PAGINATE ====================================
  },
  mounted() {

      var profilex = JSON.parse(localStorage.profile)
    var profile = profilex.profile
    this.$store.state.ID_DES_KEL = profile.des_kel
    this.form.des_kel = profile.des_kel

    this.$store.state.kegiatan.id = this.$route.query.id;
    this.cari_data();
    this.form.tahun = this.UMUM.getTahun();
    WILAYAH.getListDesKelFull();
  }
};
</script>

<style>
tr:nth-child(even) {
  background-color: #3498db14;
}
</style>