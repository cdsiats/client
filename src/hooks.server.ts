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

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({sameSite:'lax', secure: true}));

    return response;
}

const authGuard: Handle = async ({event, resolve}) => {
    /**
     *  If the user's authentication is not valid and the current route starts with '/(protected)',
     *  redirect the user to the '/auth' route with a 303 status code.
     */
    if(!event.locals.pb.authStore.isValid && event.route.id?.startsWith('/(protected)')) {
        redirect(303,'/auth')
    }

    /**
     *  If the user's auth token is valid and the current route is '/auth',
     *  redirect the user to their respective dashboard.
     */
    if(event.locals.pb.authStore.isValid && event.route.id == '/auth') {
        redirect(303, `/${event.locals.user?.role}`)
    }

    /**
     *  If the user's auth token is valid and the current route does not match their role,
     *  redirect the user to their respective dashboard.
     */
    if(event.locals.pb.authStore.isValid && !event.url.pathname.startsWith(`/${event.locals.user?.role}`)) {
        redirect(303, `/${event.locals.user?.role}`)
    }

    return resolve(event);

}

export const handle: Handle = sequence(pocketbase, authGuard);