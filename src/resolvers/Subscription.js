// Goal: Create a subscription for new posts

// 1. Define a post subscription. No arguments are necessary. Response should be a post object.
// 2. Setup the resolver for post. Since there are no args, a channel name like "post" is fine.
// 3. Modify the solver for creating a post to publish the new post data.
//  - Only callpubsub.publish if the post had "published" set to true.
//  - Don't worry about updatePost or deletePost
// 4. Test your work


const Subscription = {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      let count = 0

      setInterval(() => {
        count++
        pubsub.publish('count', {
          count
        })
      }, 1000)

      return pubsub.asyncIterator('count')
    }
  },
  comment: {
    subscribe: (parent, { postId }, { db, pubsub }, info) => {
      const post = db.posts.find(p => p.id === postId && p.published)

      if (!post) {
        throw new Error('Post not found')
      }
      return pubsub.asyncIterator(`comment ${postId}`)


    }
  }
}

export { Subscription as default }