import {GraphQLServer} from 'graphql-yoga';

// Types:
// A. Scalar Types:
//  1. String
//  2. Boolean
//  3. Int
//  4. Float
//  5. ID

// Challenge:

// Create query definition and resolver for each
//
// title - string product name
// price - number as float
// releaseYear - number as int (optional)
// inStock - boolean

// Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        inStock: Boolean
    }
`;

// Application Resolvers for API
const resolvers = {
  Query: {
    title: ()=> 'Node.js examples',
    price: () => 213.45,
    releaseYear: () => 2019,
    inStock: () => true
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(_ => console.log('server is running'));