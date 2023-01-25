import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
//import { PrismaClient } from '@prisma/client';
import datetimeService from '../services/dateTimeServices'; 
import prisma from './db'


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
        uombid,
        paymenttermsbid,
        testcertificate_files,
        bcicertificate_files,
        status} = dataJSON;



    if (!reqid) { throw new Error('You must provide reqid.'); }
    if (!supid) { throw new Error('You must provide supid.'); }
  
    //const prisma = new PrismaClient()


    

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
      uombid,
      paymenttermsbid,
      testcertificate_files,
      bcicertificate_files,
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
        uombid,
        paymenttermsbid,
        testcertificate_files,
        bcicertificate_files,

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






     // await prisma.$disconnect();
      return bidUpdated;



    }
    else {
      const bidtobeUpdated=datetimeService.setDateUser(  {

        amount1,
        amount2,
        supremarks,
        status,
        uombid,
        paymenttermsbid,
        testcertificate_files,
        bcicertificate_files


      },'U',login_username);
      const bidUpdated = await prisma.bids.update({

        where: {

          z_id
        },
        data: bidtobeUpdated
      })

    //  await prisma.$disconnect();
      return bidUpdated;


    }





  }






  const bids = async (args, context, info) => {
    const { applicationid, client, lang, z_id ,supid,reqid} = args
  
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
      //  const prisma = new PrismaClient()
     

       if (z_id === null || z_id === undefined || z_id === "") {

        console.log('******1',supid,reqid)
        if (supid === null || supid === undefined || supid === "") {
          console.log('only reqid ',supid)
         const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              reqid
            }
          })
        //  await prisma.$disconnect()
          return bids_list;
        }
        else
        {
          console.log(' reqid and supid')
          const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              reqid,
              supid
            }
          })
     //     await prisma.$disconnect()
          return bids_list;

        }

        
        }
        else{
          console.log('total else zid')
          const bids_list = await prisma.bids.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
        //  await prisma.$disconnect()
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
     // const prisma = new PrismaClient()
      const deletedBid = await prisma.bids.delete({
        where: {
          z_id
        },
      })

     // await prisma.$disconnect()
      return deletedBid;
    } catch (err) {

      throw new Error('Unable to delete Bid');
    }

  }








const acceptBid =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
   // authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
     // const prisma = new PrismaClient()
     

      const bidtobeUpdated1=datetimeService.setDateUser(  {

     
        status:'accepted',


      },'U',login_username);
 
 
      const bidtobeUpdated=datetimeService.setDateUser(  bidtobeUpdated1,'S',login_username);
      
      const bidUpdated = await prisma.bids.update({

        where: {

          z_id
        },
        data: bidtobeUpdated
      })

console.log(bidUpdated.reqid)

      const requirements_list = await prisma.requirements.findMany({
        where: {
          applicationid,
          lang,
          client,
          reqid:bidUpdated.reqid
        }
      })
      console.log(requirements_list)

      const requirementtobeUpdated1=datetimeService.setDateUser(  {

     
        status:'accepted',


      },'U',login_username);
 
 
      const requirementtobeUpdated=datetimeService.setDateUser(  requirementtobeUpdated1,'S',login_username);
      
      const requirementUpdated = await prisma.requirements.update({

        where: {

          z_id:requirements_list[0].z_id
        },
        data: requirementtobeUpdated
      })








    //  await prisma.$disconnect()
      return bidUpdated;
    } catch (err) {

      throw new Error('Unable to accept Bid');
    }

  }


  const getBidAcceptanceEmail=(requirement)=>
  {
  return  {
    from: "omias8055@gmail.com",
    to: "omias8055@gmail.com,rhishikesh.parkhi@gmail.com,anant.thube73@gmail.com",
    subject: "Bid acceptance intimation to buyer & supplier FOR SUPPLIER",
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
                background-color: rgb(12, 101, 129);
                color: aliceblue;
                padding: 10px;
                border-radius: 10px;
            }
        </style>
    </head>
    
    <body>
        <div class="card">
            <h3>Bid acceptance intimation to buyer & supplier FOR SUPPLIER</h3>
            <h> Hello Dear,<b>{NAME}</b></h><br />
            <a>Hurray! Your bid is accepted!</a><br />
            <a>[ bid details ]</a> <br />
            <a>Please fulfil the order as conveyed in the bid.</a> <br />
            <a>For support, feel free to mail us at
            support@textilesourcingsolutions.in</a
          >
    
          <a></a>
        </div>
    </body>
    
    </html>`,
  };
  }
  
  const getBidSubmissionEmail=(requirement)=>
  {
  return  {
    from: "omias8055@gmail.com",
    to: "omias8055@gmail.com,rhishikesh.parkhi@gmail.com,anant.thube73@gmail.com",
    subject: "Bid submission intimation by supplier",
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
                background-color: rgb(12, 101, 129);
                color: aliceblue;
                padding: 10px;
                border-radius: 10px;
            }
        </style>
    </head>
    
    <body>
        <div class="card">
            <h3>Bid submission intimation by supplier</h3>
            <h> Hello Dear,<b>{NAME}</b></h><br />
            <a>Your bid was successfully submitted!</a><br />
            <a>We will update you when your bid is accepted by the buyer.</a><br>
            <a>[ bid details ]</a> <br />
            <a>For support, feel free to mail us at
            support@textilesourcingsolutions.in</a
          >
    
          <a></a>
        </div>
    </body>
    
    </html>`,
  };
  }




  const getBidCompletionEmail=(requirement)=>
  {
  return  {
    from: "omias8055@gmail.com",
    to: "omias8055@gmail.com,rhishikesh.parkhi@gmail.com,anant.thube73@gmail.com",
    subject: "FOR BUYER",
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
                background-color: rgb(12, 101, 129);
                color: aliceblue;
                padding: 10px;
                border-radius: 10px;
            }
        </style>
    </head>
    
    <body>
        <div class="card">
            <h3>FOR BUYER</h3>
            <h> Hello Dear,<b>{NAME}</b></h><br />
            <a>Hurray! Your bid is completed!</a><br />
            <a>[ bid details ]</a> <br />
            <a>Your order will be fulfilled as conveyed in the bid.</a> <br />
            <a>For support, feel free to mail us at
            support@textilesourcingsolutions.in</a
          >
    
          <a></a>
        </div>
    </body>
    
    </html>`,
  };
  }

  export default {deleteBid,bids,saveBid,acceptBid}
