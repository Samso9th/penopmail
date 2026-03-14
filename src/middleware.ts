import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const region = host.includes(".com.ng") ? "ng" : "intl";

  const response = NextResponse.next();
  response.headers.set("x-region", region);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon).*)"],
};
