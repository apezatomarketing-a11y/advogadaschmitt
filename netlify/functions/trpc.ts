import { Handler } from "@netlify/functions";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

export const handler: Handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, trpc-batch-mode",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
      },
      body: "",
    };
  }

  try {
    // Netlify redirects /api/trpc/* to /.netlify/functions/trpc
    // We need to construct the correct URL for the tRPC fetch adapter
    // The procedure name is usually in the path after /api/trpc/
    
    const url = new URL(event.rawUrl);
    
    // If the path is just /.netlify/functions/trpc, we need to restore the original path
    // so tRPC can find the procedure. Netlify puts the original path in event.path
    const originalPath = event.path; // e.g. /api/trpc/admin.login
    url.pathname = originalPath;

    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: new Request(url.toString(), {
        method: event.httpMethod,
        headers: new Headers(event.headers as Record<string, string>),
        body: event.body ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body) : undefined,
      }),
      router: appRouter,
      createContext: (opts) => createContext(opts as any),
      onError({ error, path }) {
        console.error(`>>> tRPC Error on path "${path}":`, error);
      },
    });

    const body = await response.text();
    const headers: Record<string, string> = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, trpc-batch-mode",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };
    
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      statusCode: response.status,
      headers,
      body,
    };
  } catch (error) {
    console.error("tRPC handler error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        error: "Internal Server Error", 
        message: error instanceof Error ? error.message : String(error) 
      }),
    };
  }
};
