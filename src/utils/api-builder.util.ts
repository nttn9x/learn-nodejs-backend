export const apiBuilder = async (model: any, params: any) => {
  let conditions = { ...params };

  ["page", "sort", "limit", "fields"].forEach(
    (k: string) => delete conditions[k]
  );

  Object.keys(conditions).forEach((k) => {
    conditions[k] = new RegExp(conditions[k], "i");
  });

  conditions = { ...conditions };

  let query = model.find(conditions);

  if (params.fields) {
    query = query.select(params.fields.split(",").join(" "));
  }

  if (params.sort) {
    query = query.sort(params.sort);
  }

  return await query;
};
