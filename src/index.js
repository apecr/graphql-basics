import { GraphQLServer } from 'graphql-yoga';


// Type definitions (schema)
const typeDefs = `
    type Query {
      me: User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
`;

// Application Resolvers for API
const resolvers = {
  Query: {
    me: _ => ({
      id: '1234abdcs',
      name: 'Alberto Eyo',
      email: 'albert@example.com',
      age: 45
    })
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(_ => console.log('server is running'));