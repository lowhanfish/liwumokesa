



function filterhasil(data){
    var check = data;
    var arr = []

    check.forEach(menu => {
        if (menu.kategori == 'menu') {
            if ((menu.type == 'single' && menu.hakAkses.view == true) || (menu.type != 'single') ) {
                menu.submenu = [];
                arr.push(menu)
            }
        }

        check.forEach(submenux => {
            if (submenux.kategori == 'submenu' && submenux.menu == menu._id) {
                if ((submenux.type == 'single' && submenux.hakAkses.view == true) || (submenux.type != 'single') ) {
                    
                    submenux.submenu = [];
                    menu.submenu.push(submenux)
    
    
    
                    check.forEach(subsubmenu => {
        
                        if (subsubmenu.kategori == 'subsubmenu' && subsubmenu.menu == submenux._id) {
                            if ((subsubmenu.type == 'single' && subsubmenu.hakAkses.view == true) || (subsubmenu.type != 'single') ) {
                                submenux.submenu.push(subsubmenu)
                                
                            }
                        }
        
                        
                    });
                } 


            }




        });
        
    });




    return arr
}

function GetLIST(db, req, res){
    
    // console.log(req.body)
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        var query = `
        FOR data in menu_list
        let hakAkses = (
            for hakAkses in levelUsers
            for menux in hakAkses.menu
            filter data._id == menux.menu_list && hakAkses._id == '`+req.body._id+`'
            return menux
        )
            
            SORT TO_NUMBER(data.index)
           
        return merge(data, {hakAkses:hakAkses[0]})
        `
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            res.send(
                filterhasil(row)
            )
        });

}




function getLevel(db){
    console.log(req.body)
    var query = `
        FOR data IN levelUsers
        filter data._id == '`+req.body._id+`'
        return data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
}




const menu = (db, req, res)=>{
    GetLIST(db, req, res)
}



module.exports = {
    menu : menu,

}