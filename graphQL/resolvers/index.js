/**
 * @author 
 */

import  merge from 'lodash/merge';

//Importing resolvers





import authenticationResolvers from './authenticationResolvers';
import Product from './productResolver'
import Supplier from './supplierResolver'
import Buyer from './buyerResolver'
import Rcecommendation from './recommendationResolver'
import masterdatResolvers from './masterdataResolvers'

// Merge all of the resolver objects together
const resolvers = merge(
                            authenticationResolvers.Query,
                            authenticationResolvers.Mutation,
                            Rcecommendation.Mutation,
                            Rcecommendation.Query,
                            masterdatResolvers.Query,
                            Product.Mutation,
                            Product.Query,
                            Supplier.Mutation,
                            Supplier.Query,
                            Buyer.Mutation,
                            Buyer.Query
                            
                        );

// Export merged resolvers
export default resolvers;