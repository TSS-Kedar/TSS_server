/**
 * @author 
 */

// Import Section
import supplierService from "../../services/supplierServices";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        suppliers:supplierService.suppliers,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveSupplier : supplierService.saveSupplier,
        deleteSupplier : supplierService.deleteSupplier
      
    }
};



// Export the resolvers
export default resolvers;