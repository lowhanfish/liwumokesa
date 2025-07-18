const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");





router.get('/', (req, res)=>{
   // main().catch(console.error);
   emailTEXT('cvsafaatkarya@gmail.com', 'AAAAAAAA', 'BBBBBBBBBBBBBBBBBBBBBBBBBBB')
   res.send('OK')
})



router.get('/checkAuth', (req, res)=>{
   res.send('OK')
})



//          var yourEmail = "desa@konaweselatankab.go.id";
//          var yourPass = "menang1B";
//          var mailHost = "mail.konaweselatankab.go.id";
//          var mailPort = 587;
//          var senderEmail = "desa@konaweselatankab.go.id"
//          var tox = 'safaatkaryacv@gmail.com'



let transport = nodemailer.createTransport({
   host: 'mail.konaweselatankab.com',
   port: 587,
   auth: {
       user: 'desa@konaweselatankab.com',
       pass: 'menang1B'
   },
   tls: {
       rejectUnauthorized: false
   }
});

const emailTEXT = (to, judul, isi)=>{
   const message = {
       from: 'desa@konaweselatankab.com', // Sender address
       to: to,         // List of recipients
       subject: judul, // Subject line
       text: isi // Plain text body
   };
   transport.sendMail(message, function(err, info) {
       if (err) {
           console.log("ERROOOOORRR")
         console.log(err)
       } else {
           console.log("SUKSESSSSS")
         console.log(info);
       }
   });
}






// async function main() {
   
//    // sendMail('kyokulangidkongga@gmail.com', 'contoh', '<h1>HY KIKEN </h1>')
   
   
   
   
   
   
   
   
//    let testAccount = await nodemailer.createTestAccount();
   
//    // create reusable transporter object using the default SMTP transport
//    let transporter = nodemailer.createTransport({
//          host: "webmail.konaweselatankab.go.id",
//          port: 587,
//          secure: false, // true for 465, false for other ports
//          auth: {
//                // user: testAccount.user, // generated ethereal user
//                // pass: testAccount.pass, // generated ethereal password
//                user: yourEmail,
//                pass: yourPass,
//             },
//               tls: {
//                   // do not fail on invalid certs
//                   rejectUnauthorized: false
//                   },
//                // tls: {
//                   //    ciphers: "STARTTLS",
//                   //  },
//                });
               
//                // send mail with defined transport object
//                let info = await transporter.sendMail({
//                      from: yourEmail, // sender address
//                      to: tox, // list of receivers
//                      subject: "Terimakasih Atas ya", // Subject line
//                      text: "Ini bukan", // plain text body
//                      html: "Isinya adalah koko", // html body
//                   });
                  
//                   console.log("Message sent: %s", info.messageId);
//                   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  
//                   // Preview only available when sending through an Ethereal account
//                   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//                   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                  
//          }
               
               
//          var yourEmail = "desa@konaweselatankab.go.id";
//          var yourPass = "menang1B";
//          var mailHost = "mail.konaweselatankab.go.id";
//          var mailPort = 587;
//          var senderEmail = "desa@konaweselatankab.go.id"
//          var tox = 'safaatkaryacv@gmail.com'
         
         
         
         
         
//          const sendMail = (to, subject, htmlContent) => {
               

//             let transporter = nodemailer.createTransport({
//                host: mailHost,
//                port: mailPort,
//                secure: true, // use SSL - TLS
//                auth: {
//                   user: yourEmail,
//                   pass: yourPass,
//                },
//                //   tls: {
//                   //    // do not fail on invalid certs
//                   //    rejectUnauthorized: false
//                   //    },
//             });
            
//             let mailOptions = {
//                from: senderEmail,
//                to: to,
//                subject: subject,
//                html: htmlContent,
//             };
//             return transporter.sendMail(mailOptions); // promise
//          };
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      module.exports = router;
      