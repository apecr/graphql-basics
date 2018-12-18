import { GraphQLServer } from 'graphql-yoga'

// 1. Create an "add" query that returns a Float
// 2. Set up "add" to take two arguments (a, b) wich are required floats.
// 3. Have the resolver send back the sum of the two arguments.

// Type definitions (schema)
const typeDefs = `
    type Query {
      greeting(name: String, position: String): String!
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`


// Application Resolvers for API
const resolvers = {
  Query: {
    greeting: (parent, {name, position}, ctx) =>
      name && position ? `Hello ${name}! You are my favourite ${position}.` : 'Hello!',
    me: _ => ({
      id: '1234abdcs',
      name: 'Alberto Eyo',
      email: 'albert@example.com',
      age: 45
    }),
    post: _ => ({
      id: '123456789-asdfghj',
      title: 'Some example title post',
      body: 'loren ipsum',
      published: false
    })
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(_ => console.log('server is running'))