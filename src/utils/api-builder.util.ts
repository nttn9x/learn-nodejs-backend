export const apiBuilder = async (
  model: any,
  params: any,
  searchFields: any = []
) => {
  let queryObj = { ...params };

  ["page", "sort", "limit", "fields"].forEach(
    (k: string) => delete queryObj[k]
  );

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const conditions = JSON.parse(queryStr);
  Object.keys(conditions).forEach((k) => {
    if (!searchFields.includes(k)) return;
    conditions[k] = new RegExp(conditions[k], "i");
  });

  let query = model.find(conditions);

  if (params.fields) {
    query = query.select(params.fields.split(",").join(" "));
  }

  if (params.sort) {
    query = query.sort(params.sort);
  }

  return await query;
};
