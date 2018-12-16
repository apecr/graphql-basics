import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        bio: String!
        location: String!
    }
`;

// Application Resolvers for API
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    name: _ => 'Alberto Eyo',
    location: _ => 'Madrid',
    bio: _ => 'Software Engineer in Sngular and pather'
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(_ => console.log('server is running'));