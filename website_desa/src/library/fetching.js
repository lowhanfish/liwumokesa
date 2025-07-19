var DataStore = require('../store');
var store = DataStore.default



const postDataPublish = async(sitenya, route, body)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(sitenya + route, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            //   authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res_data => {
         
            resolve (res_data);
        });
    })



}



const postDataPublishAuth = async(sitenya, route, body)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(sitenya + route, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res_data => {
         
            resolve (res_data);
        });
    })



}




const getDataPublishAuth = async(sitenya, route)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(sitenya + route, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            }
        }).then(res => res.json()).then(res_data => {
         
            resolve (res_data);
        });
    })



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
    postDataPublish : postDataPublish,
    postDataPublishAuth: postDataPublishAuth,
    
    getDataPublishAuth : getDataPublishAuth,

    FETCH_GET: FETCH_GET,
    FETCH_POST : FETCH_POST,
}



