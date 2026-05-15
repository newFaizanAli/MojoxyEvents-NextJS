import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROUTES_PATHS } from "./app/utilities/page_routes";
import { env_utils } from "./app/utilities/env_utils";

const secret = new TextEncoder().encode(env_utils.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/profile", "/admin", "/artist/book"];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES_PATHS.AUTH.SIGN_IN, req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL(ROUTES_PATHS.AUTH.SIGN_IN, req.url));
  }
}

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/admin/:path*",
//     "/api/:path*",
//   ],
// };

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/artist/book/:path*",
  ],
};
