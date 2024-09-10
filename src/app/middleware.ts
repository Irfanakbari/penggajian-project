import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {getCookie} from 'cookies-next';

export function middleware(request: NextRequest) {
    // Ambil token dari cookie
    const token = getCookie('access-token', { req: request });

    // Periksa apakah permintaan adalah untuk path yang dilindungi dan jika token ada
    if (request.nextUrl.pathname.startsWith('/app')) {
        if (token) {
            // Izinkan permintaan untuk dilanjutkan
            return NextResponse.next();
        } else {
            // Arahkan ke halaman login jika token tidak ada
            const loginUrl = new URL('/', request.url);
            return NextResponse.redirect(loginUrl);
        }
    } else {
        // Jika path tidak dilindungi, izinkan permintaan untuk dilanjutkan
        return NextResponse.next();
    }

}
