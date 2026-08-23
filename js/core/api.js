// ==========================================================================
// ADMIN API CLIENT — same fetch pattern as public, cross-site credentials
// ==========================================================================
import { CONFIG } from "../config.js";

class ApiError extends Error {
  constructor(message, { status = 0, code = "unknown_error" } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function request(path, { method = "GET", body, query } = {}) {
  const url = new URL(`${CONFIG.API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

  try {
    const resp = await fetch(url.toString(), {
      method,
      headers: {
        "Accept": "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      // Cross-site credentials — required for HttpOnly cookie auth
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await resp.text();
    const payload = text ? JSON.parse(text) : null;

    if (!resp.ok) {
      throw new ApiError(payload?.message || payload?.detail || "Request failed", {
        status: resp.status,
        code: payload?.code || `http_${resp.status}`,
      });
    }
    return payload;
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") throw new ApiError("Request timed out.", { code: "timeout" });
    if (err instanceof ApiError) throw err;
    throw new ApiError("Network error.", { code: "network_error" });
  }
}

export const api = {
  get: (path, q) => request(path, { query: q }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export { ApiError };
