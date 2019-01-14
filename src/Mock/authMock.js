export default {
  login: {
    success: {
      email: 'test@test.com',
      password: 'xxx',
      response: {
        ok: false,
        request: 'LOGIN',
        status: 401,
        statusText: 'Failure'
      }
    },
    failure: {
      email: 'test@test.com',
      password: '123123',
      response: {
        ok: true,
        request: 'LOGIN',
        status: 200,
        statusText: 'OK'
      }
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
