import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

import { jwtVerify } from "jose";
import { ENV } from "./env";
import * as db from "../db";

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // 1. Try regular OAuth session
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // 2. Try local admin JWT token from Authorization header
    const authHeader = opts.req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        const secret = new TextEncoder().encode(ENV.cookieSecret);
        const { payload } = await jwtVerify(token, secret);
        
        if (payload && payload.email) {
          const admin = await db.getAdminByEmail(payload.email as string);
          if (admin && admin.active) {
            user = {
              id: admin.id,
              openId: `admin_${admin.id}`,
              name: admin.name,
              email: admin.email,
              role: "admin",
              loginMethod: "local",
              createdAt: admin.createdAt,
              lastSignedIn: new Date(),
            } as any;
          }
        }
      } catch (jwtError) {
        console.warn("[Auth] Local admin JWT verification failed");
      }
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
