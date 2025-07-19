<template>
  <div>
    <hr class="hrpagin">
    <div class="tbl_responsive">
      <table width="100%">
        <tr class="h_table_head bg-grey-5">
          <th width="5%" class="text-center">No</th>
          <th width="45%">Jenis Sarana/Kondisi</th>
          <th width="25%">Jenis Alat/Sumber</th>
          <th width="15%">Status Alat</th>
          <th width="10%" class="text-center">Tahun Perolehan</th>
        </tr>
        <tr class="h_table_body" v-for="(data,index) in $store.state.list_sarana" :key="data.id">
          <td class="text-center h_top">{{index+1}}.</td>
          <td class="h_top">
            {{data.jenis_sarana}}
            <br><i class="f_captions4" style="color:#88B386; font-weight:bold; font-size:9pt">{{data.kondisi_sarana}}</i>
          </td>
          <td class="h_top">
            {{data.jenis_alat}}
            <br><i class="f_captions4" style="color:#88B386; font-weight:bold; font-size:9pt">{{data.sumber_alat}}</i>
          </td>
          <td class="h_top">{{data.status}}</td>
          <td class="h_top text-center">{{data.tahun}}</td>
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
            jenis_sarana : '',
            kondisi_sarana : '',
            jenis_alat : '',
            sumber_alat : '',
            tahun : '',
            status : '',
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

      fetch(this.$store.state.url.URL_CNT_BUMDES + "view_sarProd", {
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
              // console.log(res_data);
              this.$store.state.list_sarana = res_data;

      });
    },


    selectData : function(data){

            this.form.id = data.id;
            this.form.jenis_sarana = data.jenis_sarana;
            this.form.kondisi_sarana = data.kondisi_sarana;
            this.form.jenis_alat = data.jenis_alat;
            this.form.sumber_alat = data.sumber_alat;
            this.form.tahun = data.tahun;
            this.form.status= data.status;
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