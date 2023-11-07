import { redirect } from "@sveltejs/kit"
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

export const auth = SvelteKitAuth({
   session: {
    strategy: 'jwt',
  },
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  pages:{
    signIn: '/sign_in',
  }
})

const protect=(async ({ event, resolve })=>{
  const protectedPages=["/users"];
  if(protectedPages.some(s=>event.url.pathname.startsWith(s))){
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(303, "/");
    }
  }
  return resolve(event);
}) satisfies Handle
export const handle = sequence(auth, protect);
