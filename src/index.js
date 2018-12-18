import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
      greeting(name: String, position: String): String!
      add(numbers: [Float!]!): Float!
      grades: [Int!]!
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
    add: (parent, {numbers}) => numbers.reduce((acc, el) => acc + el, 0),
    grades: (parent, args, ctx, info) => [99, 80, 93],
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