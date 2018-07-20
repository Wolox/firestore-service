export default {
  initialize: {
    request: 'INITIALIZE',
    status: 200,
    statusText: 'OK'
  },
  get: {
    path: 'tests/get/users?id=J8NR45UzDffyMY0wBNoa',
    response: {
      data: { age: 33, firstName: 'Mike', id: 'J8NR45UzDffyMY0wBNoa', lastName: 'Poe' },
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  getAll: {
    path: 'tests/get/users',
    response: {
      data: [
        {
          age: 22,
          firstName: 'Matt',
          id: 'EFUsC6gMx052i39GFz8a',
          lastName: 'Myers'
        },
        {
          age: 33,
          firstName: 'Mike',
          id: 'J8NR45UzDffyMY0wBNoa',
          lastName: 'Poe'
        },
        {
          age: 20,
          firstName: 'May',
          id: 'q5LpatgtZwj2U2OalZKR',
          lastName: 'June'
        }
      ],
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  create: {
    path: 'tests/create/animals',
    body: { name: 'Bob the test Bear', specimen: 'Bear' },
    response: {
      ok: true,
      request: 'CREATE',
      status: 201,
      statusText: 'OK'
    }
  },
  delete: {
    path: 'tests/create/animals',
    body: { firstName: 'Test', lastName: 'Delete' },
    response: {
      ok: true,
      request: 'DELETE',
      status: 200,
      statusText: 'OK'
    }
  },
  post: {
    path: 'tests/create/animals',
    body: { specimen: 'unkown', name: 'None' },
    newBody: { specimen: 'Shark', name: 'Little Shark' },
    response: {
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  }
};
