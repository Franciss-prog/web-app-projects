import { json,  type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	

    // set the cookies to blank
    cookies.delete("jwt", {path: "/"})

    return json({message: "Logged out Successfully?"})
};
