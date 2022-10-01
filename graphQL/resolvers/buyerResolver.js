/**
 * @author 
 */

// Import Section
import buyerService from "../../services/buyerServices";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        buyers:buyerService.buyers,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveBuyer : buyerService.saveBuyer,
        deleteBuyer : buyerService.deleteBuyer,
        approveBuyer:buyerService.approveBuyer
      
    }
};



// Export the resolvers
export default resolvers;