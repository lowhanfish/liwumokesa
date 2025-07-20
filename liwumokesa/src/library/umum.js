const tglConvert = (tgl) => {

    var date = new Date(tgl);

    console.log("tgl" ,date)
    console.log("bulan", date.getMonth())

    var getBulan = date.getMonth() + 1; var bulan = '';
    if (getBulan == '1') {bulan = 'Jan'} 
    else if(getBulan == '2') {bulan = 'Feb'}
    else if(getBulan == '3') {bulan = 'Mar'}
    else if(getBulan == '4') {bulan = 'Apr'}
    else if(getBulan == '5') {bulan = 'Mei'}
    else if(getBulan == '6') {bulan = 'Jun'}
    else if(getBulan == '7') {bulan = 'Jul'}
    else if(getBulan == '8') {bulan = 'Agt'}
    else if(getBulan == '9') {bulan = 'Sep'}
    else if(getBulan == '10') {bulan = 'Okt'}
    else if(getBulan == '11') {bulan = 'Nov'}
    else if(getBulan == '12') {bulan = 'Des'}

    return date.getDate() + " " + bulan + " " + date.getFullYear();
}



const tglConvertX = (tgl) => {
    var date = tgl.split('-')

    const tglx = date[2]
    const thnx = date[0]
    
    
    const blnxyz = date[1]
    const blnxy = parseInt(blnxyz)
    const blnx = blnxy.toString();
    var bulan = ''
    
    
    if (blnx == '1') {bulan = 'Jan'} 
    else if(blnx == '2') {bulan = 'Feb'}
    else if(blnx == '3') {bulan = 'Mar'}
    else if(blnx == '4') {bulan = 'Apr'}
    else if(blnx == '5') {bulan = 'Mei'}
    else if(blnx == '6') {bulan = 'Jun'}
    else if(blnx == '7') {bulan = 'Jul'}
    else if(blnx == '8') {bulan = 'Agt'}
    else if(blnx == '9') {bulan = 'Sep'}
    else if(blnx == '10') {bulan = 'Okt'}
    else if(blnx == '11') {bulan = 'Nov'}
    else if(blnx == '12') {bulan = 'Des'}

    return tglx + " " + bulan + " " + thnx;
}


const tglConvertXY = (dd) => {

    var tgl = dd.split(" ")




    var date = tgl[0].split('-')

    const tglx = date[2]
    const thnx = date[0]
    
    
    const blnxyz = date[1]
    const blnxy = parseInt(blnxyz)
    const blnx = blnxy.toString();
    var bulan = ''
    
    
    if (blnx == '1') {bulan = 'Januari'} 
    else if(blnx == '2') {bulan = 'Februari'}
    else if(blnx == '3') {bulan = 'Maret'}
    else if(blnx == '4') {bulan = 'April'}
    else if(blnx == '5') {bulan = 'Mei'}
    else if(blnx == '6') {bulan = 'Juni'}
    else if(blnx == '7') {bulan = 'Juli'}
    else if(blnx == '8') {bulan = 'Agustus'}
    else if(blnx == '9') {bulan = 'September'}
    else if(blnx == '10') {bulan = 'Oktober'}
    else if(blnx == '11') {bulan = 'November'}
    else if(blnx == '12') {bulan = 'Desember'}

    return tglx + " " + bulan + " " + thnx;
}


const check_gelar_depan = (data) => {
    if (data == undefined || data == null || data == '') {
        return ''
    } else {
        return data+'. '
    }
}
const check_gelar_belakang = (data1) => {
    if (data1 == undefined || data1 == null || data1 == '') {
        return ''
    } else {
        return ', '+data1
    }
}

const namaLengkap = (gelardepan, nama, gelarBelakang) =>{
    return check_gelar_depan(gelardepan)+""+nama+""+check_gelar_belakang(gelarBelakang)
}


// =================== PAGINASI =========================

const btn_prev = (page_first) =>{

}


const btn_next = (page_first, page_last) => {

}


const getDateTime = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time
    return dateTime
}

const indexing = (hal, limit, index) =>{
    var idx = ((hal-1)*limit)+index
    return idx
}



// ======================= TAMBAHAN ===========================

const checkAddEditRemove = (data) =>{
    if (
        (data.add == null || data.add == undefined ) &&
        (data.edit == null || data.edit == undefined ) &&
        (data.remove == null || data.remove == undefined )
        
        ) 
    {
        return false
    } else {
        return true
    }
}


function cariValue(menu, OBJsected, key){

    var obj = {
        view : false,
        add : false,
        edit : false,
        remove : false
    }

    OBJsected.forEach(element => {
        // console.log(element.menu_list)
        if (menu._id == element.menu_list) {
            obj = {
                view : element.view,
                add : element.add,
                edit : element.edit,
                remove : element.remove
            }
        }   
    });

    return obj[key]
    // var keyku = key

    
    
}

const checkUndefined = (data) =>{

    if (data == null || data == undefined|| data == false){
        return false
    } else {
        return data
    }
}



const filterAddEditRemove = (list_menu) =>{
        var array = list_menu

        var data = [];

        array.forEach(menu => {
            if (menu.type == 'single') {
                checkAddEditRemove(menu)

                // if (check) {
                  data.push({
                      menu_list : menu._id,
                      view : menu.view,
                      add : menu.add,
                      edit : menu.edit,
                      remove : menu.remove,
                  })  
                // } 
            }
            menu.submenu.forEach(submenu => {
                if (submenu.type == 'single') {
                    checkAddEditRemove(submenu)
                    // if (check1) {
                        data.push({
                            menu_list : submenu._id,
                            view : submenu.view,
                            add : submenu.add,
                            edit : submenu.edit,
                            remove : submenu.remove,
                        })    
                    // } 
                }

                submenu.submenu.forEach(subsubmenu => {
                    if (subsubmenu.type == 'single') {
                        checkAddEditRemove(subsubmenu)
                        // if (check2) {
                            data.push({
                                menu_list : subsubmenu._id,
                                view : subsubmenu.view,
                                add : subsubmenu.add,
                                edit : subsubmenu.edit,
                                remove : subsubmenu.remove,
                            })  
                        // } 
                    }
                });


            });
        });

        return data
}


