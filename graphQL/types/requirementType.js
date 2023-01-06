const typeDefs = `


# File Type
input FileType
{
    z_id: String,
    fileid: String,
    filepath: String,
    filename: String,
    filetype: String,
    filesize: String
}


# File Type
type oFileType
{
    z_id: String,
    fileid: String,
    filepath: String,
    filename: String,
    filetype: String,
    filesize: String
}



    # requirementItem Type
    type RequirementItemType
    {
        label:String,
        value:String
    }


    # input requirement Type
    input inputRequirementType
    {       z_id: String,
            t_id: String,
            applicationid : String,
            client: String ,
            lang: String ,
            yarntype: String          ,
            count: String              ,
            type: String               ,
            quality: String            ,
            nature: String             ,
            composition1: String       ,
            percentage1: String        ,
            composition2: String       ,
            percentage2: String        ,
            tolerance: String          ,
            diff: String ,  
            
            purposevariety: String,
            slug:String,
            blendtype: String,

            reqid:   String, 
            buyid:   String,
            yarncsp:   String,
            deliverysch:   String,
            reqqty:   String,
            targetprice:   String,
            restreportreq:   String,
            targetmills:   String,
            remarks:   String,
            uom:   String,
            paymentterms:   String,
            deliverylocation:   String,
            bcicertificate:   String,
            status:   String,
            statusdate:   String,
            statustime:   String,
            statususer:   String,
            cdate       :   String,
            ctime       :   String,
            cuser       :   String,
            udate       :   String,
            utime       :   String,
            uuser       :   String,
            ddate       :   String,
            dtime       :   String,
            duser       :   String,
            isdeleted   :   String
    }



    # requirement Type
    type RequirementType
    {       z_id: String,
            t_id: String,
            applicationid : String,
            client: String ,
            lang: String ,
            yarntype: String          ,
            count: String              ,
            type: String               ,
            quality: String            ,
            nature: String             ,
            composition1: String       ,
            percentage1: String        ,
            composition2: String       ,
            percentage2: String        ,
            tolerance: String          ,
            diff: String ,   
            purposevariety: String,
            slug:String,
            blendtype: String,
            reqid:   String, 
            buyid:   String,
            yarncsp:   String,
            deliverysch:   String,
            reqqty:   String,
            targetprice:   String,
            restreportreq:   String,
            targetmills:   String,
            remarks:   String,
            uom:   String,
            paymentterms:   String,
            deliverylocation:   String,
            bcicertificate:   String,
            status:   String,
            statusdate:   String,
            statustime:   String,
            statususer:   String,
            cdate       :   String,
            ctime       :   String,
            cuser       :   String,
            udate       :   String,
            utime       :   String,
            uuser       :   String,
            ddate       :   String,
            dtime       :   String,
            duser       :   String,
            isdeleted   :   String
    }
    # Query Type
    type Query
    {
        requirements    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String,
            buyid : String,
            supid : String
        ):[RequirementType]

        requirementsItems:[RequirementItemType]
        
  }
    # Mutation Type
    type Mutation
    {
        saveRequirement
         (  
             applicationid : String,
            client: String ,
            lang: String ,
            z_id: String,
            t_id:  String,
            yarntype: String          ,
            count: String              ,
            type: String               ,
            quality: String            ,
            nature: String             ,
            composition1: String       ,
            percentage1: String        ,
            composition2: String       ,
            percentage2: String        ,
            tolerance: String          ,
            diff: String ,   
            purposevariety: String,
            slug:String,
            blendtype: String,
            reqid:   String, 
            buyid:   String,
            yarncsp:   String,
            deliverysch:   String,
            reqqty:   String,
            targetprice:   String,
            restreportreq:   String,
            targetmills:   String,
            remarks:   String,
            uom:   String,
            paymentterms:   String,
            deliverylocation:   String,
            bcicertificate:   String,
            username   :   String,
            status:   String,
            statusdate:   String,
            statustime:   String,
            statususer:   String
           
         )  : RequirementType


         deleteRequirement
         (
            applicationid : String,
            client: String ,
            lang: String ,
            username:String,
            z_id:String
         )  : RequirementType

         sendRequirementNotification
         (
            requirement:  inputRequirementType
         )  : RequirementType



    }

`
// Export the typeDefs
export default typeDefs;