import mock from './mock';

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

test('TEST:INITIALIZE - Initialize Firestore Service', async () => {
  const response = await firestoreService.INITIALIZE(firebaseConfig);
  expect(response).toEqual(expect.objectContaining(mock.initialize));
});

test('TEST:GET - Get a specific id from a collection', async () => {
  const response = await firestoreService.GET(mock.get.path);
  expect(response).toEqual(mock.get.response);
});

test('TEST:GET - Get an entire collection from a specific path', async () => {
  const response = await firestoreService.GET(mock.getAll.path);
  expect(response).toEqual(mock.getAll.response);
});

test('TEST: CREATE - Create a new document in a specific collection', async () => {
  const response = await firestoreService.CREATE(mock.create.path, mock.create.body);
  const newUser = await firestoreService.GET(`${mock.create.path}?id=${response.data}`);
  expect(response).toEqual({
    data: newUser.data.id,
    ...mock.create.response
  });
});

test('TEST: DELETE - Deletes a specific document in a collection', async () => {
  const response = await firestoreService.CREATE(mock.delete.path, mock.delete.body);
  const deleteResponse = await firestoreService.DELETE(`${mock.delete.path}?id=${response.data}`);
  expect(deleteResponse).toEqual(mock.delete.response);
});

test('TEST: POST/PATCH - Modifies a specific docuemnt in a collection', async () => {
  const response = await firestoreService.CREATE(mock.post.path, mock.post.body);
  await firestoreService.POST(`${mock.post.path}?id=${response.data}`, mock.post.newBody);
  const modified = await firestoreService.GET(`${mock.post.path}?id=${response.data}`);
  expect(modified).toEqual({
    data: { ...mock.post.newBody, id: response.data },
    ...mock.post.response
  });
});
