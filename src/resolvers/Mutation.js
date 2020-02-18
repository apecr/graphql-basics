import uuidv4 from 'uuid/v4'
import {checkElementsFromArrayAndThrowError, checkUserId} from './../utils'

const Mutation = {
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
}

export {Mutation as default}