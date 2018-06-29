import url from 'url';

import firebase from 'firebase';

let firestore;

const STATUS = {
  OK: 'OK',
  FAILURE: 'Failure'
};

const SUCCESS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204
};

const CLIENT_ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409
};

const REQUEST = {
  CREATE: 'CREATE',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

const generateResponse = (data, status, statusText, request) => ({
  data,
  status,
  statusText,
  request
});

function initializeFirestore(keys) {
  firestore = firebase.initializeApp(keys).firestore();
}

async function getData({ pathname, query }) {
  try {
    const data = await (query.id
      ? firestore
          .collection(pathname)
          .doc(query.id)
          .get()
          .then(item => ({ key: item.id, ...item.data() }))
      : firestore
          .collection(pathname)
          .get()
          .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    return generateResponse(data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.GET);
  } catch (error) {
    return generateResponse(STATUS.FAILURE, error, CLIENT_ERROR_CODES.BAD_REQUEST, REQUEST.GET);
  }
}

async function createDoc({ pathname }, body) {
  try {
    const data = await firestore
      .collection(pathname)
      .add(body)
      .then(ref => ref.id);
    return generateResponse(data, SUCCESS_CODES.CREATED, STATUS.OK, REQUEST.CREATE);
  } catch (error) {
    return generateResponse(STATUS.FAILURE, error, CLIENT_ERROR_CODES.BAD_REQUEST, REQUEST.CREATE);
  }
}

async function postData({ pathname }) {
  try {
    return firestore
      .collection(pathname)
      .doc()
      .set();
  } catch (error) {
    return error;
  }
}

async function deleteDoc({ pathname, query }) {
  try {
    return firestore
      .collection(pathname)
      .doc(query.id)
      .delete();
  } catch (error) {
    return error;
  }
}

exports.firestoreService {
  INITIALIZE: keys => initializeFirestore(keys),
  GET: path => getData(url.parse(path, true)),
  POST: path => postData(url.parse(path, true)),
  DELETE: path => deleteDoc(url.parse(path, true)),
  CREATE: (path, body) => createDoc(url.parse(path, true), body)
};

// export default firestoreService;
