<template>
  <div>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="25%">Nama</th>
          <th width="25%">Alamat</th>
          <th width="15%" class="text-center">Pendidikan</th>
          <th width="15%">Telp/WA</th>
          <th width="15%">Jml Honor</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_pelaops" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          <td class="h_top">
            {{data.nama}} <br>
            <i class="f_captions4" style="color:gray; font-weight:bold; font-size:9pt">{{data.jabatan}}</i>
          </td>
          <td class="h_top">{{data.alamat}}</td>
          <td class="h_top text-center">{{data.pendidikan_uraian}}</td>
          <td class="h_top">{{data.no_telp}}</td>
          <td class="h_top">{{data.honor}}</td>
        </tr>
      </table>

    </div>




    <!-- =================================================== MODAL =========================================================== -->
           


          <!-- =================================================== MODAL =========================================================== -->














  </div>
</template>

<script>

import UMUM from  '../../../library/umum'
import FETCHING from  '../../../library/fetching'
import WILAYAH from  '../../../library/getWilayah'
import uniqid from 'uniqid';

export default {
  props: ["id_bumDes"],
  data() {
    return {

        form : {
            id : '',
            id_bumDes : this.id_bumDes,
            nama : '',
            jabatan : '',
            alamat : '',
            pendidikan_terahir : '',
            no_telp : '',
            honor : '',
            createdAt : '',
            des_kel : '',
        },


        list_data : [],
        list_pendidikan : [],
          cek_load_data : true,


        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_pelaops", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              id_bumDes: this.form.id_bumDes,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.$store.state.list_pelaops = res_data;

              // console.log(res_data);

      });
    },


    selectData : function(data){
      this.form.id = data.id
      this.form.id_bumDes = data.id_bumDes
      this.form.nama = data.nama
      this.form.jabatan = data.jabatan
      this.form.alamat = data.alamat
      this.form.pendidikan_terahir = data.pendidikan_terahir
      this.form.no_telp = data.no_telp
      this.form.honor = data.honor
      this.form.createdAt = data.createdAt
      this.form.des_kel = data.des_kel
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
            this.getView();
        },

        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },


        getList : async function(){
          this.list_pendidikan = await FETCHING.FETCH_GET(this.$store.state.url.URL_DATAMASTER_PENDIDIKAN);
          console.log(this.list_pendidikan);
        },




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    this.getList()
    this.getView();

      
  },
}
</script>




 

<style>

</style>