export function getIdFromPath(path) {
  const pathArr = path.split('/');
  return pathArr.length % 2 === 0 && pathArr.pop();
}

export function getCollectionPath(pathname) {
  return pathname.substring(0, pathname.lastIndexOf('/'));
}
