import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'
const secretKey = 'aaabbbccc';
import fast2sms from 'fast-two-sms';


const sendSMS = async ({ message, contactNumber }, next) => {
  try {
    const res = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS,
      message,
      numbers: [contactNumber],
    });
    console.log(res);
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
     console.log('123')
    // authenticationJWT.checkUser(login_username);
     console.log(dataJSON)
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
  
    const prisma = new PrismaClient()


    

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
      await prisma.$disconnect();
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

      await prisma.$disconnect();
      return buyerUpdated;


    }





  }






  const buyers = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()

        if (z_id === null || z_id === undefined || z_id === "") {
      
         const buyers_list = await prisma.buyers.findMany({
            where: {
              applicationid,
              lang,
              client,
            }
          })
          await prisma.$disconnect()
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
          await prisma.$disconnect()
          return buyers_list;
          
        }

    
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
      const prisma = new PrismaClient()
      const deletedBuyer = await prisma.buyers.delete({
        where: {
          z_id
        },
      })

      await prisma.$disconnect()
      return deleteBuyer;
    } catch (err) {

      throw new Error('Unable to delete Buyer');
    }

  }



  const  approveBuyer =
  async (dataJSON,context) => {

     const {login_username} =context;
     console.log('123')
    // authenticationJWT.checkUser(login_username);
     console.log(dataJSON)
    const {   z_id,
applicationid,
client,
lang
    } = dataJSON;



    if (!z_id) { throw new Error('Buyer ID is must.'); }
  
    const prisma = new PrismaClient()

	
    

      let buyertobeApproved=datetimeService.setDateUser(  {

      },'U',login_username);
      
	let objDtTm=datetimeService.getDtTmObj();
	
	buyertobeApproved.apprstatus='Approved';
	buyertobeApproved.apprdate=objDtTm.dt;
	buyertobeApproved.apprtime=objDtTm.tm;
	buyertobeApproved.appruser=login_username;
console.log(buyertobeApproved);
	const buyerUpdated = await prisma.buyers.update({

        where: {

          z_id
        },
        data: 
buyertobeApproved
      })

      await prisma.$disconnect();
      return buyerUpdated;

  }





  const sendBuyerMobileOTPJWT = async (buyerData, context) => {

    
  console.log(buyerData)
  
    if (!buyerData.primarynumber) {
      throw new Error('You must provide mobile number.');
    }
  
    const prisma = new PrismaClient()
  
  
  
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
     
  
      console.log('mobileotp',mobileotp)


      buyerData.verificationuser=hashmobileotp;
     
  
          await sendSMS(
        {
          message: `Your OTP is ${mobileotp}`,
          contactNumber: buyerData.primarynumber,
        }
      );
  
      await prisma.$disconnect()

      return buyerData;
  
    }
  
  }





  const verifyBuyerMobileOTPJWT = async (buyerData, context) => {

    const { primarynumber,mobileotp,verificationuser } = buyerData;
  
  
    if (!buyerData.verificationuser || !buyerData.mobileotp) {
      throw new Error('You must provide an mobile number and mobileotp.');
    }
  
      let validMobileotp = await bcrypt.compare(mobileotp, buyerData.verificationuser);
      if (validMobileotp) {
  
      
        return buyerData
      }
      else {
        throw new Error('Invalid Mbile number & OTP');
      }
  
  
    }
  
  
  

  

  export default {deleteBuyer,buyers,saveBuyer,approveBuyer,sendBuyerMobileOTPJWT,verifyBuyerMobileOTPJWT}


