import v from 'valibot'

class AuthSchema {
  get loginRequest() {
    return v.object({
      email: v.string('Your email must be a string.', [
        v.minLength(1, 'Please enter your email.'),
        v.email('The email address is badly formatted.'),
      ]),
      password: v.string('Your password must be a string.', [
        v.minLength(1, 'Please enter your password.'),
        v.minLength(8, 'Your password must have 8 characters or more.'),
      ]),
    })
  }

  get loginResponse() {
    return v.object({
      accessToken: v.string(),
      refreshToken: v.string(),
    })
  }

  get registerRequest() {
    return v.object({
      email: v.string('Your email must be a string.', [
        v.minLength(1, 'Please enter your email.'),
        v.email('The email address is badly formatted.'),
      ]),
      password: v.string('Your password must be a string.', [
        v.minLength(1, 'Please enter your password.'),
        v.minLength(8, 'Your password must have 8 characters or more.'),
      ]),
      name: v.string('Your name must be a string.', [
        v.minLength(1, 'Please enter your name.'),
      ]),
    })
  }

  get registerResponse() {
    return v.object({
      accessToken: v.string(),
      refreshToken: v.string(),
    })
  }

  get refreshRequest() {
    return v.object({})
  }

  get refreshResponse() {
    return v.object({
      accessToken: v.string(),
      refreshToken: v.string(),
    })
  }

  get logoutRequest() {
    return v.object({})
  }

  get logoutResponse() {
    return v.object({
      message: v.string(),
    })
  }
}

export const authSchema = new AuthSchema()
