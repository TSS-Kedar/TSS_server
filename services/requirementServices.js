import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';

import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'






  const  saveRequirement =
  async (dataJSON,context) => {

     const {login_username} =context;
     
    // authenticationJWT.checkUser(login_username);

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
        blendtype   ,
        yarncsp,
        deliverysch,
        reqqty,
        targetprice,
        restreportreq,
        targetmills,
        reqid,
        buyid         } = dataJSON;



    if (!yarntype) { throw new Error('You must provide and yarntype.'); }
  
    const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      
      const _idGenerated = await masterdataServices.getUniqueID();

    

      const requirementtobeCreated=datetimeService.setDateUser( {
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
        blendtype ,
        yarncsp,
        deliverysch,
        reqqty,
        targetprice,
        restreportreq,
        targetmills,
        reqid,
        buyid   
           
      },'I',login_username);
 
      const requirementCreated = await prisma.requirements.create({
        data: requirementtobeCreated
      })







let requirementUpdated = await prisma.requirements.update({

  where: {

    z_id:requirementCreated.z_id
  },
  data: {
    reqid:'REQ'+requirementCreated.reqnoid
  }
})
//console.log(requirementUpdated);
//requirementUpdated.reqid='REQ'+requirementCreated.reqnoid;

      await prisma.$disconnect();
      return requirementUpdated;



    }
    else {
      const requirementtobeUpdated=datetimeService.setDateUser(  {

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
        blendtype ,
        yarncsp,
        deliverysch,
        reqqty,
        targetprice,
        restreportreq,
        targetmills,
        reqid,
        buyid          

      },'U',login_username);
      const requirementUpdated = await prisma.requirements.update({

        where: {

          z_id
        },
        data: requirementtobeUpdated
      })

      await prisma.$disconnect();
      return requirementUpdated;


    }





  }






  const requirements = async (args, context, info) => {
    const { applicationid, client, lang, z_id,buyid } = args
 
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()

   
         if(buyid)
        {
   
          const requirements_list = await prisma.requirements.findMany({
            where: {
              applicationid,
              lang,
              client,
              buyid
            }
          })
          await prisma.$disconnect()
          return requirements_list;
          

        }
        else if (z_id === null || z_id === undefined || z_id === "") {
      
          const requirements_list = await prisma.requirements.findMany({
             where: {
               applicationid,
               lang,
               client,
             }
           })
           await prisma.$disconnect()
           return requirements_list;
       
 
         
         }
        else {

        
          const requirements_list = await prisma.requirements.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
          await prisma.$disconnect()
          return requirements_list;
          
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Requirements');
      }




    }
  
  
  






  


  const deleteRequirement =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
      const prisma = new PrismaClient()
      const deletedRequirement = await prisma.requirements.delete({
        where: {
          z_id
        },
      })

      await prisma.$disconnect()
      return deletedRequirement;
    } catch (err) {

      throw new Error('Unable to delete Requirement');
    }

  }

  export default {deleteRequirement,requirements,saveRequirement}
