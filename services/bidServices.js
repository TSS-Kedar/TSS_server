import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';
import datetimeService from '../services/dateTimeServices'; 



  const  saveBid =
  async (dataJSON,context) => {

     const {login_username} =context;
     
    // authenticationJWT.checkUser(login_username);

    const {  applicationid ,
        client ,
        lang ,
        t_id ,
        z_id ,
        supid,
        reqid,
        amount1,
        amount2,
        supremarks,
        status} = dataJSON;



    if (!reqid) { throw new Error('You must provide reqid.'); }
    if (!supid) { throw new Error('You must provide supid.'); }
  
    const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      console.log('here')
      const _idGenerated = await masterdataServices.getUniqueID();

    console.log('data',{
      z_id: _idGenerated,
      applicationid ,
      client ,
      lang ,
      t_id ,
      supid,
      reqid,
      amount1,
      amount2,
      supremarks,
      status
         
    })

      const bidtobeCreated=datetimeService.setDateUser( {
        z_id: _idGenerated,
        applicationid ,
        client ,
        lang ,
        t_id ,
        supid,
        reqid,
        amount1,
        amount2,
        supremarks,
        status
           
      },'I',login_username);
      console.log('****bidtobeCreated',bidtobeCreated)
      const bidCreated = await prisma.bids.create({
        data: bidtobeCreated
      })
      console.log('****bidCreated',bidCreated)
      const result = await bids({z_id:bidCreated.z_id,
        applicationid,
        client,
        lang},context)
    


        console.log('****result',result)


const bidUpdated = await prisma.bids.update({

  where: {

    z_id:result[0].z_id
  },
  data: {
    bidid:'BID'+result[0].bidnoid
  }
})






      await prisma.$disconnect();
      return bidUpdated;



    }
    else {
      const bidtobeUpdated=datetimeService.setDateUser(  {

        amount1,
        amount2,
        supremarks

      },'U',login_username);
      const bidUpdated = await prisma.bids.update({

        where: {

          z_id
        },
        data: bidtobeUpdated
      })

      await prisma.$disconnect();
      return bidUpdated;


    }





  }






  const bids = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()
     

       if (z_id === null || z_id === undefined || z_id === "") {

        console.log('******1')
        if (supid === null || supid === undefined || supid === "") {
         const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              reqid
            }
          })
          await prisma.$disconnect()
          return bids_list;
        }
        else
        {
          const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              reqid,
              supid
            }
          })
          await prisma.$disconnect()
          return bids_list;

        }

        
        }
        else{

          const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
          await prisma.$disconnect()
          return bids_list;
      
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Bids');
      }




    }
  
  
  






  


  const deleteBid =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
      const prisma = new PrismaClient()
      const deletedBid = await prisma.bids.delete({
        where: {
          z_id
        },
      })

      await prisma.$disconnect()
      return deletedBid;
    } catch (err) {

      throw new Error('Unable to delete Bid');
    }

  }

  export default {deleteBid,bids,saveBid}
