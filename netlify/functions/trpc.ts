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
    // The fetchRequestHandler expects the path to include the endpoint
    // We use the rawUrl to get the full path and ensure tRPC can parse the procedure name
    const url = new URL(event.rawUrl);
    
    // If the URL is something like /.netlify/functions/trpc/admin.login
    // we need to make sure the endpoint matches the prefix
    const path = url.pathname;
    let endpoint = "/api/trpc";
    
    if (path.includes("/.netlify/functions/trpc")) {
      endpoint = "/.netlify/functions/trpc";
    }

    const response = await fetchRequestHandler({
      endpoint,
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
      body: JSON.stringify({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }),
    };
  }
};
