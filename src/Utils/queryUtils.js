export function queryForID(data, id) {
  return data
    .doc(id)
    .get()
    .then(item => ({ id: item.id, ...item.data() }));
}

export function queryForCollection(data, body) {
  const { limit } = body;
  return limit
    ? data
      .limit(Number(limit))
      .get()
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    : data.get().then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
}

