import v from 'valibot'

class PostSchema {
  public getPost() {
    return v.object({
      userId: v.number(),
      id: v.number(),
      title: v.string(),
      completed: v.boolean(),
      body: v.string(),
    })
  }

  public getPosts() {
    return v.array(this.getPost())
  }

  public createPost() {
    return this.getPost()
  }
}

export const postSchema = new PostSchema()
