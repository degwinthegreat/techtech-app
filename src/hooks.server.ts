import { redirect } from "@sveltejs/kit"
import { sequence } from '@sveltejs/kit/hooks'
import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { D1Adapter } from "$lib/auth/d1"
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

export const auth = SvelteKitAuth(async (event) => {
  console.log(event.platform?.env.DB)
  const options = {
    adapter: D1Adapter(event.platform?.env.DB),
    trustHost: true,
    secret: AUTH_SECRET,
    providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
    callbacks: {
      session: async ({ session, user }) => {
        if (session.user) {
          session.user.id = user.id;
        }
        return session
      }
    }
  }
  return options
})

const protect=(async ({ event, resolve })=>{
  const protectedPages=["/my_profile","/users"];
  if(protectedPages.some(s=>event.url.pathname.startsWith(s))){
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(303, "/");
    }
  }
  return resolve(event);
}) satisfies Handle
export const handle = sequence(auth, protect);
