export const getMock = {
  success: {
    path: 'tests/get/users?id=J8NR45UzDffyMY0wBNoa',
    response: {
      data: { age: 33, firstName: 'Mike', id: 'J8NR45UzDffyMY0wBNoa', lastName: 'Poe' },
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  failure: {
    path: 'tests/get/users/wrongName',
    response: {
      ok: false,
      request: 'GET',
      status: 400,
      statusText: 'Failure'
    }
  }
};

export const getCollectionMock = {
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
  getAllFilter: {
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
  }
};
