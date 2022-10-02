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



    # SupplierType Type
    type SupplierType
    {       
z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
supid	: String,
supidno : String,
yarntypes : String,
firstname	: String,
lastname	: String,
country	: String,
city	: String,
inbusinesssince	: String,
email	: String,
primarynumber	: String,
addemail	: String,
addnumber	: String,
addemailnumber	: String,
website	: String,
companyname	: String,
accounttype	: String,
category	: String,
address	: String,
completeaddress	: String,
gstnumber	: String,
gst_files	:   [oFileType],
tannumber	: String,
businesspannumber	: String,
pan_files	:   [oFileType],
cdate	: String,
ctime	: String,
cuser	: String,
udate	: String,
utime	: String,
uuser	: String,
ddate	: String,
dtime	: String,
duser	: String,
isdel	: String

    }
    # Query Type
    type Query
    {
        suppliers    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String
        ):[SupplierType]

        
        
  }
    # Mutation Type
    type Mutation
    {
        saveSupplier
         (  
            z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
supid	: String,
supidno : String,
yarntypes : String,
firstname	: String,
lastname	: String,
country	: String,
city	: String,
inbusinesssince	: String,
email	: String,
primarynumber	: String,
addemail	: String,
addnumber	: String,
addemailnumber	: String,
website	: String,
companyname	: String,
accounttype	: String,
category	: String,
address	: String,
completeaddress	: String,
gstnumber	: String,
gst_files	:   [FileType],
tannumber	: String,
businesspannumber	: String,
pan_files	:   [FileType],

cdate	: String,
ctime	: String,
cuser	: String,
udate	: String,
utime	: String,
uuser	: String,
ddate	: String,
dtime	: String,
duser	: String,
isdel	: String

           
         )  : SupplierType


         deleteSupplier
         (
            applicationid : String,
            client: String ,
            lang: String ,
            supid:String,
            z_id:String
         )  : SupplierType

  


    }

`
// Export the typeDefs
export default typeDefs;