import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    signIn: async ({request, locals}) => {
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;
        
        console.log(email, password)
    }
};