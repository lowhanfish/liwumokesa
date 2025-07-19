// import {store1} from '../store/index'

var DataStore = require('../store');
var store = DataStore.default

// const fetchPOST =  () =>{
//     return 'store.state.url.URL_APP'
// }

const fetchPOST = () => {
  return store.state.kamio
}

const getKab = (wilayah) => {
  fetch(store.state.url.URL_DATAMASTER_KAB_KOTA + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      wilayah: wilayah
    })
  })
    .then(res => res.json())
    .then(res_data => {
      console.log(res_data)
      store.state.listKabKota = res_data
    });
}



const getVisi = (des_kel) => {
  fetch(store.state.url.URL_ADM_VISI + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      des_kel: des_kel
    })
  })
    .then(res => res.json())
    .then(res_data => {
      console.log(res_data)
      store.state.listVisi = res_data
    });
}


const getJenisUsaha = async() => {
  var data = await FETCH_GET(store.state.url.URL_DATAMASTER_JENIS_USAHA);
  store.state.listJenisUsaha = data
}


const postJenisUsaha = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_JENIS_USAHA, bodyx);
  store.state.listJenisUsaha = data;
  // console.log(data)
}

const postPotensiWilayah = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_POTENSI_WILAYAH, bodyx);
  store.state.listPotensiWilayah = data;
  // console.log(data)
}



const postPendidikan = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_PENDIDIKAN, bodyx);
  store.state.listPendidikan = data;
  // console.log(data)
}

const postPekerjaan = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_PEKERJAAN, bodyx);
  store.state.listPekerjaan = data;
  // console.log(data)
}


const postAgama = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_AGAMA, bodyx);
  store.state.listAgama = data;
  // console.log(data)
}

const postFasilitasAgama = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_KEAGAMAAN, bodyx);
  store.state.listFasilitasKeagamaan = data;
  // console.log(data)
}

const postFasilitasKesehatan = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_KESEHATAN, bodyx);
  store.state.listFasilitasKesehatan = data;
  // console.log(data)
}

const postFasilitasPemerintahan = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_PEMERINTAHAN, bodyx);
  store.state.listFasilitasPemerintah = data;
  // console.log(data)
}

const postFasilitasPendidikan = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_PENDIDIKAN, bodyx);
  store.state.listFasilitasPendidikan = data;
  // console.log(data)
}

const postFasilitasUmum = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_UMUM, bodyx);
  store.state.listFasilitasUmum = data;
  // console.log(data)
}

const postFasilitasPenunjang = async(tahun, des_kel) => {
  var bodyx = {
    tahun : tahun,
    des_kel : des_kel
  }
  var data = await FETCH_POST(store.state.url.URL_DATAMASTER_FASILITAS_PENUNJANG, bodyx);
  store.state.listFasilitasPenunjang = data;
  // console.log(data)
}

async function FETCH_GET (url){
  return new Promise(resolve =>{
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      }
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
      });
  })
}


async function FETCH_POST (url, body){
  return new Promise(resolve =>{
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
      });
  })
}





module.exports = {
  fetchPOST: fetchPOST,
  getKab : getKab,
  getVisi : getVisi,
  getJenisUsaha : getJenisUsaha,
  postJenisUsaha : postJenisUsaha,
  postPotensiWilayah : postPotensiWilayah,

  postPendidikan : postPendidikan,
  postPekerjaan : postPekerjaan,
  postAgama : postAgama,
  postFasilitasAgama : postFasilitasAgama,
  postFasilitasKesehatan : postFasilitasKesehatan,
  postFasilitasPemerintahan : postFasilitasPemerintahan,
  postFasilitasPendidikan : postFasilitasPendidikan,
  postFasilitasUmum : postFasilitasUmum,
  postFasilitasPenunjang : postFasilitasPenunjang,

  FETCH_GET: FETCH_GET,
  FETCH_POST : FETCH_POST,


}