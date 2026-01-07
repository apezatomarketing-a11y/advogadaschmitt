import { Handler } from "@netlify/functions";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: "",
    };
  }

  try {
    // Create a Request object from the Netlify event
    const url = new URL(event.path, `https://${event.headers.host}`);
    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers as Record<string, string>),
      body: event.body || undefined,
    });

    // Use tRPC's fetch adapter
    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext,
    });

    // Convert Response to Netlify format
    const body = await response.text();
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Add CORS headers
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";

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
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: {
          message: error instanceof Error ? error.message : "Internal server error",
        },
      }),
    };
  }
};
