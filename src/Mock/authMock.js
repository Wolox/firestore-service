export default {
  login: {
    email: 'test@test.com',
    password: 'xxx',
    response: {
      ok: false,
      request: 'LOGIN',
      status: 401,
      statusText: 'Failure'
    }
  },
  signUp: {
    email: 'test@test.com',
    password: 'xxx',
    response: {
      ok: false,
      request: 'SIGN_UP',
      status: 403,
      statusText: 'Failure'
    }
  }
};
