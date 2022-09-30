import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';

import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'






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

  export default {deleteBuyer,buyers,saveBuyer}


