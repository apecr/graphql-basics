import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import * as database from './db'


// Application Resolvers for API

const getAuthor = (parent, args, {db}) => db.users.find(user => user.id === parent.author)
const getPost = (parent, args, {db}) => db.posts.find(post => post.id === parent.post)
const getComments = (parent, args, {db}) => db.comments.filter(comment => comment.author === parent.id)
const getCommentsFromPost = (parent, args, {db}) => db.comments.filter(comment => comment.post === parent.id)

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
    users: (parent, { query }, {db}, info) => {
      console.log(query, db)
      return query
        ? db.users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : db.users
    },
    posts: (parent, { query }, {db}, info) =>
      query
        ? db.posts.filter(post => matchAgainstSeveralElements([post.title, post.body], query))
        : db.posts,
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
    comments: (parent, { query }, {db}, info) => db.comments
  },
  Mutation: {
    createUser: (parent, { data }, {db}, info) => {
      const { name, email, age = 0 } = data
      checkElementsFromArrayAndThrowError(db.users, user => user.email === email, 'Email taken', true)
      const newUser = {
        id: uuidv4(),
        name,
        email,
        age
      }
      db.users.push(newUser)
      return newUser
    },
    deleteUser: (parent, { id }, {db}) => {
      const userIndex = db.users.findIndex(user => user.id === id)
      if (userIndex === -1) {
        throw new Error('User not found')
      }
      const deletedUsers = db.users.splice(userIndex, 1)

      db.posts = db.posts.filter(post => {
        const match = post.author === id
        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id)
        }
        db.comments = db.comments.filter(comment => comment.author === id)
        return !match
      })

      return deletedUsers[0]
    },
    deletePost: (parent, { id }, {db}) => {
      const postIndex = db.posts.findIndex(post => post.id === id)
      if (postIndex === -1) {
        throw new Error('Post not found')
      }
      const deletedPosts = db.posts.splice(postIndex, 1)

      db.comments = db.comments.filter(comment => comment.post !== id)

      return deletedPosts[0]
    },
    createPost: (parent, { post }, {db}) => {
      checkElementsFromArrayAndThrowError(db.users,
        checkUserId(post.author),
        'User does not exist')
      const newPost = { ...post, id: uuidv4() }
      db.posts.push(newPost)
      return newPost
    },
    createComment: (parent, { comment }, {db}) => {
      const { text, author, post } = comment
      checkElementsFromArrayAndThrowError(db.users,
        checkUserId(author),
        'User does not exist')
      checkElementsFromArrayAndThrowError(db.posts,
        postA => postA.id === post && postA.published === true,
        'Post does not exist or is not published')
      const newComment = {
        id: uuidv4(),
        text, author, post
      }
      db.comments.push(newComment)
      return newComment
    },
    deleteComment: (parent, { id }, {db}) => {
      const commentIndex = db.comments.findIndex(comment => comment.id === id)

      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }
      return db.comments.splice(commentIndex, 1)[0]
    }
  },
  Post: {
    author: getAuthor,
    comments: getCommentsFromPost
  },
  User: {
    posts: (parent, args, {db}) => db.posts.filter(post => post.author === parent.id),
    comments: getComments
  },
  Comment: {
    author: getAuthor,
    post: getPost
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    'db': database.db
  }
})

server.start(_ => console.log('server is running'))