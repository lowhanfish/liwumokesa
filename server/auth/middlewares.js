// Membuat verifikasi token yang dikirimkan melalui headers client

const jwt = require('jsonwebtoken');

function checkTokenSeetUser(req, res, next){
     const authHeader = req.get('authorization');
     if (authHeader) {
          const token = authHeader.split(' ')[1];
          if (token) {
               jwt.verify(token, process.env.TOKEN_SECRET, function(error, user) {
                    if (error) {
                         console.log(error);
                    }
                    req.user = user;
                    next()
               });
          }else{
               next();
          }
     }else{
          next();
     }
} 

function isLoggedIn(req, res, next){
     if (req.user) {
          // jika login maka lanjutkan ke tahap berikutnya
          next();
     }else {
          // kalau tidak login berikan respon error
          const error = new Error('Tidak ter-Authorisasi');
          res.status(401);
          next(error);
     }
}

module.exports = {
     checkTokenSeetUser,
     isLoggedIn, 
}