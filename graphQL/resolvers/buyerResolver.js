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
        approvedBuyers:buyerService.approvedBuyers
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveBuyer : buyerService.saveBuyer,
        deleteBuyer : buyerService.deleteBuyer,
        approveBuyer:buyerService.approveBuyer,
        sendBuyerMobileOTPJWT:buyerService.sendBuyerMobileOTPJWT,
        verifyBuyerMobileOTPJWT:buyerService.verifyBuyerMobileOTPJWT
      
    }
};



// Export the resolvers
export default resolvers;