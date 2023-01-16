import dotenv from 'dotenv';
dotenv.config();
 

import nodemailer from 'nodemailer'
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_FROM: process.env.PROD_EMAILS_FROM,
    pass: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_PASS: process.env.PROD_EMAILS_PASS,
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