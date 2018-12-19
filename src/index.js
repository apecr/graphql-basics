import { GraphQLServer } from 'graphql-yoga'

// 1. Set up an array of three posts with dummy post data (id, title, body, publisehd)
// 2. Set up a posts query and resolver that returns all the posts
// 3. Test the query out
// 4. Add a query argument that only return posts that contain the query string in the title or body
// 5. Run a few samples queries for posts with a specific title

// Demo user data
const users = [{
  id: '1',
  name: 'Andrew',
  email: 'andrew@example.com',
  age: 27
}, {
  id: '2',
  name: 'Sara',
  email: 'sara@example.com'
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com'
}]

// Type definitions (schema)
const typeDefs = `
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

    type Query {
      users(query: String): [User!]!
      me: User!
      post: Post!
    }
`


// Application Resolvers for API
const resolvers = {
  Query: {
    users: (parent, {query}, ctx, info) =>
      query
        ? users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : users,
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