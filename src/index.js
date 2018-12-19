import { GraphQLServer } from 'graphql-yoga'

// 1. Set up an array of three posts with dummy post data (id, title, body, publisehd)
// 2. Set up a posts query and resolver that returns all the posts
// 3. Test the query out
// 4. Add a query argument that only return posts that contain the query string in the title or body
// 5. Run a few samples queries for posts with a specific title

// Demo post data
const posts = [{
  id: '123456',
  title: 'Apertura Española',
  body: 'Defensa española, lucha contra la defensa berlinesa',
  published: true
}, {
  id: '123457',
  title: 'Defensa Francesa',
  body: 'La francesa, el contraataque en el centro',
  published: true
}, {
  id: '123458',
  title: 'Apertura Catalana',
  body: 'Los entresijos de la catalana',
  published: false
}, {
  id: '123459',
  title: 'Defensa Siciliana',
  body: 'Variante Paulsen',
  published: true
}, {
  id: '123460',
  title: 'Defensa Siciliana',
  body: 'Variante Najdorf',
  published: false
}, {
  id: '123461',
  title: 'Defensa Siciliana',
  body: 'Ataque inglés',
  published: true
}]

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
      posts(query: String): [Post!]!
      me: User!
      post: Post!
    }
`


// Application Resolvers for API

const matchAgainstSeveralElements = (arrElements, query) =>
  arrElements
    .reduce((acc, element) =>
      element.toLowerCase().includes(query.toLowerCase()) || acc, false)

const resolvers = {
  Query: {
    users: (parent, { query }, ctx, info) =>
      query
        ? users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : users,
    posts: (parent, { query }, ctx, info) =>
      query
        ? posts.filter(post => matchAgainstSeveralElements([post.title, post.body], query))
        : posts,
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