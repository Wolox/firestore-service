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
  INITIALIZE: 'INITIALIZE',
  CREATE: 'CREATE',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

const generateResponse = (ok, data, status, statusText, request) => ({
  ok,
  data,
  status,
  statusText,
  request
});

function initializeFirestore(keys) {
  try {
    firestore = firebase.initializeApp(keys).firestore();
    return generateResponse(true, firestore, SUCCESS_CODES.OK, STATUS.OK, REQUEST.INITIALIZE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.INITIALIZE);
  }
}

async function getData({ pathname, query }) {
  try {
    const { id, limit } = query;
    let data = firestore.collection(pathname);
    data = await (id
      ? data
          .doc(id)
          .get()
          .then(item => ({ id: item.id, ...item.data() }))
      : limit
        ? data
            .limit(Number(limit))
            .get()
            .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        : data.get().then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.GET);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.GET);
  }
}

async function createDoc({ pathname }, body) {
  try {
    const data = await firestore
      .collection(pathname)
      .add(body)
      .then(ref => ref.id);
    return generateResponse(true, data, SUCCESS_CODES.CREATED, STATUS.OK, REQUEST.CREATE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.CREATE);
  }
}

async function postData({ pathname, query }, body) {
  try {
    const data = await firestore
      .collection(pathname)
      .doc(query.id)
      .set(body);
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.POST);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.POST);
  }
}

async function deleteDoc({ pathname, query }) {
  try {
    const data = await firestore
      .collection(pathname)
      .doc(query.id)
      .delete();
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.DELETE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.DELETE);
  }
}

const firestoreService = {
  INITIALIZE: keys => initializeFirestore(keys),
  GET: path => getData(url.parse(path, true)),
  POST: (path, body) => postData(url.parse(path, true), body),
  DELETE: path => deleteDoc(url.parse(path, true)),
  CREATE: (path, body) => createDoc(url.parse(path, true), body),
  PATCH: (path, body) => postData(url.parse(path, true), body)
};

export default firestoreService;
