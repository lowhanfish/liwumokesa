<template>
  <div>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="40%">Jenis</th>
          <th width="25%" class="text-center">Tahun Perolehan</th>
          <th width="30%">Sumber</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_pelaops" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          <td class="h_top">{{data.jenis}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
          <td class="h_top">{{data.sumber}}</td>

        </tr>
      </table>

    </div>












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
            jenis : '',
            tahun : 2022,
            sumber : 'Pengadaan BUMDes',
            createdAt : '',
            des_kel : '',
        },


        list_data : [],
        list_pendidikan : [],
          cek_load_data : true,


        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,

        FETCHING : FETCHING,
    }
  },
  methods: {


    getView : function(){

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_kops", {
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

      });
    },

    selectData : function(data){

            this.form.id = data.id;
            this.form.jenis = data.jenis;
            this.form.tahun = data.tahun;
            this.form.sumber= data.sumber;
            this.form.createdAt = data.createdAt;
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
        },




    // ====================================== PAGINATE ====================================







  },

  mounted () {
    // this.FETCHING.postPendidikan()
    this.getView();

      
  },
}
</script>




 

<style>

</style>