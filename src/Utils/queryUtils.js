const applyFilters = (query, filters) =>
  filters.reduce(
    (accumulator, filter) =>
      accumulator.where(filter.field, filter.condition, filter.value),
    query
  );

const pipeOrderBy = (query, orderDirection, orderBy) =>
  orderBy.reduce(
    (accumulator, field) => accumulator.orderBy(field, orderDirection),
    query
  );

export function queryForID(data, id) {
  return data
    .doc(id)
    .get()
    .then(item => ({ id: item.id, ...item.data() }));
}

export function queryForCollection(data, body) {
  let query = data;
  const { limit, filters, orderBy, descending } = body;
  if (filters) {
    query = applyFilters(query, filters);
  }
  if (limit) {
    query = query.limit(Number(limit));
  }
  if (orderBy) {
    const orderByArr = Array.isArray(orderBy) ? orderBy : [ orderBy ];
    const orderDirection = descending ? 'desc' : 'asc';
    query = pipeOrderBy(query, orderDirection, orderByArr);
  }
  return query
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
}
