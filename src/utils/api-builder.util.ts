export const apiBuilder = async (
  model,
  { queryParams = {}, routeParams = {} }: any
) => {
  let conditions = { ...queryParams };

  ["page", "sort", "limit", "fields"].forEach(
    (k: string) => delete conditions[k]
  );

  Object.keys(conditions).forEach((k) => {
    conditions[k] = new RegExp(conditions[k], "i");
  });

  conditions = { ...conditions, ...routeParams };

  let query = model.find(conditions);

  if (queryParams.fields) {
    query = query.select(queryParams.fields.split(",").join(" "));
  }

  if (queryParams.sort) {
    query = query.sort(queryParams.sort);
  }

  return await query;
};
