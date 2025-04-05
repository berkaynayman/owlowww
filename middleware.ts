// File: /middleware.ts
import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    if (process.env.NEXT_PUBLIC_DEBUG == "true") {
        return NextResponse.next();

    } else {
        const token = request.cookies.get('token')?.value;
        const path = request.nextUrl.pathname;

        const isPublicPath =
            path === '/' ||
            path === '/forgot-password' ||
            path.startsWith('/_next') ||
            path.startsWith('/favicon') ||
            path.startsWith('/images') ||
            path.startsWith('/api/auth'); // optional if you want auth API open

        /*if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/', request.url));
        }*/

        return NextResponse.next();
    }

}
