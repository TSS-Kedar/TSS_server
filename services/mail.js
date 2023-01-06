
import nodemailer from 'nodemailer'
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omias8055@gmail.com",
    pass: "jkgeuyvxhtqxrrcw",
  },
});



const sendEMail=async (mailOptions)=>
{



  
 await transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
})
};

export {sendEMail};