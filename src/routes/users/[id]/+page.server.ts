export const load = (async ({ platform, params, locals }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { results } = await platform?.env.DB.prepare(
    "SELECT * FROM users WHERE id = ?"
  ).bind(params.id)
  .run();

  const session = await locals.getSession();
  const readonly = results[0].id !== session.user.id

  return {
    user: results[0],
    readonly,
  }
})

export const actions = {
	default: async ({platform, request, params}) => {
    const data = await request.formData();
    const name = data.get("name")
    const description = data.get("description")

    const { results } = await platform.env.DB.prepare(
      "UPDATE users SET name = ?, description = ? WHERE id = ?"
    ).bind(name, description, params.id)
    .all();
    return results;
	}
};
