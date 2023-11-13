export const load = (async ({ platform }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { results } = await platform?.env.DB.prepare(
    "SELECT id, name, image FROM users"
  ).all();

  return {
    users: results
  }
})
