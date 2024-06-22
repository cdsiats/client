import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const actions: Actions = {
    signIn: async ({request, locals}) => {
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;
        
        try {
            await locals.pb.collection('users').authWithPassword(email, password);
            await locals.pb.collection('users').requestVerification(email);
        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, {fail: true, message: errorObj.data.message})
        }

        redirect(303, `/${locals.pb.authStore.model?.role}`)
    }
};