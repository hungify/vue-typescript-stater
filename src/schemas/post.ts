import * as v from 'valibot'

class PostSchema {
  get post() {
    return v.object({
      userId: v.number('userId must be a number'),
      id: v.number('id must be a number'),
      title: v.string('title must be a string'),
      completed: v.optional(v.boolean("completed must be a boolean or 'null'")),
      body: v.string('body must be a string'),
    })
  }

  get getPostsParams() {
    return v.object({
      _limit: v.number('_limit must be a number'),
      _start: v.number('_start must be a number'),
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
