<template>
    <div>
        <div class="containerku">
            <div class="row">
                <div class="col-12 col-md-8">


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
               

                <hr class="hrdetilberita" /> 

                <div class="q-pa-md">

                <q-markup-table separator="vertical" flat bordered style="width:100%">
                    <thead>
                        <tr class="bg-yellow-9 text-white" >
                            <th class="text-center" style="width:10%">No.</th>
                            <th class="text-center">Nama Wilayah</th>
                            <th class="text-center">Potensi</th>   
                            <th class="text-center">Jumlah</th>   
                            <!-- <th class="text-center">Jabatan</th>   -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in list_data" :key="index"> 
                            <td class="text-center">{{indexing(index+1)}}.</td>
                            <td class="text-left">  {{data.des_kel_uraian}}  </td>
                            <td class="text-left"> {{data.masterPotensiWilayah_uraian}} </td>  
                            <td class="text-center">  {{data.jumlah}} </td> 
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
                                <div class="text-h6 h_modalhead text-center">Detil Wilayah</div>
                            </q-card-section>

                            <form @submit.prevent="addData()">
                                <q-card-section class="q-pt-none">
                                    <br><br>

                                    <q-markup-table separator="vertical" flat bordered style="width:100%"> 
                                        <tr class="bg-teal-4"> 
                                            <td class="text-left" style="width:100%" colspan="2">WILAYAH</td> 
                                        </tr> 
                                        <tr>
                                            <td class="text-left" style="width:30%">Nama Wilayah</td>
                                            <td class="text-left" style="width:70%">{{form.des_kel_uraian}} </td>  
                                        </tr>
                                        <tr> 
                                            <td class="text-left" style="width:30%">Luas Wilayah</td>
                                            <td class="text-left" style="width:70%">{{form.luas}} </td>  
                                        </tr> 

                                        <tr class="bg-teal-4"> 
                                            <td class="text-left" style="width:100%" colspan="2">DATA POTENSI WILAYAH</td> 
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Pertanian</td>
                                            <td class="text-left" style="width:70%">200 Ha </td>  
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Perkebunan</td>
                                            <td class="text-left" style="width:70%">200 Ha </td>  
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Peternakan</td>
                                            <td class="text-left" style="width:70%">200 Ha </td>  
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Pertambangan</td>
                                            <td class="text-left" style="width:70%">200 Ha </td>  
                                        </tr> 
                                        <tr class=""> 
                                            <td class="text-left" style="width:30%">Perikanan</td>
                                            <td class="text-left" style="width:70%">200 Ha </td>  
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
import UMUM         from "../../../library/umum"        
import WILAYAH      from "../../../library/getWilayah"  
import CHART        from '../../../library/chart'


export default {
  data() {
    return { 
    cek_load_data : true,
      form : {
        id : '',
        masterPotensiWilayah : '',
        des_kel : this.$store.state.ID_DES_KEL,
        jumlah : '',
        tahun : '2020',
        createdAt : '',
      },

      list_data: [],
      listKegiatan: [],

      page_limit: 1000,
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
      fetch(this.$store.state.url.URL_CNT_DESA_POTENSI_WILAYAH + "view", {
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

    selectData : function(data){
        this.form.id = data.id;
        this.form.jumlah = data.jumlah;

        this.form.masterPotensiWilayah = data.masterPotensiWilayah;
        this.form.des_kel = data.des_kel;
        this.form.jumlah = data.jumlah;
        this.form.tahun = data.tahun;

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
            this.Potensi_Wilayah();
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },




    // ====================================== PAGINATE ====================================

    // ====================================== CHART
    Potensi_Wilayah : async function(){
      var body = this.form
      var dataArray = await CHART.postData(this.$store.state.url.URL_CNT_DESA_POTENSI_WILAYAH, 'PotensiWilayah', body);
    //   console.log(dataArray)
      CHART.BarChart('Potensi_Wilayah', 'Potensi Wilayah', 'Data Potensi Wilayah', dataArray.uraian, dataArray.jumlah, 'Ha')
    },
    // ====================================== CHART

  },
  mounted() {

      var profilex = JSON.parse(localStorage.profile)
      var profile = profilex.profile
      this.$store.state.ID_DES_KEL = profile.des_kel
      this.form.des_kel = profile.des_kel
      
    this.$store.state.kegiatan.id = this.$route.query.id;
    // this.$store.commit('getOne')
    WILAYAH.getListDesKelFull();
    // this.getView();
    this.cari_data();
  }
};
</script>

<style>
tr:nth-child(even) {
  background-color: #3498db14;
}
</style>