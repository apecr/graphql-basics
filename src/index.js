import { GraphQLServer } from 'graphql-yoga'

// Challnege
//
// 1. Create a Post type
// 2. Add id, title, body, and published (all non nullable)
// 3. Define a "post" query that returns a single post
// 4. Set up the resolver method to return some post data
// 5. Test out the query

// Type definitions (schema)
const typeDefs = `
    type Query {
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