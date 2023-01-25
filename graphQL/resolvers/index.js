/**
 * @author 
 */

import  merge from 'lodash/merge';

//Importing resolvers





import authenticationResolvers from './authenticationResolvers';
import Product from './productResolver'
import Supplier from './supplierResolver'
import Bid from './bidResolver'
import Buyer from './buyerResolver'
import Requirement from './requirementResolver'
import Rcecommendation from './recommendationResolver'
import masterdatResolvers from './masterdataResolvers'

// Merge all of the resolver objects together
// const resolvers = merge(
//                             authenticationResolvers.Query,
//                             authenticationResolvers.Mutation,
//                             Rcecommendation.Mutation,
//                             Rcecommendation.Query,
//                             masterdatResolvers.Query,
//                             Product.Mutation,
//                             Product.Query,
//                             Supplier.Mutation,
//                             Supplier.Query,
//                             Buyer.Mutation,
//                             Buyer.Query,
//                             Requirement.Mutation,
//                             Requirement.Query,
//                             Bid.Mutation,
//                             Bid.Query, 
//                         );

//const resolvers = Object.assign(authenticationResolvers, Rcecommendation,Product,Supplier,Buyer,Requirement,Bid);
const resolvers = Object.assign(
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
    Buyer.Query,
    Requirement.Mutation,
    Requirement.Query,
    Bid.Mutation,
    Bid.Query, 
);

// Export merged resolvers
export default resolvers;