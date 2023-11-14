export const load = (async ({ platform, params, locals }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { results } = await platform?.env.DB.prepare(
    "SELECT * FROM users WHERE id = ?"
  ).bind(params.id)
  .all();

  const session = await locals.getSession();
  const readonly = results[0].id !== session.user.id

  return {
    user: results[0],
    readonly,
  }
})
