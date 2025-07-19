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
                        <select v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%">
                            <option value="">-- Semua Kecamatan --</option>
                            <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
                        </select>
                    </div>
                </div>
                <hr class="hrdetilberita" /> 
                <div id="barchartnya" style="width:100%; height:400px;">
                    <div class="text-center"  v-if="cek_load_data">
                        <h6>Load Data ...</h6>
                    </div>
                </div>

                <div class="q-pa-md">

                <q-markup-table separator="vertical" flat bordered style="width:100%">
                    <thead>
                        <tr class="bg-teal-5 text-white" >
                            <th class="text-center" style="width:10%">No.</th>
                            <th class="text-center">Nama Usaha</th>
                            <th class="text-center">Tipe Usaha</th>
                            <th class="text-center">Orang</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in list_data" :key="index"> 
                            <td class="text-center">1.</td>
                            <td class="text-left">{{data.uraian}}  </td>
                            <td class="text-center">{{form.tahun}} </td> 
                            <td class="text-center">{{data.jumlah}} </td> 
                            <!-- <td class="text-center">Kepala Kepala</td>   -->
                            

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
                            <q-card-section class="bg-teal-5">
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
import UMUM         from "../../library/umum"        ;
import WILAYAH      from "../../library/getWilayah"  ;
import CHART        from '../../library/chart'       ;
import FETCHING     from '../../library/fetching'       ;



export default {
  data() {
    return {
      form : {
        id : '',
        des_kel : '',
        tahun : '2020',
      },
     
      list_data : [],
      cek_load_data : true, 

      page_limit: 100,
      page_first: 1,
      page_last: 0,
      cari_value: "",

      mdl_lihat : false,  
      UMUM: UMUM
    };
  },
  methods: { 

    getView : async function(){
      var body = this.form
      this.list_data = await FETCHING.postDataPublish(this.$store.state.url.URL_CNT_KECAMATAN_KECAMATAN ,'JenisUsaha', body);
      var a = this.list_data
      console.log(a)
    },
    chartnya : async function(){
      var body = this.form
      var dataArray = await CHART.postData(this.$store.state.url.URL_CNT_KECAMATAN_DASHBOARD, 'JenisUsaha', body);
      console.log(dataArray)
      CHART.BarChart('barchartnya', 'Potensi Wilayah', 'Data Potensi Wilayah', dataArray.uraian, dataArray.jumlah)
    },
    indexing : function(index){
        var idx = ((this.page_first-1)*this.page_limit)+index
        return idx
    },

    cari_data: function() {
      this.page_first = 1;
      this.getView();
      this.chartnya();
    }, 
 
  },
  mounted() {
    this.$store.state.kegiatan.id = this.$route.query.id; 
    WILAYAH.getListDesKelFull();
    this.cari_data();
  }
};
</script>