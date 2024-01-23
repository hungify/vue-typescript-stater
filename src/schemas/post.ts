import v from 'valibot'

class PostSchema {
  protected get basePost() {
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
    return v.array(this.basePost)
  }

  get getPostResponse() {
    return this.basePost
  }
}

export const postSchema = new PostSchema()
