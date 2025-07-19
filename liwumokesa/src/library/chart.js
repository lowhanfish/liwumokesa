var DataStore = require('../store');
var store = DataStore.default


const chartPie = (idx, textx, datax)=>{
    var jml = datax.jumlah;
    var txt = datax.uraian
    var data = []

    for (let i = 0; i < jml.length; i++) {
        data.push({
            name: txt[i],
            y: jml[i],
        })
        
    }


    Highcharts.chart(idx, {
        chart: {
            type: 'pie',
            // backgroundColor: 'transparent'
        },
        title: {
            text: textx
        },
       
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            },
            showInLegend: false
        }
        },
        series: [{
            name: 'Jml',
            colorByPoint: true,
            data: data
          }]
        });
}

const chartPie3D = (idx, textx, datax)=>{

    var jml = datax.jumlah;
    var txt = datax.uraian
    var data = []

    for (let i = 0; i < jml.length; i++) {
        data.push({
            name: txt[i],
            y: jml[i],
        })
        
    }

    Highcharts.chart(idx, {
        chart: {
            type: 'pie',
            // backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: textx
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
                }
            }
            },
            series: [{
                type: 'pie',
                name: 'Persentase',
                data: data
            }]
        });
  

}


const BarChart =  (id, title, subtitle, categories, data) =>{
    var chart = Highcharts.chart(id, {

        title: {
            text: title
        },

        subtitle: {
            text: subtitle
        },

        xAxis: {
            categories: categories
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: data,
            showInLegend: false
        }]

    });
}

const getData = async(jmlDukungan_Kec)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(store.state.url.URL_STATISTIK_KECAMATAN + jmlDukungan_Kec, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            }
        }).then(res => res.json()).then(res_data => {
            resolve (res_data)
        });
    })



}



const postData = async(route, body)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(store.state.url.URL_DASHBOARD + route, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res_data => {
            // console.log(res_data)
            resolve (res_data);
        });
    })



}

const postDataPublish = async(route, body)=>{

    return new Promise ((resolve, reject)=>{
        
        fetch(store.state.url.URL_KECAMATAN_PUBLISH + route, {
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





const persentase = (datakecil, databesar)=>{
    if (databesar <= 0 || datakecil <= 0) {
        return 0
    } else {
        var nilai = datakecil * 100 / databesar
        return nilai.toFixed(3);
    }
}


module.exports = {
    chartPie : chartPie,
    chartPie3D : chartPie3D,
    getData : getData,
    persentase : persentase,
    postData : postData,
    BarChart : BarChart,
    postDataPublish : postDataPublish,
}



