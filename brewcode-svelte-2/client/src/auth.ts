import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { GITHUB_ID, GITHUB_SECRET,AUTH_KEY } from "$env/static/private";


export const {handle} = SvelteKitAuth({
    providers: [GitHub({clientId: GITHUB_ID, clientSecret: GITHUB_SECRET})],
    trustHost: true,
    secret: AUTH_KEY,
})