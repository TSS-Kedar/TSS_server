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



  const getBuyerNo = async (para) =>
{

    try 
    {
        const prisma = new PrismaClient()
        const result = await prisma.$queryRaw`select buyidno from buyers where z_id=${para.z_id}`
       await prisma.$disconnect();
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
  
  
  


    const approvedBuyers = async (args, context, info) => {
      const { applicationid, client, lang, z_id } = args
    
      const {login_username} =context;
      //authenticationJWT.checkUser(login_username);

  
        try {
          const prisma = new PrismaClient()
  
   
        
           const buyers_list = await prisma.buyers.findMany({
              where: {
                applicationid,
                lang,
                client,
          apprstatus:'Approved'	
              }
            })
            await prisma.$disconnect()

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

    // authenticationJWT.checkUser(login_username);

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

      await prisma.$disconnect();
      return buyerUpdated;

  }





  const sendBuyerMobileOTPJWT = async (buyerData, context) => {

    

  
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
  
      await prisma.$disconnect()

      return hashmobileotp;
  
    }
  
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
   console.log(buyerData)
        return buyerData
      }
      else {
        console.log('123-2')
        throw new Error('Invalid Mbile number & OTP');
      }
  
  
    }
  
  
  

  

  export default {deleteBuyer,buyers,saveBuyer,approveBuyer,sendBuyerMobileOTPJWT,verifyBuyerMobileOTPJWT,approvedBuyers}


