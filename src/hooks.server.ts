import { redirect } from "@sveltejs/kit"
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

export const auth = SvelteKitAuth({
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  callbacks: {
    jwt: async ({token, user, account, profile}) => {
                // 注意: トークンをログ出力してはダメです。
                console.log('in jwt', {user, token, account, profile})

                if (user) {
                    token.user = user;
                    const u = user as any
                    token.role = u.role;
                }
                if (account) {
                    token.accessToken = account.access_token
                }
                return token;
            },
    session: ({session, token}) => {
      console.log("in session", {session, token});
      token.accessToken
      return {
        ...session,
        user: {
            ...session.user,
            role: token.role,
        },
      }
    }
  },
  pages:{
      signIn: '/sign_in',
    },
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
