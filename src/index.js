import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
    }
`;

// Application Resolvers for API
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    name: _ => 'Alberto Eyo'
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(_ => console.log('server is running'));