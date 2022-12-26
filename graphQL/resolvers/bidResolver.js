/**
 * @author 
 */

// Import Section
import bidService from "../../services/bidServices";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        bids:bidService.bids,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveBid : bidService.saveBid,
        deleteBid : bidService.deleteBid,
        acceptBid:bidService.acceptBid
      
    }
};



// Export the resolvers
export default resolvers;