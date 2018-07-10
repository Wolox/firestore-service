import firestoreService from './index';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

test('Initialize Firestore Service', async () => {
  const response = await firestoreService.INITIALIZE(firebaseConfig);
  expect(response).toEqual(
    expect.objectContaining({
      request: 'INITIALIZE',
      status: 200,
      statusText: 'OK'
    })
  );
});

test('Get user J8NR45UzDffyMY0wBNoa', async () => {
  const path = 'tests/get/users?id=J8NR45UzDffyMY0wBNoa';
  const response = await firestoreService.GET(path);
  expect(response).toEqual({
    data: { age: 33, firstName: 'Mike', id: 'J8NR45UzDffyMY0wBNoa', lastName: 'Poe' },
    request: 'GET',
    status: 200,
    statusText: 'OK'
  });
});

test('Get All Users', async () => {
  const path = 'tests/get/users';
  const response = await firestoreService.GET(path);
  expect(response).toEqual({
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
    request: 'GET',
    status: 200,
    statusText: 'OK'
  });
});

test('Create Doc', async () => {
  const path = 'tests/create/animals';
  const body = { name: 'Bob the test Bear', specimen: 'Bear' };
  const response = await firestoreService.CREATE(path, body);
  const newUser = await firestoreService.GET(`tests/create/animals?id=${response.data}`);
  expect(response).toEqual({
    data: newUser.data.id,
    request: 'CREATE',
    status: 201,
    statusText: 'OK'
  });
});

test('Delete Doc', async () => {
  const path = 'tests/create/animals';
  const body = { firstName: 'Test', lastName: 'Delete' };
  const response = await firestoreService.CREATE(path, body);
  const deleteResponse = await firestoreService.DELETE(`tests/create/animals?id=${response.data}`);
  expect(deleteResponse).toEqual({
    request: 'DELETE',
    status: 200,
    statusText: 'OK'
  });
});

test('Modify Doc', async () => {
  const path = 'tests/create/animals';
  const body = { specimen: 'unkown', name: 'None' };
  const newBody = { specimen: 'Shark', name: 'Little Shark' };
  const response = await firestoreService.CREATE(path, body);
  await firestoreService.POST(`tests/create/animals?id=${response.data}`, newBody);
  const modified = await firestoreService.GET(`tests/create/animals?id=${response.data}`);
  expect(modified).toEqual({
    data: { ...newBody, id: response.data },
    request: 'GET',
    status: 200,
    statusText: 'OK'
  });
});
