const tglConvert = (tgl) => {
    var date = new Date(parseInt(tgl));
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



const jk = (kelamin) => {
    if (kelamin == "L") {
        return 'Laki-Laki'
    } else {
        return 'Perempuan'
    }
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





const NoticeRemoveData = async() =>{
    return new Promise ((resolve)=>{

        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Anda akan menghapus data ini",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus data ini!'
          }).then((result) => {
            if (result.isConfirmed) {
                // return true
                resolve(true)
            }
            else {
                resolve(false)
                // return false
            }
          })





    })
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

const getTahun = () =>{
    var d = new Date();
    var n = d.getFullYear();

    return n
}


const StatusIndikator = (data) =>{
    // console.log(data)
    if (data == 2) {
        return 'red'
    } else if (data == 1) {
        return 'green'
    } else {
        return 'orange'
    }
}


const checkStatus = (data) =>{
    // console.log(data)
    if (data == 1) {
        return true
    } else {
        return false
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


module.exports = {
    tglConvert : tglConvert,
    check_gelar_depan : check_gelar_depan,
    check_gelar_belakang : check_gelar_belakang,
    namaLengkap : namaLengkap,
    btn_prev : btn_prev,
    btn_next : btn_next,
    NOW : getDateTime,
    indexing : indexing,
    getTahun : getTahun,
    tglConvertX : tglConvertX,
    tglConvertXY : tglConvertXY,
    NoticeRemoveData : NoticeRemoveData,
    jk : jk,
    StatusIndikator : StatusIndikator,
    checkStatus : checkStatus,
    statusSosial : statusSosial,
    statusTptUsaha : statusTptUsaha,
}