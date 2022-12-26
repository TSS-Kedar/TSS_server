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


    # Bid Type Type
    type BidType
    {       
z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
bidid	: String,
bidnoid : String,
supid	: String,
reqid	: String,
amount1	: String,
amount2	: String,
supremarks	: String,
uombid : String,
paymenttermsbid : String,
testcertificate_files	:   [oFileType],
bcicertificate_files	:   [oFileType],
status	: String,
statusdate	: String,
statustime	: String,
statususer	: String,
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
        bids    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String,
	        supid : String,
            reqid : String
        ):[BidType]

        
        
  }
    # Mutation Type
    type Mutation
    {
        saveBid
         (  
            z_id	: String,
applicationid	: String,
client	: String,
lang	: String,
t_id	: String,
bidid	: String,
bidnoid : String,
supid	: String,
reqid	: String,
amount1	: String,
amount2	: String,
supremarks	: String,
uombid : String,
paymenttermsbid : String,
testcertificate_files	:   [FileType],
bcicertificate_files	:   [FileType],
status :String,
statusdate	: String,
statusdate	: String,
statustime	: String,
statususer	: String,
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


           
         )  : BidType


         deleteBid
         (
            applicationid : String,
            client: String ,
            lang: String ,
            supid:String,
            z_id:String
         )  : BidType

         acceptBid
         (
            applicationid : String,
            client: String ,
            lang: String ,
            z_id:String
         )  : BidType

    }

`
// Export the typeDefs
export default typeDefs;