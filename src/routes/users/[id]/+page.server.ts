export const load = (async ({ platform, params }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { results } = await platform?.env.DB.prepare(
    "SELECT * FROM users WHERE id = ?"
  ).bind(params.id)
  .all();

  return {
    user: results
  }
})
