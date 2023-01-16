import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
//import { PrismaClient } from '@prisma/client';

import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'

import prisma from './db'




  const  saveProduct =
  async (dataJSON,context) => {

     const {login_username} =context;
     
    // authenticationJWT.checkUser(login_username);
     console.log(dataJSON)
    const { applicationid, client, lang, z_id, t_id,
        yarntype          ,
        count              ,
        type               ,
        quality            ,
        nature             ,
        composition1       ,
        percentage1        ,
        composition2       ,
        percentage2        ,
        tolerance          ,
        diff  ,
        purposevariety,
        slug  ,
        blendtype            } = dataJSON;



    if (!yarntype) { throw new Error('You must provide and yarntype.'); }
  
  //  const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      
      const _idGenerated = await masterdataServices.getUniqueID();

    

      const producttobeCreated=datetimeService.setDateUser( {
        z_id: _idGenerated,
        applicationid, client, lang, t_id,
        yarntype          ,
        count              ,
        type               ,
        quality            ,
        nature             ,
        composition1       ,
        percentage1        ,
        composition2       ,
        percentage2        ,
        tolerance          ,
        diff    ,
        slug    ,
        purposevariety   ,
        blendtype    
           
      },'I',login_username);
 
      const productCreated = await prisma.products.create({
        data: producttobeCreated
      })
    //  await prisma.$disconnect();
      return productCreated;



    }
    else {
      const producttobeUpdated=datetimeService.setDateUser(  {

        yarntype          ,
        count              ,
        type               ,
        quality            ,
        nature             ,
        composition1       ,
        percentage1        ,
        composition2       ,
        percentage2        ,
        tolerance          ,
        diff      ,
        slug     ,
        purposevariety ,
        blendtype         

      },'U',login_username);
      const productUpdated = await prisma.products.update({

        where: {

          z_id
        },
        data: producttobeUpdated
      })

    // await prisma.$disconnect();
      return productUpdated;


    }





  }






  const products = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
      //  const prisma = new PrismaClient()

        if (z_id === null || z_id === undefined || z_id === "") {
      
         const products_list = await prisma.products.findMany({
            where: {
              applicationid,
              lang,
              client,
            }
          })
        //  await prisma.$disconnect()
          return products_list;
      

        
        }
        else{

        
          const products_list = await prisma.products.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
        //  await prisma.$disconnect()
          return products_list;
          
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Products');
      }




    }
  
  
  






  


  const deleteProduct =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
     // const prisma = new PrismaClient()
      const deletedProduct = await prisma.products.delete({
        where: {
          z_id
        },
      })

    //  await prisma.$disconnect()
      return deletedProduct;
    } catch (err) {

      throw new Error('Unable to delete Product');
    }

  }

  export default {deleteProduct,products,saveProduct}
