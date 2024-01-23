import v from 'valibot'

class PostSchema {
  get post() {
    return v.object({
      userId: v.number(),
      id: v.number(),
      title: v.string(),
      completed: v.boolean(),
      body: v.string(),
    })
  }

  get getPostsParams() {
    return v.object({
      limit: v.number(),
      page: v.number(),
    })
  }
  get getPostsResponse() {
    return v.array(this.post)
  }

  get getPostResponse() {
    return this.post
  }
}

export const postSchema = new PostSchema()
