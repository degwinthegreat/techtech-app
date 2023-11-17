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
    const fileName = data.get("fileName")

    if (fileName) {
      await platform.env.DB.prepare(
        "UPDATE users SET name = ?, description = ?, image = ? WHERE id = ?"
      ).bind(name, description, fileName, params.id)
      .all()
    } else {
      await platform.env.DB.prepare(
       "UPDATE users SET name = ?, description = ? WHERE id = ?"
     ).bind(name, description, params.id)
     .all()
    }

    return { success: true }
  }
};
