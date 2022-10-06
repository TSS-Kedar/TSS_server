import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';

import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'






  const  saveSupplier =
  async (dataJSON,context) => {

     const {login_username} =context;
     
    // authenticationJWT.checkUser(login_username);
     console.log(dataJSON)
    const {   z_id,
applicationid,
client,
lang,
t_id,
supid,
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
pan_files,yarntypes           } = dataJSON;



    if (!firstname) { throw new Error('You must provide firstname.'); }
  
    const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      
      const _idGenerated = await masterdataServices.getUniqueID();

    

      const suppliertobeCreated=datetimeService.setDateUser( {
        z_id: _idGenerated,
        applicationid, client, lang, t_id,
     supid,
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
pan_files ,
yarntypes 
           
      },'I',login_username);
 
      const supplierCreated = await prisma.suppliers.create({
        data: suppliertobeCreated
      })

      const result = await suppliers({z_id:supplierCreated.z_id,
        applicationid,
        client,
        lang},context)
    





const supplierUpdated = await prisma.suppliers.update({

  where: {

    z_id:result[0].z_id
  },
  data: {
    supid:'SUP'+result[0].supnoid
  }
})



      await authenticationJWT.saveUsername1(
        { email:result[0].email, password:'abc123', applicationid, client, lang, mobile:result[0].primarynumber, username:'SUP'+result[0].supnoid, firstname:result[0].firstname, lastname:result[0].lastname, userauthorisations:'Supplier', status:'active', z_id:'' }
          
          ,context)


      await prisma.$disconnect();
      return supplierUpdated;



    }
    else {
      const suppliertobeUpdated=datetimeService.setDateUser(  {

     supid,
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
pan_files   ,
yarntypes     

      },'U',login_username);
      const supplierUpdated = await prisma.suppliers.update({

        where: {

          z_id
        },
        data: suppliertobeUpdated
      })

      await prisma.$disconnect();
      return supplierUpdated;


    }





  }






  const suppliers = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()

        if (z_id === null || z_id === undefined || z_id === "") {
      
         const suppliers_list = await prisma.suppliers.findMany({
            where: {
              applicationid,
              lang,
              client,
            }
          })
          await prisma.$disconnect()
          return suppliers_list;
      

        
        }
        else{

        
          const suppliers_list = await prisma.suppliers.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
          await prisma.$disconnect()
          return suppliers_list;
          
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Suppliers');
      }




    }
  
  
  






  


  const deleteSupplier =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
      const prisma = new PrismaClient()
      const deletedSupplier = await prisma.suppliers.delete({
        where: {
          z_id
        },
      })

      await prisma.$disconnect()
      return deleteSupplier;
    } catch (err) {

      throw new Error('Unable to delete Supplier');
    }

  }

  export default {deleteSupplier,suppliers,saveSupplier}
