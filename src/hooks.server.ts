import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import Pocketbase from 'pocketbase';

const pocketbase: Handle = async ({event, resolve}) => {
    event.locals.pb = new Pocketbase("http://127.0.0.1:8090");

    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if(event.locals.pb.authStore.isValid){
            await event.locals.pb.collection('users').authRefresh();
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        event.locals.pb.authStore.clear();
    }

    event.locals.user = structuredClone(event.locals.pb.authStore.model)

    const response = await resolve(event);

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}

const authGuard: Handle = async ({event, resolve}) => {
    if(!event.locals.pb.authStore.isValid && event.route.id?.startsWith('/(protected)')) {
        redirect(303,'/auth')
    }
    if(event.locals.pb.authStore.isValid && event.route.id == '/auth') {
        redirect(303, '/student')
    }


    return resolve(event);

}

export const handle: Handle = sequence(pocketbase, authGuard);