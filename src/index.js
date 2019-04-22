import { GraphQLServer } from 'graphql-yoga'
import { assertAbstractType } from 'graphql'

// Part I
//
// 1. Set up a "Comment" type with id and text fields. Both non-nullable
// 2. Set up a "comments" array with 4 comments.
// 3. Set up a "comments" query with a resolver that returns all the comments
// 4. Run a query to get all the comments with both id and text fields


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

// Demo post data

const posts = [{
  id: '123456',
  title: 'Apertura Española',
  body: 'Defensa española, lucha contra la defensa berlinesa',
  published: true,
  author: '1'
}, {
  id: '123457',
  title: 'Defensa Francesa',
  body: 'La francesa, el contraataque en el centro',
  published: true,
  author: '2'
}, {
  id: '123458',
  title: 'Apertura Catalana',
  body: 'Los entresijos de la catalana',
  published: false,
  author: '3'
}, {
  id: '123459',
  title: 'Defensa Siciliana',
  body: 'Variante Paulsen',
  published: true,
  author: '1'
}, {
  id: '123460',
  title: 'Defensa Siciliana',
  body: 'Variante Najdorf',
  published: false,
  author: '2'
}, {
  id: '123461',
  title: 'Defensa Siciliana',
  body: 'Ataque inglés',
  published: true,
  author: '1'
}]

// Type definitions (schema)
const typeDefs = `
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
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
  },
  Post: {
    author: (parent, args, ctx, info) => users.find(user => user.id === parent.author)
  },
  User: {
    posts: (parent, args, ctx, info) => posts.filter(post => post.author === parent.id)
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(_ => console.log('server is running'))