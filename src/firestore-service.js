import url from 'url';

import firebase from 'firebase';

import { getPathAndElementId } from './Utils/collectionUtils';

import { queryForID, queryForCollection } from './Utils/queryUtils';

let firestore = null;

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
  DELETE: 'DELETE',
  PUT: 'PUT'
};

// eslint-disable-next-line max-params
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
    firestore.settings({ timestampsInSnapshots: true });
    return generateResponse(true, firestore, SUCCESS_CODES.OK, STATUS.OK, REQUEST.INITIALIZE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.INITIALIZE);
  }
}

async function getData({ pathname }, body = {}) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    let data = firestore.collection(path);
    if (id) {
      data = await queryForID(data, id);
    } else {
      data = await queryForCollection(data, body);
    }
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.GET);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.GET);
  }
}

async function createDoc({ pathname }, body) {
  try {
    const { path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .add(body)
      .then(ref => ref.id);
    return generateResponse(true, data, SUCCESS_CODES.CREATED, STATUS.OK, REQUEST.POST);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.POST);
  }
}

async function modifyDoc({ pathname }, body) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .doc(id)
      .set(body);
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.PUT);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.PUT);
  }
}

async function deleteDoc({ pathname }) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .doc(id)
      .delete();
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.DELETE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.DELETE);
  }
}

const firestoreService = {
  initialize: keys => initializeFirestore(keys),
  get: (path, body) => getData(url.parse(path, true), body),
  put: (path, body) => modifyDoc(url.parse(path, true), body),
  delete: path => deleteDoc(url.parse(path, true)),
  post: (path, body) => createDoc(url.parse(path, true), body),
  patch: (path, body) => modifyDoc(url.parse(path, true), body)
};

export default firestoreService;
