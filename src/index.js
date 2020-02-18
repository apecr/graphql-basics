import { GraphQLServer } from 'graphql-yoga'
import * as database from './db'
import Query from './resolvers/Query'
import Comment from './resolvers/Comment'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Mutation from './resolvers/Mutation'


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Comment,
    User,
    Post,
    Mutation
  },
  context: {
    'db': database.db
  }
})

server.start(_ => console.log('server is running'))