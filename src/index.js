import {GraphQLServer} from 'graphql-yoga';

// Types:
// A. Scalar Types:
//  1. String
//  2. Boolean
//  3. Int
//  4. Float
//  5. ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Application Resolvers for API
const resolvers = {
  Query: {
    id: ()=> 'abc123',
    name: () => 'Alberto Eyo',
    age: () => 32,
    employed: () => true,
    gpa: () => 3.01
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(_ => console.log('server is running'));