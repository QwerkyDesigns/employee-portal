import { unstable_getServerSession } from "next-auth";
import type { NextFetchEvent, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { authOptions } from "./pages/api/auth/[...nextauth]";

export const config = {
  matcher: "/api/:function*",
};

export async function middleware(req: NextRequest, res: NextResponse) {
  if (!isRegisteredUser(req)) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}

const isRegisteredUser = (req: NextRequest) => {
  let allCookies = req.cookies.getAll();
  console.log(allCookies);

  return true;
};
