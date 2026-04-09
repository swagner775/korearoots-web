import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (user && request.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (e) {
    // If Supabase fails, just let the request through rather than 500
    console.error("Middleware error:", e);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};
