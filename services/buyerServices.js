import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
//import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'
const secretKey = 'aaabbbccc';
import fast2sms from 'fast-two-sms';
import {sendEMail} from './mail'
import prisma from './db'

const getBuyerRegEmail=(buyer)=>
{
return  {
  from: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_FROM: process.env.PROD_EMAILS_FROM,
  to: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_TO: process.env.PROD_EMAILS_TO,
  subject: "New Buyer Registration Request Received",
  html: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        .card {
          text-align: center;
          width: 100%;
          background-color: rgb(223, 243, 223);
        }
  
        .button {
          background-color: green;
          color: aliceblue;
          padding: 10px;
          border-radius: 10px;
        }
      </style>
    </head>
  
    <body>
      <div class="card">
        <h3>New Buyer Registration Request Received</h3>
        <h> Hello Dear,<b>${buyer.firstname}</b></h
        ><br />
        <a>Greetings of the day!</a><br />
        <h
          >This is to inform you that we have received your registration details
          and our team is verifying it. </h
        ><br />
        <a>Verification Time: 24hrs</a><br /><br />
        <a>
          We are excited to get you on board as soon as possible and simplify
          textile sourcing for you.<br />For support, feel free to mail us at
          support@textilesourcingsolutions.in</a
        ><br /><br />
      </div>
    </body>
  </html>
  `,
};




// {
// 	from: "omias8055@gmail.com",
// 	to: buyer.email,
// 	subject: "Buyer registration request",
// 	html: `<!DOCTYPE html>
// 	<html lang="en">
	
// 	<head>
// 			<meta charset="UTF-8" />
// 			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
// 			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 			<title>Registration Request Record</title>
// 			<link href="index.css" rel="stylesheet" />
	
// 	</head>
	
// 	<body>
// 	<style>
// 	@import url("https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@300;400;600&family=Inter:wght@300;400;500;700&family=Merriweather:wght@400;700&display=swap");
// .card {
//     font-family: "Merriweather", serif;
   
// }
// </style>
// 			<div class="card">
// 					<h2>Registration Request</h2>
// 					<h class="web">Dear ${buyer.firstname},</h><br>
// 					<a><b>Omnath Dubey</b> We have received your registration request..</a><br />
// 					<a>Company Name- <b>${buyer.companyname}</b> </a><br />
// 					<a>Mobile No-<b>${buyer.primarynumber}</b></a>
// 					<p>Thanks for showing interest. We will get back to you shortly...</p>
// 					<h4 class="web">Wish Regards</h4>
// 					<h4 class="web">Team TSS</h5>
// 			</div>
// 	</body>
	
// 	</html>`,
//   };
}




const getBuyerApprovalEmail=(buyer)=>
{
return   {
  from: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_FROM: process.env.PROD_EMAILS_FROM,
  to: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_TO: process.env.PROD_EMAILS_TO,
  subject: "Registration Approval",
  html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        .card {
            text-align: center;
            width: 100%;
            background-color: rgb(223, 243, 223);
        }
        
        .button {
            background-color: green;
            color: aliceblue;
            padding: 10px;
            border-radius: 10px;
        }
    </style>
</head>

<body>
    <div class="card">
    <br><br>
        <h3>Registration Approval</h3>
        <h> Hello Dear,<b>${buyer.firstname}</b></h><br />
        <a>Welcome On Board!</a><br />
        <a>Username: ${buyer.username} <br />
        Password: ${buyer.password}</a
      ><br />
      <h>Here is a video tutorial about how to use our services. </h><br />
      <a
        >For support, feel free to mail us at
        support@textilesourcingsolutions.in</a
      >
      <a></a>
      <br>
      <br>
    </div>
</body>

</html>`,
};

}




const sendSMS = async ({ message, contactNumber }, next) => {
  try {
    console.log(message,contactNumber)
    const res = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS,
      message,
      numbers: [contactNumber],
    });

  } catch (error) {
    next(error);
  }
};






const generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};



  const  saveBuyer =
  async (dataJSON,context) => {

     const {login_username} =context;

    // authenticationJWT.checkUser(login_username);

    const {   z_id,
applicationid,
client,
lang,
t_id,
buyid,
firstname,
lastname,
country,
city,
inbusinesssince,
email,
primarynumber,
addemail,
addnumber,
addemailnumber,
website,
companyname,
accounttype,
category,
address,
completeaddress,
gstnumber,
gst_files,
tannumber,
businesspannumber,
pan_files           } = dataJSON;



    if (!firstname) { throw new Error('You must provide firstname.'); }
  
   // const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      
      const _idGenerated = await masterdataServices.getUniqueID();

    

      const buyertobeCreated=datetimeService.setDateUser( {
        z_id: _idGenerated,
        applicationid, client, lang, t_id,
     buyid,
firstname,
lastname,
country,
city,
inbusinesssince,
email,
primarynumber,
addemail,
addnumber,
addemailnumber,
website,
companyname,
accounttype,
category,
address,
completeaddress,
gstnumber,
gst_files,
tannumber,
businesspannumber,
pan_files  
           
      },'I',login_username);
 
      const buyerCreated = await prisma.buyers.create({
        data: buyertobeCreated
      })

     

     // await prisma.$disconnect();
      await sendEMail(getBuyerRegEmail(buyerCreated))
      return buyerCreated;



    }
    else {
      const buyertobeUpdated=datetimeService.setDateUser(  {

     buyid,
firstname,
lastname,
country,
city,
inbusinesssince,
email,
primarynumber,
addemail,
addnumber,
addemailnumber,
website,
companyname,
accounttype,
category,
address,
completeaddress,
gstnumber,
gst_files,
tannumber,
businesspannumber,
pan_files        

      },'U',login_username);
      const buyerUpdated = await prisma.buyers.update({

        where: {

          z_id
        },
        data: buyertobeUpdated
      })

    //  await prisma.$disconnect();
      return buyerUpdated;


    }





  }



  const getBuyerNo = async (para) =>
{

    try 
    {
  //      const prisma = new PrismaClient()
        const result = await prisma.$queryRaw`select buyidno from buyers where z_id=${para.z_id}`
   //    await prisma.$disconnect();
       return result;        
    } 
    catch (error) 
    {
        return error;    
    }

}




  const buyers = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
     //   const prisma = new PrismaClient()

        if (z_id === null || z_id === undefined || z_id === "") {
      
         const buyers_list = await prisma.buyers.findMany({
            where: {
              applicationid,
              lang,
              client,
            }
          })
       //   await prisma.$disconnect()
          return buyers_list;
      

        
        }
        else{

        
          const buyers_list = await prisma.buyers.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
    //      await prisma.$disconnect()
          return buyers_list;
          
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Buyers');
      }




    }
  
  
  


    const approvedBuyers = async (args, context, info) => {
      const { applicationid, client, lang, z_id } = args
    
      const {login_username} =context;
      //authenticationJWT.checkUser(login_username);

  
        try {
       //   const prisma = new PrismaClient()
  
   
        
           const buyers_list = await prisma.buyers.findMany({
              where: {
                applicationid,
                lang,
                client,
          apprstatus:'Approved'	
              }
            })
      //      await prisma.$disconnect()

            return buyers_list;
        
  
          
     
  
      
        }
        catch (e) {
      
      
          throw new Error('Error fetching Buyers');
        }
  
  
  
  
      }



  


  const deleteBuyer =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
    //  const prisma = new PrismaClient()
      const deletedBuyer = await prisma.buyers.delete({
        where: {
          z_id
        },
      })

 //     await prisma.$disconnect()
      return deleteBuyer;
    } catch (err) {

      throw new Error('Unable to delete Buyer');
    }

  }



  const  approveBuyer =
  async (dataJSON,context) => {

     const {login_username} =context;

    // authenticationJWT.checkUser(login_username);

    const {   z_id,
applicationid,
client,
lang
    } = dataJSON;



    if (!z_id) { throw new Error('Buyer ID is must.'); }
  
    //const prisma = new PrismaClient()

	
    

      let buyertobeApproved=datetimeService.setDateUser(  {

      },'U',login_username);
      
  let objDtTm=datetimeService.getDtTmObj();
  


  //let result = await getBuyerNo({z_id:buyerCreated.z_id});


  const result = await buyers({z_id,
    applicationid,
    client,
    lang},context)








	
	buyertobeApproved.apprstatus='Approved';
	buyertobeApproved.apprdate=objDtTm.dt;
	buyertobeApproved.apprtime=objDtTm.tm;
  buyertobeApproved.appruser=login_username;
  buyertobeApproved.buyid='BUY'+result[0].buyidno


	const buyerUpdated = await prisma.buyers.update({

        where: {

          z_id
        },
        data: 
buyertobeApproved
      })

      
  await authenticationJWT.saveUsername1(
  { email:result[0].email, password:'abc123', applicationid, client, lang, mobile:result[0].primarynumber, username:'BUY'+result[0].buyidno, firstname:result[0].firstname, lastname:result[0].lastname, userauthorisations:'Buyer', status:'active', z_id:'' }
    
    ,context)

    //  await prisma.$disconnect();
      await sendEMail(getBuyerApprovalEmail({ email:result[0].email, password:'abc123', applicationid, client, lang, mobile:result[0].primarynumber, username:'BUY'+result[0].buyidno, firstname:result[0].firstname, lastname:result[0].lastname, userauthorisations:'Buyer', status:'active', z_id:'' }))
 
      return buyerUpdated;

  }





  const sendBuyerMobileOTPJWT = async (buyerData, context) => {

    

  
    if (!buyerData.primarynumber) {
      throw new Error('You must provide mobile number.');
    }
  
   // const prisma = new PrismaClient()
  
  
  
    const buyerCount = await prisma.buyers.count({
      where: {
        applicationid: buyerData.applicationid,
        lang: buyerData.lang,
        client: buyerData.client,
        primarynumber: buyerData.primarynumber
      }
    })
    
    if (buyerCount >= 1) {
      throw new Error('Buyer already registered.');
    }
    else {
      
      const mobileotp = generateOTP(6);
      const salt = await bcrypt.genSalt(10);
      const hashmobileotp = await bcrypt.hash(mobileotp, salt);
     
  

    console.log(hashmobileotp)

      //buyerData.verificationuser=hashmobileotp;
     console.log(   {
      message: `Your OTP is ${mobileotp}`,
      contactNumber: buyerData.primarynumber,
    })
  
      //     await sendSMS(
      //   {
      //     message: `Your OTP is ${mobileotp}`,
      //     contactNumber: buyerData.primarynumber,
      //   }
      // );
      await sendEMail(getOTPEmail(buyerData,mobileotp))
      //await prisma.$disconnect()

      return hashmobileotp;
  
    }
  
  }


const getOTPEmail =(buyer,mobileotp) =>{

  return  {
    from: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_FROM: process.env.PROD_EMAILS_FROM,
    to: process.env.ENVIRONMENT=='DEV'? process.env.DEV_EMAILS_TO: process.env.PROD_EMAILS_TO,
    subject: "Your OTP",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          .card {
            text-align: center;
            width: 100%;
            background-color: rgb(223, 243, 223);
          }
    
          .button {
            background-color: green;
            color: aliceblue;
            padding: 10px;
            border-radius: 10px;
          }
        </style>
      </head>
    
      <body>
        <div class="card">
          <h3>OTP for registration</h3>
          <h> Hello Dear,</h
          ><br />
          <a>Greetings of the day!</a><br />
          Your OTP for registration is <b>${mobileotp}</b>
        </div>
      </body>
    </html>
    `,
  };
  

}


  const verifyBuyerMobileOTPJWT = async (buyerData, context) => {

    const { primarynumber,mobileotp,verificationuser } = buyerData;
  
  console.log('buyerData',buyerData)
    if (!buyerData.primarynumber || !buyerData.mobileotp) {
      throw new Error('You must provide an mobile number and mobileotp.');
    }
  
      let validMobileotp = await bcrypt.compare(mobileotp, buyerData.verificationuser);
      console.log('123-1')
      if (validMobileotp) {
        console.log('123-2')
 
        return "Y"
      }
      else {
        console.log('123-2')
        throw new Error('Invalid Mbile number & OTP');
      }
  
  
    }
  
  
  

  

  export default {deleteBuyer,buyers,saveBuyer,approveBuyer,sendBuyerMobileOTPJWT,verifyBuyerMobileOTPJWT,approvedBuyers}


