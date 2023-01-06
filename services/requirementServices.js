import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '@prisma/client';

import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'
import {sendEMail} from './mail'

const getRequirementEmail=(requirement)=>
{
return  {
	from: "omias8055@gmail.com",
	to: "rhishikesh.parkhi@gmail.com",
	subject: "New requirement created",
	html:   `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link href="index.css" rel="stylesheet" />
      <style>
      .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        padding: 5px;
    }
    
    .grid-item {
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 10px;
        font-size: 10px;
        text-align: center;
    }
    
    .heading {
        text-align: center;
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
      <div class="heading">
          <h3>Requirement ID</h3>
          <p>New requirement created in system details are as follows.</p>
          <br />
          <p>Please login to submit your response at the earliest.</p>
          <br />
          <button class="button" href="#">Submit Response</button>
      </div>
      <div class="grid-container">
          <div class="grid-item">Buyer &nbsp; (............)</div>
          <div class="grid-item">Yarntype &nbsp;   ${requirement.yarntype} </div>
          <div class="grid-item">Delivery Period &nbsp;   ${requirement.deliverysch}</div>
          <div class="grid-item">Required Qty &nbsp;   ${requirement.reqqty}</div>
          <div class="grid-item">Unit &nbsp;   ${requirement.uom}</div>
          <div class="grid-item">CSP &nbsp;  ${requirement.yarncsp}</div>
          <div class="grid-item">Target Price &nbsp;   ${requirement.targetprice}</div>
          <div class="grid-item">Payment Terms &nbsp;   ${requirement.paymentterms}</div>
          <div class="grid-item">Test Report &nbsp;   ${requirement.restreportreq}</div>
          <div class="grid-item">BCI Certificate &nbsp;   ${requirement.bcicertificate}</div>
          <div class="grid-item">Delivery Location &nbsp;   ${requirement.deliverylocation}</div>
          <div class="grid-item">Target Mills &nbsp;   ${requirement.targetmills}</div>
          <div class="grid-item">Remarks &nbsp;   ${requirement.remarks}</div>
      </div>
  </body>
  
  </html>`,
  };
}





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
        remarks,
        uom,
        paymentterms,
        deliverylocation,
        bcicertificate,
        reqid,
        buyid ,
        status,
        statusdate,
        statustime,
        statususer        } = dataJSON;



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
        remarks,
        uom,
        paymentterms,
        deliverylocation,
        bcicertificate,
        reqid,
        buyid  ,
        status,
        statusdate,
        statustime,
        statususer    
           
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
      await sendEMail(getRequirementEmail(requirementUpdated))
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
        remarks,
        uom,
        paymentterms,
        deliverylocation,
        bcicertificate,
        reqid,
        buyid    ,
        status,
        statusdate,
        statustime,
        statususer         

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
    const { applicationid, client, lang, z_id,buyid ,supid} = args
 
    const {login_username} =context;
    //authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()
       
console.log('buyid',buyid)
   
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
          

        }else if(supid) {

          console.log('Supplier Id ***************',supid)

          const suppliers_list = await prisma.suppliers.findMany({
            where: {
              applicationid,
              lang,
              client,
              supid
            }
          })
         
            const requirements_list = await prisma.requirements.findMany({
              where: {
                applicationid,
                lang,
                client,
                z_id
              }
            })
            await prisma.$disconnect()
            return filterSupplierRequirements(requirements_list,suppliers_list[0].yarntypes);
            
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
  
  
  


const filterSupplierRequirements= (reqArr,yarntypeSupplier)=>
{

var yarntypeSupplierArray = yarntypeSupplier.split(',');
var result = [];
for(var i=0;i<yarntypeSupplierArray.length;i++){
  for(var j=0;j<reqArr.length;j++){
    if(yarntypeSupplierArray[i] == reqArr[j].yarntype){
      result.push(reqArr[j]);
    }
  }
 
}
return result;
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
