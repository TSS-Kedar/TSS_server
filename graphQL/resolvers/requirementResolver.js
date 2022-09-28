/**
 * @author 
 */

// Import Section
import requirementService from "../../services/requirementServices";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        requirements:requirementService.requirements,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveRequirement : requirementService.saveRequirement,
        deleteRequirement : requirementService.deleteRequirement
      
    }
};



// Export the resolvers
export default resolvers;