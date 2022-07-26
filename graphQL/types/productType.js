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



    # productItem Type
    type ProductItemType
    {
        label:String,
        value:String
    }


    # input product Type
    input inputProductType
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



    # product Type
    type ProductType
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
        products    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String
        ):[ProductType]

        productsItems:[ProductItemType]
        
  }
    # Mutation Type
    type Mutation
    {
        saveProduct
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
            username   :   String,
           
         )  : ProductType


         deleteProduct
         (
            applicationid : String,
            client: String ,
            lang: String ,
            username:String,
            z_id:String
         )  : ProductType

         sendProductNotification
         (
          product:  inputProductType
         )  : ProductType



    }

`
// Export the typeDefs
export default typeDefs;