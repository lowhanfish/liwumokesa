<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-light-green-7 text-white">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="text-h6 h_titleHead">Fasilitas Layanan Kesehatan</div>
            <div class="text-subtitle2">Data Kecamatan</div>
          </div>
          <div class="col-12 col-md-4">
            <select v-model="form.tahun" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%">
              <option value="">-- Semua Tahun --</option>
              <option v-for="(data, index) in $store.state.tahun" :key="index" :value="data">{{data}}</option>
            </select>
          </div>
          <div class="col-12 col-md-4">
            <div class="row">
              <select v-model="form.des_kel" @change="cari_data()" class="bg-white"  outlined square :dense="true" style="width:90%">
                <option value="">-- Semua Desa --</option>
                <option v-for="data in $store.state.listDesKel" :key="data.uniqid" :value="data.uniqid">{{data.uraian}}</option>
              </select>
              <q-btn glossy class="bg-light-blue-10" @click="$router.push('/desa_layananKesehatan')" dense flat icon="settings" style="width:10%">
                  <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                    Click untuk memperbaharui data
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
                <th width="10%" class="text-center">No</th>
                <th width="60%" class="">Uraian</th>
                <th width="10%" class="text-center">Tahun</th>
                <th width="20%" class="text-center">Jumlah</th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data._key">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="">{{data.uraian}}</td>
                <td class="text-center">{{form.tahun}}</td>
                <td class="text-center">{{data.jumlah}} Unit</td>
               
              </tr>

            </table>

          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin">
       

      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->



          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>

import UMUM from  '../../../../library/umum.js'
import WILAYAH from  '../../../../library/getWilayah'
import FETCHING from  '../../../../library/fetching'
import CHART from  '../../../../library/chart'
import uniqid from 'uniqid';


export default {
  data() {
    return {

      form : {
        id : '',
        des_kel : '',
        tahun : '',
      },
     
      list_data : [],

      page_limit : 14,
      page_first: 1,
      page_last: 0,
      cari_value: "",
      cek_load_data : true,

    }
  },
  methods: {


    getView : async function(){
      var body = this.form
      this.list_data = await CHART.postDataPublish('LayananKesehatan', body);
      console.log(this.list_data)
    },


    btnAdd(){
      this.$router
    },

  

        cari_data : function(){
            this.page_first = 1;
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },


     



    // ====================================== PAGINATE ====================================



  },

  mounted () {
    this.form.tahun = UMUM.getTahun();
    WILAYAH.getListDesKelFull();
    this.getView();
    // FETCHING.getJenisUsaha();


    
  },
}
</script>




 