// import {store1} from '../store/index'

var DataStore = require('../store/index');
var store = DataStore.default

// const fetchPOST =  () =>{
//     return 'store.state.url.URL_APP'
// }







const getMenu =  () =>{
  var get_profile = JSON.parse(localStorage.profile);
  var level = get_profile.profile.level;
  // console.log(level)
  // store.state.listMenu = get_profile.profile.unit_kerja;

  // console.log(store.state.url.URL_LEVEL_USERS)


  var get_profile = JSON.parse(localStorage.profile);
  var level = get_profile.profile.level;
  // console.log(level)

  fetch(store.state.url.URL_LEVEL_USERS + "list", {
    method: "POST",
    headers: {
    "content-type": "application/json",
    authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
        _id: level,
    })
  })
      .then(res => res.json())
      .then(res_data => {
          // UMUM.setFalseAddEditRemove(res_data, form_menu)
          // console.log(this.list_menu);
          // console.log(res_data)
          store.state.listMenu = res_data
  });












  return 'store.state.url.URL_APP'
}














const menu = [
    {
      router : '/',
      nama : 'SEXXX',
      type : 'single',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'home',
      color : 'orange',
    },

    
    
    {
      router : '/',
      nama : 'Profil',
      type : 'multi',
      icon_color : 'white',
      text_color : '#676767',
      icon : 'supervisor_account',
      color : 'orange',
      submenu : [
        {
          router : '/profilBup',
          nama : 'Profil Calon Bupati',
          type : 'single'
        },
        {
          router : '/profilCawabup',
          nama : 'Profil Calon Wakil Bupati',
          type : 'single'
        }
      ]
    },

    {
        router : '/',
        nama : 'Profil',
        type : 'triple',
        icon_color : 'white',
        text_color : '#676767',
        icon : 'supervisor_account',
        color : 'orange',
        submenu : [
            
          {
            nama : 'Profil Calon Bupati',
            subsubmenu : [
                {
                  router : '/profilBup',
                  nama : 'Profil Calon Bupati',
                  type : 'single'
                },
                {
                  router : '/profilCawabup',
                  nama : 'Profil Calon Wakil Bupati',
                  type : 'single'
                }
            ]
          }

        ]
      },



  ];



module.exports = {
    menu: menu,
    getMenu : getMenu


}