const setFalseAddEditRemove = (list_menu, OBJsected) =>{
    var array = list_menu

    var data = [];

    array.forEach(menu => {
        // console.log(OBJsected.view)
        if (menu.type == 'single') {

            console.log(cariValue(menu, OBJsected, 'view'))

            menu.view = checkUndefined(cariValue(menu, OBJsected, 'view'));
            menu.add = checkUndefined(cariValue(menu, OBJsected, 'add'));
            menu.edit = checkUndefined(cariValue(menu, OBJsected, 'edit'));
            menu.remove = checkUndefined(cariValue(menu, OBJsected, 'remove'));
        }
        menu.submenu.forEach(submenu => {
            if (submenu.type == 'single') {
                submenu.view = checkUndefined(cariValue(submenu, OBJsected, 'view'));
                submenu.add = checkUndefined(cariValue(submenu, OBJsected, 'add'));
                submenu.edit = checkUndefined(cariValue(submenu, OBJsected, 'edit'));
                submenu.remove = checkUndefined(cariValue(submenu, OBJsected, 'remove'));
            }

            submenu.submenu.forEach(subsubmenu => {
                if (subsubmenu.type == 'single') {
                    subsubmenu.view = checkUndefined(cariValue(subsubmenu, OBJsected, 'view'));
                    subsubmenu.add = checkUndefined(cariValue(subsubmenu, OBJsected, 'add b'));
                    subsubmenu.edit = checkUndefined(cariValue(subsubmenu, OBJsected, 'edit'));
                    subsubmenu.remove = checkUndefined(cariValue(subsubmenu, OBJsected, 'remove'));
                }
            });

        });
    });

    return data
}


const getTahun = () =>{
    var d = new Date();
    var n = d.getFullYear();

    return n
}


const jk = (kelamin) => {
    if (kelamin == "L") {
        return 'Laki-Laki'
    } else {
        return 'Perempuan'
    }
}


const statusSosial = (data) =>{
    // console.log(data)
    if (data == 'K') {
        return 'Kawin'
    } else if (data == 'BK') {
        return 'Belum Kawin'
    } else if (data == 'J') {
        return 'Janda'
    }else if (data == 'D') {
        return 'Duda'
    }
}


const statusTptUsaha = (data) =>{


    // console.log(data)
    if (data == 'MS') {
        return 'Milik Sendiri'
    } else if (data == 'K') {
        return 'Kontrak'
    } else if (data == 'S') {
        return 'Sewa'
    }else if (data == 'L') {
        return 'Lainnya'
    }
}


const StatusIndikator = (data) =>{

    if (data == 2) {
        return 'bg-red-1'
    } else if (data == 1) {
        return 'bg-green-1'
    } else {
        return 'bg-amber-1'
    }
}


const checkStatus = (data) =>{
    console.log(data)
    if (data == 1) {
        return true
    } else {
        return false
    }
}


const checkLengthIndikator = (data) =>{
    if (data <= 0) {
        return 'deep-orange'
    } else {
        return 'light-green-9'
    } 
}


const checkLengthIndikator1 = (data) =>{
    if (data <= 0) {
        return 'deep-orange'
    } else {
        return 'blue'
    } 
}


const checkStatus2 = (data) =>{

    if (data == 2) {
        return {
            color : 'red',
            icon :'block'
        }
    } else if (data == 1) {
        return {
            color : 'green',
            icon :'check_circle'
        }
    } else{
        return {
            color : 'orange',
            icon :'report'
        }
    }
}

const imageFileType = (data) =>{

    if (data == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return 'doc.png'
    } 

    else if (data == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return 'xls.png'
    } 
    
    else if (data == 'image/jpg' || data == 'image/jpeg') {
        return 'jpg.png'
    } 
    else if (data == 'application/pdf') {
        return 'pdf.png'
    }
    else if (data == 'image/png') {
        return 'png.png'
    }
    else if (data == 'video/mp4' || data == 'video/webm' || data == 'video/mpeg' || data == 'video/quicktime' || data == 'video/H264') {
        return 'video.png'
    }
    
    
    else{
        return 'unknown.png'
    }
}


// ======================= TAMBAHAN ===========================




module.exports = {
    tglConvert : tglConvert,
    check_gelar_depan : check_gelar_depan,
    check_gelar_belakang : check_gelar_belakang,
    namaLengkap : namaLengkap,
    btn_prev : btn_prev,
    btn_next : btn_next,
    NOW : getDateTime,
    indexing : indexing,
    checkAddEditRemove : checkAddEditRemove,
    filterAddEditRemove : filterAddEditRemove,
    setFalseAddEditRemove : setFalseAddEditRemove,
    getTahun : getTahun,
    tglConvertX : tglConvertX,
    tglConvertXY : tglConvertXY,
    jk : jk,
    StatusIndikator : StatusIndikator,
    checkStatus : checkStatus,
    checkStatus2 : checkStatus2,
    statusSosial : statusSosial,
    statusTptUsaha : statusTptUsaha,
    checkLengthIndikator : checkLengthIndikator,
    checkLengthIndikator1 : checkLengthIndikator1,
    imageFileType : imageFileType,
}