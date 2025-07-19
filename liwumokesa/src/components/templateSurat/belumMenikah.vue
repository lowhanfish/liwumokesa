<template>
    <div class="col-12">
        <div class=" row" style="">
            <div class="" style="justify-content: center; vertical-align: middle; position:absolute; left:60px">
                <img src="img/logos.png" alt="" style="width:60px; margin-top:-7px">
            </div>
            <div class="col-12 text-center" style="">
                <span style="font-size:16px; font-weight:bold">PEMERINTAH KABUPATEN KONAWE SELATAN</span>
                <div style="font-size:14px; font-weight:bold; margin-top:-3px">KECAMATAN {{$store.state.KECAMATAN}}</div> 
                <div style="font-size:22px; font-weight:bold; margin-top:-5px">DESA {{$store.state.DES_KEL}}</div>
            </div>
        </div>

        <hr class="hrSurat">

        <div class="col-12 tbx">
            <table style="width:100%;" class="tbx">
            <tr>
                <td colspan="3" class="text-center">
                    <span style="text-decoration: underline;"><b>SURAT KETERANGAN BELUM NIKAH</b></span> <br>
                    <span style="font-size:12px"><b>Nomor  :</b> <i v-if="form.status == 1">{{form.no}}</i></span>
                </td>
            </tr>



            <tr>
                <td colspan="3" class="" style="padding-top:20px">
                    <span>Yang bertanda tangan dibawah ini  : </span> 
                </td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Nama</td>
                <td>:</td>
                <td><b>{{form.penandatangan}}</b></td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Jabatan</td>
                <td>:</td>
                <td style="text-transform:capitalize;">Kepala Desa <span>{{$store.state.DES_KEL}}</span></td>
            </tr>

            <tr>
                <td style="padding-top:30px" colspan="3">Menerangkan bahwa :  </td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Nama</td>
                <td>:</td>
                <td><b>{{form.nama}}</b></td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Tempat dan tanggal lahir</td>
                <td>:</td>
                <td>{{form.tpt_lahir}}, {{UMUM.tglConvertX(form.tgl_lahir)}}</td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Jenis Kelamin</td>
                <td>:</td>
                <td>{{UMUM.jk(form.jk)}}</td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Kewarganegaraan</td>
                <td>:</td>
                <td>Indonesia</td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Agama</td>
                <td>:</td>
                <td>{{uraian.agama_uraian}}</td>
            </tr>

            <tr>
                <td style="padding-left: 35px">Alamat </td>
                <td>:</td>
                <td>{{form.alamat}}</td>
            </tr>

            <tr>
                <td colspan="3">

                    <p style = "text-indent:30px; padding-top:30px">
                        Yang bersangkutan tersebut diatas adalah benar-benar warga Desa {{$store.state.DES_KEL}} Kecamatan {{$store.state.KECAMATAN}} 
                        Kabupaten Konawe Selatan, yang menurut pengamatan kami yang bersangkutan <b>BELUM PERNAH MENIKAH</b>.
                    </p>

                    <p style = "text-indent:30px;">
                        Demikian Surat Keterangan ini kami buat dan kami berikan kepada yang bersangkutan 
                        untuk dipergunakan sebagaimana mestinya. .
                    </p>

                </td>
            </tr>

            <tr>
                <td ></td>
                <td ></td>
                <td >
                <div class="" style="text-align: right;">
                    <div class="" style="position:absolute; right:50px">
                        <div class="text-center">
                            <span class="">{{$store.state.DES_KEL}},</span> {{UMUM.tglConvertXY(form.editedAt)}}<br>
                            <span>Kepala Desa {{$store.state.DES_KEL}}</span> <br>

                                <div v-if="form.status != 1">
                                    <br><br><br>
                                </div>
                                <!-- {{$store.state.url.URL_APP+'uploads'+form.data.id}} -->
                                <div style="padding:7px" v-if="form.status == 1">
                                    <qrcode-vue :value="$store.state.url.URL_APP+'uploads/'+form.id+'.pdf'" :size="100" level="L"></qrcode-vue>
                                </div>
                            <p style="text-decoration: underline;"><b>{{form.penandatangan}}</b></p>
                        </div>
                    </div>

                </div>
                </td>
            </tr>


            <tr>
                <td style="width:30%"></td>
                <td style="width:2%"></td>
                <td style="width:68%"></td>
            </tr>


            </table>
        </div>

        <div>
            <br><br><br><br><br><br><br><br><br><br>
        </div>

        

    </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue'



import UMUM from "../../library/umum";
// import QrcodeVue from 'qrcode.vue'

export default {
    props: ["form", 'uraian'],
    components: {
        QrcodeVue
    },
    data() {
        return {
            UMUM : UMUM,
            value: 'https://tambosupa.desa.konaweselatankab.go.id/detilKegiatan?id=1l3ulfgqs',

        }
    },

}
</script>

<style>

</style>