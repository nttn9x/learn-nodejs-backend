export const apiBuilder = async (query: any, params: any = {}) => {
  const conditions = { ...params };

  ["page", "sort", "limit", "fields"].forEach(
    (k: string) => delete conditions[k]
  );

  Object.keys(conditions).forEach((k) => {
    conditions[k] = new RegExp(conditions[k], "i");
  });

  query = query.find(conditions);

  if (params.fields) {
    query = query.select(params.fields.split(",").join(" "));
  }

  if (params.sort) {
    query = query.sort(params.sort);
  }

  return await query;
};
