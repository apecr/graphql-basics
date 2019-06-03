import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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

// Demo comments data
const comments = [{
  id: '1',
  text: 'Comment number one',
  author: '1',
  post: '123456'
}, {
  id: '2',
  text: 'Comment number two',
  author: '2',
  post: '123456'
}, {
  id: '3',
  text: 'Comment for the number three post',
  author: '1',
  post: '123457'
}, {
  id: '4',
  text: 'This is comment number four. No more comments for the moment',
  author: '3',
  post: '123458'
}]

// Type definitions (schema)
const typeDefs = `
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }

    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
      me: User!
      post: Post!
    }

    input CreateUserInput{
      name: String!
      email: String!
      age: Int
    }

    input CreatePostInput{
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput{
      text: String!
      author: ID!
      post: ID!
    }

    type Mutation{
      createUser(data: CreateUserInput): User!
      createPost(post: CreatePostInput): Post!
      createComment(comment: CreateCommentInput): Comment!
    }
`


// Application Resolvers for API

const getAuthor = parent => users.find(user => user.id === parent.author)
const getPost = parent => posts.find(post => post.id === parent.post)
const getComments = parent => comments.filter(comment => comment.author === parent.id)
const getCommentsFromPost = parent => comments.filter(comment => comment.post === parent.id)

const matchAgainstSeveralElements = (arrElements, query) =>
  arrElements
    .reduce((acc, element) =>
      element.toLowerCase().includes(query.toLowerCase()) || acc, false)

const checkElementsFromArrayAndThrowError = (arrayOfElements, comparation, errorMessage, any = false) => {
  const checkElements = arrayOfElements.some(comparation) // check the elements some aplies the function
  console.log(checkElements, arrayOfElements)
  if ((any && checkElements) || (!any && !checkElements)) {
    throw new Error(errorMessage)
  }
}

const checkUserId = author => user => user.id === author

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
    }),
    comments: _ => comments
  },
  Mutation: {
    createUser: (parent, {data}, ctx, info) => {
      const {name, email, age = 0 } = data
      checkElementsFromArrayAndThrowError(users, user => user.email === email, 'Email taken', true)
      const newUser = {
        id: uuidv4(),
        name,
        email,
        age
      }
      users.push(newUser)
      return newUser
    },
    createPost: (parent, {post}) => {
      checkElementsFromArrayAndThrowError(users,
        checkUserId(post.author),
        'User does not exist')
      const newPost = { ...post, id: uuidv4() }
      posts.push(newPost)
      return newPost
    },
    createComment: (parent, {comment}) => {
      const { text, author, post } = comment
      checkElementsFromArrayAndThrowError(users,
        checkUserId(author),
        'User does not exist')
      checkElementsFromArrayAndThrowError(posts,
        postA => postA.id === post && postA.published === true,
        'Post does not exist or is not published')
      const newComment = {
        id: uuidv4(),
        text, author, post
      }
      comments.push(newComment)
      return newComment
    }
  },
  Post: {
    author: getAuthor,
    comments: getCommentsFromPost
  },
  User: {
    posts: parent => posts.filter(post => post.author === parent.id),
    comments: getComments
  },
  Comment: {
    author: getAuthor,
    post: getPost
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(_ => console.log('server is running'))