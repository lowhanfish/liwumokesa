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
      // console.log(res_data)
      store.state.listKabKota = res_data
    });
}


const getKec = (kab_kota) => {
  fetch(store.state.url.URL_DATAMASTER_KECAMATAN + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      kab_kota: kab_kota
    })
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listKec = res_data
    });
}

const getKecSingle = () => {
  fetch(store.state.url.URL_DATAMASTER_KECAMATAN + "listSingle", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listKec = res_data
    });
}



const getDesKel = (kecamatan) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_DATAMASTER_DES_KEL + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      kecamatan: kecamatan
    })
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listDesKel = res_data
    });
}



const postDesKel = (kecamatan) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_DATAMASTER_DES_KEL + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      kecamatan: kecamatan
    })
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listDesKel = res_data
    });
}


const getListDesKelFull = () => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_DATAMASTER_DES_KEL + "list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listDesKel = res_data
    });
}




const getDesKelAsync = async (kecamatan) => {
  // console.log(kecamatan)


  return new Promise((resolve, reject) => {
    fetch(store.state.url.URL_DATAMASTER_DES_KEL + "list_terbatas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        kecamatan: kecamatan
      })
    })
      .then(res => res.json())
      .then(res_data => {
        // console.log(res_data)
        resolve(res_data)
      });
    
  })


}



const postDesKelAutocomplete = (uraian) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_DATAMASTER_DES_KEL + "PostList", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      uraian: uraian
    })
  })
    .then(res => res.json())
    .then(res_data => {
      // console.log(res_data)
      store.state.listDesKel = res_data
    });
}

const getListKecamatan = () => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_DATAMASTER_KECAMATAN + "listAll", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
    .then(res => res.json())
    .then(res_data => {
      store.state.listKecamatan = res_data
    });
}





module.exports = {
  fetchPOST: fetchPOST,
  getKab : getKab,
  getKec : getKec,
  getKecSingle : getKecSingle,
  getDesKel : getDesKel,
  postDesKel : postDesKel,
  postDesKelAutocomplete : postDesKelAutocomplete,
  getListDesKelFull : getListDesKelFull,
  getDesKelAsync : getDesKelAsync,
  getListKecamatan : getListKecamatan,


}

// sidik.konaweselatankab.go.id
// Sistem informasi dokumen elektronik kecamatan