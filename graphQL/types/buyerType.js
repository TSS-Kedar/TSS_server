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



    # BuyerType Type
    type BuyerType
    {       
z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
buyid	: String,
buyidno : String,
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
apprstatus  : String,
apprdate	: String,
apprtime	: String,
appruser	: String,
verificationstatus    : String,
verificationdate	    : String,
verificationtime	    : String,
verificationuser	    : String,
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
        buyers    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String
        ):[BuyerType]

        approvedBuyers    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String
        ):[BuyerType]
        
        
  }
    # Mutation Type
    type Mutation
    {
        saveBuyer
         (  
            z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
buyid	: String,
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
apprstatus  : String,
apprdate	: String,
apprtime	: String,
appruser	: String,
verificationstatus    : String,
verificationdate	    : String,
verificationtime	    : String,
verificationuser	    : String,
cdate	: String,
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

           
         )  : BuyerType


         deleteBuyer
         (
            applicationid : String,
            client: String ,
            lang: String ,
            buyid:String,
            z_id:String
         )  : BuyerType

  
         approveBuyer
         (
            applicationid : String,
            client: String ,
            lang: String ,
            buyid:String,
            z_id:String
         )  : BuyerType


         sendBuyerMobileOTPJWT
         (
            applicationid : String,
            client: String ,
            lang: String ,
            buyid:String,
            z_id:String,
            primarynumber:String,
         )  : String

         verifyBuyerMobileOTPJWT
         (
            applicationid : String,
            client: String ,
            lang: String ,
            buyid:String,
            z_id:String,
            primarynumber:String,
            mobileotp:String,
            verificationuser:String
         )  : String


    }

`
// Export the typeDefs
export default typeDefs;