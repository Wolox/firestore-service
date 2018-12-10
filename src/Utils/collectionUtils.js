export function getIdFromPath(path) {
  const pathArr = path.split('/');
  const EVEN_LENGTH_DIVISOR = 2;
  return pathArr.length % EVEN_LENGTH_DIVISOR === 0 && pathArr.pop();
}

export function getCollectionPath(pathname) {
  return pathname.substring(0, pathname.lastIndexOf('/'));
}

export function getPathAndElementId(pathname) {
  const id = getIdFromPath(pathname);
  const path = id ? getCollectionPath(pathname) : pathname;
  return { id, path };
}
