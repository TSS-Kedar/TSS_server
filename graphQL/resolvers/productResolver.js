/**
 * @author 
 */

// Import Section
import productService from "../../services/productServices";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        products:productService.products,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveProduct : productService.saveProduct,
        deleteProduct : productService.deleteProduct
      
    }
};



// Export the resolvers
export default resolvers;