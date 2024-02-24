import v from 'valibot'
import type { AuthOutput } from '#/types/auth'

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
    }) satisfies v.BaseSchema<AuthOutput['loginRequest']>
  }

  get loginResponse() {
    return v.object({
      idToken: v.string(),
      accessToken: v.string(),
      refreshToken: v.string(),
    }) satisfies v.BaseSchema<AuthOutput['loginResponse']>
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
      fullName: v.string('Your name must be a string.', [
        v.minLength(1, 'Please enter your name.'),
      ]),
    }) satisfies v.BaseSchema<AuthOutput['registerRequest']>
  }

  get registerResponse() {
    return v.object({
      message: v.string(),
    }) satisfies v.BaseSchema<AuthOutput['registerResponse']>
  }

  get refreshResponse() {
    return v.object({
      idToken: v.string(),
      accessToken: v.string(),
      refreshToken: v.string(),
    }) satisfies v.BaseSchema<AuthOutput['refreshResponse']>
  }

  get logoutResponse() {
    return v.object({
      message: v.string(),
    }) satisfies v.BaseSchema<AuthOutput['logoutResponse']>
  }
}

export const authSchema = new AuthSchema()
