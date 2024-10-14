import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("access_token")?.value;
  const isUser = !!authToken;

  // Define restricted routes for logged-in users
  const restrictedRoutes = ["/signup", "/login"];

  const url = request.nextUrl.clone();

  // If the user is authenticated and trying to access restricted routes, redirect them
  if (isUser && restrictedRoutes.includes(url.pathname)) {
    const dashboardUrl = new URL("/main/feed/newForYou", request.url); // or any other protected page
    return NextResponse.redirect(dashboardUrl);
  }

  // If the user is not authenticated and trying to access protected routes, redirect to login
  if (!isUser && !restrictedRoutes.includes(url.pathname)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/login",
    "/main/:chat*",
    "/main/:feed*",
    "/main/:library*",
    "/main/:settings*",
  ],
};
